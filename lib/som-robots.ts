// Shared SOM Directives parsing logic — used by /api/check and /api/badge

export interface SOMDirectives {
  endpoint:    string | null
  format:      string | null
  scope:       string | null
  freshness:   string | null
  tokenBudget: string | null
  rateLimit:   string | null
  attribution: string | null
  raw:         string[]        // all SOM-* lines found
}

export type ReadinessLevel = 'ready' | 'partial' | 'none' | 'error'

export interface CheckResult {
  domain:     string
  level:      ReadinessLevel
  directives: SOMDirectives
  robotsUrl:  string
  error?:     string
  checkedAt:  string
}

export function parseRobotsTxt(content: string): SOMDirectives {
  const lines = content.split('\n').map(l => l.trim())
  const somLines = lines.filter(l => /^SOM-/i.test(l))

  const get = (key: string): string | null => {
    const line = somLines.find(l => l.toLowerCase().startsWith(key.toLowerCase() + ':'))
    if (!line) return null
    return line.slice(line.indexOf(':') + 1).trim() || null
  }

  return {
    endpoint:    get('SOM-Endpoint'),
    format:      get('SOM-Format'),
    scope:       get('SOM-Scope'),
    freshness:   get('SOM-Freshness'),
    tokenBudget: get('SOM-Token-Budget'),
    rateLimit:   get('SOM-Rate-Limit'),
    attribution: get('SOM-Attribution'),
    raw:         somLines,
  }
}

export function scoreDirectives(d: SOMDirectives): ReadinessLevel {
  if (d.endpoint && d.format) return 'ready'
  if (d.endpoint || d.raw.length > 0) return 'partial'
  return 'none'
}

export async function checkDomain(rawDomain: string): Promise<CheckResult> {
  // Normalise — strip protocol, trailing slashes, paths
  const domain = rawDomain
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .trim()
    .toLowerCase()

  if (!domain || !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) {
    return {
      domain,
      level: 'error',
      directives: emptyDirectives(),
      robotsUrl: '',
      error: 'Invalid domain',
      checkedAt: new Date().toISOString(),
    }
  }

  const robotsUrl = `https://${domain}/robots.txt`

  try {
    const res = await fetch(robotsUrl, {
      headers: { 'User-Agent': 'somready-checker/1.0 (+https://somready.com)' },
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      return {
        domain, level: 'none',
        directives: emptyDirectives(),
        robotsUrl,
        error: `robots.txt returned ${res.status}`,
        checkedAt: new Date().toISOString(),
      }
    }

    const text = await res.text()
    const directives = parseRobotsTxt(text)
    const level = scoreDirectives(directives)

    return { domain, level, directives, robotsUrl, checkedAt: new Date().toISOString() }

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Fetch failed'
    return {
      domain, level: 'error',
      directives: emptyDirectives(),
      robotsUrl,
      error: msg,
      checkedAt: new Date().toISOString(),
    }
  }
}

function emptyDirectives(): SOMDirectives {
  return {
    endpoint: null, format: null, scope: null,
    freshness: null, tokenBudget: null,
    rateLimit: null, attribution: null, raw: [],
  }
}

// Generate the recommended robots.txt snippet
export function buildSnippet(): string {
  return `# Semantic Object Model — somready.com
SOM-Endpoint: https://api.somready.com/v1/som
SOM-Format: SOM/1.0
SOM-Scope: main-content
SOM-Freshness: 3600
SOM-Token-Budget: 15000`
}
