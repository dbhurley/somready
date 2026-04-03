'use client';

import { useState } from 'react';

export default function SnippetGenerator() {
  const [domain, setDomain] = useState('');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState<'snippet' | 'cname' | null>(null);

  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/+$/, '');

  const snippet = `# Semantic Object Model — somready.com
SOM-Endpoint: https://api.somready.com/v1/som
SOM-Format: SOM/1.0
SOM-Scope: main-content
SOM-Freshness: 3600
SOM-Token-Budget: 15000`;

  const cname = `agents.${cleanDomain || 'yourdomain.com'}  CNAME  api.somready.com`;

  const handleGenerate = () => {
    if (cleanDomain) setGenerated(true);
  };

  const copyToClipboard = async (text: string, type: 'snippet' | 'cname') => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white border border-border shadow-md rounded-2xl p-6 max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-green pulse-dot" />
        <span className="text-sm font-semibold text-text-primary">Get your robots.txt snippet</span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => { setDomain(e.target.value); setGenerated(false); }}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="yourdomain.com"
          className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
        <button
          onClick={handleGenerate}
          className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
        >
          Generate &rarr;
        </button>
      </div>

      {generated && (
        <div className="mt-5 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-text-muted">Add this to your robots.txt</span>
              <button
                onClick={() => copyToClipboard(snippet, 'snippet')}
                className="text-xs text-accent hover:text-accent-dark font-medium transition-colors"
              >
                {copied === 'snippet' ? 'Copied \u2713' : 'Copy'}
              </button>
            </div>
            <pre className="bg-[#0F172A] text-[#E2E8F0] rounded-lg p-4 text-sm font-mono overflow-x-auto">
              {snippet}
            </pre>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-text-muted">Also add this CNAME to your DNS:</span>
              <button
                onClick={() => copyToClipboard(cname, 'cname')}
                className="text-xs text-accent hover:text-accent-dark font-medium transition-colors"
              >
                {copied === 'cname' ? 'Copied \u2713' : 'Copy'}
              </button>
            </div>
            <pre className="bg-[#0F172A] text-[#E2E8F0] rounded-lg p-4 text-sm font-mono overflow-x-auto">
              {cname}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
