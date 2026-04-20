import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Check your site — SOMready',
  description: 'See if your website is readable by AI agents. Check your robots.txt for SOM Directives and get a shareable readiness badge.',
  openGraph: {
    title: 'Check your site — SOMready',
    description: 'See if your website is readable by AI agents. Check your robots.txt for SOM Directives.',
    url: 'https://somready.com/check',
    siteName: 'SOMready',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SOMready site checker' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is your site readable by AI agents?',
    description: 'Check your robots.txt SOM Directives in seconds.',
    images: ['/opengraph-image'],
  },
}

// JSON-LD structured data for AI agents to understand the badge API
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SOMready Badge Generator',
  url: 'https://somready.com/check',
  description: 'Check SOM compliance and generate embeddable badges for any domain',
  provider: {
    '@type': 'Organization',
    name: 'SOMready',
    url: 'https://somready.com',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Check any domain for SOM compliance via /api/check?d={domain} (or ?domain={domain})',
    'Generate SVG badges via /badge/{domain}.svg',
    'Link to full compliance report via /check?d={domain} (or ?domain={domain})',
  ],
}

export default function CheckLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
