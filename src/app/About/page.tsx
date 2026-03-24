'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Data ───────────────────────────────────────────────────
const STATS = [
  { value: '2012', label: 'Established' },
  { value: '25+',  label: 'Years Combined Experience' },
  { value: '7',    label: 'Global Locations' },
  { value: '24/7', label: 'Operational Readiness' },
]
const SERVICES = [
  { title: 'Close Protection',      desc: 'Discreet, close-range protection for individuals requiring constant security in both public and private environments.' },
  { title: 'Executive Protection',  desc: 'Comprehensive, intelligence-led protection strategies designed for executives, high-net-worth individuals, and corporate leaders.' },
  { title: 'Secure Transportation', desc: 'Professional security drivers and controlled vehicle operations ensuring safe, efficient, and confidential movement.' },
]
const ADDITIONAL = [
  'Private and corporate security', 'Child and family protection',
  'Protection of assets and high-value goods', 'Close protection chauffeur services',
  'Residential security teams',
]
const LOCATIONS = [
  'Tirana, Albania', 'Rome, Italy', 'Dubai, UAE',
  'Abu Dhabi, UAE',  'Doha, Qatar', 'New York City, USA',
  'London, United Kingdom',
]
const STANDARDS = ['Discretion', 'Precision', 'Reliability', 'Operational excellence']
const REASONS = [
  'Elite, vetted professionals with military and special forces backgrounds',
  'Global operational capability',
  'Tailored, client-focused security solutions',
  'Proven experience in complex and high-risk environments',
  'Uncompromising commitment to quality and professionalism',
]

// ── Spark canvas ───────────────────────────────────────────
function SparkBg() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!
    let raf: number
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    interface S { x:number;y:number;vx:number;vy:number;life:number;max:number;r:number }
    const sparks: S[] = []
    let f = 0
    const draw = () => {
      raf = requestAnimationFrame(draw); f++
      ctx.clearRect(0, 0, c.width, c.height)
      if (f % 8 === 0)
        for (let i = 0; i < 2; i++)
          sparks.push({ x:Math.random()*c.width, y:Math.random()*c.height, vx:(Math.random()-.5)*.4, vy:-Math.random()*.5-.1, life:0, max:80+Math.random()*100, r:Math.random()*1.5+.4 })
      for (let gx = 24; gx < c.width; gx += 24)
        for (let gy = 24; gy < c.height; gy += 24) {
          ctx.beginPath(); ctx.arc(gx, gy, .8, 0, Math.PI*2)
          ctx.fillStyle = 'rgba(180,10,10,0.08)'; ctx.fill()
        }
      for (let i = sparks.length-1; i >= 0; i--) {
        const s = sparks[i]; s.x+=s.vx; s.y+=s.vy; s.life++
        if (s.life > s.max) { sparks.splice(i,1); continue }
        const a = Math.sin((s.life/s.max)*Math.PI)*.6
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(220,30,30,${a})`; ctx.shadowBlur=6; ctx.shadowColor='rgba(200,20,20,.4)'; ctx.fill(); ctx.shadowBlur=0
      }
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{position:'fixed',inset:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}}/>
}

// ── Reveal wrapper ─────────────────────────────────────────
function Reveal({ children, delay=0, className='' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const r = useRef<HTMLDivElement>(null)
  const v = useInView(r, { once: true, margin: '-50px' })
  return (
    <motion.div ref={r} initial={{ opacity:0, y:24 }} animate={v?{opacity:1,y:0}:{}}
      transition={{ duration:.62, delay, ease:[.22,1,.36,1] }} className={className}>
      {children}
    </motion.div>
  )
}

// ── Section label ──────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:'clamp(10px,1.5vw,16px)' }}>
      <span style={{ width:18, height:1.5, background:'rgba(200,30,30,0.65)', display:'block', flexShrink:0 }}/>
      <p style={{ fontSize:'clamp(8px,1vw,10px)', fontWeight:700, letterSpacing:'0.28em', color:'rgba(200,50,50,0.85)', textTransform:'uppercase', margin:0 }}>
        {children}
      </p>
    </div>
  )
}

// ── Futuristic card ────────────────────────────────────────
function FCard({ children, accent=false, style={} }: { children: React.ReactNode; accent?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{
      position:'relative', padding:'clamp(16px,2.5vw,28px)', overflow:'hidden',
      border: accent ? '1px solid rgba(200,30,30,0.35)' : '1px solid rgba(255,255,255,0.07)',
      background: accent ? 'linear-gradient(135deg,rgba(120,0,0,0.18),rgba(0,0,0,0.4))' : 'rgba(255,255,255,0.035)',
      backdropFilter:'blur(10px)',
      clipPath:'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))',
      ...style,
    }}>
      <span style={{position:'absolute',top:0,left:0,width:10,height:10,borderTop:'1.5px solid rgba(200,30,30,0.55)',borderLeft:'1.5px solid rgba(200,30,30,0.55)'}}/>
      <span style={{position:'absolute',bottom:0,right:0,width:10,height:10,borderBottom:'1.5px solid rgba(200,30,30,0.55)',borderRight:'1.5px solid rgba(200,30,30,0.55)'}}/>
      {children}
    </div>
  )
}

// ── Pill tag ───────────────────────────────────────────────
function Pill({ children, red=false }: { children: React.ReactNode; red?: boolean }) {
  return (
    <div style={{
      padding:'clamp(7px,1vw,10px) clamp(10px,1.5vw,14px)',
      fontSize:'clamp(11px,1.3vw,14px)', lineHeight:1.4,
      border: red ? '1px solid rgba(200,30,30,0.3)' : '1px solid rgba(255,255,255,0.08)',
      background: red ? 'rgba(100,0,0,0.18)' : 'rgba(0,0,0,0.3)',
      color: red ? '#e8a0a0' : '#c0c0c0',
      clipPath:'polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))',
    }}>
      {children}
    </div>
  )
}

// ── Bullet list ────────────────────────────────────────────
function BList({ items }: { items: string[] }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'clamp(8px,1.2vw,12px)' }}>
      {items.map((item,i) => (
        <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
          <span style={{ width:5,height:5,borderRadius:'50%',background:'rgba(220,40,40,0.8)',flexShrink:0,marginTop:'clamp(4px,0.6vw,7px)',boxShadow:'0 0 5px rgba(200,20,20,0.5)' }}/>
          <p style={{ fontSize:'clamp(12px,1.4vw,15px)', color:'#e0e0e0', lineHeight:1.6, margin:0 }}>{item}</p>
        </div>
      ))}
    </div>
  )
}

// ── Body text helper ───────────────────────────────────────
const bodyStyle = (color='#c0c0c0', mb=12): React.CSSProperties => ({
  fontSize: 'clamp(13px,1.4vw,16px)', color, lineHeight:1.7, marginBottom:mb,
})

// ── Main ───────────────────────────────────────────────────
export default function AboutUsPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-hero-h1 span', { opacity:0, y:28 },
        { opacity:1, y:0, duration:.65, stagger:.04, ease:'power3.out', delay:.2 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── Responsive styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');

        /* Hero inner grid: side-by-side on md+, stacked on mobile */
        .about-hero-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(20px,3vw,40px);
          align-items: end;
        }
        @media (max-width: 640px) {
          .about-hero-inner {
            grid-template-columns: 1fr;
          }
          .about-stats-card {
            min-width: unset !important;
            width: 100%;
          }
        }

        /* CTA bottom grid: side-by-side on md+, stacked on mobile */
        .about-cta-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(20px,3vw,40px);
          align-items: center;
          position: relative;
        }
        @media (max-width: 640px) {
          .about-cta-inner {
            grid-template-columns: 1fr;
          }
          .about-cta-btns {
            flex-direction: row !important;
            flex-wrap: wrap;
          }
          .about-cta-btns button {
            flex: 1;
            min-width: 140px;
          }
        }

        /* Badge text truncate on tiny screens */
        @media (max-width: 420px) {
          .about-badge-text { font-size: 7px !important; letter-spacing: 0.16em !important; }
        }
      `}</style>

      <div ref={pageRef} style={{ minHeight:'100vh', background:'#000', color:'#e0e0e0', position:'relative', overflowX:'hidden', paddingTop:12 }}>
        <SparkBg/>
        <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
          background:'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(140,0,0,0.22) 0%, transparent 70%)' }}/>

        <main style={{
          position:'relative', zIndex:2,
          maxWidth:1200, margin:'0 auto',
          padding:'clamp(72px,10vw,120px) clamp(14px,5vw,48px) clamp(48px,8vw,100px)',
        }}>

          {/* ══ SECTION 1 — Hero ══════════════════════════ */}
          <section style={{
            display:'grid', gridTemplateColumns:'1fr',
            gap:'clamp(24px,4vw,48px)',
            paddingBottom:'clamp(32px,5vw,60px)',
            borderBottom:'1px solid rgba(200,30,30,0.14)',
            marginBottom:'clamp(32px,5vw,56px)',
          }}>

            {/* Badge */}
            <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.55}}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, border:'1px solid rgba(200,30,30,0.3)', background:'rgba(100,0,0,0.15)', padding:'clamp(4px,0.6vw,6px) clamp(10px,1.5vw,16px)', clipPath:'polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))' }}>
                <span style={{ width:5,height:5,borderRadius:'50%',background:'#cc2020',boxShadow:'0 0 6px rgba(200,20,20,0.7)',flexShrink:0 }}/>
                <span className="about-badge-text" style={{ fontSize:'clamp(8px,1vw,11px)', fontWeight:700, letterSpacing:'0.22em', color:'rgba(200,80,80,0.9)', textTransform:'uppercase' }}>
                  International Statement Security Services
                </span>
              </div>
            </motion.div>

            {/* Hero inner: title + stats */}
            <div className="about-hero-inner">
              <div>
                <h1 className="about-hero-h1" style={{ fontFamily:"'Orbitron',monospace", fontSize:'clamp(1.7rem,5.5vw,4rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'0.04em', marginBottom:'clamp(14px,2vw,20px)' }}>
                  {'About Us'.split('').map((ch,i) => (
                    <span key={i} style={{ opacity:0, display: ch===' ' ? 'inline' : 'inline-block' }}>{ch}</span>
                  ))}
                </h1>
                <p style={{ ...bodyStyle('#c0c0c0', 10), maxWidth:620 }}>
                  Protection is not just a service — it is a responsibility we uphold with
                  <strong style={{ color:'#fff', fontWeight:700 }}> precision, discipline, and absolute discretion.</strong>
                </p>
                <p style={{ ...bodyStyle('#999', 0), maxWidth:600 }}>
                  Founded in 2012 by a former special forces professional, built on operational expertise and a commitment to delivering uncompromising security solutions. Today, we are a trusted global provider of close protection, executive protection, and secure transportation services.
                </p>
              </div>

              {/* Stats grid */}
              <Reveal delay={.28}>
                <FCard accent style={{ minWidth:'clamp(180px,22vw,240px)' }} >
                  <div className="about-stats-card" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(12px,1.8vw,18px)' }}>
                    {STATS.map(s => (
                      <div key={s.label}>
                        <div style={{ fontFamily:"'Orbitron',monospace", fontSize:'clamp(15px,2vw,22px)', fontWeight:700, color:'#fff', textShadow:'0 0 14px rgba(220,40,40,0.45)', lineHeight:1 }}>{s.value}</div>
                        <div style={{ fontSize:'clamp(9px,1vw,11px)', color:'#666', marginTop:4, letterSpacing:'0.05em', lineHeight:1.3 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </FCard>
              </Reveal>
            </div>
          </section>

          {/* ══ SECTION 2 — Who We Are / Standard ══════════ */}
          <section style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:'clamp(14px,2.5vw,22px)', marginBottom:'clamp(32px,5vw,56px)' }}>
            <Reveal delay={.05}>
              <FCard style={{ height:'100%' }}>
                <Label>Who We Are</Label>
                <p style={bodyStyle('#ddd', 10)}>We are a team of highly trained professionals drawn from elite military units, special forces, and law enforcement backgrounds.</p>
                <p style={bodyStyle('#bbb', 10)}>With over 25 years of combined real-world experience, our operatives are selected for their ability to perform in high-pressure environments while maintaining the highest standards of professionalism and confidentiality.</p>
                <p style={bodyStyle('#bbb', 0)}>Every assignment is approached with strategic planning, situational awareness, and attention to detail — ensuring our clients remain secure at all times.</p>
              </FCard>
            </Reveal>
            <Reveal delay={.12}>
              <FCard accent style={{ height:'100%' }}>
                <Label>Our Standard</Label>
                <p style={bodyStyle('#ddd', 16)}>Our personnel are carefully selected, highly experienced, and continuously trained to meet the demands of modern security challenges.</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(8px,1.2vw,12px)', marginBottom:'clamp(14px,2vw,18px)' }}>
                  {STANDARDS.map(s => (
                    <motion.div key={s} whileHover={{ scale:1.03 }} transition={{ type:'spring', stiffness:300 }}>
                      <Pill red>{s}</Pill>
                    </motion.div>
                  ))}
                </div>
                <p style={bodyStyle('#bbb', 0)}>We focus not only on response, but on prevention — identifying risks before they become threats.</p>
              </FCard>
            </Reveal>
          </section>

          {/* ══ SECTION 3 — What We Do ══════════════════════ */}
          <section style={{ marginBottom:'clamp(32px,5vw,56px)' }}>
            <Reveal><Label>What We Do</Label></Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap:'clamp(12px,2vw,18px)', marginBottom:'clamp(12px,1.5vw,16px)' }}>
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i*.1}>
                  <motion.div whileHover={{ y:-4 }} transition={{ type:'spring', stiffness:250 }}>
                    <FCard style={{ height:'100%' }}>
                      <div style={{ fontFamily:"'Orbitron',monospace", fontSize:'clamp(9px,1vw,11px)', color:'rgba(200,40,40,0.6)', letterSpacing:'0.2em', marginBottom:'clamp(7px,1vw,10px)' }}>
                        {String(i+1).padStart(2,'0')}
                      </div>
                      <h3 style={{ fontSize:'clamp(13px,1.6vw,18px)', fontWeight:700, color:'#fff', marginBottom:'clamp(7px,1vw,10px)', lineHeight:1.2 }}>{s.title}</h3>
                      <p style={bodyStyle('#bbb', 0)}>{s.desc}</p>
                    </FCard>
                  </motion.div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={.14}>
              <FCard>
                <p style={{ fontSize:'clamp(8px,1vw,11px)', fontWeight:700, letterSpacing:'0.22em', color:'rgba(200,50,50,0.8)', textTransform:'uppercase', marginBottom:'clamp(10px,1.2vw,14px)' }}>
                  Additional Services
                </p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,160px),1fr))', gap:'clamp(7px,1vw,10px)' }}>
                  {ADDITIONAL.map((a, i) => (
                    <motion.div key={a} initial={{ opacity:0, x:-8 }} whileInView={{ opacity:1, x:0 }}
                      viewport={{ once:true }} transition={{ delay: i*.06, duration:.38 }}>
                      <Pill>{a}</Pill>
                    </motion.div>
                  ))}
                </div>
              </FCard>
            </Reveal>
          </section>

          {/* ══ SECTION 4 — Locations / Why Us ═════════════ */}
          <section style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:'clamp(14px,2.5vw,22px)', marginBottom:'clamp(32px,5vw,56px)' }}>
            <Reveal delay={.05}>
              <FCard style={{ height:'100%' }}>
                <Label>Global Operations</Label>
                <p style={bodyStyle('#ddd', 14)}>We operate across key international locations, delivering consistent, high-level protection worldwide.</p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,140px),1fr))', gap:'clamp(6px,1vw,8px)', marginBottom:14 }}>
                  {LOCATIONS.map((loc, i) => (
                    <motion.div key={loc} initial={{ opacity:0, scale:.9 }} whileInView={{ opacity:1, scale:1 }}
                      viewport={{ once:true }} transition={{ delay:i*.055 }}>
                      <Pill red>{loc}</Pill>
                    </motion.div>
                  ))}
                </div>
                <p style={bodyStyle('#aaa', 0)}>Our global presence allows us to support clients seamlessly across multiple regions and environments.</p>
              </FCard>
            </Reveal>
            <Reveal delay={.12}>
              <FCard accent style={{ height:'100%' }}>
                <Label>Why Choose Us</Label>
                <BList items={REASONS} />
              </FCard>
            </Reveal>
          </section>

          {/* ══ SECTION 5 — CTA ════════════════════════════ */}
          <Reveal>
            <div style={{
              position:'relative', padding:'clamp(22px,4vw,46px)',
              border:'1px solid rgba(200,30,30,0.3)',
              background:'linear-gradient(135deg, rgba(120,0,0,0.22) 0%, rgba(0,0,0,0.5) 100%)',
              backdropFilter:'blur(12px)',
              clipPath:'polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,18px 100%,0 calc(100% - 18px))',
              boxShadow:'0 0 50px rgba(120,0,0,0.16)',
              overflow:'hidden',
            }}>
              {/* Corner brackets */}
              {['tl','tr','bl','br'].map(c => (
                <span key={c} style={{
                  position:'absolute',
                  top: c.startsWith('t') ? 0 : 'auto', bottom: c.startsWith('b') ? 0 : 'auto',
                  left: c.endsWith('l') ? 0 : 'auto', right: c.endsWith('r') ? 0 : 'auto',
                  width:14, height:14,
                  borderTop: c.startsWith('t') ? '2px solid rgba(220,40,40,0.65)' : 'none',
                  borderBottom: c.startsWith('b') ? '2px solid rgba(220,40,40,0.65)' : 'none',
                  borderLeft: c.endsWith('l') ? '2px solid rgba(220,40,40,0.65)' : 'none',
                  borderRight: c.endsWith('r') ? '2px solid rgba(220,40,40,0.65)' : 'none',
                }}/>
              ))}
              <div style={{position:'absolute',inset:0,pointerEvents:'none',background:'radial-gradient(ellipse at 30% 50%, rgba(160,0,0,0.12) 0%, transparent 65%)'}}/>

              <div className="about-cta-inner">
                <div>
                  <Label>Our Commitment</Label>
                  <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize:'clamp(1rem,2.5vw,1.85rem)', fontWeight:700, lineHeight:1.2, color:'#fff', marginBottom:'clamp(10px,1.5vw,14px)', letterSpacing:'0.03em' }}>
                    We operate with integrity.<br/>We deliver with precision.
                  </h2>
                  <p style={{ ...bodyStyle('#ccc', 0), maxWidth:520 }}>
                    At International Statement Security Services, the safety, privacy, and confidence of our clients are our highest priorities. We protect without compromise across every assignment, environment, and location.
                  </p>
                </div>

                <div className="about-cta-btns" style={{ display:'flex', flexDirection:'column', gap:'clamp(8px,1.2vw,12px)', flexShrink:0 }}>
                  {[
                    { label:'Request Protection Services', primary: true },
                    { label:'Contact Our Team', primary: false },
                  ].map(btn => (
                    <motion.button key={btn.label} whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }}
                      style={{
                        padding:'clamp(9px,1.2vw,12px) clamp(14px,2vw,22px)',
                        fontSize:'clamp(9px,1vw,11px)', fontWeight:700, letterSpacing:'0.16em',
                        textTransform:'uppercase', cursor:'pointer', whiteSpace:'nowrap',
                        border: btn.primary ? 'none' : '1px solid rgba(255,255,255,0.12)',
                        background: btn.primary ? '#cc1a1a' : 'rgba(255,255,255,0.04)',
                        color:'#fff',
                        clipPath:'polygon(0 0,calc(100% - 9px) 0,100% 9px,100% 100%,9px 100%,0 calc(100% - 9px))',
                        boxShadow: btn.primary ? '0 0 22px rgba(200,20,20,0.4)' : 'none',
                        transition:'all .2s',
                      }}
                      onMouseEnter={e => { if (!btn.primary) (e.currentTarget as HTMLElement).style.borderColor='rgba(200,30,30,0.5)' }}
                      onMouseLeave={e => { if (!btn.primary) (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.12)' }}
                    >
                      {btn.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

        </main>
      </div>
    </>
  )
}