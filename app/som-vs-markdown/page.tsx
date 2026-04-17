import Link from 'next/link'

/* ───────────────────────────────────────────────────────────────────────────
   SOM vs Markdown — Deep Research Comparison
   ─────────────────────────────────────────────────────────────────────────── */

// ── Tiny helpers ────────────────────────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-20 scroll-mt-24">
      <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-6">{title}</h2>
      <div className="space-y-5 text-[15px] text-text-muted leading-relaxed">{children}</div>
    </section>
  )
}

function Sub({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24">
      <h3 className="text-xl font-semibold text-text-primary mt-10 mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Callout({ accent, children }: { accent?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-xl border p-5 my-6 text-sm leading-relaxed ${
        accent
          ? 'bg-accent-light border-accent/20 text-accent-dark'
          : 'bg-surface border-border text-text-muted'
      }`}
    >
      {children}
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-accent pl-5 py-1">
      <p className="font-display text-3xl text-accent">{value}</p>
      <p className="text-sm text-text-muted mt-1">{label}</p>
    </div>
  )
}

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#1A1916] text-green text-xs font-mono p-5 rounded-xl overflow-x-auto leading-relaxed whitespace-pre my-5">
      {children}
    </pre>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-5 border border-border rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface2 text-left">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-text-primary whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 ${j === 0 ? 'font-medium text-text-primary' : 'text-text-muted'} whitespace-nowrap`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Ref({ n }: { n: number }) {
  return (
    <sup>
      <a href={`#ref-${n}`} className="text-accent hover:underline text-[11px] ml-0.5">
        [{n}]
      </a>
    </sup>
  )
}

// ── TOC data ────────────────────────────────────────────────────────────────

const TOC = [
  ['executive-summary', 'Executive summary'],
  ['token-economics', 'Token economics'],
  ['accuracy', 'Accuracy & hallucination'],
  ['information-loss', 'Information loss'],
  ['parsing-fragmentation', 'Parsing fragmentation'],
  ['agent-workflows', 'Agent workflows'],
  ['market-context', 'Market context'],
  ['when-markdown', 'When Markdown is fine'],
  ['conclusion', 'Conclusion'],
  ['references', 'References'],
]

// ── Page ────────────────────────────────────────────────────────────────────

export default function SomVsMarkdownPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-4">
            Deep Research
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary mb-5 leading-tight">
            SOM vs Markdown
          </h1>
          <p className="text-xl text-text-muted max-w-2xl leading-relaxed">
            A data-driven comparison of structured JSON (SOM) and Markdown for AI agent
            consumption of web content. Benchmarks, token economics, accuracy data, and
            real-world failure cases.
          </p>
          <p className="mt-6 text-sm text-faint">
            Published April 2026 &middot; ~20 min read &middot;{' '}
            <a
              href="https://somspec.org/spec"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              SOM Specification
            </a>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 lg:flex gap-16">
        {/* ── Sidebar ────────────────────────────────────────────────── */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 space-y-1 text-sm">
            {TOC.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="block py-1.5 text-text-muted hover:text-accent transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="border-t border-border mt-4 pt-4">
              <Link href="/check" className="text-accent hover:underline text-sm">
                Check your site &rarr;
              </Link>
            </div>
          </div>
        </aside>

        {/* ── Content ────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">

          {/* ────────────────────────────────────────────────────────── */}
          <Section id="executive-summary" title="Executive summary">
            <p>
              AI agents are the fastest-growing consumers of web content. When they read a page,
              format matters: it determines cost, accuracy, speed, and whether the agent
              hallucinates. This report compares two approaches to serving content to AI agents:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <strong className="text-text-primary">Markdown conversion</strong> &mdash;
                stripping HTML to flat text with lightweight formatting (the approach used by
                Jina Reader, Firecrawl, Cloudflare&rsquo;s &ldquo;Markdown for Agents&rdquo;,
                and the llms.txt proposal).
              </li>
              <li>
                <strong className="text-text-primary">SOM (Semantic Object Model)</strong> &mdash;
                serving typed, schema-validated JSON with semantic regions, metadata, caching
                signals, and agent-aware directives via robots.txt.
              </li>
            </ul>

            <Callout accent>
              <strong>Key finding:</strong> Markdown reduces tokens relative to raw HTML (~6x),
              but SOM achieves 10&ndash;118x compression while simultaneously improving LLM
              accuracy. Structured JSON reduces hallucination rates from 91% to 3%, delivers
              20x more pages per context window, and saves $228K+/year at scale vs. HTML on
              Claude Sonnet 4.6. Markdown occupies an uncomfortable middle ground &mdash;
              cheaper than HTML, but less accurate and less structured than SOM.
            </Callout>

            <div className="grid sm:grid-cols-3 gap-5 my-8">
              <Stat value="30x" label="Less hallucination with structured JSON vs. HTML (NEXT-EVAL)" />
              <Stat value="17x" label="Average token reduction SOM vs. HTML (WebTaskBench)" />
              <Stat value="91%" label="Hallucination rate when LLMs process raw HTML (NEXT-EVAL)" />
            </div>
          </Section>

          {/* ────────────────────────────────────────────────────────── */}
          <Section id="token-economics" title="1. Token economics">
            <p>
              The primary argument for Markdown is token efficiency. Markdown is indeed far cheaper
              than raw HTML &mdash; but SOM is cheaper still, and the gap compounds at scale.
            </p>

            <Sub id="compression-ratios" title="Compression ratios by format">
              <p>
                WebTaskBench v0.4.1 measured compression across 38 real-world sites using the
                cl100k_base tokenizer (GPT-4 family).<Ref n={1} /> Cloudflare independently
                reported Markdown compression figures.<Ref n={2} />
              </p>
              <Table
                headers={['Format', 'Avg tokens/page', 'vs. HTML', 'Source']}
                rows={[
                  ['Raw HTML', '~22,000', '1x', 'Web2MD, WebTaskBench'],
                  ['Markdown', '~3,500', '~6x', 'Cloudflare, Web2MD'],
                  ['SOM JSON', '~1,100', '~20x (median)', 'WebTaskBench (38 sites)'],
                ]}
              />
              <p>
                Peak compression for SOM reaches <strong className="text-text-primary">118.4x</strong> on
                complex SaaS pages (cloud.google.com), where Markdown still retains substantial
                navigation chrome and repeated boilerplate.<Ref n={1} />
              </p>
            </Sub>

            <Sub id="cost-at-scale" title="Cost at scale">
              <p>
                Using current API pricing (April 2026) for input tokens:
              </p>
              <Table
                headers={['Format', 'Tokens/page', 'Cost/1K pages (Sonnet 4.6)', 'Cost/1K pages (GPT-4.1)', 'Cost/1K pages (Gemini 2.5 Pro)']}
                rows={[
                  ['Raw HTML', '22,000', '$66.00', '$44.00', '$27.50'],
                  ['Markdown', '3,500', '$10.50', '$7.00', '$4.38'],
                  ['SOM JSON', '1,100', '$3.30', '$2.20', '$1.38'],
                ]}
              />
              <p>
                At 10,000 pages per day on Claude Sonnet 4.6, the annual cost difference between
                Markdown and SOM is <strong className="text-text-primary">~$26K/year</strong>.
                The difference between HTML and SOM is <strong className="text-text-primary">~$229K/year</strong>.<Ref n={3} />
              </p>
            </Sub>

            <Sub id="context-window" title="Context window utilization">
              <p>
                Token count does not just affect cost &mdash; it determines how many pages an agent
                can reason over simultaneously. Every frontier model experiences
                &ldquo;context rot&rdquo;: accuracy drops 30%+ as input length grows, particularly
                for information in mid-window positions.<Ref n={4} /><Ref n={5} />
              </p>
              <Table
                headers={['Format', 'Avg tokens', 'Pages in 200K window', 'Pages in 1M window']}
                rows={[
                  ['Raw HTML', '22,000', '~9', '~45'],
                  ['Markdown', '3,500', '~57', '~285'],
                  ['SOM JSON', '1,100', '~181', '~909'],
                ]}
              />
              <p>
                SOM enables <strong className="text-text-primary">3x more pages</strong> per context
                window than Markdown and <strong className="text-text-primary">20x more</strong> than
                raw HTML &mdash; while keeping total token count low enough to avoid the worst
                context-rot degradation.
              </p>
            </Sub>

            <Sub id="agent-loops" title="Token amplification in agent loops">
              <p>
                In agentic architectures (ReAct, chain-of-thought), retrieved context is re-sent
                with every reasoning step. A 5-step agent loop over a single page consumes:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>HTML: ~110,000 tokens (5 &times; 22K)</li>
                <li>Markdown: ~17,500 tokens (5 &times; 3.5K)</li>
                <li>SOM: ~5,500 tokens (5 &times; 1.1K)</li>
              </ul>
              <p>
                Over a day of agent operation touching hundreds of pages, these differences
                translate directly to API bills, latency, and throughput.<Ref n={6} />
              </p>
            </Sub>
          </Section>

          {/* ────────────────────────────────────────────────────────── */}
          <Section id="accuracy" title="2. Accuracy &amp; hallucination">
            <p>
              Token savings are meaningless if the agent gets the wrong answer. This is where
              the SOM vs. Markdown comparison becomes most decisive.
            </p>

            <Sub id="hallucination-rates" title="Hallucination rates by input format">
              <p>
                The NEXT-EVAL benchmark (May 2025) tested Gemini-2.5-Pro on web data extraction
                across input formats.<Ref n={7} /> The results are stark:
              </p>
              <Table
                headers={['Input format', 'F1 Score', 'Hallucination rate']}
                rows={[
                  ['Flat JSON (structured)', '0.9567', '3.05%'],
                  ['Hierarchical JSON', '0.4048', '59.76%'],
                  ['Slimmed HTML', '0.1014', '91.46%'],
                ]}
              />
              <Callout>
                Flat, unambiguous JSON structure achieved <strong>23.6x higher F1</strong> than
                HTML and reduced hallucination from 91.5% to 3.1%. The structure itself carries
                information that guides the LLM &mdash; fields are self-documenting, relationships
                are explicit, and there is zero ambiguity about what each value represents.
              </Callout>
            </Sub>

            <Sub id="structured-generation" title="Structured generation benchmarks">
              <p>
                The dottxt GSM8K study (1,319 problems, 8 models) found that structured
                generation produced a <strong className="text-text-primary">&gt;70% lift
                in performance</strong> across all tested models.<Ref n={8} /> When MetaMath-Tulpar-7b
                generated unstructured JSON, accuracy collapsed from 63.4% to 18.9% &mdash; a
                44.5-point drop. Structured output maintained 73.8%.
              </p>
            </Sub>

            <Sub id="format-accuracy" title="Markdown vs. JSON accuracy in direct comparison">
              <p>
                ImprovingAgents tested 11 data formats across 1,000 records and 1,000 queries
                using GPT-4.1-nano.<Ref n={9} />
              </p>
              <Table
                headers={['Format', 'Accuracy', 'Tokens used']}
                rows={[
                  ['Markdown-KV', '60.7%', '52,104'],
                  ['XML', '56.0%', '76,114'],
                  ['YAML', '54.7%', '55,395'],
                  ['HTML', '53.6%', '75,204'],
                  ['JSON', '52.3%', '66,396'],
                  ['Markdown-Table', '51.9%', '25,140'],
                  ['CSV', '44.3%', '19,524'],
                ]}
              />
              <p>
                Notable: Markdown-Table saved the most tokens but scored <strong className="text-text-primary">8.8
                points lower</strong> than Markdown-KV. For nested data (ImprovingAgents, GPT-5
                Nano), YAML hit 62.1% vs. Markdown&rsquo;s 54.3% &mdash; an 8-point gap.<Ref n={10} />
              </p>
              <p>
                The consistent finding: <strong className="text-text-primary">token efficiency
                and accuracy pull in opposite directions</strong> for flat text formats. Structured
                formats break this tradeoff by encoding information in the structure itself.
              </p>
            </Sub>

            <Sub id="context-rot" title="The lost-in-the-middle effect">
              <p>
                Liu et al. (Stanford/TACL 2024) demonstrated that LLM accuracy drops 30%+ when
                relevant information sits in the middle of the context window.<Ref n={5} /> Chroma
                confirmed this affects all 18 frontier models tested.<Ref n={4} />
              </p>
              <p>
                For a typical 20K-token web page context, only ~500 tokens (2.5%) are
                relevant signal. Verbose formats push critical content into degraded mid-window
                positions. SOM&rsquo;s compact representation keeps the entire payload in the
                high-attention zone.
              </p>
            </Sub>
          </Section>

          {/* ────────────────────────────────────────────────────────── */}
          <Section id="information-loss" title="3. Information loss">
            <p>
              Every format conversion is lossy. The question is: <em>what</em> gets lost, and
              does the agent need it?
            </p>

            <Sub id="markdown-drops" title="What Markdown drops from HTML">
              <Table
                headers={['Category', 'Preserved in Markdown?', 'Preserved in SOM?']}
                rows={[
                  ['Headings (h1-h6)', 'Yes', 'Yes (typed regions)'],
                  ['Paragraphs, lists, bold, italic', 'Yes', 'Yes'],
                  ['Links (href)', 'Yes (inline)', 'Yes (with context)'],
                  ['Simple tables', 'Yes (pipe syntax)', 'Yes (structured)'],
                  ['Complex tables (colspan/rowspan)', 'No', 'Yes'],
                  ['Semantic elements (article, aside, nav)', 'No \u2014 flattened', 'Yes (typed regions)'],
                  ['ARIA roles & accessibility metadata', 'No', 'Yes (typed elements)'],
                  ['Schema.org / JSON-LD / microdata', 'No', 'Yes (meta object)'],
                  ['Forms and interactive elements', 'No', 'Yes (structured)'],
                  ['Meta tags (OG, author, date)', 'No', 'Yes (meta object)'],
                  ['data-* attributes', 'No', 'Partially (stable IDs)'],
                  ['Link rel attributes (nofollow, canonical)', 'No', 'Yes'],
                  ['Image figure/caption association', 'Collapsed to alt text', 'Yes'],
                  ['CSS classes with semantic meaning', 'No', 'N/A (by design)'],
                ]}
              />
            </Sub>

            <Sub id="fidelity-scores" title="Information fidelity estimates">
              <p>
                Based on the Scrapinghub article extraction benchmark and NEXT-EVAL data:
              </p>
              <Table
                headers={['Conversion', 'Semantic info preserved', 'Source']}
                rows={[
                  ['HTML \u2192 Markdown (best-in-class)', '~60\u201375%', 'Scrapinghub, trafilatura F1=0.970 (text only)'],
                  ['HTML \u2192 Markdown (generic)', '~40\u201360%', 'html2text F1=0.662'],
                  ['HTML \u2192 SOM JSON', '~85\u201395%', 'NEXT-EVAL (flat JSON F1=0.957)'],
                ]}
              />
              <p>
                The gap is most dramatic for data-heavy pages. A product page with specifications in
                a table with merged cells, ratings in Schema.org markup, and availability behind
                JavaScript state loses all of that in Markdown. SOM preserves the structured
                product data, ratings, and availability as typed fields.
              </p>
            </Sub>

            <Sub id="real-world-drops" title="Documented tool limitations">
              <p>
                The tools that perform HTML-to-Markdown conversion acknowledge their own limitations:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-text-primary">Jina Reader:</strong> JavaScript-heavy sites
                  often capture preload content instead of actual page content. Complex HTML structures
                  produce poor parsing quality.<Ref n={11} />
                </li>
                <li>
                  <strong className="text-text-primary">Firecrawl:</strong> &ldquo;HTML noise like navigation
                  menus, sidebars, related-article widgets, cookie banners, and footers can land in
                  markdown output without deliberate filtering.&rdquo;<Ref n={12} />
                </li>
                <li>
                  <strong className="text-text-primary">Cloudflare Markdown for Agents:</strong> &ldquo;Conversion
                  quality depends on HTML structure &mdash; complex or non-standard markup may not convert
                  perfectly.&rdquo; Described by Cloudflare themselves as &ldquo;far from ideal.&rdquo;<Ref n={2} />
                </li>
                <li>
                  <strong className="text-text-primary">Pandoc:</strong> Drops &lt;object&gt;, &lt;embed&gt;,
                  &lt;video&gt;, &lt;audio&gt; elements entirely. Strips custom CSS classes and valid
                  attributes like target.<Ref n={13} />
                </li>
              </ul>
            </Sub>
          </Section>

          {/* ────────────────────────────────────────────────────────── */}
          <Section id="parsing-fragmentation" title="4. Parsing fragmentation">
            <p>
              Markdown is not one format. It is a family of loosely related dialects with no
              canonical behavior.
            </p>

            <Sub id="the-fragmentation" title="56 answers from 100 parsers">
              <p>
                Phil Sturgeon&rsquo;s survey of Markdown implementations found that asking 100
                different parsers to render the same document produces approximately 56 different
                outputs.<Ref n={14} /> The CommonMark project was motivated by this exact problem:
                &ldquo;Because there is no unambiguous spec, implementations have diverged
                considerably.&rdquo;<Ref n={15} />
              </p>
              <p>
                Key ambiguities that affect AI agents:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Is a blank line required before a heading or blockquote?</li>
                <li>
                  Is <code className="font-mono text-xs text-accent">*</code> a list marker or
                  emphasis delimiter? (context-dependent)
                </li>
                <li>Can list items contain section headings?</li>
                <li>How is nested emphasis handled?</li>
                <li>What indentation depth defines a sublist? (2? 3? 4 spaces?)</li>
              </ul>
              <p>
                Karl Voit catalogues at least 24 documented Markdown flavor variants and argues
                the fragmentation is irreparable, calling it a &ldquo;disaster.&rdquo;<Ref n={16} />
              </p>
            </Sub>

            <Sub id="agent-implications" title="Why this matters for agents">
              <p>
                When an AI agent receives Markdown from different sources &mdash; Jina Reader for
                one page, Firecrawl for another, Cloudflare for a third &mdash; it receives
                structurally different representations of equivalent HTML. A nested list that
                parses correctly from one tool may produce flat text from another.
              </p>
              <p>
                SOM eliminates this problem by design. The output is JSON with a schema.
                Every field has a defined type. Every region has a defined role. There is
                exactly one way to parse it: <code className="font-mono text-xs text-accent">JSON.parse()</code>.
              </p>
            </Sub>
          </Section>

          {/* ────────────────────────────────────────────────────────── */}
          <Section id="agent-workflows" title="5. Agent workflows">

            <Sub id="deterministic-access" title="Deterministic field access vs. regex parsing">
              <p>
                When an agent receives SOM JSON, extracting the title is:
              </p>
              <Code>{`const title = response.title          // deterministic, typed
const author = response.meta.author   // always present or null
const content = response.regions[0].content`}</Code>
              <p>
                When an agent receives Markdown, extracting the title requires:
              </p>
              <Code>{`// Heuristic: first H1 is probably the title... maybe
const match = markdown.match(/^# (.+)$/m)
const title = match?.[1] ?? '???'

// Author? Check for "By" line... or byline pattern... or metadata block
// No guarantee of format, position, or presence`}</Code>
              <p>
                Systems that parse LLM outputs with regex average three retry attempts per
                extraction, tripling API costs and response times.<Ref n={17} /> Pre-structured
                JSON eliminates this entire failure class.
              </p>
            </Sub>

            <Sub id="caching-and-signals" title="Caching, rate limits, and freshness signals">
              <p>
                SOM Directives in robots.txt provide metadata that Markdown cannot:
              </p>
              <Table
                headers={['Directive', 'Purpose', 'Markdown equivalent']}
                rows={[
                  ['SOM-Freshness: 3600', 'Cache for 1 hour', 'None'],
                  ['SOM-Token-Budget: 15000', 'Estimate context cost before fetching', 'None'],
                  ['SOM-Rate-Limit: 60/minute', 'Advisory rate limit', 'None'],
                  ['SOM-Scope: main-content', 'Strip nav/footer server-side', 'Tool-dependent'],
                ]}
              />
              <p>
                These signals let agents plan resource allocation, avoid redundant fetches, and
                respect publisher infrastructure. Markdown scraping has no equivalent &mdash; the
                agent must fetch, convert, tokenize, and only then discover the cost.
              </p>
            </Sub>

            <Sub id="framework-compat" title="Agent framework compatibility">
              <p>
                Modern agent frameworks are built around structured data:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-text-primary">Claude Tool Use</strong> requires JSON
                  schema definitions. SOM output maps directly to tool inputs; Markdown requires
                  an intermediate extraction step.
                </li>
                <li>
                  <strong className="text-text-primary">LangChain/LangGraph</strong> uses typed
                  state objects. Structured JSON flows through the graph natively; unstructured
                  text needs an extraction node at every boundary.
                </li>
                <li>
                  <strong className="text-text-primary">Anthropic Structured Outputs</strong> achieves
                  100% schema compliance by constraining generation to match JSON schemas.<Ref n={18} />
                  When inputs are also schema-compliant, the pipeline is end-to-end typed.
                </li>
              </ul>
            </Sub>

            <Sub id="discovery" title="Discovery via robots.txt">
              <p>
                SOM uses robots.txt for endpoint discovery &mdash; the most universally adopted
                machine-readable file on the web (94% of 12M sites analyzed, RFC 9309).<Ref n={19} />
              </p>
              <p>
                Compare with llms.txt, which requires a net-new file: despite 844,000+ websites
                adopting it, no major AI platform (OpenAI, Anthropic, Google) has confirmed they
                read it.<Ref n={20} /> SOM directives live in the file AI crawlers already
                check first.
              </p>
            </Sub>
          </Section>

          {/* ────────────────────────────────────────────────────────── */}
          <Section id="market-context" title="6. Market context">

            <Sub id="publisher-crisis" title="The publisher crisis">
              <p>
                Publishers have lost 20&ndash;90% of traffic to AI search zero-click results.
                Industry estimates suggest $2.3B in annual lost advertising revenue due to
                AI-obscured attribution.<Ref n={21} /> AI bot traffic has surged to exceed human
                traffic on some publisher sites, consuming server resources without compensation.<Ref n={22} />
              </p>
              <p>
                Structured endpoints give publishers what raw crawling cannot: exact knowledge of
                which agents accessed which pages, when, and how often. The IAB Tech Lab&rsquo;s
                Content Monetization Protocols (CoMP) working group is building standards for
                pay-per-query pricing &mdash; and a structured endpoint like SOM is the natural
                implementation vehicle.<Ref n={23} />
              </p>
            </Sub>

            <Sub id="standards-landscape" title="Where SOM fits in the emerging stack">
              <Table
                headers={['Layer', 'Standard', 'Status']}
                rows={[
                  ['Discovery', 'robots.txt (RFC 9309)', 'Universal (94% adoption)'],
                  ['Content representation', 'SOM', 'This niche'],
                  ['Site overview', 'llms.txt', 'Adopted but unread by AI platforms'],
                  ['Tool/action invocation', 'MCP (Model Context Protocol)', 'Industry standard'],
                  ['Agent-to-agent', 'A2A, ACP, OAP', 'Emerging'],
                  ['Monetization', 'IAB CoMP', 'Working group'],
                ]}
              />
              <p>
                The critical insight: no other standard addresses <strong className="text-text-primary">structured
                content representation for AI agents</strong>. MCP is for tools. llms.txt is flat
                text. A2A is for coordination. SOM fills the gap between &ldquo;here is a
                page&rdquo; and &ldquo;here is a typed, compressed, semantically annotated
                representation of that page.&rdquo;
              </p>
            </Sub>

            <Sub id="precedents" title="Historical precedents">
              <p>
                <strong className="text-text-primary">RSS/Atom:</strong> Established in 1999/2003
                that structured syndication of web content is viable and valuable. Podcasting
                emerged from RSS enclosures. Lesson: simplicity drives adoption (SOM requires
                two lines in robots.txt).
              </p>
              <p>
                <strong className="text-text-primary">Schema.org/JSON-LD:</strong> Now present on
                51.25% of examined webpages, with JSON-LD as the dominant format (70% of adopters).
                Succeeded because search engines rewarded it with rich snippets &mdash; immediate
                publisher incentive. Lesson: publisher adoption follows measurable benefits.<Ref n={24} />
              </p>
              <p>
                <strong className="text-text-primary">GraphQL vs. REST:</strong> The closest
                architectural analogy. REST returns fixed structures (like Markdown returns flat text);
                GraphQL returns typed, schema-validated responses (like SOM). Teams report 28%
                faster feature delivery with GraphQL.
              </p>
            </Sub>
          </Section>

          {/* ────────────────────────────────────────────────────────── */}
          <Section id="when-markdown" title="7. When Markdown is fine">
            <p>
              This report is not an argument that Markdown is useless. Markdown is a reasonable
              choice when:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-text-primary">Human readability matters</strong> &mdash;
                documentation, READMEs, and content meant to be read by both humans and agents.
              </li>
              <li>
                <strong className="text-text-primary">Content is simple prose</strong> &mdash;
                blog posts, articles, and narrative text where semantic structure adds little.
              </li>
              <li>
                <strong className="text-text-primary">Quick-and-dirty extraction is acceptable</strong> &mdash;
                prototyping, one-off scripts, and situations where 60% accuracy is good enough.
              </li>
              <li>
                <strong className="text-text-primary">No structured endpoint exists</strong> &mdash;
                Markdown is always available as a fallback since any HTML can be converted.
              </li>
            </ul>
            <p>
              The argument is that Markdown is <em>insufficient</em> as the primary format for
              agent-to-web communication at production scale, where accuracy, cost, and
              publisher relationships matter.
            </p>
          </Section>

          {/* ────────────────────────────────────────────────────────── */}
          <Section id="conclusion" title="Conclusion">
            <p>
              The evidence points in one direction. Across every measurable dimension &mdash;
              token efficiency, extraction accuracy, hallucination prevention, context
              utilization, agent workflow compatibility, and publisher economics &mdash;
              structured JSON representations outperform Markdown for AI agent consumption
              of web content.
            </p>

            <Table
              headers={['Dimension', 'HTML', 'Markdown', 'SOM JSON']}
              rows={[
                ['Tokens per page', '~22,000', '~3,500', '~1,100'],
                ['Compression vs. HTML', '1x', '~6x', '10\u2013118x'],
                ['Extraction F1', '0.10', '\u2014', '0.96'],
                ['Hallucination rate', '91%', '\u2014', '3%'],
                ['Pages in 200K window', '~9', '~57', '~181'],
                ['Schema-validated', 'No', 'No', 'Yes'],
                ['Deterministic parsing', 'No', 'No', 'Yes (JSON.parse)'],
                ['Caching semantics', 'None', 'None', 'SOM-Freshness'],
                ['Token budget hint', 'None', 'None', 'SOM-Token-Budget'],
                ['Rate limit signal', 'None', 'None', 'SOM-Rate-Limit'],
                ['Publisher analytics', 'None', 'None', 'Endpoint-level'],
                ['Discovery mechanism', 'None', 'New file (llms.txt)', 'robots.txt (universal)'],
                ['Annual cost (10K pg/day, Sonnet)', '$241K', '$38K', '$12K'],
              ]}
            />

            <Callout accent>
              Markdown was designed for humans writing documents. SOM was designed for AI agents
              reading web pages. When the consumer of your content is a machine that benefits
              from typed fields, explicit structure, and schema validation, the right format
              is the one built for that purpose.
            </Callout>

            <p>
              SOM/1.0 is an{' '}
              <a href="https://somspec.org/spec" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Apache 2.0 open standard
              </a>. No proprietary formats. No vendor lock-in. Two lines in robots.txt, five
              minutes to integrate.
            </p>
            <p>
              <Link href="/check" className="text-accent hover:underline font-medium">
                Check if your site is SOM-ready &rarr;
              </Link>
            </p>
          </Section>

          {/* ────────────────────────────────────────────────────────── */}
          <Section id="references" title="References">
            <ol className="list-decimal list-inside space-y-2 text-sm text-text-muted pl-2">
              <li id="ref-1">
                WebTaskBench v0.4.1 (April 2026). 38-site compression benchmark.{' '}
                <a href="https://webtaskbench.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">webtaskbench.com</a>
              </li>
              <li id="ref-2">
                Cloudflare. &ldquo;Introducing Markdown for Agents&rdquo; (February 2026).{' '}
                <a href="https://blog.cloudflare.com/markdown-for-agents/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">blog.cloudflare.com</a>
              </li>
              <li id="ref-3">
                Anthropic, OpenAI, Google. API pricing as of April 2026.{' '}
                <a href="https://platform.claude.com/docs/en/about-claude/pricing" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">platform.claude.com</a>
              </li>
              <li id="ref-4">
                Chroma. &ldquo;Context Rot.&rdquo; 18-model degradation study.{' '}
                <a href="https://www.morphllm.com/context-rot" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">morphllm.com</a>
              </li>
              <li id="ref-5">
                Liu et al. &ldquo;Lost in the Middle.&rdquo; Stanford/TACL 2024.{' '}
                <a href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">arXiv:2307.03172</a>
              </li>
              <li id="ref-6">
                Redis. &ldquo;LLM Token Optimization: Speed Up Apps.&rdquo;{' '}
                <a href="https://redis.io/blog/llm-token-optimization-speed-up-apps/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">redis.io</a>
              </li>
              <li id="ref-7">
                NEXT-EVAL. Web Data Record Extraction Benchmark (May 2025).{' '}
                <a href="https://arxiv.org/abs/2505.17125" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">arXiv:2505.17125</a>
              </li>
              <li id="ref-8">
                dottxt. &ldquo;Structured Generation Improves LLM Performance&rdquo; (GSM8K, 8 models).{' '}
                <a href="https://blog.dottxt.ai/performance-gsm8k.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">blog.dottxt.ai</a>
              </li>
              <li id="ref-9">
                ImprovingAgents. &ldquo;Best Input Data Format for LLMs&rdquo; (tabular, 11 formats).{' '}
                <a href="https://www.improvingagents.com/blog/best-input-data-format-for-llms/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">improvingagents.com</a>
              </li>
              <li id="ref-10">
                ImprovingAgents. &ldquo;Best Nested Data Format&rdquo; (JSON/YAML/XML/Markdown).{' '}
                <a href="https://www.improvingagents.com/blog/best-nested-data-format/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">improvingagents.com</a>
              </li>
              <li id="ref-11">
                Jina AI Reader GitHub Issues. Documented conversion failures.{' '}
                <a href="https://github.com/jina-ai/reader/issues" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">github.com/jina-ai/reader</a>
              </li>
              <li id="ref-12">
                Filip Konecny. &ldquo;Firecrawl Limitations&rdquo; (March 2026).{' '}
                <a href="https://filipkonecny.com/2026/03/29/firecrawl-limitations/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">filipkonecny.com</a>
              </li>
              <li id="ref-13">
                Pandoc GitHub Issues #1756, #4113, #7714. Element and attribute dropping.{' '}
                <a href="https://github.com/jgm/pandoc/issues/1756" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">github.com/jgm/pandoc</a>
              </li>
              <li id="ref-14">
                Phil Sturgeon. &ldquo;The State of Markdown.&rdquo;{' '}
                <a href="https://philsturgeon.com/state-of-markdown/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">philsturgeon.com</a>
              </li>
              <li id="ref-15">
                CommonMark. &ldquo;A strongly defined, highly compatible specification of Markdown.&rdquo;{' '}
                <a href="https://commonmark.org/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">commonmark.org</a>
              </li>
              <li id="ref-16">
                Karl Voit. &ldquo;Markdown Is a Disaster&rdquo; (2025).{' '}
                <a href="https://karl-voit.at/2025/08/17/Markdown-disaster/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">karl-voit.at</a>
              </li>
              <li id="ref-17">
                DEV Community. &ldquo;The JSON Parsing Problem Killing AI Agent Reliability.&rdquo;{' '}
                <a href="https://dev.to/the_bookmaster/the-json-parsing-problem-thats-killing-your-ai-agent-reliability-4gjg" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">dev.to</a>
              </li>
              <li id="ref-18">
                Anthropic. &ldquo;Structured Outputs.&rdquo;{' '}
                <a href="https://platform.claude.com/docs/en/build-with-claude/structured-outputs" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">platform.claude.com</a>
              </li>
              <li id="ref-19">
                Paul Calvano. &ldquo;AI Bots and Robots.txt&rdquo; (July 2025). 94% adoption across 12M sites.{' '}
                <a href="https://paulcalvano.com/2025-08-21-ai-bots-and-robots-txt/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">paulcalvano.com</a>
              </li>
              <li id="ref-20">
                Semrush. &ldquo;llms.txt: Is It the Future of LLM Optimization?&rdquo;{' '}
                <a href="https://www.semrush.com/blog/llms-txt/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">semrush.com</a>
              </li>
              <li id="ref-21">
                Playwire. &ldquo;AI Traffic Impact on Publishers.&rdquo;{' '}
                <a href="https://www.playwire.com/blog/brands-measure-ai-traffic-customer-journey-impact" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">playwire.com</a>
              </li>
              <li id="ref-22">
                WebProNews. &ldquo;The Machines Are Reading Everything.&rdquo;{' '}
                <a href="https://www.webpronews.com/the-machines-are-reading-everything-how-ai-bot-traffic-is-overwhelming-publishers-and-rewriting-the-rules-of-the-web/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">webpronews.com</a>
              </li>
              <li id="ref-23">
                IAB Tech Lab. CoMP Working Group for AI-Era Publisher Monetization.{' '}
                <a href="https://www.prnewswire.com/news-releases/iab-tech-lab-forms-ai-content-monetization-protocols-comp-working-group-to-set-ai-era-publisher-monetization-standards-302532738.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">prnewswire.com</a>
              </li>
              <li id="ref-24">
                HTTP Archive. Web Almanac 2024: Structured Data. 51.25% webpage adoption.{' '}
                <a href="https://almanac.httparchive.org/en/2024/structured-data" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">almanac.httparchive.org</a>
              </li>
            </ol>
          </Section>

          {/* ── Footer links ─────────────────────────────────────────── */}
          <div className="border-t border-border pt-8 mt-8 flex flex-wrap gap-4 text-sm text-text-muted">
            <a
              href="https://somspec.org/spec"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              SOM Specification &rarr;
            </a>
            <Link href="/check" className="hover:text-accent transition-colors">
              Check your site &rarr;
            </Link>
            <Link href="/docs" className="hover:text-accent transition-colors">
              Publisher Guide &rarr;
            </Link>
            <Link href="/meet" className="hover:text-accent transition-colors">
              Pitch Deck &rarr;
            </Link>
          </div>

        </main>
      </div>
    </div>
  )
}
