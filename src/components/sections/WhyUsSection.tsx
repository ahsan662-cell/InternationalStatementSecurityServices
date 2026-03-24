'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Bg from "@/assets/missionready.webp"
// ── Mock data (replace with your WHY_US import from @/data/siteData) ──
interface WhyUsItem {
  num: string
  title: string
  description: string
}

const WHY_US: WhyUsItem[] = [
  {
    num: '01',
    title: 'Operator-Led Intelligence',
    description:
      'Every detail is planned by former special-forces operators with decades of field experience — not desk analysts. We read environments in real time.',
  },
  {
    num: '02',
    title: 'Zero Compromise Protocol',
    description:
      'Our threat assessments are exhaustive. We identify vulnerabilities before adversaries do and eliminate risks before they materialise on the ground.',
  },
  {
    num: '03',
    title: 'Global Reach, Local Precision',
    description:
      'With operational cells across six continents, we deploy indigenous knowledge alongside international standards for seamless cross-border protection.',
  },
  {
    num: '04',
    title: 'Discreet by Design',
    description:
      'Visibility is a choice, not a default. Our teams operate in profile-appropriate attire and vehicles, preserving client anonymity at every level.',
  },
  {
    num: '05',
    title: 'Adaptive Command Structure',
    description:
      'Fluid command chains ensure decisions are made at the right level — fast. No bureaucracy. No delays. Just precise execution under pressure.',
  },
  {
    num: '06',
    title: 'Verified & Vetted Personnel',
    description:
      'Every operator undergoes multi-tier vetting, polygraph screening, and continuous performance review. Trust is earned, then constantly re-earned.',
  },
]

export default function WhyUsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 5vw, 52px)',
        position: 'relative',
        zIndex: 2,
        background: '#020507',
        // backgroundImage:`url(${Bg.src})`,
        backgroundSize:"100% ",
        backgroundPosition:"cover",
        // opacity:0.9,
        backgroundRepeat:"no-repeat",
        fontFamily:"monospace",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Rajdhani:wght@400;500;600&display=swap');

        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .why-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .cyber-card {
          border: 1px solid #AF0A00;
          background: #AF0A00;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
        }

        .cyber-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, #AF0A00, #AF0A00);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .cyber-card:hover::before {
          transform: scaleX(1);
        }

        .cyber-card:hover {
          border-color: #AF0A00;
          background: #AF0A00;
          transform: translateY(-4px);
        }

        .why-section-tag {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .why-tag-dash {
          display: inline-block;
          width: 28px;
          height: 1px;
          background: #AF0A00;
          flex-shrink: 0;
        }

        .why-tag-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 22px;
          letter-spacing: 0.25em;
          color: #AF0A00;
          text-transform: uppercase;
        }
      `}</style>

      <div style={{ maxWidth: 1260, margin: '0 auto' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 'clamp(32px, 5vw, 52px)', display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}
        >
          <div className="why-section-tag">
            <span className="why-tag-dash" />
            <span className="why-tag-label">Our Approach</span>
          </div>

          <h2
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 900,
              fontSize: 'clamp(22px, 3.5vw, 38px)',
              letterSpacing: '0.12em',
              color: '#cce8f4',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Why{' '}
            <em style={{ color: '#AF0A00', fontStyle: 'normal' }}>
              Statement
            </em>{' '}
            Security
          </h2>
        </motion.div>

        {/* ── Cards ── */}
        <div className="why-grid">
          {WHY_US.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="cyber-card"
              style={{
                padding: 'clamp(20px, 3vw, 30px) clamp(16px, 2.5vw, 26px)',
              }}
            >
              {/* Number row */}
              <div
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: 11,
                  color: '#AF0A00',
                  letterSpacing: '1px',
                  marginBottom: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 1,
                    background: '#FFFFFF',
                    display: 'block',
                    flexShrink: 0,
                  }}
                />
                {item.num}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: 'clamp(12px, 1.4vw, 18px)',
                  fontWeight: 600,
                  color: 'var(--text, #cce8f4)',
                  marginBottom: 11,
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: 'clamp(13px, 1.3vw, 16px)',
                  color: 'var(--muted, #cce8f4)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}