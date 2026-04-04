import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SOM Readiness Checker — somready.com',
  description: 'Check whether your website has SOM Directives in its robots.txt. Get a detailed report, badge, and copy-ready snippet.',
}

export default function CheckLayout({ children }: { children: React.ReactNode }) {
  return children
}
