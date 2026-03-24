// 'use client'

// import { useState, useRef } from 'react'
// import { motion, useInView } from 'framer-motion'
// import { SITE_CONFIG, PROCESS_STEPS } from '@/data/siteData'

// export default function ContactSection() {
//   const [submitted, setSubmitted] = useState(false)
//   const [ref_id, setRefId] = useState('')
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-100px' })

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     const id = 'ISS-2026-' + Math.floor(Math.random() * 9000 + 1000)
//     setRefId(id)
//     setSubmitted(true)
//   }

//   const inputStyle: React.CSSProperties = {
//     width: '100%',
//     background: 'rgba(0,212,255,0.02)',
//     border: '1px solid rgba(0,212,255,0.12)',
//     color: 'var(--text)',
//     padding: '12px 15px',
//     fontSize: 14,
//     fontFamily: 'Rajdhani, sans-serif',
//     outline: 'none',
//     marginBottom: 18,
//     transition: 'border-color 0.2s',
//     appearance: 'none',
//   }

//   const labelStyle: React.CSSProperties = {
//     fontFamily: '"Share Tech Mono", monospace',
//     fontSize: 9,
//     letterSpacing: '2.5px',
//     color: 'var(--c)',
//     textTransform: 'uppercase',
//     display: 'block',
//     marginBottom: 8,
//     opacity: 0.75,
//   }

//   return (
//     <section
//       id="contact"
//       ref={ref}
//       style={{
//         padding: '100px 52px',
//         background: 'var(--bg2)',
//         position: 'relative',
//         zIndex: 2,
//       }}
//     >
//       <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 28 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7 }}
//           style={{ marginBottom: 40 }}
//         >
//           <div className="section-tag">
//             <span className="section-tag-dash" />
//             <span className="section-tag-label">Secure Request · Classified Brief</span>
//           </div>
//           <h2 className="section-title">Request a <em>Consultation</em></h2>
//           <p className="section-sub">
//             All enquiries handled with complete discretion. Reviewed within{' '}
//             {SITE_CONFIG.responseTime} by a senior operator.
//           </p>
//         </motion.div>

//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>

//           {/* ── FORM ── */}
//           <motion.div
//             initial={{ opacity: 0, x: -28 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.7, delay: 0.2 }}
//           >
//             {!submitted ? (
//               <div style={{
//                 background: 'var(--bg3)',
//                 border: '1px solid rgba(0,212,255,0.1)',
//                 padding: 38,
//                 position: 'relative',
//               }}>
//                 {/* Top accent */}
//                 <div style={{
//                   position: 'absolute', top: 0, left: 0, right: 0, height: 2,
//                   background: 'linear-gradient(90deg, var(--c), transparent)',
//                 }} />

//                 <form onSubmit={handleSubmit}>
//                   {/* Name row */}
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
//                     <div>
//                       <label style={labelStyle}>First Name</label>
//                       <input style={inputStyle} type="text" placeholder="John" required
//                         onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.45)')}
//                         onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.12)')}
//                       />
//                     </div>
//                     <div>
//                       <label style={labelStyle}>Last Name</label>
//                       <input style={inputStyle} type="text" placeholder="Smith" required
//                         onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.45)')}
//                         onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.12)')}
//                       />
//                     </div>
//                   </div>

//                   <label style={labelStyle}>Secure Email</label>
//                   <input style={inputStyle} type="email" placeholder="your@email.com" required
//                     onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.45)')}
//                     onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.12)')}
//                   />

//                   <label style={labelStyle}>Service Required</label>
//                   <select style={{ ...inputStyle, cursor: 'none' }}
//                     onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.45)')}
//                     onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.12)')}
//                   >
//                     <option value="">Select a service...</option>
//                     <option>Close Protection</option>
//                     <option>Executive & VIP Protection</option>
//                     <option>International Deployment</option>
//                     <option>Residential Security</option>
//                     <option>Secure Chauffeur</option>
//                     <option>Special Events & Assets</option>
//                   </select>

//                   <label style={labelStyle}>Primary Location</label>
//                   <select style={{ ...inputStyle, cursor: 'none' }}
//                     onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.45)')}
//                     onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.12)')}
//                   >
//                     <option value="">Select location...</option>
//                     <option>New York, USA</option>
//                     <option>London, UK</option>
//                     <option>Rome, Italy</option>
//                     <option>Tirana, Albania</option>
//                     <option>Doha, Qatar</option>
//                     <option>Abu Dhabi, UAE</option>
//                     <option>Multiple Locations</option>
//                   </select>

//                   <label style={labelStyle}>Mission Brief (Optional)</label>
//                   <textarea
//                     style={{ ...inputStyle, resize: 'none', height: 108, lineHeight: 1.6 }}
//                     placeholder="Describe your security requirements. All information is treated as strictly confidential."
//                     onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.45)')}
//                     onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.12)')}
//                   />

//                   <motion.button
//                     type="submit"
//                     whileHover={{ scale: 1.01 }}
//                     whileTap={{ scale: 0.98 }}
//                     style={{
//                       width: '100%',
//                       background: 'transparent',
//                       border: '1px solid var(--c)',
//                       color: 'var(--c)',
//                       padding: 15,
//                       fontFamily: '"Share Tech Mono", monospace',
//                       fontSize: 11, letterSpacing: '3px',
//                       textTransform: 'uppercase',
//                       cursor: 'none',
//                       position: 'relative', overflow: 'hidden',
//                       clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
//                     }}
//                   >
//                     ▶ Submit Secure Request
//                   </motion.button>

//                   {/* NDA notice */}
//                   <div style={{
//                     display: 'flex', gap: 10, marginTop: 14,
//                     padding: 12,
//                     border: '1px solid rgba(0,212,255,0.08)',
//                     background: 'rgba(0,212,255,0.02)',
//                   }}>
//                     <span style={{
//                       fontFamily: '"Share Tech Mono", monospace',
//                       fontSize: 12, color: 'rgba(0,212,255,0.4)', flexShrink: 0,
//                     }}>⊕</span>
//                     <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
//                       All submissions protected under strict NDA. Your information is never shared.
//                       Reviewed by senior management only.
//                     </span>
//                   </div>
//                 </form>
//               </div>
//             ) : (
//               /* Success state */
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.97 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 style={{
//                   textAlign: 'center', padding: '60px 30px',
//                   background: 'var(--bg3)',
//                   border: '1px solid rgba(0,212,255,0.25)',
//                 }}
//               >
//                 <div style={{
//                   fontFamily: 'Orbitron, monospace', fontSize: 13,
//                   color: 'var(--c)', letterSpacing: '2px', marginBottom: 14,
//                 }}>
//                   [ TRANSMISSION RECEIVED ]
//                 </div>
//                 <h3 style={{
//                   fontFamily: 'Orbitron, monospace', fontSize: 20,
//                   fontWeight: 700, color: 'var(--text)', marginBottom: 10,
//                 }}>
//                   Request Transmitted
//                 </h3>
//                 <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6 }}>
//                   Your consultation request has been received and encrypted. A senior operator
//                   will contact you within {SITE_CONFIG.responseTime}.
//                 </p>
//                 <div style={{
//                   fontFamily: '"Share Tech Mono", monospace',
//                   fontSize: 11, color: 'rgba(0,212,255,0.6)',
//                   marginTop: 14, letterSpacing: '2px',
//                 }}>
//                   REF: {ref_id}
//                 </div>
//               </motion.div>
//             )}
//           </motion.div>

//           {/* ── INFO PANEL ── */}
//           <motion.div
//             initial={{ opacity: 0, x: 28 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
//           >
//             {/* Quick info cards */}
//             {[
//               {
//                 label: 'Response Time',
//                 value: SITE_CONFIG.responseTime,
//                 sub: 'Senior operator review on all enquiries. Emergency deployments coordinated same day.',
//               },
//               {
//                 label: 'Direct Contact',
//                 value: SITE_CONFIG.phone,
//                 sub: 'Available 24/7 for immediate consultation. International lines active across all locations.',
//               },
//             ].map(card => (
//               <div key={card.label} className="cyber-card" style={{ padding: '22px 26px' }}>
//                 <div style={{
//                   fontFamily: '"Share Tech Mono", monospace',
//                   fontSize: 8, letterSpacing: '2.5px',
//                   color: 'rgba(0,212,255,0.6)', textTransform: 'uppercase', marginBottom: 7,
//                 }}>
//                   {card.label}
//                 </div>
//                 <div style={{
//                   fontFamily: 'Orbitron, monospace', fontSize: 16,
//                   fontWeight: 600, color: 'var(--text)', marginBottom: 4,
//                 }}>
//                   {card.value}
//                 </div>
//                 <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
//                   {card.sub}
//                 </p>
//               </div>
//             ))}

//             {/* Process steps */}
//             <div className="cyber-card" style={{ padding: '22px 26px', flex: 1 }}>
//               <div style={{
//                 fontFamily: '"Share Tech Mono", monospace',
//                 fontSize: 8, letterSpacing: '2.5px',
//                 color: 'rgba(0,212,255,0.6)', textTransform: 'uppercase', marginBottom: 16,
//               }}>
//                 Our Process
//               </div>
//               {PROCESS_STEPS.map((step, i) => (
//                 <div
//                   key={step.num}
//                   style={{
//                     display: 'flex', gap: 14,
//                     padding: '14px 0',
//                     borderBottom: i < PROCESS_STEPS.length - 1
//                       ? '1px solid rgba(0,212,255,0.05)'
//                       : 'none',
//                   }}
//                 >
//                   <span style={{
//                     fontFamily: 'Orbitron, monospace', fontSize: 11,
//                     color: 'var(--c)', minWidth: 22, paddingTop: 2,
//                   }}>
//                     {step.num}
//                   </span>
//                   <div>
//                     <div style={{
//                       fontFamily: 'Orbitron, monospace', fontSize: 13,
//                       fontWeight: 600, color: 'var(--text)', marginBottom: 3,
//                     }}>
//                       {step.title}
//                     </div>
//                     <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
//                       {step.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }


'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Mock data (replace with your imports from @/data/siteData) ──
const SITE_CONFIG = {
  responseTime: '4 hours',
  phone: '+1 (631) 336-7291',
}

interface ProcessStep {
  num: string
  title: string
  description: string
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Initial Assessment',
    description: 'We evaluate your threat profile and operational requirements in full confidence.',
  },
  {
    num: '02',
    title: 'Bespoke Planning',
    description: 'A tailored security plan is developed by senior operators with field experience.',
  },
  {
    num: '03',
    title: 'Team Deployment',
    description: 'Vetted personnel are deployed with precision timing and full operational readiness.',
  },
  {
    num: '04',
    title: 'Ongoing Review',
    description: 'Continuous threat monitoring and mission debriefs ensure your protection evolves.',
  },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "",
    location: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)
  const [ref_id, setRefId] = useState('')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(0,212,255,0.02)',
    border: '1px solid rgba(0,212,255,0.12)',
    color: 'var(--text, #ffffff)', 
    padding: '12px 15px',
    fontSize: 16,
    fontFamily: 'Rajdhani, sans-serif',
    outline: 'none',
    marginBottom: 16,
    transition: 'border-color 0.2s',
    appearance: 'none' as const,
    borderRadius: 0,
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Share Tech Mono', 'Courier New', monospace",
    fontSize: 13,
    letterSpacing: '2.5px',
    color: "#ff0d00",
    textTransform: 'uppercase' as const,
    display: 'block',
    marginBottom: 7,
    opacity: 0.75,
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

 async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const id = 'ISS-2026-' + Math.floor(Math.random() * 9000 + 1000)
    setRefId(id)

    try {
      // JSON ki jagah FormData use karein taake API ko multipart/form-data mile
      const formDataToSend = new FormData()
      formDataToSend.append("formType", "requestConsultation")
      formDataToSend.append("fullName", `${formData.firstName} ${formData.lastName}`) // API 'fullName' ya 'name' expect kar rahi hai
      formDataToSend.append("email", formData.email)
      formDataToSend.append("service", formData.service)
      formDataToSend.append("location", formData.location)
      formDataToSend.append("message", formData.message)

      const res = await fetch('/api/apply', {
        method: "POST",
        // Headers hata dein, browser automatically boundary ke sath Content-Type set kar dega
        body: formDataToSend 
      })

      if (res.ok) {
        setSubmitted(true)
      }

    } catch (error) {
      
      console.error("Submission Error:", error)
    }
  }
  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 5vw, 52px)',
        background: '#000',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Rajdhani:wght@400;500;600&display=swap');

        /* Two-column on desktop, single on mobile */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 5vw, 56px);
        }

        @media (max-width: 820px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        /* Name row: side-by-side on ≥400px, stacked below */
        .name-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        @media (max-width: 400px) {
          .name-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .cyber-card {
          border: 1px solid #ff0d00;
          background: rgba(5, 9, 9, 0.02);
          position: relative;
          transition: border-color 0.3s;
        }

        .cyber-card:hover {
          border-color: #ff0d00;
          background:rgba(5, 9, 9, 0.02);
        }

        .contact-submit-btn {
          width: 100%;
          background: linear-gradient(90deg, #ff0d00, #ff0d00, #ff0d00);
          color: #FFFFFF;
          padding: 15px;
          font-family: 'Share Tech Mono', 'Courier New', monospace;
          font-size: 14px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }

        .contact-submit-btn:hover {
          background: #830a04;
          transform: scale(1.01);
        }

        .contact-submit-btn:active {
          transform: scale(0.98);
        }
        .contact-input {
          background: #030607;
          color: #cce8f4;
          border-color: #030607 !important;
        }
        .contact-input option {
          background: #040709;
          color: #cce8f4;
        }
        /* Input focus via class instead of inline onFocus */
        .contact-input:focus {
          border-color: #ff0d00 !important;
        }

        .stag-wrap {
          display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .stag-dash {
          display: inline-block; width: 28px; height: 1px;
          background: #ff0d00; flex-shrink: 0;
        }
        .stag-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px; letter-spacing: 0.25em;
          color: #ff0d00; text-transform: uppercase;
        }

        /* Scrollbar hide for mobile */
        @media (max-width: 480px) {
          .contact-submit-btn { font-size: 10px; letter-spacing: 2px; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 'clamp(28px, 4vw, 40px)' }}
        >
          <div className="stag-wrap">
            <span className="stag-dash" />
            <span className="stag-label">Secure Request · Classified Brief</span>
          </div>

          <h2
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 900,
              fontSize: 'clamp(22px, 3.5vw, 38px)',
              letterSpacing: '0.12em',
              color: '#cce8f4',
              margin: '0 0 12px',
              lineHeight: 1.2,
            }}
          >
            Request a{' '}
            <em style={{ color: "#ff0d00", fontStyle: 'normal' }}>Consultation</em>
          </h2>

          <p
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: 'clamp(16px, 1.6vw, 16px)',
              color: '#e5eef0',
              lineHeight: 1.7,
              maxWidth: 520,
              margin: 0,
            }}
          >
            All enquiries handled with complete discretion. Reviewed within{' '}
            <span style={{ color: 'rgb(255, 13, 0)' }}>{SITE_CONFIG.responseTime}</span> by a senior operator.
          </p>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="contact-grid">

          {/* ── FORM ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {!submitted ? (
              <div
                style={{
                  background:" #090504",
                  border: '1px solid rgba(0,212,255,0.1)',
                  padding: 'clamp(22px, 4vw, 38px)',
                  position: 'relative',
                }}
              >
                {/* Top accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: 'linear-gradient(90deg, #ff0d00, transparent)',
                }} />

                <form onSubmit={handleSubmit}>
                  {/* Name row */}
                  <div className="name-row">
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input
                        className="contact-input"
                        style={inputStyle}
                        type="text"
                        name="firstName"
                        placeholder="John"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input
                        className="contact-input"
                        style={inputStyle}
                        type="text"
                        name="lastName"
                        placeholder="Smith"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <label style={labelStyle}>Secure Email</label>
                  <input
                    className="contact-input"
                    style={inputStyle}
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    onChange={handleChange}
                  />

                  <label style={labelStyle}>Service Required</label>
                  <select
                    name="service"
                    className="contact-input"
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onChange={handleChange}
                  >
                    <option value="">Select a service...</option>
                    <option>Close Protection</option>
                    <option>Executive & VIP Protection</option>
                    <option>International Deployment</option>
                    <option>Residential Security</option>
                    <option>Secure Chauffeur</option>
                    <option>Special Events & Assets</option>
                  </select>

                  <label style={labelStyle}>Primary Location</label>
                  <select
                    name="location"
                    className="contact-input"
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onChange={handleChange}
                  >
                    <option value="">Select location...</option>
                    <option>New York, USA</option>
                    <option>London, UK</option>
                    <option>Rome, Italy</option>
                    <option>Tirana, Albania</option>
                    <option>Doha, Qatar</option>
                    <option>Abu Dhabi, UAE</option>
                    <option>Multiple Locations</option>
                  </select>

                  <label style={labelStyle}>Mission Brief (Optional)</label>
                  <textarea
                    className="contact-input"
                    style={{
                      ...inputStyle,
                      resize: 'none',
                      height: 'clamp(90px, 12vw, 108px)',
                      lineHeight: 1.6,
                    }}
                    onChange={handleChange}
                    placeholder="Describe your security requirements. All information is treated as strictly confidential."
                  />

                  <button type="submit" className="contact-submit-btn">
                    ▶ Submit Secure Request
                  </button>

                  {/* NDA notice */}
                  <div
                    style={{
                      display: 'flex', gap: 10, marginTop: 14,
                      padding: 12,
                      border: '1px solid rgba(0,212,255,0.08)',
                      background: 'rgba(0,212,255,0.02)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: 12,
                        color: 'rgba(0,212,255,0.4)',
                        flexShrink: 0,
                      }}
                    >
                      ⊕
                    </span>
                    <span
                      style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: 'clamp(14px, 1.2vw, 14px)',
                        color: 'var(--muted, #bbdfea)',
                        lineHeight: 1.5,
                      }}
                    >
                      All submissions protected under strict NDA. Your information is never shared.
                      Reviewed by senior management only.
                    </span>
                  </div>
                </form>
              </div>
            ) : (
              /* ── Success state ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  textAlign: 'center',
                  padding: 'clamp(40px, 6vw, 60px) clamp(20px, 4vw, 30px)',
                  background: 'var(--bg3, #06101a)',
                  border: '1px solid rgba(0,212,255,0.25)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: 13,
                    color: 'var(--c, #00d4ff)',
                    letterSpacing: '2px',
                    marginBottom: 14,
                  }}
                >
                  [ TRANSMISSION RECEIVED ]
                </div>
                <h3
                  style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: 'clamp(16px, 2.5vw, 20px)',
                    fontWeight: 700,
                    color: '#cce8f4',
                    marginBottom: 10,
                  }}
                >
                  Request Transmitted
                </h3>
                <p
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: 'clamp(13px, 1.4vw, 15px)',
                    color: '#3a6878',
                    lineHeight: 1.6,
                  }}
                >
                  Your consultation request has been received and encrypted. A senior operator
                  will contact you within {SITE_CONFIG.responseTime}.
                </p>
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 11,
                    color: 'rgba(0,212,255,0.6)',
                    marginTop: 14,
                    letterSpacing: '2px',
                  }}
                >
                  REF: {ref_id}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* ── INFO PANEL ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {/* Quick info cards */}
            {[
              {
                label: 'Response Time',
                value: SITE_CONFIG.responseTime,
                sub: 'Senior operator review on all enquiries. Emergency deployments coordinated same day.',
              },
              {
                label: 'Direct Contact',
                value: SITE_CONFIG.phone,
                sub: 'Available 24/7 for immediate consultation. International lines active across all locations.',
              },
            ].map(card => (
              <div
                key={card.label}
                className="cyber-card"
                style={{ padding: 'clamp(16px, 2.5vw, 22px) clamp(16px, 2.5vw, 26px)' }}
              >
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 14,
                    letterSpacing: '2.5px',
                    color: '#ff0d00',
                    textTransform: 'uppercase' as const,
                    marginBottom: 7,
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: 'clamp(17px, 1.6vw, 18px)',
                    fontWeight: 600,
                    color: '#cce8f4',
                    marginBottom: 6,
                  }}
                >
                  {card.value}
                </div>
                <p
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: 'clamp(16px, 1.2vw, 16px)',
                    color: '#e4eff3',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {card.sub}
                </p>
              </div>
            ))}

            {/* Process steps */}
            <div
              className="cyber-card"
              style={{
                padding: 'clamp(16px, 2.5vw, 22px) clamp(16px, 2.5vw, 26px)',
                flex: 1,
              }}
            >
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 12,
                  letterSpacing: '2.5px',
                  color: '#ff0d00',
                  textTransform: 'uppercase' as const,
                  marginBottom: 14,
                }}
              >
                Our Process
              </div>

              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.num}
                  style={{
                    display: 'flex',
                    gap: 14,
                    padding: 'clamp(14px, 1.5vw, 14px) 0',
                    borderBottom:
                      i < PROCESS_STEPS.length - 1
                        ? '1px solid rgba(0,212,255,0.05)'
                        : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Orbitron, monospace',
                      fontSize: 14,
                      color: '#ff0d00',
                      minWidth: 22,
                      paddingTop: 2,
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'Orbitron, monospace',
                        fontSize: 'clamp(18px, 1.3vw, 16px)',
                        fontWeight: 600,
                        color: '#cce8f4',
                        marginBottom: 4,
                      }}
                    >
                      {step.title}
                    </div>
                    <p
                      style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: 'clamp(16px, 1.2vw, 16px)',
                        color: '#cce3ea',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}