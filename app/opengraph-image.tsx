import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SOMready — Make your website readable by AI agents'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAFAF8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: logo mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 11,
              background: '#0891B2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              color: 'white',
            }}
          >
            ✓
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#1A1916', letterSpacing: '-0.5px' }}>
            SOMready
          </span>
        </div>

        {/* Center: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#1A1916',
              lineHeight: 1.1,
              letterSpacing: '-2px',
            }}
          >
            Make your website<br />
            <span style={{ color: '#0891B2' }}>readable by AI agents</span>
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#6B6558',
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Five lines in robots.txt. Full SOM serving. Instant visibility into agent traffic.
          </div>
        </div>

        {/* Bottom: stat pills */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {[
            { num: '17.7×', label: 'avg compression' },
            { num: '77×', label: 'peak (TechCrunch)' },
            { num: '5 min', label: 'setup time' },
          ].map((stat) => (
            <div
              key={stat.num}
              style={{
                background: '#F0FDFA',
                border: '1px solid #A7F3D0',
                borderRadius: 12,
                padding: '12px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 700, color: '#0891B2', letterSpacing: '-0.5px' }}>
                {stat.num}
              </span>
              <span style={{ fontSize: 13, color: '#6B6558', fontWeight: 500 }}>
                {stat.label}
              </span>
            </div>
          ))}

          <div style={{ flex: 1 }} />

          <div
            style={{
              fontSize: 18,
              color: '#9D9890',
              fontWeight: 500,
            }}
          >
            somready.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
