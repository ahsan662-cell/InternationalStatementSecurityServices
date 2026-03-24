'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import HeroImage from "@/assets/FACTS.webp"

// ── Three.js animated background ─────────────────────────
function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor("#AF0A00", 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 5

    // Particle field
    const count = 1200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      const bright = 0.4 + Math.random() * 0.6
      colors[i * 3]     = 0
      colors[i * 3 + 1] = bright * 0.7
      colors[i * 3 + 2] = bright
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
    const mat = new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, opacity: 0.75 })
    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // Connection lines (circuit-like)
    const lineGeo = new THREE.BufferGeometry()
    const lineVerts: number[] = []
    for (let i = 0; i < 60; i++) {
      const x1 = (Math.random() - 0.5) * 20
      const y1 = (Math.random() - 0.5) * 12
      const z1 = -2 + Math.random() * -4
      const x2 = x1 + (Math.random() - 0.5) * 4
      const y2 = y1 + (Math.random() - 0.5) * 2
      lineVerts.push(x1, y1, z1, x2, y2, z1)
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVerts), 3))
    const lineMat = new THREE.LineBasicMaterial({ color: "#AF0A00", opacity: 0.3, transparent: true })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    // Globe wireframe (right side decoration)
    const globeGeo = new THREE.SphereGeometry(2.2, 18, 14)
    const globeMat = new THREE.MeshBasicMaterial({ color: "#AF0A00", wireframe: true, opacity: 0.12, transparent: true })
    const globe = new THREE.Mesh(globeGeo, globeMat)
    globe.position.set(4.5, 0.5, -3)
    scene.add(globe)

    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let rafId: number
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      particles.rotation.y += 0.0003
      particles.rotation.x += 0.0001
      globe.rotation.y += 0.001
      lines.rotation.y += 0.0002
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

// ── FAQ data ──────────────────────────────────────────────
const faqs = [
  { id: '01', q: 'Can my bodyguard be my driver at the same time?', a: 'Under certain circumstances that is possible, but in most situations this is highly impractical for you. We normally strongly advise against it and sometimes just can\'t do it. The reason for this is that a bodyguard is there for your protection and has to focus entirely on that task.' },
  { id: '02', q: 'What kind of people do you provide? Do they have class?', a: 'Our operatives are former military, law enforcement, and intelligence professionals. They are trained in etiquette, discretion, and high-level client management — fully suited for elite environments.' },
  { id: '03', q: 'What is the quality of your services?', a: 'We maintain the highest international standards. All personnel undergo multi-tier vetting, continuous training, and performance assessment. Quality assurance is embedded at every level of our operations.' },
  { id: '04', q: 'Who will protect me? Can I have information about specific agents?', a: 'Client safety is paramount. We provide detailed operator profiles upon request for approved clients. All assignments are matched based on your specific threat profile and environment.' },
  { id: '05', q: 'To who do you provide your services?', a: 'We serve HNW individuals, C-suite executives, diplomats, government officials, celebrities, and corporations requiring elite protection worldwide.' },
  { id: '06', q: 'Where do you provide your services?', a: 'Our operations span six continents — with active cells in London, New York, Dubai, Abu Dhabi, Doha, Rome and Tirana. We deploy globally within hours.' },
]

// ── Accordion item ────────────────────────────────────────
function FaqItem({ item, isOpen, onToggle }: { item: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className={`faq-item${isOpen ? ' open' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <button className="faq-trigger" onClick={onToggle}>
        <span className="faq-num">{item.id}.</span>
        <span className="faq-question">{item.q}</span>
        <motion.span
          className="faq-icon"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {isOpen ? '×' : '+'}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="faq-answer-inner">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
interface FAQFormData {
  name: string,
  email: string,
  phone: string,
  message: string 
}
// ── Main component ────────────────────────────────────────
export default function FaqSection() {
  const [form, setForm] = useState<FAQFormData>({
  name: "",
  email: "",
  phone: "",
  message: ""
})
  const [openId, setOpenId] = useState<string>('01')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append("formType","faq")
      formData.append("fullName",form.name)
      formData.append("email",form.email)
      formData.append("phone",form.phone)
      formData.append("message",form?.message)

      const res = await fetch("/api/apply",{
        method:"POST",
        body:formData
      })

      if(!res.ok) throw new Error("Failed")

      setSubmitted(true)

      setTimeout(()=>{
        setSubmitted(false)
        setForm({
          name:"",
          email:"",
          phone:"",
          message:""
        })
      },3000)

    } catch(err){
      console.error(err)
      alert("Failed to send message")
    }
  }

  return (
    <section className="faq-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        /* ── Section ── */
        .faq-section {
          position: relative;
          min-height: 100vh;
          background: #120302;
          padding: clamp(56px,7vw,100px) clamp(20px,5vw,64px);
          overflow: hidden;
          font-family: 'Rajdhani', sans-serif;
          backgroundImage: url(${HeroImage.src});
          backgroundSize: "100% 100%",
          backgroundPosition: "contain",
          backgroundRepeat: "no-repeat",
          z-index:10;
        }

        /* dot grid */
        .faq-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,150,255,0.13) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none; z-index: 1;
        }

        /* perspective floor */
        .faq-section::after {
          content: '';
          position: absolute; bottom: 0; left:0; right:0; height: 40%;
          background-image:
            linear-gradient(rgba(0,140,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,140,255,0.06) 1px, transparent 1px);
          background-size: 52px 52px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: bottom;
          pointer-events: none; z-index: 1;
        }

        .faq-inner {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto;
        }

        /* ── Page header ── */
        .faq-page-header {
          margin-bottom: clamp(32px,4vw,52px);
        }
        .faq-tag-row {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 10px;
          
        }
        .faq-tag-dash { width: 40px; height: 2px; background: #AF0A00;  text-align:center }
        .faq-tag-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 21px; letter-spacing: 0.3em; color: #AF0A00;
          text-transform: uppercase; font-weight: 600;
        //   text-align:center
        }
        .faq-main-title {
          font-family:'Orbitron',monospace;
          font-size: clamp(22px,4vw,46px); font-weight: 700;
          color: #d0e8f6; margin: 0; line-height: 1.1; letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .faq-main-title em {
          font-style: normal; color: #AF0A00;
          text-shadow: 0 0 24px #AF0A00, 0 0 50px #AF0A00;
        }

        /* ── Two-column layout ── */
        .faq-columns {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: clamp(24px,4vw,52px);
          align-items: start;
        }

        @media (max-width: 960px) {
          .faq-columns { grid-template-columns: 1fr; }
        }

        /* ── FAQ accordion ── */
        .faq-list { display: flex; flex-direction: column; gap: 10px; }

        .faq-item {
          position: relative;
          border: 1px solid #AF0A00;
          background: #140908;
          backdrop-filter: blur(6px);
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: border-color 0.25s, background 0.25s;
          overflow: hidden;
        }
        .faq-item.open {
          border-color: #AF0A00;
          background: rgba(0, 0, 0, 0.85);
          box-shadow: 0 0 20px rgba(0,160,255,0.12), inset 0 0 20px rgba(0,80,180,0.06);
        }
        .faq-item:hover:not(.open) {
          border-color: #AF0A00;
          background: rgba(3, 5, 7, 0.78);
        }

        /* Left accent bar */
        .faq-item::before {
          content: '';
          position: absolute; left:0; top:0; bottom:0; width:3px;
          background: linear-gradient(180deg, transparent, #AF0A00, transparent);
          opacity: 0; transition: opacity 0.25s;
        }
        .faq-item.open::before,
        .faq-item:hover::before { opacity: 1; }

        .faq-trigger {
          width: 100%; display: flex; align-items: center; gap: 12px;
          padding: clamp(14px,2vw,18px) clamp(16px,2.5vw,22px);
          background: transparent; border: none; cursor: pointer; text-align: left;
        }

        .faq-num {
          font-family: 'Orbitron', monospace;
          font-size: 12px; font-weight: 700;
          color: #AF0A00; min-width: 28px; flex-shrink: 0;
          text-shadow: 0 0 8px #AF0A00;
        }

        .faq-question {
          flex: 1;
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(13px,1.5vw,16px); font-weight: 600;
          color: #c8e4f2; letter-spacing: 0.03em;
          transition: color 0.2s;
        }
        .faq-item.open .faq-question { color: #ffffff; }

        .faq-icon {
          width: 28px; height: 28px;
          border: 1px solid #AF0A00;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 400; color: #AF0A00; flex-shrink: 0;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
          transition: background 0.2s, border-color 0.2s;
        }
        .faq-item.open .faq-icon {
          background: rgba(0,140,255,0.18);
          border-color: #AF0A00;
          box-shadow: 0 0 10px #AF0A00;
        }

        .faq-answer { overflow: hidden; }
        .faq-answer-inner {
          padding: 0 clamp(16px,2.5vw,22px) clamp(16px,2vw,20px) clamp(16px,2.5vw,58px);
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(13px,1.4vw,15px); font-weight: 400;
          color: #FFFFFF; line-height: 1.7;
          border-top: 1px solid rgba(0,140,255,0.1);
          padding-top: 14px;
        }

        /* ── Right column: contact form ── */
        .form-panel {
          position: relative;
          background: #090404;
          border: 1px solid #AF0A00;
          backdrop-filter: blur(8px);
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
          padding: clamp(22px,3vw,32px);
          box-shadow: 0 0 30px #AF0A00, inset 0 0 30px #AF0A00;
        }

        /* Form panel border glow */
        .form-panel::before {
          content: '';
          position: absolute; inset: 0;
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
          border: 1px solid #AF0A00;
          pointer-events: none;
        }

        /* Corner brackets on form */
        .form-panel .fc { position:absolute; width:14px; height:14px; z-index:5; }
        .form-panel .fc.tl { top:4px; left:4px; border-top:1.5px solid #AF0A00; border-left:1.5px solid #AF0A00; box-shadow:0 0 6px #AF0A00; }
        .form-panel .fc.tr { top:4px; right:4px; border-top:1.5px solid #AF0A00; border-right:1.5px solid #AF0A00; box-shadow:0 0 6px rgba#AF0A00; }
        .form-panel .fc.bl { bottom:4px; left:4px; border-bottom:1.5px solid #AF0A00; border-left:1.5px solid #AF0A00; box-shadow:0 0 6px #AF0A00; }
        .form-panel .fc.br { bottom:4px; right:4px; border-bottom:1.5px solid #AF0A00; border-right:1.5px solid #AF0A00; box-shadow:0 0 6px #AF0A00; }

        .form-title {
          font-family:'Orbitron',monospace;
          font-size: clamp(15px,1.8vw,20px); font-weight: 700;
          color: #c8e4f2; text-transform: uppercase;
          letter-spacing: 0.12em; margin-bottom: 22px;
        }
        .form-title em {
          font-style: normal; color: #AF0A00;
          text-shadow: 0 0 16px #AF0A00;
        }

        /* Input wrapper */
        .input-wrap {
          position: relative; margin-bottom: 14px;
        }

        .input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #FFFFFF; display: flex; align-items: center;
          pointer-events: none;
        }

        .cyber-input, .cyber-textarea {
          width: 100%;
          background: rgba(9, 13, 19, 0.6);
          border: 1px solid #AF0A00;
          color: #bcdef1;
          padding: 12px 14px 12px 42px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px; font-weight: 500;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
          box-sizing: border-box;
        }
        .cyber-input::placeholder, .cyber-textarea::placeholder { color: #FFFFFF }
        .cyber-input:focus, .cyber-textarea:focus {
          border-color: #AF0A00;
          box-shadow: 0 0 14px rgba(0,160,255,0.18), inset 0 0 10px rgba(0,80,180,0.1);
          background: rgba(6, 8, 11, 0.75);
        }

        .cyber-textarea {
          resize: none; height: 90px;
          padding-top: 12px;
        }

        /* Submit button */
        .submit-btn {
          width: 100%; padding: 14px 20px;
          background: #AF0A00;
          background-size: 200% 100%;
          border: 1px solid white;
          color: white;
          font-family: 'Orbitron', monospace;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background-position 0.4s, box-shadow 0.3s, transform 0.15s;
          box-shadow: 0 0 18px #AF0A00, 0 0 40px #AF0A00;
          margin-top: 16px;
        }
        .submit-btn:hover {
          background-position: 100% 0;
          box-shadow: 0 0 28px #AF0A00, 0 0 60px #AF0A00;
          transform: translateY(-1px);
          background: #AF0A00;
        }
        .submit-btn:active { transform: scale(0.98); }
        .submit-btn svg { flex-shrink: 0; }

        /* Trust badges */
        .trust-row {
          display: flex; gap: 10px; margin-top: 18px;
        }
        .trust-badge {
          flex: 1;
          border: 1px solid #AF0A00;
          background: #0c0606;
          padding: 10px 8px;
          display: flex; flex-direction: column; align-items: center; gap: 5px;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
          transition: border-color 0.2s, background 0.2s;
        }
        .trust-badge:hover {
          border-color: #AF0A00;
          // background: #AF0A00;
        }
        .trust-badge-icon { color: #AF0A00; }
        .trust-badge-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.12em; color: #FFFFFF;
          text-transform: uppercase; text-align: center;
        }

        /* Success message */
        .success-msg {
          text-align: center; padding: 40px 20px;
        }
        .success-msg h3 {
          font-family: 'Orbitron', monospace;
          font-size: 16px; color: #AF0A00;
          letter-spacing: 0.1em; margin-bottom: 8px;
        }
        .success-msg p {
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px; color: #AF0A00;
        }
      `}</style>

      {/* Three.js background */}
      <ThreeBackground />

      <div className="faq-inner">

        {/* ── Page header ── */}
        <motion.div
          className="faq-page-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="faq-tag-row">
            <div className="faq-tag-dash" />
            <span className="faq-tag-label">FAQ</span>
            <div className="faq-tag-dash" />
          </div>
          <h2 className="faq-main-title">
            Answers for <em>General Questions</em>
          </h2>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="faq-columns">

          {/* LEFT — Accordion */}
          <div className="faq-list">
            {faqs.map(item => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? '' : item.id)}
              />
            ))}
          </div>

          {/* RIGHT — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="form-panel">
              {/* Corner brackets */}
              <div className="fc tl" /><div className="fc tr" />
              <div className="fc bl" /><div className="fc br" />

              <div className="form-title">Ask Your <em>Questions</em></div>

              {!submitted ? (
                <form onSubmit={handleSubmit}>

                  {/* Name */}
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
                      </svg>
                    </span>
                    <input
                      className="cyber-input"
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e)=>setForm({...form,name:e.target.value})}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8l10 7 10-7"/>
                      </svg>
                    </span>
                    <input
                      className="cyber-input"
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e)=>setForm({...form,email:e.target.value})}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1C7.16 21 2 15.84 2 6a1 1 0 011-1z"/>
                      </svg>
                    </span>
                    <input
                      className="cyber-input"
                      type="tel"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={(e)=>setForm({...form,phone:e.target.value})}
                    />
                  </div>

                  {/* Message */}
                  <div className="input-wrap">
                    <span className="input-icon" style={{ top: '16px', transform: 'none' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                      </svg>
                    </span>
                    <textarea
                      className="cyber-textarea"
                      placeholder="Questions here..."
                      value={form.message}
                      onChange={(e)=>setForm({...form,message:e.target.value})}
                    />
                  </div>

                  {/* Submit */}
                  <button type="submit" className="submit-btn">
                    Submit Now
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>

                  {/* Trust badges */}
                  <div className="trust-row">
                    <div className="trust-badge">
                      <svg className="trust-badge-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span className="trust-badge-label">Fast Response</span>
                    </div>
                    <div className="trust-badge">
                      <svg className="trust-badge-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 2L4 6v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V6L12 2z"/>
                      </svg>
                      <span className="trust-badge-label">100% Private</span>
                    </div>
                    <div className="trust-badge">
                      <svg className="trust-badge-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                      </svg>
                      <span className="trust-badge-label">Secure</span>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="success-msg">
                  <h3>[ TRANSMISSION RECEIVED ]</h3>
                  <p>Your query has been encrypted and forwarded to our team. Expect a response within 4 hours.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}