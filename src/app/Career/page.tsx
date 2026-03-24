// 'use client'

// import { useEffect, useRef } from 'react'
// import { motion, useInView } from 'framer-motion'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// // ── Data ───────────────────────────────────────────────────
// const LOCATIONS = [
//   'Tirana, Albania',
//   'Rome, Italy',
//   'Abu Dhabi, UAE',
//   'Dubai, UAE',
//   'New York City, USA',
//   'London, United Kingdom',
// ]

// const SERVICES = [
//   {
//     title: 'Close Protection',
//     desc: 'Providing discreet, highly trained operatives to ensure client safety in all environments.',
//     icon: (
//       <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
//         <path d="M16 2L4 7v9c0 8 5.5 14.5 12 16 6.5-1.5 12-8 12-16V7L16 2z" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round"/>
//         <path d="M11 16l4 4 6-7" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//   },
//   {
//     title: 'Executive Protection',
//     desc: 'Delivering intelligence-led protection solutions for executives and high-net-worth individuals.',
//     icon: (
//       <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
//         <circle cx="16" cy="10" r="5" stroke="#ef4444" strokeWidth="1.5"/>
//         <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
//         <rect x="22" y="4" width="8" height="5" rx="1" stroke="#ef4444" strokeWidth="1.2"/>
//         <path d="M26 9v4" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/>
//       </svg>
//     ),
//   },
//   {
//     title: 'Secure Transportation',
//     desc: 'Ensuring safe, efficient, and low-profile movement through professional security drivers and secure vehicles.',
//     icon: (
//       <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
//         <rect x="2" y="10" width="28" height="14" rx="3" stroke="#ef4444" strokeWidth="1.5"/>
//         <circle cx="8" cy="24" r="3" stroke="#ef4444" strokeWidth="1.5"/>
//         <circle cx="24" cy="24" r="3" stroke="#ef4444" strokeWidth="1.5"/>
//         <path d="M2 16h28M8 10l3-5h10l3 5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/>
//       </svg>
//     ),
//   },
// ]

// const WHY_JOIN = [
//   'Work on high-profile international assignments',
//   'Operate within a global protection network',
//   'Continuous professional development',
//   'Competitive compensation',
//   'Opportunities for career progression',
// ]

// const REQUIREMENTS = [
//   'Military or law enforcement background preferred',
//   'Strong situational awareness',
//   'High level of discipline and professionalism',
//   'Ability to perform under pressure',
//   'Willingness to travel internationally',
// ]

// const PROCESS = [
//   'Submit your application',
//   'Initial screening by recruitment team',
//   'Background verification',
//   'Interview and assessment',
//   'Deployment readiness',
// ]

// const JOBS = [
//   {
//     id: 1,
//     title: 'Close Protection Officer',
//     location: 'Global',
//     type: 'Full-Time',
//     desc: 'Provide direct protection services to clients across multiple regions, ensuring safety and operational excellence.',
//   },
//   {
//     id: 2,
//     title: 'Executive Protection Specialist',
//     location: 'UK / UAE / USA',
//     type: 'Full-Time',
//     desc: 'Deliver strategic protection services to corporate and private clients in dynamic environments.',
//   },
//   {
//     id: 3,
//     title: 'Secure Transportation Specialist',
//     location: 'NYC / Dubai / London',
//     type: 'Full-Time',
//     desc: 'Operate secure transportation services with a focus on safety, discretion, and professionalism.',
//   },
// ]

// // ── Spark canvas ───────────────────────────────────────────
// function SparkCanvas() {
//   const ref = useRef<HTMLCanvasElement>(null)
//   useEffect(() => {
//     const canvas = ref.current
//     if (!canvas) return
//     const ctx = canvas.getContext('2d')!
//     let raf: number
//     const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
//     resize()
//     window.addEventListener('resize', resize)
//     interface Spark { x:number; y:number; vx:number; vy:number; life:number; maxLife:number; r:number }
//     const sparks: Spark[] = []
//     let frame = 0
//     const draw = () => {
//       raf = requestAnimationFrame(draw); frame++
//       ctx.clearRect(0, 0, canvas.width, canvas.height)
//       if (frame % 5 === 0) {
//         const n = canvas.width < 600 ? 1 : 2
//         for (let i = 0; i < n; i++)
//           sparks.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height,
//             vx:(Math.random()-.5)*.5, vy:-Math.random()*.7-.15,
//             life:0, maxLife:80+Math.random()*100, r:Math.random()*1.8+.4 })
//       }
//       for (let i = sparks.length-1; i >= 0; i--) {
//         const s = sparks[i]; s.x+=s.vx; s.y+=s.vy; s.life++
//         if (s.life > s.maxLife) { sparks.splice(i,1); continue }
//         const a = Math.sin((s.life/s.maxLife)*Math.PI)*.8
//         ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
//         ctx.fillStyle=`rgba(220,40,40,${a})`
//         ctx.shadowBlur=8; ctx.shadowColor=`rgba(200,30,30,${a*.5})`
//         ctx.fill(); ctx.shadowBlur=0
//       }
//     }
//     draw()
//     return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
//   }, [])
//   return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:0}}/>
// }

// // ── Radar arc ──────────────────────────────────────────────
// function RadarArc() {
//   return (
//     <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none overflow-hidden" style={{zIndex:1}}>
//       <svg viewBox="0 0 288 288" className="w-full h-full opacity-50">
//         {[240,195,148,100,58].map((r,i)=>(
//           <circle key={i} cx="288" cy="0" r={r} fill="none"
//             stroke={`rgba(200,30,30,${.3-i*.04})`}
//             strokeWidth={i===0?1.5:1}
//             strokeDasharray={i%2===0?'5 5':undefined}/>
//         ))}
//         {[200,230,260,290].map((angle,i)=>{
//           const rad=(angle*Math.PI)/180
//           return <line key={i} x1="288" y1="0" x2={288+260*Math.cos(rad)} y2={260*Math.sin(rad)} stroke="rgba(200,30,30,0.18)" strokeWidth=".8"/>
//         })}
//       </svg>
//     </div>
//   )
// }

// // ── Section wrapper with fade-in ───────────────────────────
// function FadeSection({ children, delay=0, className='' }: { children: React.ReactNode; delay?: number; className?: string }) {
//   const ref = useRef<HTMLDivElement>(null)
//   const inView = useInView(ref, { once: true, margin: '-60px' })
//   return (
//     <motion.div ref={ref} initial={{opacity:0,y:32}} animate={inView?{opacity:1,y:0}:{}}
//       transition={{duration:.65,delay,ease:[.22,1,.36,1]}} className={className}>
//       {children}
//     </motion.div>
//   )
// }

// // ── Section heading ────────────────────────────────────────
// function SectionHeading({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex items-center gap-4 mb-8">
//       <h2 className="text-white font-bold text-xl sm:text-2xl tracking-widest uppercase"
//           style={{fontFamily:"'Rajdhani','Barlow Condensed',sans-serif", letterSpacing:'0.15em'}}>
//         {children}
//       </h2>
//       <div className="flex-1 h-px bg-gradient-to-r from-red-700/60 to-transparent"/>
//     </div>
//   )
// }

// // ── Red dot bullet list ────────────────────────────────────
// function BulletList({ items }: { items: string[] }) {
//   return (
//     <ul className="space-y-2.5">
//       {items.map((item, i) => (
//         <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
//           <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0 shadow-[0_0_6px_rgba(220,50,50,0.8)]"/>
//           {item}
//         </li>
//       ))}
//     </ul>
//   )
// }

// // ── Job card ───────────────────────────────────────────────
// function JobCard({ job, i }: { job: typeof JOBS[0]; i: number }) {
//   const ref = useRef<HTMLDivElement>(null)
//   const inView = useInView(ref, { once: true, margin: '-40px' })
//   return (
//     <motion.div ref={ref} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
//       transition={{duration:.6,delay:i*.12,ease:[.22,1,.36,1]}}
//       className="relative flex flex-col gap-4 p-6 border border-red-900/35 bg-black/30
//                  backdrop-blur-sm group hover:border-red-600/50 transition-all duration-300"
//       style={{
//         clipPath:'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))',
//         boxShadow:'0 0 24px rgba(180,0,0,0.07)',
//       }}>
//       <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-600/60"/>
//       <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-600/60"/>
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
//            style={{background:'radial-gradient(ellipse at 40% 40%, rgba(180,0,0,0.08) 0%, transparent 65%)'}}/>
//       <div>
//         <h3 className="text-white font-semibold text-base leading-tight tracking-wide">{job.title}</h3>
//         <p className="text-gray-500 text-xs mt-1 tracking-wide">{job.location} &nbsp;·&nbsp; {job.type}</p>
//       </div>
//       <div className="h-px bg-gradient-to-r from-red-800/40 via-red-600/20 to-transparent"/>
//       <p className="text-gray-400 text-sm leading-relaxed">{job.desc}</p>
//       <motion.button whileHover={{scale:1.03}} whileTap={{scale:.97}}
//         className="mt-auto self-start px-5 py-2 text-xs font-bold tracking-[0.18em] uppercase
//                    text-white border border-red-700/55 hover:border-red-500 hover:bg-red-900/20
//                    transition-all duration-200"
//         style={{clipPath:'polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))'}}>
//         Apply Now →
//       </motion.button>
//     </motion.div>
//   )
// }

// // ── Process step ───────────────────────────────────────────
// function ProcessStep({ num, text, last }: { num: number; text: string; last: boolean }) {
//   return (
//     <div className="flex items-start gap-4">
//       <div className="flex flex-col items-center">
//         <div className="w-8 h-8 rounded-full border border-red-700/60 bg-red-950/40 flex items-center justify-center
//                         text-red-400 text-xs font-bold flex-shrink-0">{num}</div>
//         {!last && <div className="w-px flex-1 min-h-[28px] bg-gradient-to-b from-red-800/40 to-transparent mt-1"/>}
//       </div>
//       <p className="text-gray-300 text-sm leading-relaxed pt-1.5">{text}</p>
//     </div>
//   )
// }

// // ── Main ───────────────────────────────────────────────────
// export default function CareersSection() {
//   const sectionRef = useRef<HTMLElement>(null)
//   const heroRef    = useRef<HTMLDivElement>(null)
//   const imgRef     = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo(heroRef.current, {opacity:0,y:50},
//         {opacity:1,y:0,duration:1,ease:'power3.out',
//          scrollTrigger:{trigger:sectionRef.current,start:'top 78%',once:true}})
//       gsap.fromTo(imgRef.current, {opacity:0,x:-50,scale:.96},
//         {opacity:1,x:0,scale:1,duration:1.1,ease:'power3.out',
//          scrollTrigger:{trigger:sectionRef.current,start:'top 72%',once:true}})
//     }, sectionRef)
//     return ()=>ctx.revert()
//   }, [])

//   return (
//     <section ref={sectionRef}
//       className="relative w-full overflow-hidden py-20 px-4 sm:px-8 lg:px-16"
//       style={{background:'radial-gradient(ellipse 130% 100% at 50% 30%, #170000 0%, #0a0000 45%, #000000 100%)'}}>

//       <SparkCanvas/>
//       <RadarArc/>
//       <div className="absolute inset-0 pointer-events-none" style={{zIndex:0,
//         background:'radial-gradient(ellipse 70% 35% at 50% 0%, rgba(120,0,0,0.22) 0%, transparent 70%)'}}/>
//       <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{zIndex:0,
//         background:'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'}}/>

//       <div className="relative max-w-7xl mx-auto" style={{zIndex:2}}>

//         {/* ══ HERO: title + subtitle ══ */}
//         <div ref={heroRef} className="text-center mb-16">
//           <p className="text-red-600/70 text-xs font-bold tracking-[0.35em] uppercase mb-4">
//             — Opportunities —
//           </p>
//           <h1 className="text-white font-bold mb-4"
//               style={{fontFamily:"'Rajdhani','Barlow Condensed',sans-serif",
//                       fontSize:'clamp(2.4rem,6vw,4rem)',letterSpacing:'0.08em'}}>
//             CAREERS
//           </h1>
//           <div className="mx-auto mb-5 h-px w-28 bg-gradient-to-r from-transparent via-red-600 to-transparent"/>
//           <p className="text-gray-300 text-base sm:text-lg tracking-wide max-w-2xl mx-auto leading-relaxed">
//             Join an Elite Global Protection Network
//           </p>
//         </div>

//         {/* ══ HERO: image + intro text ══ */}
//         <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 lg:gap-14 items-start mb-20">

//           {/* Image */}
//           <div ref={imgRef} className="w-full">
//             <div className="relative rounded overflow-hidden w-full"
//                  style={{aspectRatio:'3/4',border:'1px solid rgba(180,0,0,0.28)',
//                          boxShadow:'0 0 50px rgba(160,0,0,0.18), inset 0 0 28px rgba(0,0,0,0.5)'}}>
//               <img src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=700&h=900&fit=crop&q=85"
//                    alt="Security agents" className="w-full h-full object-cover object-top"
//                    style={{filter:'brightness(0.7) contrast(1.1) saturate(0.65)'}}/>
//               <div className="absolute inset-0 pointer-events-none"
//                    style={{background:'linear-gradient(to top, rgba(120,0,0,0.5) 0%, transparent 55%)'}}/>
//               <div className="absolute inset-0 pointer-events-none opacity-15"
//                    style={{backgroundImage:'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)'}}/>
//               <span className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-red-600/75"/>
//               <span className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-red-600/75"/>
//               <span className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-red-600/75"/>
//               <span className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-red-600/75"/>
//             </div>
//           </div>

//           {/* Intro text + what we do */}
//           <FadeSection delay={.2} className="flex flex-col gap-8">
//             <div>
//               <SectionHeading>Who We Are</SectionHeading>
//               <p className="text-gray-300 text-base leading-relaxed"
//                  style={{fontStyle:'italic',fontFamily:"'Georgia',serif"}}>
//                 International Statement Security Services is a trusted provider of close protection,
//                 executive protection, and secure transportation services operating across Europe,
//                 the Middle East, and the United States.{' '}
//                 We recruit disciplined, professional individuals who can operate in high-pressure
//                 environments with <strong className="text-white not-italic font-bold">precision, discretion, and integrity.</strong>
//               </p>
//             </div>

//             {/* What We Do */}
//             <div>
//               <SectionHeading>What We Do</SectionHeading>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 {SERVICES.map((s, i) => (
//                   <div key={i}
//                        className="flex flex-col gap-3 p-4 border border-red-900/30 bg-black/25
//                                   hover:border-red-700/50 transition-colors duration-300"
//                        style={{clipPath:'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)'}}>
//                     <div>{s.icon}</div>
//                     <h4 className="text-white font-semibold text-sm tracking-wide">{s.title}</h4>
//                     <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </FadeSection>
//         </div>

//         {/* ══ GLOBAL PRESENCE + WHY JOIN — side by side ══ */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">

//           <FadeSection delay={.1}>
//             <SectionHeading>Our Global Presence</SectionHeading>
//             <div className="grid grid-cols-2 gap-3">
//               {LOCATIONS.map((loc, i) => (
//                 <div key={i} className="flex items-center gap-2.5 text-gray-300 text-sm py-2 px-3
//                                          border border-red-900/25 bg-black/20">
//                   <span className="w-1 h-1 rounded-full bg-red-600 flex-shrink-0 shadow-[0_0_5px_rgba(220,50,50,0.7)]"/>
//                   {loc}
//                 </div>
//               ))}
//             </div>
//           </FadeSection>

//           <FadeSection delay={.18}>
//             <SectionHeading>Why Join Us</SectionHeading>
//             <BulletList items={WHY_JOIN}/>
//           </FadeSection>
//         </div>

//         {/* ══ CURRENT OPPORTUNITIES ══ */}
//         <FadeSection delay={.1} className="mb-20">
//           <SectionHeading>Current Opportunities</SectionHeading>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {JOBS.map((job, i) => <JobCard key={job.id} job={job} i={i}/>)}
//           </div>
//         </FadeSection>

//         {/* ══ REQUIREMENTS + PROCESS — side by side ══ */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">

//           <FadeSection delay={.1}>
//             <SectionHeading>What We Look For</SectionHeading>
//             <BulletList items={REQUIREMENTS}/>
//           </FadeSection>

//           <FadeSection delay={.18}>
//             <SectionHeading>Application Process</SectionHeading>
//             <div className="flex flex-col gap-0">
//               {PROCESS.map((step, i) => (
//                 <ProcessStep key={i} num={i+1} text={step} last={i===PROCESS.length-1}/>
//               ))}
//             </div>
//           </FadeSection>
//         </div>

//         {/* ══ APPLY NOW CTA ══ */}
//         <FadeSection delay={.1}>
//           <div className="relative p-8 sm:p-12 border border-red-800/40 bg-black/30 text-center overflow-hidden"
//                style={{clipPath:'polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px))'}}>
//             <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-600/70"/>
//             <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-600/70"/>
//             <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-600/70"/>
//             <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-600/70"/>
//             <div className="absolute inset-0 pointer-events-none"
//                  style={{background:'radial-gradient(ellipse at 50% 100%, rgba(120,0,0,0.15) 0%, transparent 65%)'}}/>
//             <p className="text-xs font-bold tracking-[0.3em] text-red-600/70 uppercase mb-4">
//               — Ready to Serve —
//             </p>
//             <h2 className="text-white font-bold mb-4"
//                 style={{fontFamily:"'Rajdhani','Barlow Condensed',sans-serif",
//                         fontSize:'clamp(1.6rem,4vw,2.6rem)',letterSpacing:'0.06em'}}>
//               APPLY NOW
//             </h2>
//             <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto mb-8">
//               If you meet our standards and are ready to operate at the highest level,
//               we invite you to submit your application.
//             </p>
//             <motion.button
//               whileHover={{scale:1.04}}
//               whileTap={{scale:.97}}
//               className="inline-flex items-center gap-3 px-8 py-3.5 bg-red-700 hover:bg-red-600
//                          text-white font-bold text-sm tracking-[0.18em] uppercase
//                          transition-colors duration-200"
//               style={{
//                 clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
//                 boxShadow:'0 0 28px rgba(180,0,0,0.45)',
//               }}>
//               Submit Your Application
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                 <path d="M5 12h14M12 5l7 7-7 7"/>
//               </svg>
//             </motion.button>
//           </div>
//         </FadeSection>

//         {/* ── Footer link ── */}
//         <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
//           transition={{duration:.5,delay:.3}} className="flex justify-end mt-10">
//           <button className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white
//                              transition-colors duration-200 tracking-wide">
//             View All Job Openings
//             <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
//           </button>
//         </motion.div>

//       </div>
//     </section>
//   )
// }

'use client'

// ── CHANGE from original: ──────────────────────────────────
// 1. Added `useState` import
// 2. Imported JobApplicationModal
// 3. Added `modalOpen` + `applyPosition` state
// 4. All "Apply Now" buttons now open the modal (pre-filled with position)
// 5. "Submit Your Application" CTA also opens modal
// ──────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'        // ← added useState
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import JobApplicationModal from '@/components/sections/JobApplicationModal'  // ← import modal

gsap.registerPlugin(ScrollTrigger)

// ── Data (unchanged) ───────────────────────────────────────
const LOCATIONS = [
  'Tirana, Albania','Rome, Italy','Abu Dhabi, UAE',
  'Dubai, UAE','New York City, USA','London, United Kingdom',
]
const SERVICES = [
  { title:'Close Protection', desc:'Providing discreet, highly trained operatives to ensure client safety in all environments.', icon:<svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><path d="M16 2L4 7v9c0 8 5.5 14.5 12 16 6.5-1.5 12-8 12-16V7L16 2z" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round"/><path d="M11 16l4 4 6-7" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title:'Executive Protection', desc:'Delivering intelligence-led protection solutions for executives and high-net-worth individuals.', icon:<svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><circle cx="16" cy="10" r="5" stroke="#ef4444" strokeWidth="1.5"/><path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><rect x="22" y="4" width="8" height="5" rx="1" stroke="#ef4444" strokeWidth="1.2"/><path d="M26 9v4" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { title:'Secure Transportation', desc:'Ensuring safe, efficient, and low-profile movement through professional security drivers and secure vehicles.', icon:<svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><rect x="2" y="10" width="28" height="14" rx="3" stroke="#ef4444" strokeWidth="1.5"/><circle cx="8" cy="24" r="3" stroke="#ef4444" strokeWidth="1.5"/><circle cx="24" cy="24" r="3" stroke="#ef4444" strokeWidth="1.5"/><path d="M2 16h28M8 10l3-5h10l3 5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/></svg> },
]
const WHY_JOIN = ['Work on high-profile international assignments','Operate within a global protection network','Continuous professional development','Competitive compensation','Opportunities for career progression']
const REQUIREMENTS = ['Military or law enforcement background preferred','Strong situational awareness','High level of discipline and professionalism','Ability to perform under pressure','Willingness to travel internationally']
const PROCESS = ['Submit your application','Initial screening by recruitment team','Background verification','Interview and assessment','Deployment readiness']
const JOBS = [
  { id:1, title:'Close Protection Officer',       location:'Global',              type:'Full-Time', desc:'Provide direct protection services to clients across multiple regions, ensuring safety and operational excellence.' },
  { id:2, title:'Executive Protection Specialist', location:'UK / UAE / USA',      type:'Full-Time', desc:'Deliver strategic protection services to corporate and private clients in dynamic environments.' },
  { id:3, title:'Secure Transportation Specialist',location:'NYC / Dubai / London',type:'Full-Time', desc:'Operate secure transportation services with a focus on safety, discretion, and professionalism.' },
]

// ── Sub-components (unchanged) ─────────────────────────────
function SparkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const resize = () => { canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    interface Spark{x:number;y:number;vx:number;vy:number;life:number;maxLife:number;r:number}
    const sparks:Spark[]=[]; let frame=0
    const draw=()=>{ raf=requestAnimationFrame(draw); frame++; ctx.clearRect(0,0,canvas.width,canvas.height)
      if(frame%5===0){const n=canvas.width<600?1:2;for(let i=0;i<n;i++)sparks.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.5,vy:-Math.random()*.7-.15,life:0,maxLife:80+Math.random()*100,r:Math.random()*1.8+.4})}
      for(let i=sparks.length-1;i>=0;i--){const s=sparks[i];s.x+=s.vx;s.y+=s.vy;s.life++;if(s.life>s.maxLife){sparks.splice(i,1);continue}const a=Math.sin((s.life/s.maxLife)*Math.PI)*.8;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(220,40,40,${a})`;ctx.shadowBlur=8;ctx.shadowColor=`rgba(200,30,30,${a*.5})`;ctx.fill();ctx.shadowBlur=0}}
    draw(); return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)}
  },[])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:0}}/>
}

function RadarArc() {
  return (
    <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none overflow-hidden" style={{zIndex:1}}>
      <svg viewBox="0 0 288 288" className="w-full h-full opacity-50">
        {[240,195,148,100,58].map((r,i)=><circle key={i} cx="288" cy="0" r={r} fill="none" stroke={`rgba(200,30,30,${.3-i*.04})`} strokeWidth={i===0?1.5:1} strokeDasharray={i%2===0?'5 5':undefined}/>)}
        {[200,230,260,290].map((angle,i)=>{const rad=(angle*Math.PI)/180;return<line key={i} x1="288" y1="0" x2={288+260*Math.cos(rad)} y2={260*Math.sin(rad)} stroke="rgba(200,30,30,0.18)" strokeWidth=".8"/>})}
      </svg>
    </div>
  )
}

function FadeSection({children,delay=0,className=''}:{children:React.ReactNode;delay?:number;className?:string}){
  const ref=useRef<HTMLDivElement>(null); const inView=useInView(ref,{once:true,margin:'-60px'})
  return <motion.div ref={ref} initial={{opacity:0,y:32}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.65,delay,ease:[.22,1,.36,1]}} className={className}>{children}</motion.div>
}

function SectionHeading({children}:{children:React.ReactNode}){
  return <div className="flex items-center gap-4 mb-8"><h2 className="text-white font-bold text-xl sm:text-2xl tracking-widest uppercase" style={{fontFamily:"'Rajdhani','Barlow Condensed',sans-serif",letterSpacing:'0.15em'}}>{children}</h2><div className="flex-1 h-px bg-gradient-to-r from-red-700/60 to-transparent"/></div>
}

function BulletList({items}:{items:string[]}){
  return <ul className="space-y-2.5">{items.map((item,i)=><li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0 shadow-[0_0_6px_rgba(220,50,50,0.8)]"/>{item}</li>)}</ul>
}

function ProcessStep({num,text,last}:{num:number;text:string;last:boolean}){
  return <div className="flex items-start gap-4"><div className="flex flex-col items-center"><div className="w-8 h-8 rounded-full border border-red-700/60 bg-red-950/40 flex items-center justify-center text-red-400 text-xs font-bold flex-shrink-0">{num}</div>{!last&&<div className="w-px flex-1 min-h-[28px] bg-gradient-to-b from-red-800/40 to-transparent mt-1"/>}</div><p className="text-gray-300 text-sm leading-relaxed pt-1.5">{text}</p></div>
}

// ── Job card — now accepts onApply callback ────────────────
function JobCard({ job, i, onApply }: { job:typeof JOBS[0]; i:number; onApply:(pos:string)=>void }) {
  const ref=useRef<HTMLDivElement>(null); const inView=useInView(ref,{once:true,margin:'-40px'})
  return (
    <motion.div ref={ref} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:.6,delay:i*.12,ease:[.22,1,.36,1]}}
      className="relative flex flex-col gap-4 p-6 border border-red-900/35 bg-black/30 backdrop-blur-sm group hover:border-red-600/50 transition-all duration-300"
      style={{clipPath:'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))',boxShadow:'0 0 24px rgba(180,0,0,0.07)'}}>
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-600/60"/>
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-600/60"/>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{background:'radial-gradient(ellipse at 40% 40%, rgba(180,0,0,0.08) 0%, transparent 65%)'}}/>
      <div>
        <h3 className="text-white font-semibold text-base leading-tight tracking-wide">{job.title}</h3>
        <p className="text-gray-500 text-xs mt-1 tracking-wide">{job.location} &nbsp;·&nbsp; {job.type}</p>
      </div>
      <div className="h-px bg-gradient-to-r from-red-800/40 via-red-600/20 to-transparent"/>
      <p className="text-gray-400 text-sm leading-relaxed">{job.desc}</p>
      {/* ── APPLY NOW button — opens modal pre-filled ── */}
      <motion.button
        whileHover={{scale:1.03}} whileTap={{scale:.97}}
        onClick={() => {onApply(job.title);}}   // ← wired to modal
        className="mt-auto self-start px-5 py-2 text-xs font-bold tracking-[0.18em] uppercase
                   text-white border border-red-700/55 hover:border-red-500 hover:bg-red-900/20
                   transition-all duration-200"
        style={{clipPath:'polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))'}}>
        Apply Now →
      </motion.button>
    </motion.div>
  )
}

// ── Main ───────────────────────────────────────────────────
export default function CareersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const heroRef    = useRef<HTMLDivElement>(null)
  const imgRef     = useRef<HTMLDivElement>(null)

  // ── Modal state ──────────────────────────────────────────
  const [modalOpen,    setModalOpen]    = useState(false)
  const [applyPosition, setApplyPosition] = useState('')

  // Open modal — optionally pre-fill a position
  const openModal = (position = '') => {
    setApplyPosition(position)
    setModalOpen(true)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,{opacity:0,y:50},{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:sectionRef.current,start:'top 78%',once:true}})
      gsap.fromTo(imgRef.current,{opacity:0,x:-50,scale:.96},{opacity:1,x:0,scale:1,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:sectionRef.current,start:'top 72%',once:true}})
    }, sectionRef)
    return ()=>ctx.revert()
  }, [])

  return (
    <section ref={sectionRef}
      className="relative w-full overflow-hidden py-20 px-4 sm:px-8 lg:px-16"
      style={{background:'radial-gradient(ellipse 130% 100% at 50% 30%, #170000 0%, #0a0000 45%, #000000 100%)'}}>

      <SparkCanvas/>
      <RadarArc/>
      <div className="absolute inset-0 pointer-events-none" style={{zIndex:0,background:'radial-gradient(ellipse 70% 35% at 50% 0%, rgba(120,0,0,0.22) 0%, transparent 70%)'}}/>
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{zIndex:0,background:'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'}}/>

      <div className="relative max-w-7xl mx-auto" style={{zIndex:2}}>

        {/* Hero */}
        <div ref={heroRef} className="text-center mb-16">
          <p className="text-red-600/70 text-xs font-bold tracking-[0.35em] uppercase mb-4">— Opportunities —</p>
          <h1 className="text-white font-bold mb-4" style={{fontFamily:"'Rajdhani','Barlow Condensed',sans-serif",fontSize:'clamp(2.4rem,6vw,4rem)',letterSpacing:'0.08em'}}>CAREERS</h1>
          <div className="mx-auto mb-5 h-px w-28 bg-gradient-to-r from-transparent via-red-600 to-transparent"/>
          <p className="text-gray-300 text-base sm:text-lg tracking-wide max-w-2xl mx-auto leading-relaxed">Join an Elite Global Protection Network</p>
        </div>

        {/* Image + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 lg:gap-14 items-start mb-20">
          <div ref={imgRef} className="w-full">
            <div className="relative rounded overflow-hidden w-full" style={{aspectRatio:'3/4',border:'1px solid rgba(180,0,0,0.28)',boxShadow:'0 0 50px rgba(160,0,0,0.18), inset 0 0 28px rgba(0,0,0,0.5)'}}>
              <img src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=700&h=900&fit=crop&q=85" alt="Security agents" className="w-full h-full object-cover object-top" style={{filter:'brightness(0.7) contrast(1.1) saturate(0.65)'}}/>
              <div className="absolute inset-0 pointer-events-none" style={{background:'linear-gradient(to top, rgba(120,0,0,0.5) 0%, transparent 55%)'}}/>
              <div className="absolute inset-0 pointer-events-none opacity-15" style={{backgroundImage:'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)'}}/>
              <span className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-red-600/75"/>
              <span className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-red-600/75"/>
              <span className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-red-600/75"/>
              <span className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-red-600/75"/>
            </div>
          </div>

          <FadeSection delay={.2} className="flex flex-col gap-8">
            <div>
              <SectionHeading>Who We Are</SectionHeading>
              <p className="text-gray-300 text-base leading-relaxed" style={{fontStyle:'italic',fontFamily:"'Georgia',serif"}}>
                International Statement Security Services is a trusted provider of close protection,
                executive protection, and secure transportation services operating across Europe,
                the Middle East, and the United States.{' '}
                We recruit disciplined, professional individuals who can operate in high-pressure
                environments with <strong className="text-white not-italic font-bold">precision, discretion, and integrity.</strong>
              </p>
            </div>
            <div>
              <SectionHeading>What We Do</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SERVICES.map((s,i)=>(
                  <div key={i} className="flex flex-col gap-3 p-4 border border-red-900/30 bg-black/25 hover:border-red-700/50 transition-colors duration-300" style={{clipPath:'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)'}}>
                    <div>{s.icon}</div>
                    <h4 className="text-white font-semibold text-sm tracking-wide">{s.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>
        </div>

        {/* Global presence + Why join */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <FadeSection delay={.1}>
            <SectionHeading>Our Global Presence</SectionHeading>
            <div className="grid grid-cols-2 gap-3">
              {LOCATIONS.map((loc,i)=><div key={i} className="flex items-center gap-2.5 text-gray-300 text-sm py-2 px-3 border border-red-900/25 bg-black/20"><span className="w-1 h-1 rounded-full bg-red-600 flex-shrink-0 shadow-[0_0_5px_rgba(220,50,50,0.7)]"/>{loc}</div>)}
            </div>
          </FadeSection>
          <FadeSection delay={.18}>
            <SectionHeading>Why Join Us</SectionHeading>
            <BulletList items={WHY_JOIN}/>
          </FadeSection>
        </div>

        {/* Jobs — pass openModal down */}
        <FadeSection delay={.1} className="mb-20">
          <SectionHeading>Current Opportunities</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {JOBS.map((job,i)=><JobCard key={job.id} job={job} i={i} onApply={openModal}/>)}
          </div>
        </FadeSection>

        {/* Requirements + Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <FadeSection delay={.1}><SectionHeading>What We Look For</SectionHeading><BulletList items={REQUIREMENTS}/></FadeSection>
          <FadeSection delay={.18}>
            <SectionHeading>Application Process</SectionHeading>
            <div className="flex flex-col gap-0">{PROCESS.map((step,i)=><ProcessStep key={i} num={i+1} text={step} last={i===PROCESS.length-1}/>)}</div>
          </FadeSection>
        </div>

        {/* CTA */}
        <FadeSection delay={.1}>
          <div className="relative p-8 sm:p-12 border border-red-800/40 bg-black/30 text-center overflow-hidden" style={{clipPath:'polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px))'}}>
            <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-600/70"/>
            <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-600/70"/>
            <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-600/70"/>
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-600/70"/>
            <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 50% 100%, rgba(120,0,0,0.15) 0%, transparent 65%)'}}/>
            <p className="text-xs font-bold tracking-[0.3em] text-red-600/70 uppercase mb-4">— Ready to Serve —</p>
            <h2 className="text-white font-bold mb-4" style={{fontFamily:"'Rajdhani','Barlow Condensed',sans-serif",fontSize:'clamp(1.6rem,4vw,2.6rem)',letterSpacing:'0.06em'}}>APPLY NOW</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto mb-8">
              If you meet our standards and are ready to operate at the highest level,
              we invite you to submit your application.
            </p>
            {/* ── CTA BUTTON — opens modal ── */}
            <motion.button
              whileHover={{scale:1.04}} whileTap={{scale:.97}}
              onClick={() => openModal()}   // ← wired to modal
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-red-700 hover:bg-red-600 text-white font-bold text-sm tracking-[0.18em] uppercase transition-colors duration-200"
              style={{clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',boxShadow:'0 0 28px rgba(180,0,0,0.45)'}}>
              Submit Your Application
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </motion.button>
          </div>
        </FadeSection>

        {/* View all */}
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:.5,delay:.3}} className="flex justify-end mt-10">
          <button
            onClick={() => openModal()}   // ← also opens modal (generic)
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 tracking-wide">
            View All Job Openings
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </motion.div>

      </div>

      {/* ── MODAL — rendered here, portal-free ── */}
      <JobApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        position={applyPosition}
      />
    </section>
  )
}