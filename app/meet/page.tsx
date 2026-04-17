'use client'

import { useEffect, useRef, useState } from 'react'

/* ───────────────────────────────────────────────────────────────────────────
   SOMready — Magazine-Styled Pitch Deck
   A scroll-driven, full-viewport presentation.
   ─────────────────────────────────────────────────────────────────────────── */

// ── Slide data ──────────────────────────────────────────────────────────────

const METRIC_ITEMS = [
  { value: '17x', label: 'Average token reduction' },
  { value: '5 min', label: 'Time to integrate' },
  { value: '$0', label: 'To start' },
]

const PROBLEM_POINTS = [
  {
    stat: '10-100x',
    text: 'AI agents overpay in tokens reading raw HTML — bloated markup, nav chrome, ad scripts, cookie banners.',
  },
  {
    stat: '0%',
    text: 'Publishers have zero visibility into which agents visit, what they read, or whether content is cited.',
  },
  {
    stat: '???',
    text: 'No attribution. When an agent summarizes your article, you never know. Revenue attribution is impossible.',
  },
]

const HOW_STEPS = [
  {
    num: '01',
    title: 'Point a CNAME',
    body: 'agents.yourdomain.com \u2192 api.somready.com',
    detail: 'One DNS record. 30 seconds.',
  },
  {
    num: '02',
    title: 'Drop two lines in robots.txt',
    body: 'SOM-Endpoint + SOM-Format',
    detail: 'Agents auto-discover your structured endpoint.',
  },
  {
    num: '03',
    title: 'See everything',
    body: 'Dashboard lights up instantly',
    detail: 'Agent traffic, page reads, citation tracking.',
  },
]

const FEATURES = [
  { icon: '\u26A1', title: 'SOM Serving', desc: 'Instant structured JSON for any URL. Clean, typed, agent-optimized.' },
  { icon: '\uD83D\uDCC8', title: 'Agent Analytics', desc: 'See which agents visit, what pages, how often.' },
  { icon: '\uD83D\uDD17', title: 'Attribution', desc: 'Know when your content is cited by AI systems.' },
  { icon: '\uD83D\uDCCB', title: 'robots.txt Gen', desc: 'Custom snippet, ready to paste. Tuned for your content.' },
  { icon: '\uD83D\uDCBE', title: 'Smart Caching', desc: 'Content-aware freshness: news, docs, marketing.' },
  { icon: '\uD83C\uDF10', title: 'Open Standard', desc: 'SOM/1.0 \u2014 Apache 2.0. No lock-in.' },
]

const TIERS = [
  { name: 'Free', price: '$0', requests: '100/mo', domains: '1' },
  { name: 'Starter', price: '$29', requests: '5K/mo', domains: '3' },
  { name: 'Growth', price: '$99', requests: '50K/mo', domains: '10', highlighted: true },
  { name: 'Pro', price: '$299', requests: 'Unlimited', domains: 'Unlimited' },
]

// ── Intersection Observer hook ──────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, visible }
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ── Slide wrapper ───────────────────────────────────────────────────────────

function Slide({
  children,
  className = '',
  id,
  dark,
}: {
  children: React.ReactNode
  className?: string
  id?: string
  dark?: boolean
}) {
  return (
    <section
      id={id}
      className={`
        relative min-h-screen flex items-center justify-center
        px-6 sm:px-10 lg:px-20 py-20 overflow-hidden
        ${dark ? 'bg-[#1A1916] text-white' : 'bg-[#FAFAF8] text-[#1A1916]'}
        ${className}
      `}
    >
      {children}
    </section>
  )
}

// ── Brand mark ──────────────────────────────────────────────────────────────

function Logo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      width={size}
      height={size}
      className={className}
    >
      <rect width="32" height="32" rx="7" fill="#0891B2" />
      <path
        d="M9 16.5L13.5 21L23 11"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="6.5" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
    </svg>
  )
}

// ── Page progress bar ───────────────────────────────────────────────────────

function ProgressBar() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50">
      <div
        className="h-full bg-[#0891B2] transition-[width] duration-100 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ── Keyboard navigation ─────────────────────────────────────────────────────

function useKeyNav(slideIds: string[]) {
  const idx = useRef(0)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        idx.current = Math.min(idx.current + 1, slideIds.length - 1)
        document.getElementById(slideIds[idx.current])?.scrollIntoView({ behavior: 'smooth' })
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        idx.current = Math.max(idx.current - 1, 0)
        document.getElementById(slideIds[idx.current])?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [slideIds])
}

// ── Slide components ────────────────────────────────────────────────────────

function CoverSlide() {
  return (
    <Slide id="cover" className="!py-0">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage:
          'linear-gradient(#0891B2 1px, transparent 1px), linear-gradient(90deg, #0891B2 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Accent corner marks */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#0891B2] opacity-30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#0891B2] opacity-30" />

      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-8">
            <Logo size={48} />
            <span className="font-display text-3xl tracking-tight">somready</span>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#0891B2] mb-6">
            Agent-Ready Publishing Infrastructure
          </p>
        </Reveal>

        <Reveal delay={300}>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-8">
            Make your website
            <br />
            <span className="text-[#0891B2]">readable by every</span>
            <br />
            AI agent.
          </h1>
        </Reveal>

        <Reveal delay={500}>
          <p className="text-lg sm:text-xl text-[#6B6760] max-w-2xl mx-auto leading-relaxed">
            Two lines in robots.txt. Instant structured serving.
            Full visibility into your agent traffic.
          </p>
        </Reveal>

        <Reveal delay={650}>
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-[#9E9B95]">
            <span className="inline-block w-5 h-[1px] bg-[#9E9B95]" />
            Scroll or press
            <kbd className="inline-flex items-center px-2 py-0.5 rounded border border-[#E5E3DD] text-xs font-mono bg-white text-[#6B6760]">&darr;</kbd>
            to navigate
            <span className="inline-block w-5 h-[1px] bg-[#9E9B95]" />
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}

function MetricsSlide() {
  return (
    <Slide id="metrics" dark>
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#0891B2] mb-4">By the numbers</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {METRIC_ITEMS.map((m, i) => (
            <Reveal key={m.label} delay={i * 150}>
              <div className="border-t border-white/10 pt-8">
                <p className="font-display text-6xl sm:text-7xl md:text-8xl text-[#0891B2] mb-3">
                  {m.value}
                </p>
                <p className="text-lg text-white/60">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function ProblemSlide() {
  return (
    <Slide id="problem">
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#0891B2] mb-4">The Problem</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-16 max-w-3xl">
            The web wasn&rsquo;t built for
            <br />
            <span className="text-[#0891B2]">AI agents.</span>
          </h2>
        </Reveal>

        <div className="space-y-12">
          {PROBLEM_POINTS.map((p, i) => (
            <Reveal key={i} delay={i * 150}>
              <div className="flex items-start gap-6 md:gap-10">
                <span className="font-display text-4xl sm:text-5xl text-[#0891B2] flex-shrink-0 w-28 text-right opacity-60">
                  {p.stat}
                </span>
                <div className="border-l-2 border-[#E5E3DD] pl-6 md:pl-10">
                  <p className="text-lg sm:text-xl text-[#6B6760] leading-relaxed max-w-xl">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function BeforeAfterSlide() {
  return (
    <Slide id="before-after" dark>
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#0891B2] mb-4">Before &amp; After</p>
          <h2 className="font-display text-4xl sm:text-5xl mb-16">
            Raw HTML vs. <span className="text-[#0891B2]">SOM</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          <Reveal delay={100}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Before &mdash; Raw HTML</p>
              <pre className="text-sm font-mono text-white/50 leading-relaxed overflow-x-auto whitespace-pre">{`<html>
  <head>
    <meta charset="utf-8">
    <title>Why AI Agents Need...</title>
    <link rel="stylesheet" href="/css/...">
    <script src="/js/analytics.js">...
    <!-- 847 lines of markup -->
  </head>
  <body>
    <nav>...(68 links)...</nav>
    <div class="ad-banner">...</div>
    <main>
      <article>
        <!-- actual content buried here -->
      </article>
    </main>
    <footer>...(200 lines)...</footer>
  </body>
</html>`}
              </pre>
              <div className="mt-6 flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-red-400/80" />
                <span className="text-sm text-white/40">~52,000 tokens</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="rounded-2xl border border-[#0891B2]/30 bg-[#0891B2]/5 p-6 sm:p-8">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0891B2] mb-4">After &mdash; SOM Endpoint</p>
              <pre className="text-sm font-mono text-[#0891B2]/80 leading-relaxed overflow-x-auto whitespace-pre">{`{
  "title": "Why AI Agents Need
            Structured Data",
  "author": "Jane Smith",
  "published": "2025-03-15",
  "summary": "A deep dive into...",
  "sections": [
    {
      "heading": "The Token Problem",
      "content": "When agents read..."
    },
    {
      "heading": "Enter SOM",
      "content": "The Semantic Object..."
    }
  ],
  "metadata": { ... }
}`}
              </pre>
              <div className="mt-6 flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-[#059669]" />
                <span className="text-sm text-[#0891B2]">~3,000 tokens</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Slide>
  )
}

function HowSlide() {
  return (
    <Slide id="how">
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#0891B2] mb-4">How It Works</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-16">
            Three steps. <span className="text-[#0891B2]">Five minutes.</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {HOW_STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 150}>
              <div className="relative">
                <span className="block font-display text-7xl text-[#0891B2] opacity-20 mb-2">{s.num}</span>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="font-mono text-sm text-[#0891B2] mb-3">{s.body}</p>
                <p className="text-sm text-[#6B6760] leading-relaxed">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function SnippetSlide() {
  return (
    <Slide id="snippet" dark>
      <div className="max-w-3xl mx-auto w-full text-center">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#0891B2] mb-4">The Entire Integration</p>
          <h2 className="font-display text-4xl sm:text-5xl mb-12">
            This is <span className="text-[#0891B2]">all</span> you add.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10 text-left">
            <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-6">robots.txt</p>
            <pre className="text-base sm:text-lg font-mono leading-loose whitespace-pre">
              <span className="text-white/30"># Semantic Object Model</span>
              {'\n'}
              <span className="text-[#0891B2]">SOM-Endpoint</span>
              <span className="text-white/60">: https://agents.yoursite.com/v1/som</span>
              {'\n'}
              <span className="text-[#0891B2]">SOM-Format</span>
              <span className="text-white/60">: SOM/1.0</span>
            </pre>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="mt-10 text-lg text-white/50">
            No SDK. No code deploy. No build step.
            <br />
            Just DNS + two lines of text.
          </p>
        </Reveal>
      </div>
    </Slide>
  )
}

function FeaturesSlide() {
  return (
    <Slide id="features">
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#0891B2] mb-4">Platform</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-16">
            Everything publishers need.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div className="border border-[#E5E3DD] rounded-2xl p-6 hover:border-[#0891B2]/40 transition-colors">
                <span className="text-2xl block mb-3">{f.icon}</span>
                <h3 className="text-base font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-[#6B6760] leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function MarketSlide() {
  return (
    <Slide id="market" dark>
      <div className="max-w-4xl mx-auto w-full text-center">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#0891B2] mb-4">Market</p>
        </Reveal>

        <Reveal delay={150}>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl mb-8">
            Every website becomes an
            <br />
            <span className="text-[#0891B2]">API for agents.</span>
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-16">
            As AI agents become the primary consumers of web content,
            publishers need infrastructure to serve, meter, and monetize that traffic.
            SOMready is that infrastructure.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="grid sm:grid-cols-3 gap-8 text-left">
            {[
              { value: '500M+', label: 'AI agent requests to publisher sites daily (est.)' },
              { value: '$4.7B', label: 'Wasted compute from parsing raw HTML (annualized est.)' },
              { value: '0', label: 'Publisher tools for agent traffic visibility' },
            ].map((m, i) => (
              <div key={i} className="border-t border-white/10 pt-6">
                <p className="font-display text-3xl sm:text-4xl text-[#0891B2] mb-2">{m.value}</p>
                <p className="text-sm text-white/40 leading-relaxed">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}

function PricingSlide() {
  return (
    <Slide id="pricing">
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#0891B2] mb-4">Pricing</p>
          <h2 className="font-display text-4xl sm:text-5xl mb-16">
            Simple. <span className="text-[#0891B2]">Transparent.</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div
                className={`
                  rounded-2xl p-6 border transition-colors
                  ${t.highlighted
                    ? 'border-[#0891B2] bg-[#0891B2]/[0.04] ring-1 ring-[#0891B2]/20'
                    : 'border-[#E5E3DD] hover:border-[#0891B2]/40'}
                `}
              >
                {t.highlighted && (
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#0891B2] bg-[#ECFEFF] px-2 py-0.5 rounded-full mb-3">
                    Most popular
                  </span>
                )}
                <p className="text-sm font-medium text-[#6B6760] mb-1">{t.name}</p>
                <p className="font-display text-4xl mb-4">{t.price}<span className="text-lg text-[#9E9B95]">/mo</span></p>
                <div className="space-y-2 text-sm text-[#6B6760]">
                  <p>{t.requests} requests</p>
                  <p>{t.domains} domain{t.domains !== '1' ? 's' : ''}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function OpenStandardSlide() {
  return (
    <Slide id="standard" dark>
      <div className="max-w-4xl mx-auto w-full text-center">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#0891B2] mb-4">Foundation</p>
        </Reveal>

        <Reveal delay={150}>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl mb-8">
            Built on an
            <br />
            <span className="text-[#0891B2]">open standard.</span>
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-12">
            SOM/1.0 is an Apache 2.0 licensed specification.
            No proprietary formats. No vendor lock-in.
            The protocol belongs to the community.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="inline-flex items-center gap-6 border border-white/10 rounded-2xl px-8 py-5 bg-white/5">
            <div className="text-left">
              <p className="font-mono text-sm text-[#0891B2]">somspec.org</p>
              <p className="text-xs text-white/30 mt-0.5">Full specification, compliance matrix, publisher leaderboard</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}

function TeamSlide() {
  return (
    <Slide id="team">
      <div className="max-w-4xl mx-auto w-full text-center">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#0891B2] mb-4">Team</p>
        </Reveal>

        <Reveal delay={150}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-8">
            Built by people who
            <br />
            <span className="text-[#0891B2]">ship infrastructure.</span>
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-lg text-[#6B6760] max-w-2xl mx-auto leading-relaxed mb-12">
            We&rsquo;ve built developer tools, open-source platforms, and publishing
            infrastructure used by millions. SOMready is the next layer of the web.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="inline-flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#0891B2]/10 flex items-center justify-center">
              <span className="font-display text-xl text-[#0891B2]">DB</span>
            </div>
            <div className="text-left">
              <p className="font-semibold">DB Hurley</p>
              <p className="text-sm text-[#6B6760]">Founder</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}

function ClosingSlide() {
  return (
    <Slide id="closing" dark className="!py-0">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage:
          'linear-gradient(#0891B2 1px, transparent 1px), linear-gradient(90deg, #0891B2 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#0891B2] opacity-20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#0891B2] opacity-20" />

      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          <Logo size={56} className="mx-auto mb-8" />
        </Reveal>

        <Reveal delay={150}>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl mb-6">
            Let&rsquo;s make the web
            <br />
            <span className="text-[#0891B2]">agent-ready.</span>
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-12">
            Join the private beta. Start serving structured content
            to AI agents in under five minutes.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://somready.com"
              className="inline-flex items-center gap-2 bg-[#0891B2] hover:bg-[#0E7490] text-white font-medium px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              Get started free
              <span className="text-lg">&rarr;</span>
            </a>
            <a
              href="mailto:hello@somready.com"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-medium px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              Contact us
            </a>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-white/30">
            <span>somready.com</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>somspec.org</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>@dbhurley</span>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}

// ── Main deck ───────────────────────────────────────────────────────────────

const SLIDE_IDS = [
  'cover', 'metrics', 'problem', 'before-after', 'how', 'snippet',
  'features', 'market', 'pricing', 'standard', 'team', 'closing',
]

export default function MeetPage() {
  useKeyNav(SLIDE_IDS)

  return (
    <main className="scroll-smooth" style={{ scrollSnapType: 'y mandatory' }}>
      <ProgressBar />

      {/* Slide navigation dots */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
        {SLIDE_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center justify-end gap-2"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[10px] font-mono uppercase tracking-wider text-[#6B6760] transition-opacity">
              {id}
            </span>
            <span className="block w-2 h-2 rounded-full bg-[#C8C5BC] hover:bg-[#0891B2] transition-colors" />
          </a>
        ))}
      </nav>

      <div style={{ scrollSnapType: 'y mandatory' }}>
        <div style={{ scrollSnapAlign: 'start' }}><CoverSlide /></div>
        <div style={{ scrollSnapAlign: 'start' }}><MetricsSlide /></div>
        <div style={{ scrollSnapAlign: 'start' }}><ProblemSlide /></div>
        <div style={{ scrollSnapAlign: 'start' }}><BeforeAfterSlide /></div>
        <div style={{ scrollSnapAlign: 'start' }}><HowSlide /></div>
        <div style={{ scrollSnapAlign: 'start' }}><SnippetSlide /></div>
        <div style={{ scrollSnapAlign: 'start' }}><FeaturesSlide /></div>
        <div style={{ scrollSnapAlign: 'start' }}><MarketSlide /></div>
        <div style={{ scrollSnapAlign: 'start' }}><PricingSlide /></div>
        <div style={{ scrollSnapAlign: 'start' }}><OpenStandardSlide /></div>
        <div style={{ scrollSnapAlign: 'start' }}><TeamSlide /></div>
        <div style={{ scrollSnapAlign: 'start' }}><ClosingSlide /></div>
      </div>
    </main>
  )
}
