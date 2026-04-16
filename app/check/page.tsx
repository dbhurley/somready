'use client'

import { useState, useEffect } from 'react'
import type { CheckResult } from '@/lib/som-robots'

// ─── Directive metadata ────────────────────────────────────────────────────

const DIRECTIVES = [
  {
    key: 'endpoint',
    label: 'SOM-Endpoint',
    required: true,
    hint: 'The URL of the SOM serving endpoint. Required for Level 1 compliance.',
    example: 'https://api.somready.com/v1/som',
  },
  {
    key: 'format',
    label: 'SOM-Format',
    required: true,
    hint: 'The format of the representation. Should be SOM/1.0 for the current specification.',
    example: 'SOM/1.0',
  },
  {
    key: 'scope',
    label: 'SOM-Scope',
    required: false,
    hint: 'Which content to include. Options: full-page, main-content, article-body.',
    example: 'main-content',
  },
  {
    key: 'freshness',
    label: 'SOM-Freshness',
    required: false,
    hint: 'Maximum cache age in seconds. Recommended: 3600 for news, 86400 for evergreen content.',
    example: '3600',
  },
  {
    key: 'tokenBudget',
    label: 'SOM-Token-Budget',
    required: false,
    hint: 'Suggested token limit before fetching, letting agents estimate costs.',
    example: '15000',
  },
]

const SNIPPET = `# Semantic Object Model — somready.com
SOM-Endpoint: https://api.somready.com/v1/som
SOM-Format: SOM/1.0
SOM-Scope: main-content
SOM-Freshness: 3600
SOM-Token-Budget: 15000`

// ─── Sub-components ───────────────────────────────────────────────────────

function StatusBadge({ level }: { level: CheckResult['level'] }) {
  const map = {
    ready:   { label: 'SOM Ready',  bg: 'bg-green text-white',         dot: 'bg-white' },
    partial: { label: 'Partial',    bg: 'bg-amber-500 text-white',      dot: 'bg-white' },
    none:    { label: 'Not Yet',    bg: 'bg-surface2 text-muted border border-border', dot: 'bg-muted' },
    error:   { label: 'Error',      bg: 'bg-surface2 text-muted border border-border', dot: 'bg-muted' },
  }
  const s = map[level]
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${s.bg}`}>
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot} ${level === 'ready' ? 'pulse-dot' : ''}`} />
      {s.label}
    </span>
  )
}

function DirectiveRow({
  label, value, required, hint, example,
}: {
  label: string; value: string | null; required: boolean; hint: string; example: string
}) {
  const present = !!value
  return (
    <div className={`p-4 rounded-card border ${present ? 'border-border bg-surface' : 'border-dashed border-border bg-background'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <code className="text-xs font-mono text-accent">{label}</code>
            {required && (
              <span className="text-[10px] font-medium uppercase tracking-wider text-accent bg-accent-light px-1.5 py-0.5 rounded">
                required
              </span>
            )}
          </div>
          {value ? (
            <p className="mt-1 text-sm font-mono text-ink truncate">{value}</p>
          ) : (
            <p className="mt-1 text-xs text-muted italic">
              Not set — example: <span className="font-mono not-italic text-faint">{example}</span>
            </p>
          )}
          <p className="mt-1.5 text-xs text-muted leading-relaxed">{hint}</p>
        </div>
        <span className={`flex-shrink-0 text-lg ${present ? 'text-green' : required ? 'text-amber-500' : 'text-faint'}`}>
          {present ? '✓' : required ? '✗' : '–'}
        </span>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────

export default function CheckPage() {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CheckResult | null>(null)
  const [copiedSnippet, setCopiedSnippet] = useState(false)
  const [copiedBadge, setCopiedBadge] = useState(false)

  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim().toLowerCase()

  const badgeUrl    = `https://somready.com/badge/${cleanDomain}.svg`
  const badgeEmbed  = `<a href="https://somready.com/check?d=${cleanDomain}"><img src="${badgeUrl}" alt="SOM Ready" /></a>`
  const badgeMd     = `[![SOM Ready](${badgeUrl})](https://somready.com/check?d=${cleanDomain})`

  const handleCheck = async () => {
    if (!cleanDomain) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`/api/check?domain=${encodeURIComponent(cleanDomain)}`)
      const data: CheckResult = await res.json()
      setResult(data)
    } catch {
      setResult({
        domain: cleanDomain, level: 'error',
        directives: { endpoint: null, format: null, scope: null, freshness: null, tokenBudget: null, rateLimit: null, attribution: null, raw: [] },
        robotsUrl: '', error: 'Network error', checkedAt: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  const copy = async (text: string, which: 'snippet' | 'badge') => {
    await navigator.clipboard.writeText(text)
    if (which === 'snippet') { setCopiedSnippet(true); setTimeout(() => setCopiedSnippet(false), 2000) }
    else                     { setCopiedBadge(true);  setTimeout(() => setCopiedBadge(false), 2000) }
  }

  // Pre-fill and auto-check domain from ?d= query param on mount
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('d')
    if (q) {
      const d = q.replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim().toLowerCase()
      setDomain(q)
      if (d && /^[a-z0-9.-]+\.[a-z]{2,}$/.test(d)) {
        setLoading(true)
        fetch(`/api/check?domain=${encodeURIComponent(d)}`)
          .then(res => res.json())
          .then((data: CheckResult) => setResult(data))
          .catch(() => setResult({
            domain: d, level: 'error',
            directives: { endpoint: null, format: null, scope: null, freshness: null, tokenBudget: null, rateLimit: null, attribution: null, raw: [] },
            robotsUrl: '', error: 'Network error', checkedAt: new Date().toISOString(),
          }))
          .finally(() => setLoading(false))
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-3">Tooling</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink mb-4">
            Is your site SOM-ready?
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Check whether your website has SOM Directives configured in its robots.txt.
            Get a detailed report and your embeddable badge.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* Input card */}
        <div className="bg-surface border border-border rounded-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-green pulse-dot flex-shrink-0" />
            <span className="text-sm font-medium text-ink">Check a domain</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={domain}
              onChange={e => { setDomain(e.target.value); setResult(null) }}
              onKeyDown={e => e.key === 'Enter' && handleCheck()}
              placeholder="yourdomain.com"
              className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm text-ink placeholder:text-faint bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-mono"
            />
            <button
              onClick={handleCheck}
              disabled={!cleanDomain || loading}
              className="px-6 py-2.5 bg-accent hover:bg-accent-dark disabled:opacity-40 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              {loading ? 'Checking…' : 'Check →'}
            </button>
          </div>
          <p className="mt-3 text-xs text-faint">
            Fetches <code className="font-mono">robots.txt</code> and scans for{' '}
            <code className="font-mono">SOM-*</code> directives.{' '}
            <a href="https://somspec.org/directives" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              What are SOM Directives?
            </a>
          </p>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6">

            {/* Status */}
            <div className="bg-surface border border-border rounded-card p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs font-mono text-faint mb-1">{result.robotsUrl}</p>
                  <h2 className="font-display text-2xl text-ink">{result.domain}</h2>
                  <p className="text-xs text-faint mt-1">
                    Checked {new Date(result.checkedAt).toLocaleTimeString()}
                    {result.directives.raw.length > 0 && (
                      <> · {result.directives.raw.length} SOM directive{result.directives.raw.length !== 1 ? 's' : ''} found</>
                    )}
                  </p>
                </div>
                <StatusBadge level={result.level} />
              </div>

              {result.error && result.level !== 'none' && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                  {result.error}
                </div>
              )}

              {result.level === 'ready' && (
                <div className="mt-4 p-3 bg-green/10 border border-green/20 rounded-lg text-sm text-green">
                  ✓ This site is fully SOM-ready. AI agents can discover and use the structured endpoint automatically.
                </div>
              )}
            </div>

            {/* Directive breakdown */}
            <div>
              <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">
                Directive Report
              </h3>
              <div className="space-y-2">
                {DIRECTIVES.map(d => (
                  <DirectiveRow
                    key={d.key}
                    label={d.label}
                    value={result.directives[d.key as keyof typeof result.directives] as string | null}
                    required={d.required}
                    hint={d.hint}
                    example={d.example}
                  />
                ))}
              </div>
            </div>

            {/* Add snippet (shown when not ready) */}
            {result.level !== 'ready' && (
              <div className="bg-surface border border-border rounded-card p-6">
                <h3 className="font-display text-xl text-ink mb-1">Add these lines to your robots.txt</h3>
                <p className="text-sm text-muted mb-4">
                  Paste this into your existing robots.txt file, after your existing User-agent rules.
                </p>
                <div className="relative">
                  <pre className="bg-ink text-green text-xs font-mono p-4 rounded-lg overflow-x-auto leading-relaxed whitespace-pre">
{SNIPPET}
                  </pre>
                  <button
                    onClick={() => copy(SNIPPET, 'snippet')}
                    className="absolute top-3 right-3 text-xs bg-surface2 hover:bg-border text-muted px-2.5 py-1 rounded-md transition-colors"
                  >
                    {copiedSnippet ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
                <p className="mt-3 text-xs text-faint">
                  Then run this checker again to confirm.{' '}
                  <a href="https://somspec.org/directives" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Full directive reference →
                  </a>
                </p>
              </div>
            )}

            {/* Badge section */}
            <div className="bg-surface border border-border rounded-card p-6">
              <h3 className="font-display text-xl text-ink mb-1">Your badge</h3>
              <p className="text-sm text-muted mb-5">
                Show visitors and other agents that your site is SOM-ready.
              </p>

              {/* Live badge preview */}
              <div className="flex items-center gap-4 mb-5 p-4 bg-background rounded-lg border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={badgeUrl}
                  alt={`somready badge for ${cleanDomain}`}
                  height={20}
                />
                <span className="text-xs text-faint">Live preview</span>
              </div>

              {/* Embed options */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted mb-1.5">HTML</p>
                  <div className="relative">
                    <code className="block text-xs font-mono bg-background border border-border rounded-lg p-3 pr-16 text-faint overflow-x-auto whitespace-nowrap">
                      {badgeEmbed}
                    </code>
                    <button
                      onClick={() => copy(badgeEmbed, 'badge')}
                      className="absolute top-2 right-2 text-xs bg-surface2 hover:bg-border text-muted px-2.5 py-1 rounded-md transition-colors"
                    >
                      {copiedBadge ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted mb-1.5">Markdown</p>
                  <div className="relative">
                    <code className="block text-xs font-mono bg-background border border-border rounded-lg p-3 pr-16 text-faint overflow-x-auto whitespace-nowrap">
                      {badgeMd}
                    </code>
                    <button
                      onClick={() => copy(badgeMd, 'badge')}
                      className="absolute top-2 right-2 text-xs bg-surface2 hover:bg-border text-muted px-2.5 py-1 rounded-md transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Footer nudge */}
        {!result && !loading && (
          <div className="mt-12 text-center space-y-2">
            <p className="text-sm text-muted">
              Want to implement SOM Directives?{' '}
              <a href="https://somspec.org/directives" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Read the spec →
              </a>
              {' · '}
              <a href="/" className="text-accent hover:underline">
                Get a hosted endpoint →
              </a>
            </p>
            <p className="text-sm text-muted">
              See who&apos;s already SOM-ready:{' '}
              <a href="https://somspec.org/publishers" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Publisher leaderboard →
              </a>
            </p>
          </div>
        )}

        {/* Post-result leaderboard nudge */}
        {result && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted">
              See how your site compares:{' '}
              <a href="https://somspec.org/publishers" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Publisher leaderboard →
              </a>
              {result.level !== 'ready' && (
                <>
                  {' · '}
                  <a href="/docs" className="text-accent hover:underline">
                    Implementation guide →
                  </a>
                </>
              )}
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
