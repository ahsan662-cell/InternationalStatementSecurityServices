/**
 * SectionHeader — reusable heading block
 *
 * Usage:
 *   <SectionHeader
 *     tag="Capabilities · Tailored Solutions"
 *     title={<>Mission-Ready <em>Services</em></>}
 *     subtitle="Every engagement is bespoke..."
 *   />
 */

interface SectionHeaderProps {
  tag: string
  title: React.ReactNode
  subtitle?: string
  style?: React.CSSProperties
}

export default function SectionHeader({ tag, title, subtitle, style }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 52, ...style }}>
      <div className="section-tag">
        <span className="section-tag-dash" />
        <span className="section-tag-label">{tag}</span>
      </div>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </div>
  )
}
