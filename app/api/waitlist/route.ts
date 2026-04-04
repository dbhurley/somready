import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY  = process.env.RESEND_API_KEY
const NOTIFY_EMAIL    = 'dbhurley@me.com'
const FROM_ADDRESS    = 'SOMready <waitlist@somready.com>'

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.warn('[WAITLIST] RESEND_API_KEY not set — email skipped')
    return
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM_ADDRESS, to, subject, html }),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error(`[WAITLIST] Resend error: ${err}`)
  }
}

export async function POST(req: NextRequest) {
  const { email, domain } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const ts = new Date().toISOString()
  console.log(`[WAITLIST] ${ts} | email=${email} | domain=${domain || 'not provided'}`)

  // Confirmation to the person who signed up
  await sendEmail(
    email,
    "You're on the SOMready waitlist",
    `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAFAF8;font-family:'Plus Jakarta Sans',ui-sans-serif,system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF8;padding:48px 16px">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#ffffff;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden">
        <tr><td style="background:#0891B2;padding:24px 32px">
          <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.02em">SOMready</p>
          <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.7)">Make your website agent-ready</p>
        </td></tr>
        <tr><td style="padding:32px">
          <h1 style="margin:0 0 16px;font-size:22px;font-weight:600;color:#1A1916;letter-spacing:-0.02em">You're on the list.</h1>
          <p style="margin:0 0 16px;font-size:15px;color:#4A4641;line-height:1.6">
            Thanks for signing up${domain ? ` — we'll reach out when SOMready supports <strong>${domain}</strong>` : ''}. 
            We're building the simplest way to make any website readable by AI agents with five lines in your robots.txt.
          </p>
          <p style="margin:0 0 24px;font-size:15px;color:#4A4641;line-height:1.6">
            While you wait, you can check if your site already has SOM directives — or see how to add them.
          </p>
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="padding-right:12px">
              <a href="https://somready.com/check${domain ? `?d=${encodeURIComponent(domain)}` : ''}"
                 style="display:inline-block;background:#0891B2;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:8px">
                Check your site →
              </a>
            </td>
            <td>
              <a href="https://somspec.org/publishers"
                 style="display:inline-block;background:#F0FDF4;color:#059669;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:8px;border:1px solid #A7F3D0">
                Publisher leaderboard
              </a>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:16px 32px 24px;border-top:1px solid #F1F0EE">
          <p style="margin:0;font-size:12px;color:#9D9890;line-height:1.5">
            You're receiving this because you joined the SOMready waitlist at <a href="https://somready.com" style="color:#0891B2;text-decoration:none">somready.com</a>. 
            Questions? Reply to this email.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  )

  // Notify David of new signup
  await sendEmail(
    NOTIFY_EMAIL,
    `[SOMready] New waitlist signup: ${email}`,
    `<p><strong>${email}</strong> joined the waitlist at ${ts}${domain ? `<br>Domain: <strong>${domain}</strong>` : ''}</p>
     <p><a href="https://somready.com/check?d=${encodeURIComponent(domain || email.split('@')[1] || '')}">Run compliance check</a></p>`,
  )

  return NextResponse.json({ ok: true })
}
