// Serves: GET /badge/{domain}   (e.g. /badge/example.com)
// Also:   GET /badge/{domain}.svg  (strips the .svg suffix)
// Returns an SVG shields-style badge for the given domain's SOM readiness.

import { NextRequest, NextResponse } from 'next/server'
import { checkDomain, ReadinessLevel } from '@/lib/som-robots'

const COLORS: Record<ReadinessLevel, string> = {
  ready:   '#059669',
  partial: '#D97706',
  none:    '#6B6760',
  error:   '#6B6760',
}

const LABELS: Record<ReadinessLevel, string> = {
  ready:   'SOM Ready ✓',
  partial: 'Partial',
  none:    'Not Yet',
  error:   'Unknown',
}

function makeBadge(level: ReadinessLevel): string {
  const rightColor = COLORS[level]
  const rightLabel = LABELS[level]
  const leftLabel  = 'somready'
  const leftW      = leftLabel.length  * 6.5 + 14
  const rightW     = rightLabel.length * 6.5 + 14
  const totalW     = leftW + rightW

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="20" role="img" aria-label="somready: ${rightLabel}">
  <title>somready: ${rightLabel}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalW}" height="20" rx="4" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${leftW}" height="20" fill="#1A1916"/>
    <rect x="${leftW}" width="${rightW}" height="20" fill="${rightColor}"/>
    <rect width="${totalW}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11">
    <text x="${leftW / 2}" y="15" fill="#000" fill-opacity=".2" aria-hidden="true">${leftLabel}</text>
    <text x="${leftW / 2}" y="14">${leftLabel}</text>
    <text x="${leftW + rightW / 2}" y="15" fill="#000" fill-opacity=".2" aria-hidden="true">${rightLabel}</text>
    <text x="${leftW + rightW / 2}" y="14">${rightLabel}</text>
  </g>
</svg>`
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { domain: string } },
) {
  // Strip optional .svg extension
  const rawDomain = decodeURIComponent(params.domain).replace(/\.svg$/i, '').trim()

  let level: ReadinessLevel = 'none'
  if (rawDomain) {
    const result = await checkDomain(rawDomain)
    level = result.level === 'error' ? 'none' : result.level
  }

  return new NextResponse(makeBadge(level), {
    headers: {
      'Content-Type':    'image/svg+xml',
      'Cache-Control':   'public, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
