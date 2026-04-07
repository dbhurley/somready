import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Editorial display — for H1 and large section headlines only
const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

// Warm humanist sans — for all body, UI, labels
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: 'SOMready — Make your website readable by AI agents',
  description: 'Add five lines to robots.txt. AI agents read your site at 17× lower token cost. Full SOM serving, badge, and traffic visibility — free to start.',
  metadataBase: new URL('https://somready.com'),
  openGraph: {
    title: 'SOMready — Make your website readable by AI agents',
    description: 'Five lines in robots.txt. Instant SOM serving. Full visibility into your AI agent traffic. 17× average token reduction.',
    url: 'https://somready.com',
    siteName: 'SOMready',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SOMready — Make your website readable by AI agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOMready — Make your website readable by AI agents',
    description: 'Five lines in robots.txt. AI agents read your site at 17× lower token cost.',
    creator: '@dbhurley',
    site: '@somready',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
