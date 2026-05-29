import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Life Clock visualizing a lifespan as a 24-hour clock'
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
}

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        color: '#f8fafc',
        background: '#111827',
        fontFamily: 'Arial',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: 0,
            color: '#93c5fd',
          }}
        >
          clock.dendeline.com
        </div>
        <div
          style={{
            width: 128,
            height: 128,
            border: '8px solid #f8fafc',
            borderRadius: 999,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 10,
              height: 48,
              background: '#38bdf8',
              borderRadius: 999,
              transform: 'rotate(35deg)',
              transformOrigin: '50% 100%',
              position: 'absolute',
              top: 24,
            }}
          />
          <div
            style={{
              width: 8,
              height: 34,
              background: '#f8fafc',
              borderRadius: 999,
              transform: 'rotate(110deg)',
              transformOrigin: '50% 100%',
              position: 'absolute',
              top: 38,
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            fontSize: 92,
            lineHeight: 1,
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          Life Clock
        </div>
        <div
          style={{
            maxWidth: 820,
            fontSize: 38,
            lineHeight: 1.25,
            color: '#cbd5e1',
          }}
        >
          Visualize your life as a 24-hour clock and see time from a calmer
          perspective.
        </div>
      </div>
    </div>,
    size,
  )
}
