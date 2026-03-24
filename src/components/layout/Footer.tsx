'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import logo     from '@/assets/LogoISSS.png'
import footerBg from '@/assets/footernew.jpg'

// ── Icons ──────────────────────────────────────────────────
const LinkedInIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
const InstagramIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
const TwitterIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const PhoneIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="rgba(200,30,30,0.9)" strokeWidth="1.6" width="12" height="12"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1C7.16 21 2 15.84 2 6a1 1 0 011-1z"/></svg>
const MailIcon      = () => <svg viewBox="0 0 24 24" fill="none" stroke="rgba(200,30,30,0.9)" strokeWidth="1.6" width="12" height="12"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8l10 7 10-7"/></svg>
const PinIcon       = () => <svg viewBox="0 0 24 24" fill="none" stroke="rgba(200,30,30,0.9)" strokeWidth="1.6" width="12" height="12"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
const ClockIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="rgba(200,30,30,0.9)" strokeWidth="1.6" width="12" height="12"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

const SERVICES = ['Close Protection','VIP Security','Event Security','Residential Security','Secure Chauffeur']
const COMPANY  = [['About','/About'],['Services','#'],['Gallery','/Gallery'],['Contact','#'],['Careers','/Career'],['Training','/Training']]
const SOCIALS  = [
  { icon:<LinkedInIcon/>,  href:'https://www.linkedin.com/company/int-statement-security-services/', label:'LinkedIn'  },
  { icon:<InstagramIcon/>, href:'https://www.instagram.com/statement_security/', label:'Instagram' },
  // { icon:<TwitterIcon/>,   href:'#', label:'Twitter'   },
]
const CONTACT_ITEMS = [
  { icon:<ClockIcon/>, text:'24/7 Operations Center' },
  { icon:<PhoneIcon/>, text:'+1 (631) 336-7291',         href:'tel:+16313367291' },
  { icon:<MailIcon/>,  text:'info@statementsecurity.com', href:'mailto:info@statementsecurity.com' },
  { icon:<PinIcon/>,   text:'NY · London · Dubai · Abu Dhabi · Rome · Tirana · Doha' },
]

// ── Variants ───────────────────────────────────────────────
const wrap = { hidden:{}, show:{ transition:{ staggerChildren:0.07, delayChildren:0.05 } } }
const col  = { hidden:{ opacity:0, y:16 }, show:{ opacity:1, y:0, transition:{ duration:0.5, ease:[0.22,1,0.36,1] as any } } }

// ── Sub-components ─────────────────────────────────────────
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom:10 }}>
      <h4 className="f-col-head" style={{ color:'#cc1a1a', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', margin:'0 0 5px' }}>
        {children}
      </h4>
      <div style={{ width:22, height:1.5, background:'linear-gradient(90deg,rgba(200,30,30,0.8),transparent)' }} />
    </div>
  )
}

function FooterLink({ href, children }: { href:string; children:React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ x:4 }}
      transition={{ type:'spring', stiffness:340, damping:22 }}
      className="f-link"
      style={{ color:'#b0bcc2', textDecoration:'none', display:'flex', alignItems:'center', gap:6, lineHeight:1.4 }}
      onMouseEnter={e=>(e.currentTarget.style.color='#fff')}
      onMouseLeave={e=>(e.currentTarget.style.color='#b0bcc2')}
    >
      <span style={{ width:3, height:3, borderRadius:'50%', background:'rgba(200,30,30,0.65)', flexShrink:0 }} />
      {children}
    </motion.a>
  )
}

function SocialBtn({ icon, href, label }: { icon:React.ReactNode; href:string; label:string }) {
  return (
    <motion.a
      href={href} aria-label={label}
      whileHover={{ scale:1.1, y:-2 }} whileTap={{ scale:.93 }}
      style={{
        width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center',
        border:'1px solid rgba(200,30,30,0.3)', color:'#6a8a96', textDecoration:'none', flexShrink:0,
        clipPath:'polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px))',
        transition:'all .18s',
      }}
      onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(220,30,30,0.85)'; el.style.color='#ff3030'; el.style.background='rgba(160,0,0,0.15)' }}
      onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(200,30,30,0.3)'; el.style.color='#6a8a96'; el.style.background='transparent' }}
    >
      {icon}
    </motion.a>
  )
}

export default function Footer() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, margin:'-20px' })

  return (
    <footer
      ref={ref}
      style={{
        position: 'relative',   /* ← required for absolute children to work */
        width: '100%' ,
        margin: 0, padding: 0,
        overflow: 'hidden',
        color: '#b0bcc2',
        boxSizing: 'border-box',
        background: '#030000',  /* fallback while image loads */
      }}
    >

      {/* ── BG IMAGE ─────────────────────────────────────────
          • <img> with absolute + inset:0 always fills the footer
          • objectFit:'cover' never stretches — crops instead
          • objectPosition:'center top' keeps top of image visible
          • parent has position:relative so inset:0 works correctly
      ──────────────────────────────────────────────────────── */}
      <img
        src={footerBg.src}
        alt="" aria-hidden="true"
        style={{
          position:'absolute', inset:0,
          width:'100%', height:'100%',
          objectFit:"fill",
          objectPosition:'center ',
          pointerEvents:'none',
          userSelect:'none',
          zIndex:1,
          display:'block',
        }}
      />

      {/* Dark tint — strong enough to read text on any image */}
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.72)', zIndex:2, pointerEvents:'none' }} />
      {/* Bottom fade to solid black */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'50%', background:'linear-gradient(to bottom,transparent,rgba(0,0,0,0.97))', zIndex:3, pointerEvents:'none' }} />
      {/* Top red accent */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(220,30,30,0.8),transparent)', zIndex:4 }} />
      {/* Subtle bottom red glow */}
      <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'50%', height:70, background:'radial-gradient(ellipse,rgba(100,0,0,0.28) 0%,transparent 70%)', filter:'blur(14px)', zIndex:3, pointerEvents:'none' }} />

      {/* ── CONTENT ── */}
      <div
        className="fc"
        style={{
          position:'relative', zIndex:5,
          width:'100%', boxSizing:'border-box',
        }}
      >
        {/* Sweep line */}
        <motion.div
          initial={{ scaleX:0, opacity:0 }}
          animate={inView ? { scaleX:1, opacity:1 } : {}}
          transition={{ duration:0.9, ease:'easeOut' }}
          style={{ height:1, transformOrigin:'0 0', background:'linear-gradient(90deg,rgba(200,30,30,0.65),rgba(200,30,30,0.1),transparent)' }}
          className="f-sweep"
        />

        {/* ── GRID ── */}
        <motion.div
          variants={wrap} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="fg"
        >

          {/* Brand */}
          <motion.div variants={col} className="f-brand">
            {/* Logo sits outside the text wrapper so on mobile it stays left */}
            <div className="f-logo">
              <img src={logo.src} alt="ISSS" style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'center', display:'block', background:'rgba(0,0,0,0.15)' }} />
            </div>
            {/* Text + socials grouped so they sit right of logo on mobile */}
            <div className="f-brand-text">
              <p className="f-desc">
                Professional private security and close protection services operating
                globally with elite operators and strategic planning.
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:7, alignItems:'center' }}>
                {SOCIALS.map(s => <SocialBtn key={s.label} {...s} />)}
                <a href="https://ardianrexhepi.com/trainings/" className="f-partner">Partner Training Programs</a>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={col} style={{ display:'flex', flexDirection:'column' }}>
            <ColHeading>Services</ColHeading>
            <div className="f-links">
              {SERVICES.map(s => <FooterLink key={s} href="#">{s}</FooterLink>)}
            </div>
          </motion.div>

          {/* Company */}
          <motion.div variants={col} style={{ display:'flex', flexDirection:'column' }}>
            <ColHeading>Company</ColHeading>
            <div className="f-links">
              {COMPANY.map(([label, href]) => <FooterLink key={label} href={href}>{label}</FooterLink>)}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={col} style={{ display:'flex', flexDirection:'column' }}>
            <ColHeading>Contact</ColHeading>
            <div className="f-contact-list">
              {CONTACT_ITEMS.map(({ icon, text, href }, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:7 }}>
                  <div style={{ flexShrink:0, marginTop:2 }}>{icon}</div>
                  {href
                    ? <a href={href} className="f-contact-link" onMouseEnter={e=>(e.currentTarget.style.color='#fff')} onMouseLeave={e=>(e.currentTarget.style.color='#a0b0b8')}>{text}</a>
                    : <p className="f-contact-text">{text}</p>
                  }
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ duration:0.55, delay:0.4 }}
          className="f-bottom"
        >
          <p className="f-copy">© {new Date().getFullYear()} International Statement Security Services. All rights reserved.</p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            {['Privacy Policy','Terms of Service'].map(l => (
              <a key={l} href="#" className="f-legal"
                onMouseEnter={e=>(e.currentTarget.style.color='#fff')}
                onMouseLeave={e=>(e.currentTarget.style.color='#5a6a70')}
              >{l}</a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── ALL RESPONSIVE STYLES ── */}
      <style>{`

        /* ─── Base (desktop ≥ 900px) ─────────────────────────── */
        .fc {
          padding: 52px 60px 0;
        }
        .f-sweep {
          margin-bottom: 36px;
        }
        .fg {
          display: grid;
          grid-template-columns: 1.15fr 1fr 1fr 1.1fr;
          gap: 40px;
          align-items: start;
          width: 100%;
        }
        .f-brand {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .f-brand-text {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .f-logo {
          width: 72px; height: 72px;
          border-radius: 50%; overflow: hidden;
          border: 1.5px solid rgba(200,30,30,0.42);
          box-shadow: 0 0 18px rgba(150,0,0,0.28);
          flex-shrink: 0;
        }
        .f-desc { font-size: 12px; line-height: 1.65; color: #98aab0; margin: 0; }
        .f-partner {
          background: #FF0D00; padding: 2px 8px; border-radius: 3px;
          font-size: 15px; color: #fff; text-decoration: none;
          font-weight: 700; letter-spacing: 0.05em; line-height: 1.7;
        }
        .f-col-head { font-size: 10px; }
        .f-links { display: flex; flex-direction: column; gap: 8px; }
        .f-link { font-size: 12px; }
        .f-contact-list { display: flex; flex-direction: column; gap: 8px; }
        .f-contact-link {
          color: #a0b0b8; font-size: 11px; text-decoration: none;
          line-height: 1.5; word-break: break-all;
        }
        .f-contact-text { color: #a0b0b8; font-size: 11px; line-height: 1.5; margin: 0; }
        .f-bottom {
          margin-top: 28px; padding-top: 12px; padding-bottom: 24px;
          border-top: 1px solid rgba(200,30,30,0.1);
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: space-between; gap: 8px;
        }
        .f-copy  { font-size: 10px; color: #5a6a70; margin: 0; line-height: 1.5; }
        .f-legal { font-size: 10px; color: #5a6a70; text-decoration: none; }

        /* ─── Tablet (600 – 899px) ────────────────────────────── */
        @media (max-width: 899px) {
          .fc   { padding: 36px 28px 0; }
          .f-sweep { margin-bottom: 24px; }
          .fg   {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 20px;
          }
          .f-logo   { width: 60px; height: 60px; }
          .f-desc   { font-size: 11px; }
          .f-col-head { font-size: 10px; }
          .f-link   { font-size: 12px; }
          .f-contact-link, .f-contact-text { font-size: 11px; }
          .f-links  { gap: 7px; }
          .f-contact-list { gap: 7px; }
          .f-bottom { margin-top: 22px; padding-bottom: 20px; }
        }

        /* ─── Mobile (< 600px) ────────────────────────────────── */
        @media (max-width: 599px) {
          .fc   { padding: 24px 16px 0; }
          .f-sweep { margin-bottom: 18px; }

          /*
            2-column grid on mobile too — brand spans full row,
            Services+Company side by side, Contact below.
            This cuts scroll in half vs 1-col layout.
          */
          .fg {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px 14px;
          }

          /* Brand spans both columns */
          .f-brand {
            grid-column: 1 / -1;
            flex-direction: row;
            align-items: flex-start;
            gap: 12px;
          }
          .f-brand-text {
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1;
          }
          .f-logo   { width: 52px; height: 52px; flex-shrink: 0; }
          .f-desc   { font-size: 11px; line-height: 1.6; }
          .f-col-head { font-size: 9px; letter-spacing: 0.2em; }
          .f-link   { font-size: 11px; gap: 5px; }
          .f-links  { gap: 6px; }
          .f-contact-link, .f-contact-text { font-size: 10px; }
          .f-contact-list { gap: 6px; }
          .f-partner { font-size: 13px; padding: 2px 6px; }
          .f-bottom {
            margin-top: 16px;
            padding-top: 10px;
            padding-bottom: 16px;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
          .f-copy, .f-legal { font-size: 9px; }
        }

        /* ─── Very small (< 380px) ────────────────────────────── */
        @media (max-width: 379px) {
          .fc { padding: 20px 12px 0; }
          .fg {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .f-brand {
            grid-column: auto;
            flex-direction: column;
          }
        }
      `}</style>
    </footer>
  )
}