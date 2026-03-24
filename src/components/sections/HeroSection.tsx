'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SITE_CONFIG, STATS, LOCATIONS } from '@/data/siteData'
import HeroImage from "@/assets/HEROO.webp"

// ── Animation variants ────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const itemVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

// ══════════════════════════════════════════════════════════
// FUTURISTIC BACKGROUND — 3-layer canvas
// ══════════════════════════════════════════════════════════
function FuturisticBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let w = 0, h = 0

    // ── Node network ──────────────────────────────────────
    interface Node {
      x: number; y: number
      vx: number; vy: number
      r: number; pulse: number; phase: number
    }
    let nodes: Node[] = []

    // ── Spark particles ───────────────────────────────────
    interface Spark {
      x: number; y: number
      vx: number; vy: number
      life: number; maxLife: number
      r: number; red: boolean
    }
    const sparks: Spark[] = []

    // ── Radar ─────────────────────────────────────────────
    let radarAngle = 0

    const init = () => {
      w = canvas.width  = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight

      // Scatter nodes across canvas
      nodes = Array.from({ length: 55 }, () => ({
        x:     Math.random() * w,
        y:     Math.random() * h,
        vx:    (Math.random() - .5) * .28,
        vy:    (Math.random() - .5) * .28,
        r:     Math.random() * 2 + 1,
        pulse: 0,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const spawnSparks = () => {
      for (let i = 0; i < 2; i++) {
        sparks.push({
          x:       Math.random() * w,
          y:       Math.random() * h,
          vx:      (Math.random() - .5) * .5,
          vy:      -Math.random() * .6 - .1,
          life:    0,
          maxLife: 90 + Math.random() * 120,
          r:       Math.random() * 1.4 + .4,
          red:     Math.random() > .5,
        })
      }
    }

    let frame = 0

    const draw = () => {
      raf = requestAnimationFrame(draw)
      frame++
      ctx.clearRect(0, 0, w, h)

      // ── 1. Perspective grid ─────────────────────────────
      const horizon = h * .42
      const VP_X    = w * .5
      const GRID_LINES = 18
      const GRID_COLS  = 20

      // Vertical lines (converging to horizon)
      for (let i = 0; i <= GRID_COLS; i++) {
        const t   = i / GRID_COLS
        const bx  = w * t
        ctx.beginPath()
        ctx.moveTo(VP_X + (bx - VP_X) * .05, horizon)
        ctx.lineTo(bx, h)
        const alpha = .07 + (Math.abs(t - .5) < .15 ? .05 : 0)
        ctx.strokeStyle = `rgba(180,10,10,${alpha})`
        ctx.lineWidth = .6
        ctx.stroke()
      }
      // Horizontal lines (receding)
      for (let i = 1; i <= GRID_LINES; i++) {
        const t  = i / GRID_LINES
        const y  = horizon + (h - horizon) * (t * t)
        const xL = VP_X * (1 - t * .94)
        const xR = w - VP_X * (1 - t * .94)
        const alpha = .04 + t * .07
        ctx.beginPath()
        ctx.moveTo(xL, y)
        ctx.lineTo(xR, y)
        ctx.strokeStyle = `rgba(180,10,10,${alpha})`
        ctx.lineWidth = .5
        ctx.stroke()
      }

      // ── 2. Moving node network ──────────────────────────
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0)  n.x = w
        if (n.x > w)  n.x = 0
        if (n.y < 0)  n.y = h
        if (n.y > h)  n.y = 0
      })

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 160) {
            const a = (1 - d / 160) * .18
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(200,20,20,${a})`
            ctx.lineWidth = .7
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((n, i) => {
        const pulse = Math.sin(n.phase + frame * .022) * .5 + .5
        const grd   = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3)
        grd.addColorStop(0, `rgba(220,30,30,${.5 + pulse * .4})`)
        grd.addColorStop(1, 'rgba(220,30,30,0)')
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,60,60,${.6 + pulse * .3})`
        ctx.shadowBlur  = 8
        ctx.shadowColor = 'rgba(220,30,30,.6)'
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // ── 3. Radar (right side) ──────────────────────────
      const RX = w * .82, RY = h * .38, RR = Math.min(w, h) * .26
      radarAngle = (radarAngle + .008) % (Math.PI * 2)

      // Rings
      ;[1, .78, .56, .34, .15].forEach((fac, ri) => {
        ctx.beginPath()
        ctx.arc(RX, RY, RR * fac, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(200,20,20,${.12 - ri * .015})`
        ctx.lineWidth = ri % 2 === 0 ? .9 : .5
        ctx.setLineDash(ri % 2 === 0 ? [5, 6] : [])
        ctx.stroke()
        ctx.setLineDash([])
      })

      // Cross hairs
      ;[[RX - RR * 1.05, RY, RX + RR * 1.05, RY],
        [RX, RY - RR * 1.05, RX, RY + RR * 1.05],
        [RX - RR * .74, RY - RR * .74, RX + RR * .74, RY + RR * .74],
        [RX + RR * .74, RY - RR * .74, RX - RR * .74, RY + RR * .74]
      ].forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2)
        ctx.strokeStyle = 'rgba(200,20,20,.07)'; ctx.lineWidth = .5; ctx.stroke()
      })

      // Sweep sector
      const sweep = ctx.createRadialGradient(RX, RY, 0, RX, RY, RR)
      sweep.addColorStop(0,   'rgba(220,30,30,.22)')
      sweep.addColorStop(1,   'rgba(220,30,30,0)')
      ctx.beginPath()
      ctx.moveTo(RX, RY)
      ctx.arc(RX, RY, RR, radarAngle - .55, radarAngle)
      ctx.closePath()
      ctx.fillStyle = sweep
      ctx.fill()

      // Blip dots on radar
      ;[[.3, .4], [.6, .25], [.75, .65], [-.3, .55]].forEach(([dx, dy], bi) => {
        const bx = RX + RR * dx, by = RY + RR * dy
        const blinkA = Math.sin(frame * .04 + bi * 1.4) * .5 + .5
        ctx.beginPath()
        ctx.arc(bx, by, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,60,60,${.4 + blinkA * .5})`
        ctx.shadowBlur  = 6
        ctx.shadowColor = 'rgba(220,30,30,.7)'
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // ── 4. Sparks ───────────────────────────────────────
      if (frame % 6 === 0) spawnSparks()
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx; s.y += s.vy; s.life++
        if (s.life > s.maxLife) { sparks.splice(i, 1); continue }
        const a = Math.sin((s.life / s.maxLife) * Math.PI) * .7
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.red ? `rgba(220,30,30,${a})` : `rgba(255,100,100,${a * .6})`
        ctx.shadowBlur  = 5
        ctx.shadowColor = 'rgba(200,20,20,.5)'
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // ── 5. Aurora blobs ─────────────────────────────────
      ;[
        { cx: w * .15, cy: h * .35, rx: w * .22, ry: h * .28, t: frame * .007 },
        { cx: w * .78, cy: h * .65, rx: w * .18, ry: h * .22, t: frame * .009 + 1 },
        { cx: w * .5,  cy: h * .1,  rx: w * .25, ry: h * .18, t: frame * .005 + 2 },
      ].forEach(b => {
        const ox = Math.sin(b.t) * 30
        const oy = Math.cos(b.t * 1.3) * 20
        const grd = ctx.createRadialGradient(b.cx + ox, b.cy + oy, 0, b.cx + ox, b.cy + oy, b.rx)
        grd.addColorStop(0, 'rgba(140,0,0,0.09)')
        grd.addColorStop(.5, 'rgba(80,0,0,0.04)')
        grd.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.save()
        ctx.scale(1, b.ry / b.rx)
        ctx.beginPath()
        ctx.arc((b.cx + ox), (b.cy + oy) * (b.rx / b.ry), b.rx, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
        ctx.restore()
      })

      // ── 6. Horizontal scan line ──────────────────────────
      const scanY = ((frame * .6) % (h + 60)) - 30
      const scanGrd = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2)
      scanGrd.addColorStop(0,   'rgba(200,20,20,0)')
      scanGrd.addColorStop(.5,  'rgba(200,20,20,0.06)')
      scanGrd.addColorStop(1,   'rgba(200,20,20,0)')
      ctx.fillStyle = scanGrd
      ctx.fillRect(0, scanY - 2, w, 4)
    }

    init()
    window.addEventListener('resize', init)
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none', display:'block' }}
    />
  )
}

// ══════════════════════════════════════════════════════════
// HERO SECTION
// ══════════════════════════════════════════════════════════
export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('[data-count]')
          counters.forEach(el => {
            const target  = parseFloat(el.getAttribute('data-count') || '0')
            const suffix  = el.getAttribute('data-suffix')  || ''
            const display = el.getAttribute('data-display') || ''
            if (display) return
            let current = 0
            const step = target / 80
            const timer = setInterval(() => {
              current = Math.min(current + step, target)
              el.textContent = Math.floor(current) + suffix
              if (current >= target) clearInterval(timer)
            }, 16)
          })
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px clamp(20px, 6vw, 80px) 100px',
        overflow: 'hidden',
        zIndex: 1,
        // Deep dark red-black base
        background: 'radial-gradient(ellipse 130% 100% at 55% 40%, #1a0000 0%, #0d0000 45%, #000000 100%)',
      }}
    >
      {/* ── Layer 1: Hero photo with mask ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: `url(${HeroImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          // Mask: visible center-right, fades out left & bottom
          WebkitMaskImage: 'radial-gradient(ellipse 65% 80% at 70% 45%, black 20%, transparent 75%)',
          maskImage:       'radial-gradient(ellipse 65% 80% at 70% 45%, black 20%, transparent 75%)',
          opacity: 0.85,
        }}
      />

      {/* ── Layer 2: Futuristic animated canvas ── */}
      {/* <FuturisticBg /> */}

      {/* ── Layer 3: Vignette overlays ── */}
      {/* Left dark fade so text is readable */}
      <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
        background:'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.1) 75%, transparent 100%)' }}/>
      {/* Top fade */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'18%', zIndex:2, pointerEvents:'none',
        background:'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)' }}/>
      {/* Bottom fade */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'22%', zIndex:2, pointerEvents:'none',
        background:'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}/>

      {/* ── Scan line CSS animation ── */}
      <div className="scan-line" style={{ zIndex: 3 }} />

      {/* ── HUD corner marks ── */}
      <div className="hud-corners" style={{ zIndex: 4 }}>
        <div className="hud-corner-mark tl" />
        <div className="hud-corner-mark tr" />
        <div className="hud-corner-mark bl" />
        <div className="hud-corner-mark br" />
      </div>

      {/* ── Status badges ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{
          position: 'absolute',
          top: 'clamp(70px, 8vw, 96px)',
          right: 'clamp(16px, 4vw, 32px)',
          flexWrap: 'wrap',
          display: 'flex',
          gap: 10,
          zIndex: 10,
        }}
      >
        {[
          { label: 'Systems Online',     amber: false },
          { label: '8 Locations Active', amber: true },
        ].map(s => (
          <div key={s.label} style={{ display:'flex', alignItems:'center', gap:7 }}>
            <span className={`blink-dot${s.amber ? ' amber' : ''}`} />
            <span style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 12, letterSpacing: '2px',
              color: '#AF0A00', textTransform: 'uppercase', fontWeight: 'bold',
            }}>
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── Hero content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ position:'relative', zIndex:5, maxWidth:750 }}
      >
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 13, letterSpacing: '4px',
            color: '#ff0d00', textTransform: 'uppercase',
            marginBottom: 22,
            display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          <span style={{ width:36, height:1, background:'#ff0d00', display:'block', flexShrink:0 }}/>
          Executive Protection · Global Operations · Est. {SITE_CONFIG.founded}
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(38px, 5.5vw, 64px)',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-1px',
            marginBottom: 26,
          }}
        >
          <span style={{ color:'var(--text)', display:'block' }}>Elite</span>
          <span style={{ color:'#ff0d00', display:'block',
            textShadow:'0 0 30px rgba(255,13,0,0.5), 0 0 60px rgba(200,0,0,0.25)' }}>
            SECURITY SERVICES.
          </span>
          <span style={{ color:'var(--text)', fontSize:'clamp(22px, 3.5vw, 44px)', display:'block' }}>
            WORLDWIDE
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'clamp(14px, 1.6vw, 18px)', color: 'var(--muted)',
            lineHeight: 1.75, maxWidth: 560, marginBottom: 34,
          }}
        >
          Tailored close protection and security services for VVIP clients, royal families,
          diplomats, and high-net-worth individuals — operating at the highest level across
          8 strategic locations worldwide.
        </motion.p>

        {/* Location pills */}
        <motion.div
          variants={itemVariants}
          style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:42 }}
        >
          {LOCATIONS.map(loc => (
            <span
              key={loc.id}
              style={{
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: 15, letterSpacing: '2px',
                color: '#ff0d00',
                border: '1px solid rgba(255,13,0,0.45)',
                padding: '5px 12px', textTransform: 'uppercase',
                transition: 'all .2s', cursor: 'default',
                background: 'rgba(80,0,0,0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#ff0d00'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.background = 'rgba(180,0,0,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,13,0,0.45)'
                e.currentTarget.style.color = '#ff0d00'
                e.currentTarget.style.background = 'rgba(80,0,0,0.2)'
              }}
            >
              {loc.city}{loc.country !== 'USA' && loc.country !== 'UK'
                ? ` · ${loc.country}` : `, ${loc.country}`}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
          <a href="https://ardianrexhepi.com/trainings/" className="btn-primary hero-btn" style={{ background:'#FF0D00' }}>
            Partner Training Programs
          </a>
          {/* <a href="#services" className="btn-secondary"
             style={{ border:'1px solid #5B0102', color:'#FF0D00' }}>
            View Services
          </a> */}
        </motion.div>
      </motion.div>

      {/* ── Stats strip ── */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{
          position: 'absolute', bottom:0, left:0, right:0, zIndex:10,
          display: 'grid',
          gridTemplateColumns: `repeat(${STATS.length}, 1fr)`,
          background: 'rgba(6,0,0,0.90)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(200,0,0,0.2)',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: '14px clamp(12px,2vw,28px)', textAlign:'center',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(200,0,0,0.12)' : 'none',
            }}
          >
            <div
              data-count={stat.value}
              data-suffix={stat.suffix}
              data-display={stat.display || ''}
              style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: 'clamp(20px,2.5vw,32px)', fontWeight:700,
                color: 'var(--text)', lineHeight:1,
                textShadow: '0 0 20px rgba(255,30,30,0.35)',
              }}
            >
              {stat.display || stat.value + stat.suffix}
            </div>
            <div style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 'clamp(9px,1vw,13px)', letterSpacing:'2px',
              color: 'var(--muted)', textTransform:'uppercase', marginTop:5,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}