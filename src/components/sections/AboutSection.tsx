'use client'

import { useState, useRef, useEffect } from 'react'
import Owners from "@/assets/sdfds.webp"

// ── Animated canvas background ────────────────────────────
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number, w = 0, h = 0

    interface P { x: number; y: number; vx: number; vy: number; r: number; o: number }
    let pts: P[] = []

    const init = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      pts = Array.from({ length: 410 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * 0.4, vy: (Math.random() - .5) * 0.4,
        r: Math.random() * 1.8 + 0.6,
        o: Math.random() * 0.5 + 0.2,
      }))
    }

    const draw = () => {
      raf = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, w, h)

      // move
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
      })

      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(255, 13, 0,${0.12 * (1 - d / 130)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // dots
      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 13, 0,${p.o})`
        ctx.fill()
      })

      // Dot grid
      const gap = 28
      for (let gx = 0; gx < w; gx += gap) {
        for (let gy = 0; gy < h; gy += gap) {
          ctx.beginPath()
          ctx.arc(gx, gy, 0.9, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(33, 8, 7, 0.59)'
          ctx.fill()
        }
      }
    }

    init()
    window.addEventListener('resize', init)
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init) }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}

export default function AboutContact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleSend = async () => {
    const e: Record<string, boolean> = {}
    if (!form.name) e.name = true
    if (!form.email) e.email = true
    if (!form.message) e.message = true
    try {
      const formData = new FormData()

      formData.append("formType", "aboutForm")
      formData.append("fullName", form.name)
      formData.append("email", form.email)
      formData.append("message", form.message)

      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData
      })

      if (!res.ok) throw new Error("Failed")

      setSent(true)

      setTimeout(() => {
        setSent(false)
        setForm({ name: "", email: "", message: "" })
      }, 3000)

    } catch (err) {
      console.error(err)
      alert("Failed to send message")
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        /* ── Section ── */
        .ac-section {
          position: relative;
          min-height: 100vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: clamp(56px,7vw,100px) clamp(20px,5vw,64px);
          font-family: 'Rajdhani', sans-serif;
          z-index:10;
        }

        /* perspective floor */
        .ac-section::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 38%;
          background-image:
            linear-gradient(rgba(0,140,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,140,255,0.055) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: bottom;
          pointer-events: none; z-index: 1;
        }

        .ac-inner {
          position: relative; z-index: 2;
          max-width: 1200px; width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px,5vw,64px);
          align-items: center;
        }

        @media (max-width: 900px) {
          .ac-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* ── Left column ── */
        .ac-left {}

        .ac-tag-row {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 14px;
        }
        .ac-tag-dash {
          width: 32px; height: 1.5px;
          background: linear-gradient(90deg, #ff0d00, transparent);
        }
        .ac-tag-label {
          font-size:20px; font-weight: 700; letter-spacing: 0.3em;
          color: #ff0d00; text-transform: uppercase;
        }

        .ac-heading {
          font-family:'Orbitron',monospace;
          font-size: clamp(40px, 4.5vw, 62px);
          width:100%;
        //   text-align:center;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: clamp(24px, 3vw, 36px);
        }
        .ac-heading-white { color: #e0f0fa; display: block; }
        .ac-heading-blue {
          color: #ff0d00;
          display: block;
          text-shadow: 0 0 20px ff0d00, 0 0 45px ff0d00;
        }

        /* Image wrapper — responsive */
        .ac-img-wrap {
          position: relative;
          width: 100%;
          min-height:200px;
          max-width: 660px;
        //   background:red;
        }
        .ac-img-wrap img {
          width: 100%;
          height:'clamp(200px,5vw600px)';
          display: block;
          object-fit: contain;
          filter: drop-shadow(0 0 30px #ff0d0023) drop-shadow(0 0 60px #ff0d0048);
        }

        /* Ground glow under image */
        .ac-img-glow {
          position: absolute;
          bottom: -10px; left: 50%; transform: translateX(-50%);
          width: 80%; height: 40px;
          background: radial-gradient(ellipse, #ff0d00 0%, transparent 70%);
          filter: blur(12px);
          pointer-events: none;
        }

        /* ── Right column: form ── */
        .ac-form-outer {
          position: relative;
          border-radius: 12px;
          padding: 2px;
          background: linear-gradient(145deg, #ff0d00, #ff0d00, #ff0d00);
        }

        /* Animated glowing border */
        @keyframes borderGlow {
          0%,100% {
            box-shadow:
              0 0 18px #ff0d00a7,
              0 0 40px #ff0d00,
              0 0 80px #ff0d00,
              inset 0 0 18px #ff0d00;
          }
          50% {
            box-shadow:
              0 0 32px #ff0d0039,
              0 0 65px #ff0d00c1,
              0 0 120px #ff0d00c1,
              inset 0 0 28px #ff0d00d5;
          }
        }

        /* Blinking border segments */
        @keyframes borderBlink {
          0%,48%  { border-color: #ff0d00; }
          50%,98% { border-color: #ff0d00; }
        }

        @keyframes scanLine {
          0%   { top: -4%; opacity: 0.7; }
          100% { top: 110%; opacity: 0; }
        }

        @keyframes cornerPulse {
          0%,100% { opacity: 1; filter: drop-shadow(0 0 5px #ff0d00); }
          50%      { opacity: 0.55; filter: drop-shadow(0 0 2px #ff0d00 ); }
        }

        @keyframes inputSlideIn {
          from { opacity:0; transform:translateX(12px); }
          to   { opacity:1; transform:translateX(0); }
        }

        .ac-form-box {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          background: #000;
          border: 1px solid #ff0d00;
          // animation: borderGlow 3s ease-in-out infinite;
          padding: clamp(24px,3.5vw,38px);
        }

        /* Blinking top border overlay */
        .ac-form-box::before {
          content: '';
          position: absolute; top:0; left:0; right:0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff0d00, #ff0d00, #ff0d00, transparent);
          animation: borderBlink 1.2s step-end infinite;
          box-shadow: 0 0 8px #ff0d00;
        }
        /* Blinking bottom border */
        .ac-form-box::after {
          content: '';
          position: absolute; bottom:0; left:0; right:0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff0d00, #ff0d00, #ff0d00, transparent);
          animation: borderBlink 1.2s step-end infinite 0.6s;
          box-shadow: 0 0 8px #ff0d00;
        }

        /* Scan ray */
        .form-scan {
          position: absolute; left:0; right:0; height:3px;
          background: linear-gradient(90deg, transparent, #ff0d00, #ff0d00, #ff0d00, transparent);
          pointer-events: none; z-index: 1;
          animation: scanLine 4s linear infinite;
          box-shadow: 0 0 8px #ff0d00;
        }

        /* Corner brackets */
        .ac-corner {
          position: absolute;
          width: 18px; height: 18px;
          z-index: 5; pointer-events: none;
          animation: cornerPulse 2.2s ease-in-out infinite;
        }
        .ac-corner.tl { top:6px; left:6px; border-top:2px solid #ff0d00; border-left:2px solid #ff0d00; }
        .ac-corner.tr { top:6px; right:6px; border-top:2px solid #ff0d00; border-right:2px solid #ff0d00; }
        .ac-corner.bl { bottom:6px; left:6px; border-bottom:2px solid #ff0d00; border-left:2px solid #ff0d00; }
        .ac-corner.br { bottom:6px; right:6px; border-bottom:2px solid #ff0d00; border-right:2px solid #ff0d00; }

        /* Left + right side blink bars */
        .side-blink {
          position: absolute; top:0; bottom:0; width:2px;
          background: linear-gradient(180deg, transparent 0%, #ff0d00 35%, #ff0d00 50%, #ff0d00 65%, transparent 100%);
          animation: borderBlink 1.2s step-end infinite;
        }
        .side-blink.left  { left:0; animation-delay:0.3s; }
        .side-blink.right { right:0; animation-delay:0.9s; }

        /* Form heading */
        .form-heading {
          font-family:'Orbitron',monospace;
          font-size: clamp(22px,2.8vw,40px);
          font-weight: 700; line-height: 1.15;
          margin-bottom: 22px;
          position: relative; z-index: 2;
        }
        .fh-white { color: #e0f0fa; display: block; }
        .fh-blue  {
          color: #ff0d00; display: block;
          text-shadow: 0 0 16px #ff0d00, 0 0 35px #610c08;
        }

        /* Field group */
        .field-group {
          position: relative; z-index: 2;
          margin-bottom: 14px;
          animation: inputSlideIn 0.4s ease both;
        }
        .field-group:nth-child(1) { animation-delay: 0.05s; }
        .field-group:nth-child(2) { animation-delay: 0.12s; }
        .field-group:nth-child(3) { animation-delay: 0.19s; }

        .field-label {
          display: block;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.18em; color: #ff0d00 ;
          text-transform: uppercase; margin-bottom: 6px;
        }

        /* Cyber input */
        .cyber-field {
          width: 100%;
          background: rgba(5, 7, 11, 0.65);
          border: 1px solid #ff0d00;
          color: #a8d4ec;
          padding: 11px 16px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px; font-weight: 500;
          outline: none;
          border-radius: 6px;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          box-sizing: border-box;
        }
        .cyber-field::placeholder { color: #FFFFFF; }
        .cyber-field:focus {
          border-color: #ff0d00;
          box-shadow: 0 0 16px rgba(0,170,255,0.22), inset 0 0 12px rgba(0,90,200,0.1);
          background: rgba(6, 9, 13, 0.8);
        }
        .cyber-field.error {
          border-color: rgba(255,60,80,0.6);
          box-shadow: 0 0 10px rgba(255,50,70,0.2);
        }
        textarea.cyber-field { resize: vertical; min-height: 96px; }

        /* Submit */
        .submit-btn {
          width: 100%;
          padding: 13px 20px;
          background: linear-gradient(90deg, #ff0d00, #ff0d00, #ff0d00);
          background-size: 200% 100%;
          border: 1px solid #ff0d00;
          border-radius: 7px;
          color: white;
          font-family: 'Orbitron', monospace;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background-position 0.4s, box-shadow 0.3s, transform 0.15s;
          box-shadow: 0 0 20px rgba(0,120,255,0.45), 0 0 45px rgba(0,70,220,0.25);
          position: relative; z-index: 2;
          margin-top: 18px;
        }
        .submit-btn:hover {
          background-position: 100% 0;
          box-shadow: 0 0 30px #890902, 0 0 65px #6f0a05;
          transform: translateY(-2px);
        }
        .submit-btn:active { transform: scale(0.98); }
        .submit-btn.sent {
          background: linear-gradient(90deg, #004422, #008844);
          border-color: rgba(0,200,100,0.6);
          box-shadow: 0 0 20px rgba(0,180,80,0.5);
        }
      `}</style>

      <section className="ac-section">
        {/* Animated particle + dot canvas */}
        <ParticleCanvas />

        {/* Ambient glow blobs */}
        <div style={{ position:'absolute', left:'8%', top:'55%', width:460, height:460, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,50,180,0.18) 0%,transparent 70%)', filter:'blur(55px)', zIndex:0, pointerEvents:'none' }} />
        <div style={{ position:'absolute', left:'75%', top:'30%', width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,70,200,0.14) 0%,transparent 70%)', filter:'blur(50px)', zIndex:0, pointerEvents:'none' }} />

        <div className="ac-inner">

          {/* ── LEFT: heading + image ── */}
          <div className="ac-left">
            <div className="ac-tag-row">
              <div className="ac-tag-dash" />
              <span className="ac-tag-label">About Us</span>
            </div>

            <h2 className="ac-heading">
              <span className="ac-heading-white">We love to</span>
              <span className="ac-heading-blue">hear from you.</span>
            </h2>

            {/* Responsive image */}
            <div className="ac-img-wrap">
              <img src={Owners?.src} alt="Statement Security Team" />
              <div className="ac-img-glow" />
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div className="ac-form-outer">
            <div className="ac-form-box">
              {/* Scan ray */}
              <div className="form-scan" />

              {/* Blinking side bars */}
              <div className="side-blink left" />
              <div className="side-blink right" />

              {/* Corner brackets */}
              <div className="ac-corner tl" /><div className="ac-corner tr" />
              <div className="ac-corner bl" /><div className="ac-corner br" />

              <div className="form-heading">
                <span className="fh-white">We love to</span>
                <span className="fh-blue">hear from you.</span>
              </div>

              {/* Name */}
              <div className="field-group">
                <label className="field-label">Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={`cyber-field${errors.name ? ' error' : ''}`}
                />
              </div>

              {/* Email */}
              <div className="field-group">
                <label className="field-label">Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className={`cyber-field${errors.email ? ' error' : ''}`}
                />
              </div>

              {/* Message */}
              <div className="field-group">
                <label className="field-label">Message *</label>
                <textarea
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className={`cyber-field${errors.message ? ' error' : ''}`}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSend}
                className={`submit-btn${sent ? ' sent' : ''}`}
              >
                {sent ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4z"/></svg>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}