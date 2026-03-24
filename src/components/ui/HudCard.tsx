/**
 * HudCard — the standard card with left cyan accent bar
 *
 * Usage:
 *   <HudCard label="Response Time" value="< 4 HRS" sub="Worldwide deployment" />
 */

interface HudCardProps {
  label: string
  value: string
  sub?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export default function HudCard({ label, value, sub, children, style }: HudCardProps) {
  return (
    <div className="cyber-card" style={{ padding: '22px 26px', ...style }}>
      <div style={{
        fontFamily: '"Share Tech Mono", monospace',
        fontSize: 8, letterSpacing: '2.5px',
        color: 'rgba(0,212,255,0.6)',
        textTransform: 'uppercase', marginBottom: 7,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'Orbitron, monospace',
        fontSize: 16, fontWeight: 600,
        color: 'var(--text)', marginBottom: sub ? 4 : 0,
      }}>
        {value}
      </div>
      {sub && (
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
          {sub}
        </p>
      )}
      {children}
    </div>
  )
}
