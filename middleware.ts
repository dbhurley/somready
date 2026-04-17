import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? ''

  // meet.somready.com → rewrite to /meet
  if (host.startsWith('meet.')) {
    const url = req.nextUrl.clone()
    // Only rewrite the root path; let _next/static and API routes pass through
    if (url.pathname === '/') {
      url.pathname = '/meet'
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg).*)'],
}
