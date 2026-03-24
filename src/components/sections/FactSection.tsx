'use client'

import { useEffect, useRef, useState } from 'react'
import Particles from './../../utils/Particles'
import bgImage from '@/assets/FACTS.webp'
const stats = [
  {
    id: 1,
    value: '25+',
    label: 'Years of\nexperience',
    icon: `<svg width="36" height="40" viewBox="0 0 32 36" fill="none">
      <path d="M16 2L3 7.5V17C3 24.5 8.5 31.5 16 34C23.5 31.5 29 24.5 29 17V7.5L16 2Z" stroke="white" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M11 18L14.5 21.5L21 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="16" cy="11" r="2" fill="white" opacity="0.7"/>
    </svg>`,
  },
  {
    id: 2,
    value: '127',
    label: 'Team\nmembers',
    icon: `<svg width="38" height="38" viewBox="0 0 34 34" fill="none">
      <circle cx="17" cy="10" r="5" stroke="white" stroke-width="1.8"/>
      <path d="M6 29C6 23.477 11 19 17 19C23 19 28 23.477 28 29" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
      <rect x="12" y="7" width="10" height="3" rx="1.5" fill="white" opacity="0.25"/>
    </svg>`,
  },
  {
    id: 3,
    value: '2.8k',
    label: 'Objects\nProtected',
    icon: `<svg width="38" height="38" viewBox="0 0 34 34" fill="none">
      <path d="M17 4L6 9V19C6 25.627 10.925 31.815 17 33C23.075 31.815 28 25.627 28 19V9L17 4Z" stroke="white" stroke-width="1.8"/>
      <path d="M17 10L20.5 14H24L21 17L22 21L17 18.5L12 21L13 17L10 14H13.5L17 10Z" stroke="white" stroke-width="1.4" stroke-linejoin="round" fill="none"/>
    </svg>`,
  },
  {
    id: 4,
    value: '8',
    label: 'Locations',
    icon: `<svg width="38" height="38" viewBox="0 0 34 34" fill="none">
      <rect x="5" y="10" width="24" height="18" rx="2" stroke="white" stroke-width="1.8"/>
      <rect x="9" y="5" width="6" height="8" rx="1" stroke="white" stroke-width="1.5"/>
      <rect x="19" y="5" width="6" height="8" rx="1" stroke="white" stroke-width="1.5"/>
      <line x1="5" y1="18" x2="29" y2="18" stroke="white" stroke-width="1.4"/>
      <rect x="13" y="22" width="8" height="6" rx="1" stroke="white" stroke-width="1.4"/>
    </svg>`,
  },
]

function useCounter(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const animate = (now: number) => {
      if (!startTime) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [start, target, duration])
  return count
}

function StatCard({ stat, index, visible }: { stat: typeof stats[0]; index: number; visible: boolean }) {
  const isPlus = stat.value.endsWith('+')
  const isK = stat.value.endsWith('k')
  const num = parseFloat(stat.value.replace(/[^0-9.]/g, ''))
  const count = useCounter(isK ? num * 1000 : num, 1800, visible)
  const display = isK
    ? count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count.toString()
    : isPlus ? count + '+' : count.toString()

  return (
    <div className="stat-card" style={{ animationDelay: `${index * 0.12}s` }}>

      {/* Outer glow ring */}
      <div className="card-outer-ring" />

      {/* Icon circle floating on top */}
      <div className="icon-circle">
        <div dangerouslySetInnerHTML={{ __html: stat.icon }} />
      </div>

      {/* Card body */}
      <div className="card-body-inner">

        {/* SVG border frame */}
        <svg className="card-svg-frame" viewBox="0 0 100 140" preserveAspectRatio="none">
          <path className="frame-main" d="M4,8 L8,4 L92,4 L96,8 L96,132 L92,136 L8,136 L4,132 Z" />
          <line className="frame-accent" x1="34" y1="4" x2="66" y2="4" />
          <line className="frame-accent" x1="34" y1="136" x2="66" y2="136" />
          <line className="frame-tick"   x1="4"  y1="60" x2="4"  y2="80" />
          <line className="frame-tick"   x1="96" y1="60" x2="96" y2="80" />
          <path className="frame-inner"  d="M8,11 L12,7 L88,7 L92,11 L92,129 L88,133 L12,133 L8,129 Z" />
        </svg>

        {/* Corner brackets */}
        <div className="corner tl" /><div className="corner tr" />
        <div className="corner bl" /><div className="corner br" />

        {/* Side lightning */}
        <div className="side-lightning left" />
        <div className="side-lightning right" />

        {/* Scan line on hover */}
        <div className="card-scan" />

        {/* Content */}
        <div className="card-content">
          <div className="stat-value">{display}</div>
          <div className="stat-label">
            {stat.label.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FactsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="facts-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        .facts-section {
          position: relative;
          min-height: 100vh;
          background: black;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(56px,8vw,110px) clamp(20px,5vw,64px);
          overflow: hidden;
          font-family: 'Rajdhani', sans-serif;
          backgroundImage: url(${bgImage.src}), // your image
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          z-index:10;
        }

        /* Dot grid */
        .facts-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,160,255,0.15) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none; z-index: 0;
        }

        /* Perspective floor */
        .facts-section::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 42%;
          background-image:
            linear-gradient(rgba(0,160,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,160,255,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: bottom;
          pointer-events: none; z-index: 0;
        }

        .facts-inner {
          position: relative; z-index: 2;
          width: 100%; max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Heading — CENTERED ── */
        .facts-heading-wrap {
          text-align: center;
          margin-bottom: clamp(48px, 6vw, 80px);
        }

        .facts-tag-line {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; margin-bottom: 14px;
        }
        .facts-tag-dash {
          width: 28px; height: 1.5px;
          background: #FF0D00;
          box-shadow: 0 0 6px #FF0D00;
        }
        .facts-tag-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px; font-weight: 600;
          letter-spacing: 0.28em; color: #FF0D00;
          text-transform: uppercase;
        }

        .facts-title {
          font-family:'Orbitron',monospace;
          font-size: clamp(26px, 4vw, 48px);
          font-weight: 600;
          color: #d4eef8;
          line-height: 1.15;
          margin: 0;
        }
        .facts-title em {
          font-style: normal;
          font-weight: 700;
          color: #FF0D00;
          display: block;
          font-size: clamp(30px, 4.8vw, 58px);
          text-shadow: 0 0 28px rgba(0, 200, 255, 0.09), 0 0 60px rgba(0,150,255,0.3);
        }

        /* ── Stats grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(16px, 2.8vw, 36px);
          width: 100%;
        }

        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: clamp(14px,2vw,28px); }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }

        /* ── Animations ── */
        @keyframes cardRise {
          from { opacity:0; transform:translateY(36px) scale(0.94); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes iconPulse {
          0%,100% { box-shadow:0 0 14px #FF0D00,0 0 28px #FF0D00,inset 0 0 14px #FF0D00; }
          50%     { box-shadow:0 0 6px #FF0D00,0 0 12px #FF0D00,inset 0 0 6px #FF0D00; }
        }
        @keyframes borderPulse {
          0%,100% { filter:drop-shadow(0 0 5px #FF0D00) drop-shadow(0 0 14px #FF0D00); }
          50%     { filter:drop-shadow(0 0 2px #FF0D00); }
        }
        @keyframes lightFlash {
          0%,80%,100% { opacity:0; }
          83%,89%     { opacity:1; }
          86%,92%     { opacity:0.2; }
        }
        @keyframes scan {
          0%   { top:-3%; opacity:0.9; }
          100% { top:110%; opacity:0; }
        }
        @keyframes outerRing {
          0%,100% { transform:scale(1); opacity:0.3; }
          50%     { transform:scale(1.05); opacity:0.5; }
        }
        @keyframes cornerBreath {
          0%,100% { opacity:1; box-shadow:0 0 8px #FF0D00,0 0 18px #FF0D00; }
          50%     { opacity:0.55; box-shadow:0 0 4px #FF0D00; }
        }

        /* ── Card ── */
        .stat-card {
          position: relative;
          height:clamp(200px 5vh,500px);
          animation: cardRise 0.65s cubic-bezier(0.22,1,0.36,1) both;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.34,1.5,0.64,1);
        }
        .stat-card:hover { transform: translateY(-10px) scale(1.03); }

        .card-outer-ring {
          position: absolute; inset: -8px;
          border-radius: 5px;
          border: 1px solid #FF0D00;
          pointer-events: none;
          animation: outerRing 3s ease-in-out infinite;
        }

        /* Icon circle — floats above card top */
        .icon-circle {
          position: absolute;
          top: -32px;
          left: 50%;
          transform: translateX(-50%);
          width: 64px; height: 64px;
          border-radius: 50%;
          background: radial-gradient(circle, #FF0D00 0%, #FF0D00 100%);
          border: 1.8px solid #FF0D00;
          display: flex; align-items: center; justify-content: center;
          z-index: 10;
          animation: iconPulse 2.8s ease-in-out infinite;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .stat-card:hover .icon-circle {
          transform: translateX(-50%) scale(1.18) translateY(-5px);
          animation: none;
          box-shadow: 0 0 22px #FF0D00, 0 0 44px #FF0D00, inset 0 0 20px #FF0D00;
          border-color: #FF0D00 ;
        }

        /* Card body — extra padding-top so icon has room */
        .card-body-inner {
          position: relative;
          padding-top: 40px;
          overflow: hidden;
        }

        /* SVG frame */
        .card-svg-frame {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none; z-index: 4; overflow: visible;
        }
        .frame-main {
          fill: none;
          stroke: #FF0D00;
          stroke-width: 1.4;
          animation: borderPulse 3s ease-in-out infinite;
          transition: stroke 0.3s, filter 0.3s;
        }
        .stat-card:hover .frame-main {
          stroke: #FF0D00;
          filter: drop-shadow(0 0 8px #FF0D00) drop-shadow(0 0 22px #FF0D00);
          animation: none;
        }
        .frame-accent {
          fill: none; stroke: #FF0D00; stroke-width: 3;
          filter: drop-shadow(0 0 5px #FF0D00);
        }
        .stat-card:hover .frame-accent {
          filter: drop-shadow(0 0 10px #FF0D00) drop-shadow(0 0 24px #FF0D00);
        }
        .frame-tick {
          fill: none; stroke: #FF0D00; stroke-width: 3.5;
          filter: drop-shadow(0 0 4px #FF0D00);
        }
        .frame-inner {
          fill: none; stroke: rgba(0,120,220,0.1); stroke-width: 0.8;
        }

        /* Corner brackets */
        .corner {
          position: absolute; width: 14px; height: 14px;
          z-index: 8; pointer-events: none;
          animation: cornerBreath 2.5s ease-in-out infinite;
        }
        .corner.tl { top:5px; left:5px; border-top:2px solid #FF0D00; border-left:2px solid #FF0D00; }
        .corner.tr { top:5px; right:5px; border-top:2px solid #FF0D00; border-right:2px solid #FF0D00; }
        .corner.bl { bottom:5px; left:5px; border-bottom:2px solid #FF0D00; border-left:2px solid #FF0D00; }
        .corner.br { bottom:5px; right:5px; border-bottom:2px solid #FF0D00; border-right:2px solid #FF0D00; }
        .stat-card:hover .corner {
          border-color: #FF0D00;
          box-shadow: 0 0 12px #FF0D00, 0 0 26px #FF0D00;
          animation: none;
        }

        /* Side lightning */
        .side-lightning {
          position: absolute; top:0; bottom:0; width:2px;
          background: linear-gradient(180deg, transparent 0%, #FF0D00 28%, #FF0D00 50%, #FF0D00 72%, transparent 100%);
          z-index: 5; pointer-events: none;
          animation: lightFlash 5s infinite;
        }
        .side-lightning.left  { left:0; }
        .side-lightning.right { right:0; animation-delay:2.5s; }
        .stat-card:hover .side-lightning {
          animation: none; opacity:1;
          box-shadow: 0 0 14px #FF0D00, 0 0 28px #FF0D00;
        }

        /* Scan line */
        .card-scan {
          position: absolute; left:0; right:0; height:3px;
          pointer-events: none; opacity:0; z-index:6;
          background: linear-gradient(90deg, transparent, #FF0D00, #FF0D00, #FF0D00, transparent);
          box-shadow: 0 0 8px #FF0D00;
        }
        .stat-card:hover .card-scan { animation: scan 2s linear infinite; }

        /* Card content — bigger padding for taller cards */
        .card-content {
          position: relative; z-index: 6;
          height:300px;
          display:flex;
          flex-direction:column;
          align-items: center;
          justify-content: center;
          padding: clamp(22px,3vw,38px) clamp(14px,2vw,24px) clamp(28px,3.5vw,44px);
          text-align: center;
        //   background: linear-gradient(180deg, rgba(3,15,38,0.78) 0%, rgba(2,10,28,0.94) 100%);
        }

        /* Big number */
        .stat-value {
          font-family:sans-serif;
          font-weight: 900;
          font-size: clamp(36px, 5vw, 62px);
          color: #FFFFFF;
          line-height: 1;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
          text-shadow: 0 0 20px rgba(0, 217, 255, 0.22), 0 0 45px rgba(0, 166, 255, 0.27), 0 0 75px rgba(0,105,225,0.3);
        }

        /* Label */
        .stat-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 500;
          color: #FFFFFF;
          letter-spacing: 0.07em;
          line-height: 1.35;
        }

        /* Decorative shield top-right */
        .deco-shield {
          position: absolute;
          top: clamp(-10px,-2vw,-30px);
          right: clamp(-20px,-3vw,-50px);
          width: clamp(140px,20vw,260px);
          height: clamp(140px,20vw,260px);
          opacity: 0.16;
          pointer-events: none; z-index: 1;
          filter: drop-shadow(0 0 28px #FF0D00);
        }

        @media (max-width: 480px) {
          .icon-circle { width:50px; height:50px; top:-25px; }
          .deco-shield { display:none; }
        }
      `}</style>
      {/* <Particles
        particleColors={["#1d2f51","#133472","#1a4b64"]}
        particleCount={3000}    
        particleSpread={10}
        speed={0.11}
        particleBaseSize={90}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={5}
        className={{}}
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:0, opacity:0.55 }}
      /> */}
      {/* Decorative shield */}
      <svg className="deco-shield" viewBox="0 0 200 220" fill="none">
        <path d="M100 10L20 45V105C20 155 55 195 100 210C145 195 180 155 180 105V45L100 10Z"
          stroke="#00aaff" strokeWidth="3" fill="rgba(0,80,180,0.15)"/>
        <path d="M100 30L38 58V105C38 146 65 182 100 194C135 182 162 146 162 105V58L100 30Z"
          stroke="#00ccff" strokeWidth="1.5" fill="rgba(0,60,160,0.1)"/>
        <path d="M100 55L75 70V95C75 115 85 132 100 139C115 132 125 115 125 95V70L100 55Z"
          stroke="#00eeff" strokeWidth="1.2" fill="rgba(0,120,220,0.2)"/>
        <path d="M88 93L96 101L115 80" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="100" cy="110" r="60" stroke="rgba(0,180,255,0.2)" strokeWidth="0.8" strokeDasharray="4 4"/>
        <circle cx="100" cy="110" r="82" stroke="rgba(0,160,255,0.12)" strokeWidth="0.6" strokeDasharray="3 6"/>
      </svg>

      <div className="facts-inner">

        {/* ── Heading — centered ── */}
        <div className="facts-heading-wrap">
          <div className="facts-tag-line">
            <div className="facts-tag-dash" />
            <span className="facts-tag-label">Trusted Worldwide</span>
            <div className="facts-tag-dash" />
          </div>
          <h2 className="facts-title">
            Facts about
            <em>Statement Security</em>
          </h2>
        </div>

        {/* ── Stats grid ── */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} visible={visible} />
          ))}
        </div>

      </div>
    </section>
  )
}