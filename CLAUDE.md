# SOMready — Agent Context

> Marketing site, domain compliance checker, and badge API for the **SOM (Semantic Object Model)** standard. SOM lets publishers advertise an agent-readable structured endpoint via a few lines in `robots.txt`. This repo is the consumer-facing front door: the landing page, interactive checker, embeddable compliance badges, and waitlist capture.
>
> The standard itself lives in a sibling repo (`dbhurley/somspec`). The reference implementation lives in `plasmate-labs/plasmate`.

---

## Related Repos

| Repo | Role | Relationship |
|------|------|--------------|
| `dbhurley/somready` | Marketing site + checker + badge API (this repo) | Consumer front door — `somready.com` |
| `dbhurley/somspec` | SOM/1.0 specification + directive schema | `somspec.org` — what the checker validates against |
| `dbhurley/somordom` | Private sibling — likely SOM-adjacent tooling | Unknown exact relationship; confirm when touched |
| `plasmate-labs/plasmate` | Reference implementation (publisher SDK) | The "how to actually emit SOM" side |

---

## What SOM Is (One-Paragraph Primer)

A publisher adds lines to `robots.txt`:

```
SOM-Endpoint:    https://api.example.com/v1/som
SOM-Format:      SOM/1.0
SOM-Scope:       main-content
SOM-Freshness:   3600
SOM-Token-Budget: 15000
SOM-Rate-Limit:  60/min
SOM-Attribution: https://example.com/attribution
```

An AI agent (crawler, research agent, answer engine) reads those directives and fetches the SOM endpoint instead of scraping HTML. The payload is a compact, agent-native structured document optimized for tokens. `endpoint` + `format` together mean "SOM Ready." Any of the other SOM-* directives present (but without both anchors) means "Partial." Nothing means "Not Yet."

The logic that encodes this is in `lib/som-robots.ts`:

- `parseRobotsTxt(content)` — scans for `SOM-*:` lines, returns a `SOMDirectives` struct
- `scoreDirectives(d)` — `ready` / `partial` / `none`
- `checkDomain(domain)` — fetches `https://<domain>/robots.txt` with an 8s timeout and `User-Agent: somready-checker/1.0`

---

## Directory Structure

```
somready/
├── app/                          # Next.js 14 App Router
│   ├── page.tsx                  # Landing page (snippet generator, pricing)
│   ├── layout.tsx                # Root layout, fonts, metadata
│   ├── globals.css               # Tailwind entrypoint
│   ├── icon.svg                  # Favicon
│   ├── opengraph-image.tsx       # Dynamic OG image generation
│   │
│   ├── check/                    # Interactive domain checker
│   │   ├── page.tsx              # UI — submit domain, render result + badge
│   │   └── layout.tsx            # Page-specific metadata
│   │
│   ├── docs/
│   │   └── page.tsx              # Publisher implementation guide
│   │
│   ├── meet/                     # Investor/partner pitch deck (magazine-styled)
│   │   ├── page.tsx              # 774-line narrative pitch
│   │   └── layout.tsx            # Served via meet.somready.com subdomain
│   │
│   ├── som-vs-markdown/          # Deep comparison: SOM vs llms.txt/markdown
│   │   ├── page.tsx              # 858-line long-form research piece
│   │   └── layout.tsx
│   │
│   ├── api/
│   │   ├── check/route.ts        # GET /api/check?d=<domain> → JSON result
│   │   ├── badge/route.ts        # GET /api/badge (query-style SVG badge)
│   │   └── waitlist/route.ts     # POST /api/waitlist — Resend email flow
│   │
│   ├── badge/[domain]/route.ts   # GET /badge/<domain>[.svg] → SVG badge
│   └── fonts/                    # Self-hosted Geist + Geist Mono woff files
│
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── BeforeAfter.tsx           # Visual: raw HTML vs SOM response
│   ├── PricingCard.tsx
│   ├── SnippetGenerator.tsx      # Generates robots.txt block from user inputs
│   └── WaitlistForm.tsx          # Client form → POST /api/waitlist
│
├── lib/
│   └── som-robots.ts             # Core checker — parseRobotsTxt, checkDomain
│
├── middleware.ts                 # Host-based rewrite: meet.* → /meet
├── public/
│   ├── llms.txt                  # Agent-facing site description
│   └── robots.txt                # The site's own SOM directives (dogfood)
│
├── next.config.mjs               # Minimal — no custom config yet
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json                  # Next 14.2.35, React 18, TS 5
```

---

## Primary Flows

### 1. Domain Check (JSON)

```
Client → GET /api/check?d=example.com
  → lib/som-robots.checkDomain(domain)
    → fetch https://example.com/robots.txt
    → parseRobotsTxt → scoreDirectives
  → JSON { domain, level, directives, robotsUrl, checkedAt }
```

Cache: `public, s-maxage=300, stale-while-revalidate=600`. CORS `*`.

Also accepts `?domain=` for backward compatibility (preference: `?d=` when both present).

### 2. Badge (SVG)

Two entrypoints produce the same output:

- `GET /badge/<domain>` or `GET /badge/<domain>.svg` — **preferred**, path-style
- `GET /api/badge?d=<domain>` — query-style alt

Both call `checkDomain(domain)` and render a shields.io-style SVG. Colors:

| Level | Color | Label |
|-------|-------|-------|
| ready | `#059669` (emerald-600) | `SOM Ready ✓` |
| partial | `#D97706` (amber-600) | `Partial` |
| none | `#6B6760` (muted) | `Not Yet` |
| error | `#6B6760` (muted) | `Unknown` |

Cache: 5-minute TTL (recently reduced from 1 hour — see commit `e646df7`). Includes `X-Badge-Debug` header on the path-based route for diagnostics.

### 3. Waitlist

```
Client (WaitlistForm.tsx) → POST /api/waitlist { email, domain? }
  → sends confirmation email to user (Resend, from waitlist@somready.com)
  → sends notification email to dbhurley@me.com
  → logs [WAITLIST] <ts> | email=... | domain=...
```

Fails gracefully if `RESEND_API_KEY` is unset (logs + skips send).

### 4. Subdomain Rewrite

`middleware.ts` rewrites `meet.somready.com/` to `/meet` so the investor deck has its own memorable URL. Only the root path is rewritten; `_next/*`, `favicon.ico`, `icon.svg`, and API routes pass through untouched.

---

## Key Design Decisions

1. **Static-first, no database.** There's no user state beyond waitlist emails (delivered by Resend and logged). All "check" results are computed live from the target's `robots.txt`. This keeps the infra cost trivially low and Vercel-native.

2. **Dual param names (`?d=` and `?domain=`).** `d` is preferred for brevity in badge embeds; `domain` is kept for backward compatibility. Always prefer `d` if both are set. See commit `5baaf7e`.

3. **Path-style badge URLs.** `/badge/example.com.svg` instead of a query string because it's idiomatic for embed markdown (`![...](...)`), shorter in READMEs, and matches shields.io conventions.

4. **No fetch caching on `robots.txt` lookups.** The check route forces `cache: 'no-store'` and disables Next.js's fetch cache to avoid stale compliance results (commit `1302162`). The public response layer still caches the check result for 5 minutes.

5. **Sibling subdomain for investor deck.** `meet.somready.com` is a partner-facing surface with different rhythm from the main site — narrative, visual, longer-form. Host rewrite in middleware keeps the deck inside this repo rather than a separate project.

6. **Dogfooded `robots.txt`.** The site advertises its own `SOM-Endpoint` at `api.somready.com/v1/som`. The corresponding API is not yet implemented here — it's a placeholder claim for now. Confirm before touching anything that assumes it exists.

---

## Public API Reference

| Method | Path | Purpose | Cache |
|--------|------|---------|-------|
| GET | `/api/check?d=<domain>` | JSON compliance check | 5 min, SWR 10 min |
| GET | `/badge/<domain>` | SVG badge (path-style) | 5 min |
| GET | `/badge/<domain>.svg` | Alias of above (strips `.svg`) | 5 min |
| GET | `/api/badge?d=<domain>` | SVG badge (query-style, alt) | 5 min |
| POST | `/api/waitlist` | `{ email, domain? }` → Resend | N/A |

All responses set `Access-Control-Allow-Origin: *` where applicable so embeds work from third-party sites.

---

## Environment Variables

| Name | Required | Purpose |
|------|----------|---------|
| `RESEND_API_KEY` | Waitlist only | Transactional email via Resend. If unset, waitlist logs but does not send. |

No database, no KV, no cron. That's it.

**Hardcoded (move to env if externalized):**
- `NOTIFY_EMAIL = 'dbhurley@me.com'` — waitlist notifications
- `FROM_ADDRESS = 'SOMready <waitlist@somready.com>'`

---

## Deployment / Infra

- **Host:** Vercel (default Next.js platform, no `vercel.json` override)
- **Domains:** `somready.com` (primary), `meet.somready.com` (rewrites to `/meet`)
- **Runtime:** Next.js 14.2.35, Node.js runtime (API routes use `NextRequest`/`NextResponse`, no edge runtime declared)
- **Build:** `next build` (no custom config in `next.config.mjs`)
- **Cold start:** trivial — no DB, no external services except Resend on one route

---

## Local Dev

```bash
npm install
npm run dev           # localhost:3000
```

To exercise the waitlist path locally, set `RESEND_API_KEY` in `.env.local`. Otherwise it will log and skip.

To test the `meet.*` rewrite locally, edit `/etc/hosts` to alias `meet.localhost` → `127.0.0.1` and browse `http://meet.localhost:3000/`.

```bash
npm run lint
npm run build         # full production build — catches SSG/type errors
```

---

## Testing / CI

**None.** No `.github/workflows/`, no test scripts in `package.json`, no test framework. Validation is manual + Vercel's build step.

If you add tests, the natural unit-testing targets are:
- `lib/som-robots.ts` — `parseRobotsTxt`, `scoreDirectives`, `checkDomain`
- `app/api/check/route.ts` — integration test against a known-good and known-none fixture

---

## Known Limitations / Current State

- **No real `/v1/som` endpoint** despite the site's own `robots.txt` advertising one. The self-claim in `public/robots.txt` will currently return 404 if any agent honors it. Either stand up that endpoint or stop advertising it.
- **No rate limiting on `/api/check` or `/badge/*`.** Any client can pound either route and burn Vercel function invocations. Low-risk today; needs attention if traffic scales.
- **No input validation beyond regex** in `checkDomain` — malicious SSRF surface is narrow (HTTPS only, timeout 8s, `robots.txt` path only), but worth a security review before relaxing.
- **Waitlist logs to stdout**, not persisted. A Vercel log retention miss = lost signup data. Consider writing to a KV store or emailing only the notification (the email to David is the durable copy).
- **Hardcoded branding values** (`NOTIFY_EMAIL`, `FROM_ADDRESS`) — fine for single-tenant, painful if ever white-labeled.
- **No tests, no CI, no type-checking gate** in the repo itself. Vercel catches build-breakers; lint is opt-in only.

---

## Roadmap / Open Threads

(Inferred from recent commit history. No issues or PRs are open.)

Recent work clusters around three tracks:

1. **Badge ergonomics** — cache tuning (`e646df7`, `1302162`), param compat (`5baaf7e`, `0cb5eb7`), machine-readable agent instructions (`070b5ac`), debug header (`baf88c0`). Badge is the primary viral loop; expect continued iteration here.

2. **Positioning content** — `/som-vs-markdown` (SOM vs llms.txt comparison, commit `77b1f84`), `/meet` pitch deck (`5e71cd3`), `/docs` expansion (`a8ebd6f`). The product positioning is still being worked out — SOM vs the incumbent `llms.txt` convention is the sharpest edge.

3. **Pricing / waitlist** — checkmark render fix (`8d0a39a`) suggests pricing cards are being tuned. Waitlist is in place but no downstream CRM sync.

**Not in the code but implied:**
- A real SOM response endpoint at `api.somready.com/v1/som` that publishers can point to or whose format they can mimic
- Waitlist → real CRM or list tool (currently stdout + email only)
- Automated monitoring for listed domains (re-check daily, alert on regressions)
- Badge-embed analytics (who's embedded the badge, how often does it get fetched)

---

## Conventions for Changes

- New API routes: follow the `route.ts` + `export async function GET/POST` pattern already in use
- New pages: App Router, `page.tsx` + `layout.tsx` for page-specific metadata
- Styling: Tailwind utility classes directly in JSX; no CSS modules
- SOM-directive parsing: extend `lib/som-robots.ts` — do not duplicate parser logic in routes
- Do not add secrets to `public/` or commit `.env*` files
