import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: 'SOM Ready — Agent-ready publishing infrastructure',
  description: 'Make your website readable by every AI agent. Add two lines to robots.txt. Get instant SOM serving and full visibility into your AI agent traffic.',
  metadataBase: new URL('https://somready.com'),
  openGraph: {
    title: 'SOM Ready — Agent-ready publishing infrastructure',
    description: 'AI agents crawl your site daily and read raw HTML at 10-100x the token cost they need to. SOM Ready fixes that in 5 minutes.',
    url: 'https://somready.com',
    siteName: 'SOM Ready',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOM Ready',
    description: 'Make your website readable by every AI agent in 5 minutes.',
    creator: '@dbhurley',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
