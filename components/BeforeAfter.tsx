const data = [
  { site: 'cloud.google.com', html: 759234, som: 6436, compression: '118' },
  { site: 'nytimes.com', html: 182000, som: 4200, compression: '43' },
  { site: 'docs.vercel.com', html: 51000, som: 1800, compression: '28' },
  { site: 'shopify.com', html: 94000, som: 2100, compression: '45' },
];

function formatNumber(n: number): string {
  return n.toLocaleString();
}

export default function BeforeAfter() {
  const maxHtml = Math.max(...data.map((d) => d.html));

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-text-primary">Why it matters</h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            Publishers are paying for AI agents to read their content inefficiently. Here&apos;s what the same pages look like with SOM.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 border-b border-border text-xs font-semibold text-text-muted uppercase tracking-wider">
            <span>Website</span>
            <span className="text-right w-24">HTML Tokens</span>
            <span className="text-right w-24">SOM Tokens</span>
            <span className="text-right w-20">Compression</span>
          </div>

          {data.map((row) => (
            <div key={row.site} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-4 border-b border-border last:border-b-0 items-center">
              <div>
                <span className="text-sm font-medium text-text-primary">{row.site}</span>
                <div className="mt-2 flex gap-1 items-center">
                  <div
                    className="h-2 rounded-full bg-red-400"
                    style={{ width: `${(row.html / maxHtml) * 100}%`, minWidth: '4px' }}
                  />
                </div>
                <div className="mt-1 flex gap-1 items-center">
                  <div
                    className="h-2 rounded-full bg-green"
                    style={{ width: `${(row.som / maxHtml) * 100}%`, minWidth: '4px' }}
                  />
                </div>
              </div>
              <span className="text-sm text-text-muted text-right w-24 font-mono">{formatNumber(row.html)}</span>
              <span className="text-sm text-green text-right w-24 font-mono font-semibold">{formatNumber(row.som)}</span>
              <span className="text-sm text-accent text-right w-20 font-mono font-bold">{row.compression}&times;</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-text-faint text-center">
          Data from{' '}
          <a href="https://webtaskbench.com" target="_blank" rel="noopener noreferrer" className="underline">
            webtaskbench.com
          </a>{' '}
          &middot; Measured using tiktoken cl100k_base &middot; April 2026
        </p>

        <div className="mt-12 text-center">
          <span className="font-display text-6xl md:text-7xl text-accent">17&times;</span>
          <p className="mt-2 text-lg text-text-muted">average token reduction across 44 measured sites</p>
        </div>
      </div>
    </section>
  );
}
