import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Documentation — somready.com',
  description: 'How to make your website readable by AI agents using SOM Directives. Publisher quickstart, directive reference, CNAME setup, and FAQ.',
  alternates: { canonical: '/docs' },
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2 className="font-display text-2xl text-text-primary mb-5">{title}</h2>
      <div className="space-y-4 text-sm text-text-muted leading-relaxed">{children}</div>
    </section>
  )
}

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#1A1916] text-green text-xs font-mono p-5 rounded-xl overflow-x-auto leading-relaxed whitespace-pre my-4">
      {children}
    </pre>
  )
}

function Field({ name, type, required, desc }: { name: string; type: string; required?: boolean; desc: string }) {
  return (
    <div className="border-l-2 border-border pl-4 py-2">
      <div className="flex items-center gap-2 flex-wrap mb-1">
        <code className="text-xs font-mono text-accent">{name}</code>
        <span className="text-xs font-mono text-faint">({type})</span>
        {required && (
          <span className="text-[10px] uppercase tracking-wider text-accent bg-accent-light px-1.5 py-0.5 rounded font-medium">
            required
          </span>
        )}
      </div>
      <p className="text-sm text-text-muted">{desc}</p>
    </div>
  )
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-3">Documentation</p>
          <h1 className="font-display text-4xl md:text-5xl text-text-primary mb-4">
            Publisher Guide
          </h1>
          <p className="text-lg text-text-muted max-w-2xl">
            How to make your website readable by every AI agent — in about five minutes.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 lg:flex gap-16">

        {/* Sidebar TOC */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 space-y-1 text-sm">
            {[
              ['quick-start',  'Quick start'],
              ['how-it-works', 'How it works'],
              ['directives',   'Directive reference'],
              ['cname',        'CNAME setup'],
              ['verify',       'Verification'],
              ['faq',          'FAQ'],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`}
                className="block py-1.5 text-text-muted hover:text-accent transition-colors">
                {label}
              </a>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">

          <Section id="quick-start" title="Quick start">
            <p>Three steps. No code changes to your website required.</p>

            <div className="space-y-4 mt-2">
              {[
                {
                  n: '1',
                  title: 'Add a CNAME record',
                  body: 'In your DNS settings, create a CNAME record that points your agents subdomain to somready.com:',
                  code: 'agents.yourdomain.com  CNAME  api.somready.com',
                },
                {
                  n: '2',
                  title: 'Add directives to robots.txt',
                  body: 'Open your robots.txt and add these lines, after your existing User-agent rules:',
                  code: `# Semantic Object Model — somready.com
SOM-Endpoint: https://agents.yourdomain.com/v1/som
SOM-Format: SOM/1.0
SOM-Scope: main-content
SOM-Freshness: 3600
SOM-Token-Budget: 15000`,
                },
                {
                  n: '3',
                  title: 'Verify',
                  body: 'Check that everything is configured correctly:',
                  code: null,
                },
              ].map((step) => (
                <div key={step.n} className="bg-surface border border-border rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-accent text-white text-xs font-semibold flex items-center justify-center">
                      {step.n}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-text-primary mb-1">{step.title}</h3>
                      <p className="text-sm text-text-muted">{step.body}</p>
                      {step.code && <Code>{step.code}</Code>}
                      {step.n === '3' && (
                        <Link href="/check"
                          className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-accent hover:underline">
                          Run the checker → somready.com/check
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="how-it-works" title="How it works">
            <p>
              When an AI agent visits a page on your site, it first fetches your{' '}
              <code className="font-mono text-xs text-accent">robots.txt</code>. If SOM Directives
              are present, a Level 1 compliant agent will request the SOM representation instead
              of raw HTML — fetching from your SOM endpoint with the target page URL as a parameter.
            </p>
            <Code>{`# Agent fetches:
GET https://agents.yourdomain.com/v1/som?url=https%3A%2F%2Fyourdomain.com%2Farticle%2F123

# somready proxies through Plasmate and returns:
{
  "som_version": "0.1",
  "url": "https://yourdomain.com/article/123",
  "title": "Your article title",
  "regions": [...],
  "meta": { "html_bytes": 184351, "som_bytes": 5376, "compression_ratio": 34.3 }
}`}
            </Code>
            <p>
              The SOM response uses{' '}
              <a href="https://somspec.org/spec" target="_blank" rel="noopener noreferrer"
                className="text-accent hover:underline">
                10–100× fewer tokens
              </a>{' '}
              than raw HTML. The agent gets richer, more structured information faster
              and at lower cost. You get visibility into which agents are reading what.
            </p>
            <p>
              The underlying technology is{' '}
              <a href="https://github.com/plasmate-labs/plasmate" target="_blank" rel="noopener noreferrer"
                className="text-accent hover:underline">
                Plasmate
              </a>
              , an Apache 2.0 open-source SOM compiler. somready.com manages
              the infrastructure so you don&apos;t have to.
            </p>
          </Section>

          <Section id="directives" title="Directive reference">
            <p>
              All directives are added to your existing{' '}
              <code className="font-mono text-xs text-accent">robots.txt</code> file.
              They follow the same syntax as standard directives and are ignored by
              agents that don&apos;t understand them.
              Full specification at{' '}
              <a href="https://somspec.org/directives" target="_blank" rel="noopener noreferrer"
                className="text-accent hover:underline">
                somspec.org/directives
              </a>.
            </p>

            <div className="space-y-4 mt-4">
              <Field name="SOM-Endpoint" type="URL" required
                desc="The base URL of your SOM service. Agents append ?url= with the encoded target page URL. For somready.com users: https://agents.yourdomain.com/v1/som" />
              <Field name="SOM-Format" type="string" required
                desc='The format of the representation. Use "SOM/1.0" for the current specification. Future versions will support markdown and accessibility-tree.' />
              <Field name="SOM-Scope" type="string"
                desc="Which content to include. Options: full-page (everything), main-content (recommended — strips nav and footer), article-body (article text only)." />
              <Field name="SOM-Freshness" type="seconds"
                desc="How long agents should cache a SOM response before re-fetching. Recommended values: 900 (breaking news), 3600 (regular news), 86400 (evergreen/docs)." />
              <Field name="SOM-Token-Budget" type="integer"
                desc="A hint to agents about the expected maximum token count. Lets agents estimate context window usage before committing to a fetch." />
              <Field name="SOM-Rate-Limit" type="N/period"
                desc="Advisory rate limit for your SOM endpoint. Example: 60/minute. Agents that honor this avoid overloading your endpoint." />
            </div>
          </Section>

          <Section id="cname" title="CNAME setup">
            <p>
              The CNAME record points your{' '}
              <code className="font-mono text-xs text-accent">agents</code> subdomain to
              somready&apos;s infrastructure. This is what makes your robots.txt endpoint
              actually respond with SOM.
            </p>
            <Code>{`# DNS record to add:
Type:   CNAME
Host:   agents
Value:  api.somready.com

# Results in: agents.yourdomain.com → somready infrastructure`}</Code>

            <p>Where to find DNS settings:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong className="text-text-primary">Cloudflare</strong> — DNS → Add record</li>
              <li><strong className="text-text-primary">Namecheap</strong> — Domain List → Manage → Advanced DNS</li>
              <li><strong className="text-text-primary">GoDaddy</strong> — DNS → Add New Record</li>
              <li><strong className="text-text-primary">Vercel</strong> — Domains → your domain → DNS Records</li>
            </ul>

            <p className="mt-4 text-xs text-faint">
              DNS changes can take up to 48 hours to propagate, but usually resolve within minutes.
              Use <code className="font-mono">dig agents.yourdomain.com CNAME</code> to verify.
            </p>
          </Section>

          <Section id="verify" title="Verification">
            <p>Once your CNAME and robots.txt are set up, verify with the checker:</p>

            <div className="bg-surface border border-border rounded-xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-text-primary">SOM Readiness Checker</p>
                <p className="text-xs text-text-muted mt-0.5">
                  Fetches your robots.txt and reports on each directive.
                </p>
              </div>
              <Link href="/check"
                className="flex-shrink-0 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-lg transition-colors">
                Check your site →
              </Link>
            </div>

            <p>You can also test the SOM endpoint directly:</p>
            <Code>{`# Test your SOM endpoint manually
curl "https://agents.yourdomain.com/v1/som?url=https%3A%2F%2Fyourdomain.com"

# Should return JSON starting with:
# { "som_version": "0.1", "url": "...", "regions": [...] }`}</Code>
          </Section>

          <Section id="faq" title="FAQ">
            <div className="space-y-6">
              {[
                {
                  q: 'Does somready.com need access to my website?',
                  a: 'No. somready.com fetches your pages on-demand when an agent requests them, the same way any browser or crawler would. No credentials, no integration, no code changes.',
                },
                {
                  q: 'What if my site has JavaScript-rendered content?',
                  a: 'The current version of somready uses Plasmate, which is optimized for server-rendered and statically generated content. JavaScript-heavy SPAs will still work but may have incomplete element coverage. JavaScript rendering support is on the roadmap.',
                },
                {
                  q: 'Which AI agents honor SOM Directives?',
                  a: 'As of April 2026, Plasmate (the reference implementation) honors directives at Level 2. Most other agent frameworks are at Level 0 — they are aware of robots.txt but do not yet parse SOM-* directives. The compliance matrix at somspec.org/compliance tracks this.',
                },
                {
                  q: 'What happens to agents that don\'t understand SOM Directives?',
                  a: 'They ignore the directives and continue fetching raw HTML, exactly as before. SOM Directives are additive — they never break anything for existing agents.',
                },
                {
                  q: 'Is my content sent anywhere?',
                  a: 'Pages are fetched and processed when an agent requests them. The SOM output is cached briefly (per SOM-Freshness) to avoid re-fetching the same page repeatedly. No content is stored permanently.',
                },
                {
                  q: 'What is the SOM open standard?',
                  a: 'The Semantic Object Model is an Apache 2.0 open specification for representing web pages as structured JSON for AI agents. The specification, validator, and compliance data are at somspec.org.',
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <h3 className="text-sm font-semibold text-text-primary mb-1.5">{q}</h3>
                  <p className="text-sm text-text-muted">{a}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Footer links */}
          <div className="border-t border-border pt-8 mt-8 flex flex-wrap gap-4 text-sm text-text-muted">
            <a href="https://somspec.org/spec" target="_blank" rel="noopener noreferrer"
              className="hover:text-accent transition-colors">SOM Specification →</a>
            <a href="https://somspec.org/directives" target="_blank" rel="noopener noreferrer"
              className="hover:text-accent transition-colors">Directive Reference →</a>
            <a href="https://somspec.org/compliance" target="_blank" rel="noopener noreferrer"
              className="hover:text-accent transition-colors">Framework Compliance →</a>
            <Link href="/check" className="hover:text-accent transition-colors">Check your site →</Link>
          </div>

        </main>
      </div>
    </div>
  )
}
