import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, domain } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }
  // Log to console — visible in Vercel function logs
  console.log(`[WAITLIST] ${new Date().toISOString()} | email=${email} | domain=${domain || 'not provided'}`)
  return NextResponse.json({ ok: true })
}
