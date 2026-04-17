import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SOM vs Markdown: Why Structured Data Wins for AI Agents — SOMready',
  description:
    'A deep technical comparison of SOM (Semantic Object Model) vs Markdown for AI agent web consumption. Benchmarks, token economics, accuracy data, and real-world failure cases.',
  alternates: { canonical: '/som-vs-markdown' },
  openGraph: {
    title: 'SOM vs Markdown — Why Structured Data Wins for AI Agents',
    description:
      'Deep research: benchmarks, token economics, accuracy data, and failure cases comparing SOM structured JSON to Markdown for AI agents.',
    url: 'https://somready.com/som-vs-markdown',
    siteName: 'SOMready',
    type: 'article',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SOM vs Markdown comparison' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
