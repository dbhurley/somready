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

export default function CheckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
