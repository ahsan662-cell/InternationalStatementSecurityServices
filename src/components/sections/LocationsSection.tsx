'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import bgImage from "@/assets/map.webp"
import Particles from './../../utils/Particles'

interface Location {
  id: string
  city: string
  country: string
  region: string
  description: string
  tags: string[]
  mapX: number
  mapY: number
}

export default function LocationsSection() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [isMobile,  setIsMobile]  = useState(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <section
      id="locations"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 2,
        minHeight: isMobile ? "60vh": "130vh",
        overflow: 'hidden',
        background: '#06101a', // fallback color while image loads
      }}
      >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Rajdhani:wght@400;500;600&display=swap');

        /* ── Image tag approach — most reliable cross-device ── */
        .loc-bg-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: #06101a;
        }

        .loc-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }

        /*
          On narrow mobile (portrait), the image aspect ratio is wider than tall.
          Switching to 'contain' shows the full image with dark bars top/bottom.
          Remove this block if you prefer cropping on mobile too.
        */
        @media (max-width: 540px) {
          .loc-bg-img {
            object-fit: contain;
            object-position: center center;
          }
          /* Give section enough height to show full image */
          #locations {
            min-height: 100svh;
          }
        }

        /* Landscape mobile — cover is fine */
        @media (max-width: 768px) and (orientation: landscape) {
          .loc-bg-img {
            object-fit: cover;
          }
        }

        /* Dark overlay */
        .loc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(6,16,26,0.5) 0%,
            rgba(6,16,26,0.3) 40%,
            rgba(6,16,26,0.3) 60%,
            rgba(6,16,26,0.55) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        /* Content */
        .loc-content {
          position: absolute;
          top:0px;
          right:clamp(10%,20%,60%);
          z-index: 2;
          padding: clamp(40px, 8vw, 40px) clamp(16px, 5vw, 22px);
        }

        .stag-wrap { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
        .stag-dash  { display:inline-block; width:28px; height:1px; background:var(--c,#00d4ff); flex-shrink:0; }
        .stag-label { font-family:'Rajdhani',sans-serif; font-size:11px; letter-spacing:0.25em; color:var(--c,#00d4ff); text-transform:uppercase; }

        .loc-detail-panel {
          border: 1px solid rgba(0,212,255,0.1);
          padding: clamp(18px,3vw,26px) clamp(16px,3vw,36px);
          background: rgba(3,7,15,0.92);
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 20px; min-height: 96px; flex-wrap: wrap;
          backdrop-filter: blur(8px);
        }
        .loc-detail-left {
          display: flex; align-items: center;
          gap: 20px; flex-wrap: wrap; flex: 1; min-width: 0;
        }
        .loc-divider { width:1px; height:46px; background:rgba(0,212,255,0.1); flex-shrink:0; }
        .loc-tags { display:flex; flex-wrap:wrap; gap:7px; }
        .loc-tag-pill {
          font-family:'Share Tech Mono','Courier New',monospace;
          font-size:9px; letter-spacing:1.5px; color:var(--c,#00d4ff);
          border:1px solid rgba(0,212,255,0.22); padding:5px 10px;
          text-transform:uppercase; white-space:nowrap;
        }
        .loc-tab-btn {
          font-family:'Orbitron',monospace; font-size:9px; letter-spacing:0.12em;
          border:1px solid rgba(0,212,255,0.1); background:transparent;
          padding:6px 14px; cursor:pointer; white-space:nowrap;
          transition:all 0.2s; flex-shrink:0; color:#1e5060;
        }
        .loc-tab-btn.active { color:#00d4ff; border-color: #9a3934; background:rgba(0,212,255,0.08); }

        @media (max-width: 768px) {
          .loc-detail-panel { flex-direction:column; align-items:flex-start; }
          .loc-divider { display:none; }
          .loc-id-num { font-size:22px !important; }
          .loc-content {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
          }
        }
        @media (max-width: 480px) {
          .loc-detail-left { flex-direction:column; align-items:flex-start; gap:10px; }
          .loc-id-num { font-size:20px !important; min-width:unset !important; }
          .loc-desc { font-size:13px !important; }
          .loc-tag-pill { font-size:8px; padding:4px 8px; }
          .loc-content {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
          }
        }
      `}</style>
      {/* ── Background image ── */}
      <div className="loc-bg-wrap">
        <img
          src={bgImage.src}
          alt=""
          style={{
            minHeight: isMobile? "60vh" : "130vh"
          }}
          aria-hidden="true"
          draggable={false}
        />
      </div>
       <Particles
        particleColors={["#B10608","#B10608","#B10608"]}
        particleCount={3500}
        particleSpread={10}
        speed={0.11}
        particleBaseSize={70}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={5}
        className={{}}
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:0, opacity:0.55 }}
      />
      {/* ── Dark overlay ── */}
      <div className="loc-overlay" />

      {/* ── All content ── */}
      <div className="loc-content">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
          marginTop: "clamp(-10px, -5vw, -2vw)",
            marginBottom: 'clamp(28px, 6vw, 100px)',
            textAlign: "center",
            maxWidth: "1100px",
            marginInline: "auto",
            paddingInline: "clamp(16px,4vw,40px)",
            display:"flex",justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
          }}
        >
          <h2
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 900,
              fontSize: 'clamp(10px, 5vw, 56px)',
              letterSpacing: '0.12em',
              color: '#cce8f4',
              lineHeight: 0.7,
              marginBottom: "clamp(10px,2vw,20px)"
            }}
          >
            Deployed{" "}
            <em style={{ color: '#FF0D00', fontStyle: 'normal' }}>
              Worldwide
            </em>
          </h2>

          <p
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: 'clamp(10px, 2vw, 18px)',
              color: '#b9d4dc',
              lineHeight: 1,
              maxWidth: "800px",
              margin: "0 auto"
            }}
          >
            Strategic presence across Europe, Middle East, and North America —
            ready to deploy within hours, anywhere.
          </p>
        </motion.div>

          {/* Add your map / tabs / detail panel here when ready */}

        </div>
      </div>
    </section>
  )
}

// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { motion, useInView } from 'framer-motion'
// import bgImage from "@/assets/12121221.webp"
// import Particles from './../../utils/Particles'

// export default function LocationsSection() {
//   const [active, setActive] = useState(0)
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-80px' })
//   const [isMobile,  setIsMobile]  = useState(true)

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768)
//     check()
//     window.addEventListener("resize", check)
//     return () => window.removeEventListener("resize", check)
//   }, [])

//   return (
//     <section
//       id="locations"
//       ref={ref}
//       style={{
//         position: 'relative',
//         zIndex: 2,
//         minHeight: isMobile ? "100svh" : "130vh", // full viewport height on mobile
//         overflow: 'hidden',
//         background: '#06101a', // fallback
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Rajdhani:wght@400;500;600&display=swap');

//         .loc-bg-wrap {
//           position: absolute;
//           inset: 0;
//           z-index: 0;
//           background: #06101a;
//         }
//         .loc-bg-img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           object-position: center center;
//           display: block;
//         }
//         @media (max-width: 540px) {
//           .loc-bg-img { object-fit: contain; }
//           #locations { min-height: 100svh; }
//         }

//         .loc-overlay {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(
//             to bottom,
//             rgba(6,16,26,0.5) 0%,
//             rgba(6,16,26,0.3) 40%,
//             rgba(6,16,26,0.3) 60%,
//             rgba(6,16,26,0.55) 100%
//           );
//           z-index: 1;
//           pointer-events: none;
//         }
//         .loc-content {
//           position: relative;
//           z-index: 2;
//           padding: clamp(40px, 8vw, 100px) clamp(16px, 5vw, 52px);
//         }
//       `}</style>

//       {/* Background image */}
//       <div className="loc-bg-wrap">
//         <img
//           src={bgImage.src}
//           alt=""
//           className="loc-bg-img"
//           aria-hidden="true"
//           draggable={false}
//           style={{ minHeight: isMobile ? "100svh" : "130vh" }}
//         />
//       </div>

//       {/* Particles */}
//       <Particles
//         particleColors={["#1a6aff","#1a90ff","#2ab8ff"]}
//         particleCount={5500}
//         particleSpread={10}
//         speed={0.11}
//         particleBaseSize={70}
//         moveParticlesOnHover={false}
//         alphaParticles={false}
//         disableRotation={false}
//         pixelRatio={5}
//         style={{
//           position:"absolute",
//           top:0, left:0, width:"100%", height:"130%",
//           zIndex:0, opacity:0.55
//         }}
//       />

//       {/* Dark overlay */}
//       <div className="loc-overlay" />

//       {/* Content */}
//       <div className="loc-content">
//         <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 28 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.7 }}
//             style={{
//               marginTop: "clamp(-20px, -5vw, 0px)", // upar shift
//               marginBottom: 'clamp(28px, 6vw, 100px)',
//               textAlign: "center",
//               maxWidth: "900px",
//               marginInline: "auto",
//               paddingInline: "clamp(16px,4vw,40px)"
//             }}
//           >
//             <h2
//               style={{
//                 fontFamily: 'Orbitron, monospace',
//                 fontWeight: 900,
//                 fontSize: 'clamp(26px, 5vw, 56px)',
//                 letterSpacing: '0.12em',
//                 color: '#cce8f4',
//                 lineHeight: 1.2,
//                 marginBottom: "clamp(10px,2vw,20px)"
//               }}
//             >
//               Deployed{" "}
//               <em style={{ color: 'var(--c, #00d4ff)', fontStyle: 'normal' }}>
//                 Worldwide
//               </em>
//             </h2>

//             <p
//               style={{
//                 fontFamily: 'Rajdhani, sans-serif',
//                 fontSize: 'clamp(14px, 2vw, 20px)',
//                 color: '#b9d4dc',
//                 lineHeight: 1.8,
//                 maxWidth: "700px",
//                 margin: "0 auto"
//               }}
//             >
//               Strategic presence across Europe, Middle East, and North America —
//               ready to deploy within hours, anywhere.
//             </p>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }