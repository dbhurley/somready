import { NextRequest, NextResponse } from 'next/server'
import { checkDomain } from '@/lib/som-robots'

export async function GET(req: NextRequest) {
  // Accept both ?d= and ?domain= for compatibility (prefer ?d= if both provided)
  const domain = req.nextUrl.searchParams.get('d') || req.nextUrl.searchParams.get('domain') || ''

  const result = await checkDomain(domain)

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
