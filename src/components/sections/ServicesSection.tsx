'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Types ──────────────────────────────────────────────
interface Service {
  id: string
  title: string
  description: string
  tags: string[]
  icon: string
  featured?: boolean
}

// ── Mock data (replace with your SERVICES import) ──────
const SERVICES: Service[] = [
  {
    id: '01',
    title: 'Executive Protection',
    description:
      'Close-protection details for C-suite executives, dignitaries, and high-value individuals in high-risk environments worldwide.',
    tags: ['Close Protection', 'Threat Assessment', '24/7 Coverage'],
    icon: 'shield',
    featured: true,
  },
  {
    id: '02',
    title: 'Secure Transport',
    description:
      'Armoured vehicle logistics with trained drivers and counter-surveillance protocols for safe passage in complex terrains.',
    tags: ['Armoured Fleet', 'Route Planning', 'Counter-Surveillance'],
    icon: 'car',
  },
  {
    id: '03',
    title: 'Diplomatic Security',
    description:
      'Specialised protection for embassies, consulates, and diplomatic missions — including access control and crisis response.',
    tags: ['Embassy Security', 'Access Control', 'Crisis Response'],
    icon: 'globe',
  },
  {
    id: '04',
    title: 'Residential Security',
    description:
      'Comprehensive estate protection combining physical security, surveillance systems, and trained on-site personnel.',
    tags: ['Estate Protection', 'CCTV', 'Patrol Units'],
    icon: 'home',
  },
  {
    id: '05',
    title: 'Cyber Intelligence',
    description:
      'Digital threat monitoring and intelligence gathering to protect personal and corporate assets from cyber intrusions.',
    tags: ['Threat Intel', 'Digital Forensics', 'Dark Web'],
    icon: 'lock',
  },
  {
    id: '06',
    title: 'VIP Event Security',
    description:
      'End-to-end event security management from advance team deployment to post-event threat debriefs.',
    tags: ['Advance Teams', 'Crowd Control', 'Risk Mgmt'],
    icon: 'star',
  },
]

// ── SVG icon paths ─────────────────────────────────────
const ICONS: Record<string, React.ReactNode> = {
  shield: <path d="M12 2L4 6v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V6L12 2z" />,
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 000 20M2 12h20" />
    </>
  ),
  car: (
    <>
      <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3" />
      <rect x="9" y="11" width="14" height="10" rx="2" />
      <path d="M16 11V9a2 2 0 00-4 0v2" />
    </>
  ),
  home: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
}

// ── Component ──────────────────────────────────────────
export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="services"
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 5vw, 52px)',
        background: '#000000',
        position: 'relative',
        zIndex: 2,
        fontFamily:'monospace',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Rajdhani:wght@400;500;600&display=swap');

        .srv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #AF0A00;
          border: 1px solid #AF0A00;
        }

        /* Tablet: 2 columns */
        @media (max-width: 900px) {
          .srv-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile: 1 column */
        @media (max-width: 560px) {
          .srv-grid {
            grid-template-columns: 1fr;
          }
        }

        .srv-card {
          background: #AF0A00;
          padding: clamp(22px, 4vw, 36px) clamp(18px, 3vw, 30px);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
          background: #090505 !important;

        }

        .srv-card:hover {
          background: #0f0909 !important;
          color: '#FFFFFF';
        }

        .srv-card:hover .top-bar {
          transform: scaleX(1) !important;
        }

        .srv-card:hover .arrow-icon {
          opacity: 1 !important;
          transform: translateX(4px) !important;
        }

        .srv-card:hover .icon-box {
          border-color: #FFFFFF !important;
          // background: #1b0a09 !important;
        }

        .top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #AF0A00;
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .tag-pill {
          display: inline-block;
          font-family: 'Rajdhani', sans-serif;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #FFFFFF;
          border: 1px solid #AF0A00;
          padding: 3px 8px;
          border-radius: 2px;
          background: #AF0A00;
          white-space: nowrap;
          text-align:center;
        }

        .section-tag-dash {
          font-family:'Orbitron',monospace; 
          display: inline-block;
          width: 28px;
          height: 1px;
          background: #AF0A00;
          margin-right: 10px;
          vertical-align: middle;
        }

        .section-tag-label {
          font-family:'Orbitron',monospace; 
          font-size: 18px;
          letter-spacing: 0.25em;
          color: #AF0A00;
          text-transform: uppercase;
          vertical-align: middle;
          text-align:center
        }

        .icon-box {
          width: 46px;
          height: 46px;
          border: 1px solid #AF0A00;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
          transition: border-color 0.3s, background 0.3s;
          flex-shrink: 0;
        }

        .arrow-icon {
          position: absolute;
          bottom: 22px;
          right: 22px;
          color: #AF0A00;
          font-size: 16px;
          opacity: 0;
          transform: translateX(0);
          transition: opacity 0.25s, transform 0.25s;
        }

        /* Responsive typography */
        .srv-number {
          font-family: 'Share Tech Mono', 'Courier New', monospace;
          font-size: 13px;
          letter-spacing: 2px;
          color: #AF0A00;
          margin-bottom: 18px;
        }

        .srv-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(14px, 1.4vw, 20px);
          font-weight: 600;
          letter-spacing: 0.3px;
          line-height: 1.3;
          margin-bottom: 10px;
          color: var(--text, #cce8f4);
          transition: color 0.2s;
        }

        .srv-desc {
          font-size: clamp(12px, 1.3vw, 14px);
          line-height: 1.65;
          
          margin-bottom: 16px;
          color: #FFFFFF;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        /* Mobile adjustments */
        @media (max-width: 560px) {
          .icon-box { width: 40px; height: 40px; margin-bottom: 16px; }
          .arrow-icon { opacity: 0.4; }
          .tags-row { gap: 5px; }
        }
      `}</style>

      <div style={{ maxWidth: 1300, margin: '0 auto' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 48, display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column"}}
        >
          <div style={{ marginBottom: 14 }}>
            <span className="section-tag-dash" />
            <span className="section-tag-label">Capabilities · Tailored Solutions</span>
          </div>

          <h2
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 900,
              fontSize: 'clamp(22px, 3.5vw, 38px)',
              letterSpacing: '0.12em',
              color: '#cce8f4',
              margin: '0 0 14px',
              lineHeight: 1.2,
            }}
          >
            Mission-Ready{' '}
            <em style={{ color: '#AF0A00', fontStyle: 'normal' }}>Services</em>
          </h2>

          <p
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: 'clamp(14px, 1.6vw, 16px)',
              color: '#FFFFFF',
              textAlign:"center",
              lineHeight: 1.7,
              maxWidth: 580,
              margin: 0,
            }}
          >
            Every engagement is bespoke. Our operators assess, plan, and execute with surgical
            precision — adapting to your environment, not the other way around.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="srv-grid">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              className="srv-card"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              style={{
                background: service.featured
                  ? 'linear-gradient(135deg, #06101e, var(--bg2, #07111a))'
                  : 'var(--bg2, #07111a)',
              }}
            >
              {/* Top accent bar */}
              <div
                className="top-bar"
                style={{ transform: service.featured ? 'scaleX(1)' : 'scaleX(0)' }}
              />

              {/* Service number */}
              <div className="srv-number">
                {service.id}
                {service.featured ? ' · PRIMARY' : ''}
              </div>

              {/* Icon */}
              <div className="icon-box">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ width: 20, height: 20, opacity: 0.8 }}
                >
                  {ICONS[service.icon]}
                </svg>
              </div>

              {/* Title */}
              <div
                className="srv-title"
                style={{ color: service.featured ? '#AF0A00' : 'var(--text, #cce8f4)' }}
              >
                {service.title}
              </div>

              {/* Description */}
              <p className="srv-desc">{service.description}</p>

              {/* Tags */}
              <div className="tags-row">
                {service.tags.map(tag => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>

              {/* Arrow */}
              <div className="arrow-icon">→</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}