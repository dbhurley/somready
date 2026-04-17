import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SOMready — Pitch Deck',
  description:
    'Make your website readable by every AI agent. The publishing infrastructure for the agentic web.',
  openGraph: {
    title: 'SOMready — Pitch Deck',
    description:
      'Make your website readable by every AI agent. Publishing infrastructure for the agentic web.',
    url: 'https://meet.somready.com',
    siteName: 'SOMready',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SOMready pitch deck',
      },
    ],
  },
}

export default function MeetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
