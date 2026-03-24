'use client'

import { useState, useRef, useEffect } from 'react'
import Particles from './../../utils/Particles'
import SecurityGuard from "@/assets/owner.webp"
import FAQS from "@/assets/FAQs.webp"
import FuturisticGlobe from "@/assets/Futuristic-global.webp"
import Bg from "@/assets/SERVICES-SECTION-BACKGROUND.webp"
import CloseProtection from "@/assets/Gallery/cp14.webp"
import CelebrityProtection from "@/assets/Gallery/cp9.webp"
import EventProtection from "@/assets/EventProtection.webp"
import CorporateSecurity from "@/assets/fdf.webp"
const services = [
  {
    id: 1,
    title: 'Executive Protection',
    subtitle: 'VIP & Corporate Security',
    image: SecurityGuard,
    icon: `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="11" r="5.5" stroke="white" stroke-width="1.8"/>
      <path d="M6 30c0-6.075 4.925-11 11-11s11 4.925 11 11" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="8" cy="14" r="3.8" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
      <path d="M2 28c0-3.866 3.134-7 7-7" stroke="rgba(255,255,255,0.7)" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="26" cy="14" r="3.8" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
      <path d="M32 28c0-3.866-3.134-7-7-7" stroke="rgba(255,255,255,0.7)" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 2,
    title: 'Close Protection',
    subtitle: 'Personal Security Detail',
    image: CloseProtection,
    icon: `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="15" width="18" height="14" rx="2.5" stroke="white" stroke-width="1.8"/>
      <path d="M12 15v-4a5 5 0 0110 0v4" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="17" cy="22" r="2.5" fill="white"/>
      <line x1="17" y1="24.5" x2="17" y2="27" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 3,
    title: 'Special Events',
    subtitle: 'Event & Asset Protection',
    image: EventProtection,
    icon:`<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="11" r="5.5" stroke="white" stroke-width="1.8"/>
      <path d="M6 30c0-6.075 4.925-11 11-11s11 4.925 11 11" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="8" cy="14" r="3.8" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
      <path d="M2 28c0-3.866 3.134-7 7-7" stroke="rgba(255,255,255,0.7)" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="26" cy="14" r="3.8" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
      <path d="M32 28c0-3.866-3.134-7-7-7" stroke="rgba(255,255,255,0.7)" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`,
  },
  // {
  //   id: 4,
  //   title: 'Residential Security',
  //   subtitle: 'Event & Asset Protection',
  //   image: FuturisticGlobe,
  //   icon: `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
  //     <circle cx="17" cy="17" r="12" stroke="white" stroke-width="1.8"/>
  //     <circle cx="17" cy="17" r="4" stroke="white" stroke-width="1.8"/>
  //     <line x1="17" y1="5" x2="17" y2="11" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
  //     <line x1="17" y1="23" x2="17" y2="29" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
  //     <line x1="5" y1="17" x2="11" y2="17" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
  //     <line x1="23" y1="17" x2="29" y2="17" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
  //   </svg>`,
  // },
  {
    id: 5,
    title: 'Celebrity Security',
    subtitle: 'Event & Asset Protection',
    image: CelebrityProtection,
    icon: `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="11" r="5.5" stroke="white" stroke-width="1.8"/>
      <path d="M6 30c0-6.075 4.925-11 11-11s11 4.925 11 11" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="8" cy="14" r="3.8" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
      <path d="M2 28c0-3.866 3.134-7 7-7" stroke="rgba(255,255,255,0.7)" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="26" cy="14" r="3.8" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
      <path d="M32 28c0-3.866-3.134-7-7-7" stroke="rgba(255,255,255,0.7)" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 6,
    title: 'Corporate Security',
    subtitle: 'Event & Asset Protection',
    image: CorporateSecurity,
    icon: `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="11" r="5.5" stroke="white" stroke-width="1.8"/>
      <path d="M6 30c0-6.075 4.925-11 11-11s11 4.925 11 11" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="8" cy="14" r="3.8" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
      <path d="M2 28c0-3.866 3.134-7 7-7" stroke="rgba(255,255,255,0.7)" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="26" cy="14" r="3.8" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
      <path d="M32 28c0-3.866-3.134-7-7-7" stroke="rgba(255,255,255,0.7)" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`,
  },
]

// Animated canvas background
function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let w = 0, h = 0

    interface Dot { x: number; y: number; o: number; ph: number }
    interface Ln { x1: number; y1: number; x2: number; y2: number; t: number; sp: number }
    let dots: Dot[] = [], lines: Ln[] = []

    const init = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      dots = []; lines = []
      const gap = 18 // thoda dense
      const cols = Math.floor(w / gap), rows = Math.floor(h / gap)
      for (let r = 0; r <= rows; r++)
        for (let c = 0; c <= cols; c++)
          dots.push({ x: c * gap, y: r * gap, o: 0.08 + Math.random() * 0.2, ph: Math.random() * Math.PI * 2 })

      // lines
      for (let i = 0; i < 40; i++) { // thodi lines zyada
        const a = dots[Math.floor(Math.random() * dots.length)]
        const b = dots[Math.floor(Math.random() * dots.length)]
        lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, t: Math.random(), sp: 0.004 + Math.random() * 0.008 })
      }
    }

    let f = 0
    const draw = () => {
      raf = requestAnimationFrame(draw); f++
      ctx.clearRect(0, 0, w, h)

      // dots
      // for (const d of dots) {
      //   const p = Math.sin(d.ph + f * 0.06) * 0.5 + 0.5 // double speed
      //   ctx.beginPath(); ctx.arc(d.x, d.y, 1.4, 0, Math.PI * 2)
      //   ctx.fillStyle = `rgba(0,200,255,${d.o * (0.5 + p * 0.5)})`; ctx.fill()
      // }

      // lines
      for (const ln of lines) {
        ln.t = (ln.t + ln.sp) % 3
        ctx.beginPath(); ctx.moveTo(ln.x1, ln.y1); ctx.lineTo(ln.x2, ln.y2)
        ctx.strokeStyle = 'rgba(0,200,255,0.06)'; ctx.lineWidth = 0.6; ctx.stroke()
        const px = ln.x1 + (ln.x2 - ln.x1) * ln.t, py = ln.y1 + (ln.y2 - ln.y1) * ln.t
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(10, 78, 111, 0.7)'; ctx.fill()
      }

      // Radar rings right
      const cx = w * 0.82, cy = h * 0.5, mr = Math.min(w,h) * 0.36
      ;[1,0.8,0.6,0.4,0.22,0.1].forEach((fac,i)=>{
        ctx.beginPath(); ctx.arc(cx,cy,mr*fac,0,Math.PI*2)
        ctx.strokeStyle=`rgba(0,200,255,${i%2===0?0.15:0.08})`
        ctx.lineWidth=i%2===0?1:0.5; ctx.setLineDash(i%2===0?[5,6]:[]); ctx.stroke(); ctx.setLineDash([])
      })

      const ang = (f * 0.02) % (Math.PI*2) // radar sweep faster
      const g = ctx.createRadialGradient(cx,cy,0,cx,cy,mr)
      g.addColorStop(0,'rgba(0,200,255,0.2)'); g.addColorStop(1,'rgba(0,200,255,0)')
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,mr,ang-0.5,ang); ctx.closePath()
      ctx.fillStyle = g; ctx.fill()

      // // Left radar smaller
      const cx2=w*0.12, cy2=h*0.5, mr2=Math.min(w,h)*0.22
      ;[1,0.7,0.45,0.22].forEach((fac,i)=>{
        ctx.beginPath(); ctx.arc(cx2,cy2,mr2*fac,0,Math.PI*2)
        ctx.strokeStyle=`rgba(0,200,255,${0.08-i*0.01})`; ctx.lineWidth=0.5; ctx.stroke()
      })
    }

    init(); window.addEventListener('resize', init); draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init) }
  }, [])
  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }} />
}
export default function SecurityServicesCards() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div style={{
      position: 'relative',
      minHeight: '20vh',
      background: 'radial-gradient(ellipse 120% 100% at 50% 50%, #080f1d 0%, #05080c 55%, #1c56a1 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(48px,7vw,60px) clamp(20px,5vw,30px)',
      overflow: 'hidden',
      backgroundImage:`url(${Bg.src})`,
      backgroundSize:"cover",
      backgroundPosition:"center",
      // opacity:0.9,
      backgroundRepeat:"no-repeat",
      zIndex:1
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        /* ── Card entrance ── */
        @keyframes cardIn {
          from { opacity:0; transform:translateY(36px) scale(0.96); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }

        /* ── Sweeping shimmer on hover ── */
        @keyframes shimmerSweep {
          0%   { left:-100%; }
          100% { left:200%; }
        }

        /* ── Scan line ── */
        @keyframes scan {
          0%   { top:-4%; opacity:0.8; }
          100% { top:110%; opacity:0; }
        }

        /* ── Electric pulse on border ── */
        @keyframes borderPulse {
          0%,100% { opacity:1; filter:drop-shadow(0 0 6px #ff0d00) drop-shadow(0 0 12px #ff0d00); }
          50%      { opacity:0.6; filter:drop-shadow(0 0 2px #ff0d00); }
        }

        /* ── Corner glow breathing ── */
        @keyframes cornerBreath {
          0%,100% { box-shadow:0 0 8px #ff0d00, 0 0 20px #ff0d00; }
          50%      { box-shadow:0 0 4px #ff0d00, 0 0 10px #ff0d00; }
        }

        /* ── Icon circle pulse ── */
        @keyframes iconPulse {
          0%,100% { box-shadow:0 0 14px #ff0d00, 0 0 28px #ff0d00, inset 0 0 14px #ff0d00; }
          50%      { box-shadow:0 0 6px #ff0d00, 0 0 14px #ff0d00), inset 0 0 6px #ff0d00; }
        }

        /* ── Lightning side flash ── */
        @keyframes lightFlash {
          0%,85%,100% { opacity:0; }
          87%,93%     { opacity:1; }
          90%,96%     { opacity:0.25; }
        }

        .svc-card {
          position: relative;
          width: clamp(210px, 26vw, 200px);
          height: clamp(200px,20vh,200px)
          cursor: pointer;
          animation: cardIn 0.65s cubic-bezier(0.22,1,0.36,1) both;
          transition: transform 0.4s cubic-bezier(0.34,1.5,0.64,1);
          isolation: isolate;
        }

        .svc-card:hover { transform: translateY(-14px) scale(1.04); }

        /* Aspect ratio container */
        .card-body {
          position: relative;
          aspect-ratio: 0.72;
          overflow: hidden;
          clip-path: polygon(
            0% 3.5%,
            2.5% 0%,
            97.5% 0%,
            100% 3.5%,
            100% 96.5%,
            97.5% 100%,
            2.5% 100%,
            0% 96.5%
          );
        }

        .card-img {
          width:100%; height:100%; object-fit:cover; object-position:center 20%;
          filter: brightness(0.95) saturate(0.65) contrast(1.3);
          transition: filter 0.45s ease, transform 0.5s ease;
          display: block;
        }

        .svc-card:hover .card-img {
          filter: brightness(0.65) saturate(0.75) contrast(1.05);
          transform: scale(1.08);
        }

        /* Multi-layer gradient overlay */
        .card-overlay {
          position: absolute; inset:0; pointer-events:none;
          background:
            linear-gradient(180deg,
              #9a3934  0%,
              #9a3934 30%,
              #9a3934 55%,
              #9a3934 78%,
              #9a3934 100%
            ),
            // linear-gradient(90deg, #f5b0ac 0%, transparent 40%, transparent 60%, #ffffff 100%);
        }

        /* Side lightning bars */
        .card-lightning-l, .card-lightning-r {
          position: absolute; top:0; bottom:0; width:2px; pointer-events:none;
          background: linear-gradient(180deg, transparent 0%, #ff0d00 30%, #ff0d00 50%, #ff0d00 70%, transparent 100%);
          animation: lightFlash 5s infinite;
          z-index: 3;
        }
        .card-lightning-l { left:0; }
        .card-lightning-r { right:0; animation-delay:2.5s; }

        .svc-card:hover .card-lightning-l,
        .svc-card:hover .card-lightning-r {
          animation: none; opacity:1;
          box-shadow: 0 0 10px #ff0d00 , 0 0 20px #ff0d00;
        }

        /* Scan line */
        .card-scan {
          position: absolute; left:0; right:0; height:3px; pointer-events:none; opacity:0; z-index:4;
          background: linear-gradient(90deg, transparent, #ff0d00, #ff0d00, #ff0d00, transparent);
          box-shadow: 0 0 8px #ff0d00;
        }
        .svc-card:hover .card-scan { animation: scan 2.2s linear infinite; }

        /* Shimmer sweep */
        .card-shimmer {
          position: absolute; inset:0; pointer-events:none; overflow:hidden; z-index:5; opacity:0;
          transition: opacity 0.2s;
        }
        .card-shimmer::after {
          content:''; position:absolute; top:0; bottom:0; width:60%; opacity:0;
          background: linear-gradient(90deg, transparent, #ff0d00, #ff0d00, #ff0d00, transparent);
          transform: skewX(-15deg);
        }
        .svc-card:hover .card-shimmer { opacity:1; }
        .svc-card:hover .card-shimmer::after { animation: shimmerSweep 1.8s ease-in-out infinite; }

        /* SVG border overlay */
        .card-frame {
          position:absolute; inset:0; pointer-events:none; z-index:6; overflow:visible;
        }

        .frame-path {
          fill:none; #ff0d00; stroke-width:1.4;
          filter:drop-shadow(0 0 5px #ff0d00) drop-shadow(0 0 14px #ff0d00);
          animation: borderPulse 3s ease-in-out infinite;
          transition: stroke 0.3s, filter 0.3s;
        }
        .svc-card:hover .frame-path {
          stroke: #ff0d00;
          filter:drop-shadow(0 0 8px #ff0d00) drop-shadow(0 0 20px #ff0d00) drop-shadow(0 0 36px #ff0d00);
          animation:none;
        }

        .frame-accent {
          fill:none; stroke: #ff0d00; stroke-width:2.5;
          filter:drop-shadow(0 0 6px #ff0d00);
        }
        .svc-card:hover .frame-accent {
          filter:drop-shadow(0 0 10px #ff0d00) drop-shadow(0 0 22px #ff0d00);
        }

        /* Corner L-brackets */
        .c-tl,.c-tr,.c-bl,.c-br {
          position:absolute; width:16px; height:16px; z-index:8; pointer-events:none;
          animation: cornerBreath 2.5s ease-in-out infinite;
        }
        .c-tl { top:5px; left:5px; border-top:2px solid #ff0d00; border-left:2px solid #ff0d00; }
        .c-tr { top:5px; right:5px; border-top:2px solid #ff0d00; border-right:2px solid #ff0d00; }
        .c-bl { bottom:5px; left:5px; border-bottom:2px solid #ff0d00; border-left:2px solid #ff0d00; }
        .c-br { bottom:5px; right:5px; border-bottom:2px solid #ff0d00; border-right:2px solid #ff0d00; }

        .svc-card:hover .c-tl,
        .svc-card:hover .c-tr,
        .svc-card:hover .c-bl,
        .svc-card:hover .c-br {
          border-color: #9a3934;
          box-shadow:0 0 10px #ff0d00, 0 0 24px #ff0d00;
          animation:none;
        }

        /* Side centre ticks */
        .tick-l,.tick-r {
          position:absolute; top:50%; transform:translateY(-50%);
          width:4px; height:28px; z-index:8; pointer-events:none;
          background: #ff0d00;
          box-shadow:0 0 6px #ff0d00;
          transition:background 0.3s, box-shadow 0.3s;
        }
        .tick-l { left:0; }
        .tick-r { right:0; }
        .svc-card:hover .tick-l,
        .svc-card:hover .tick-r {
          background: #ff0d00;
          box-shadow:0 0 14px #ff0d00, 0 0 28px #ff0d00;
        }

        /* Icon badge */
        .icon-wrap {
          position:absolute; bottom:74px; left:50%; transform:translateX(-50%);
          width:62px; height:62px; border-radius:50%; z-index:9;
          background:radial-gradient(circle, #ff0d00 0%, #ff0d00 100%);
          border:1.5px solid #ff0d00;
          display:flex; align-items:center; justify-content:center;
          animation: iconPulse 2.8s ease-in-out infinite;
          transition: border-color 0.3s, transform 0.3s;
        }
        .svc-card:hover .icon-wrap {
          border-color: #ff0d00;
          transform:translateX(-50%) scale(1.12);
          animation:none;
          box-shadow:0 0 18px #ff0d00, 0 0 36px #aa0d04, inset 0 0 18px #ff0d00;
        }

        /* Title */
        .card-title {
          position:absolute; bottom:22px; left:0; right:0; text-align:center;
          font-family:'Rajdhani',sans-serif; font-weight:700;
          font-size:clamp(13px,1.4vw,18px); letter-spacing:0.1em;
          color: #b8dcf5; z-index:9; pointer-events:none;
          text-shadow:0 0 14px #ff0d00, 0 1px 4px #ff0d00;
          transition:color 0.3s, text-shadow 0.3s;
        }
        .svc-card:hover .card-title {
          color: #ffffff;
          text-shadow:0 0 20px #ff0d00, 0 0 40px #ff0d00, 0 1px 4px #ff0d00;
        }

        /* Section heading */
        .svc-heading {
          font-family:'Orbitron',monospace; font-weight:700;
          font-size:clamp(16px,2.4vw,28px);
          color: #cce8f6; text-align:center;
          margin-bottom:clamp(36px,5vw,60px);
          letter-spacing:0.07em; position:relative; z-index:2;
          text-shadow:0 0 40px #ff0d00;
        }

        .svc-heading em {
          font-style:normal;
          color: #ff0d00;
          text-shadow:0 0 24px #ff0d00, 0 0 50px #ff0d00;
        }

        /* Card row */
        .svc-row {
          display:flex; gap:clamp(18px,3.5vw,42px);
          justify-content:center; align-items:center;
          flex-wrap:wrap; position:relative; z-index:2;
        }

        @media (max-width:640px) {
          .svc-card { width:clamp(170px,72vw,240px); }
        }
      `}</style>
        
       {/* <Particles
        particleColors={["#1a6aff","#105ae3","#85cbee"]}
        particleCount={1000}
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
      {/* Animated background canvas */}
      {/* <BackgroundCanvas /> */}

      {/* Atmospheric glow blobs */}
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'10%', left:'5%', width:'300px', height:'300px', borderRadius:'50%', filter:'blur(40px)' }} />
        <div style={{ position:'absolute', bottom:'15%', right:'5%', width:'350px', height:'350px', borderRadius:'50%', filter:'blur(50px)' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'500px', height:'200px', borderRadius:'50%',  filter:'blur(30px)' }} />
      </div>

      {/* Heading */}
      <h2 className="svc-heading">
        Professional security services <em>you can trust</em>
      </h2>

      {/* Cards */}
      <div className="svc-row">
        {services.map((svc, i) => (
          <div
            key={svc.id}
            className="svc-card"
            style={{ animationDelay: `${i * 0.14}s` }}
            onMouseEnter={() => setHovered(svc.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Main clipped body */}
            <div className="card-body">
              <img src={svc.image.src} alt={svc.title} className="card-img" />
              <div className="card-overlay" />
              <div className="card-lightning-l" />
              <div className="card-lightning-r" />
              <div className="card-scan" />
              <div className="card-shimmer" />

              {/* SVG border frame */}
              <svg
                className="card-frame"
                viewBox="0 0 100 139"
                preserveAspectRatio="none"
                style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
              >
                {/* Main border polygon */}
                <path
                  className="frame-path"
                  d="M2.5,4.8 L5,1 L95,1 L97.5,4.8 L97.5,134.2 L95,138 L5,138 L2.5,134.2 Z"
                />
                {/* Top center bright dash */}
                <line className="frame-accent" x1="38" y1="1" x2="62" y2="1" />
                {/* Bottom center bright dash */}
                <line className="frame-accent" x1="38" y1="138" x2="62" y2="138" />
                {/* Top-left diagonal accent */}
                <line className="frame-path" x1="1" y1="20" x2="8" y2="1" strokeWidth="0.8" opacity="0.5"/>
                {/* Top-right diagonal accent */}
                <line className="frame-path" x1="99" y1="20" x2="92" y2="1" strokeWidth="0.8" opacity="0.5"/>
                {/* Bottom-left */}
                <line className="frame-path" x1="1" y1="119" x2="8" y2="138" strokeWidth="0.8" opacity="0.5"/>
                {/* Bottom-right */}
                <line className="frame-path" x1="99" y1="119" x2="92" y2="138" strokeWidth="0.8" opacity="0.5"/>
                {/* Mid-left notch */}
                <line className="frame-path" x1="1" y1="62" x2="1" y2="77" strokeWidth="2.5" opacity="0.9"/>
                {/* Mid-right notch */}
                <line className="frame-path" x1="99" y1="62" x2="99" y2="77" strokeWidth="2.5" opacity="0.9"/>
                {/* Inner glow rect */}
                <path
                  d="M5,8 L95,8 L95,131 L5,131 Z"
                  fill="none"
                  stroke="#9a3934"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Corner brackets (outside clip) */}
            <div className="c-tl" /><div className="c-tr" />
            <div className="c-bl" /><div className="c-br" />
            <div className="tick-l" /><div className="tick-r" />

            {/* Icon bubble */}
            <div className="icon-wrap" dangerouslySetInnerHTML={{ __html: svc.icon }} />

            {/* Title */}
            <div className="card-title">{svc.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

