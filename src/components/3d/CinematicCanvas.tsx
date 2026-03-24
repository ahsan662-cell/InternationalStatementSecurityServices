// 'use client'

// /**
//  * CinematicCanvas.tsx
//  * =====================================================================
//  * The main visual engine. Everything drawn here runs on a fixed canvas
//  * behind all page content. Built with pure Canvas 2D API so it works
//  * without WebGL fallbacks.
//  *
//  * WHAT'S IN HERE:
//  *  1. Floating particle network
//  *  2. HUD rings (concentric, spinning, electric — like image 1)
//  *  3. Holographic rotating globe with city dots
//  *  4. Lightning arcs crackling around rings
//  *  5. ✈️ Airplane flying infinite figure-8 with trail, nav lights, exhaust
//  *  6. Floating HUD data panels (like image 5 & 6)
//  *
//  * HOW TO ADD MORE VISUAL ELEMENTS:
//  *  - Create a new draw function below (e.g. drawRadarSweep)
//  *  - Call it inside the render() function
//  *  - That's it — it'll be part of the canvas loop
//  * =====================================================================
//  */

// import { useEffect, useRef, useState } from 'react'
// import { xor } from 'three/examples/jsm/nodes/Nodes.js';
// import PlnImage from '@/assets/plane.png'
// // ── Types ─────────────────────────────────────────────────────────────
// interface Particle {
//   x: number; y: number
//   vx: number; vy: number
//   size: number; alpha: number
// }

// interface TrailPoint {
//   x: number; y: number; age: number
// }

// interface PlaneState {
//   t: number
//   speed: number
//   trailPoints: TrailPoint[]
//   maxTrail: number
// }
// // ── Utility: lat/lon → 3D point ───────────────────────────────────────
// function latLon3D(lat: number, lon: number, rot: number) {
//   const la = (lat * Math.PI) / 180
//   const lo = ((lon + rot) * Math.PI) / 180
//   return {
//     x: Math.cos(la) * Math.sin(lo),
//     y: Math.sin(la),
//     z: Math.cos(la) * Math.cos(lo),
//   }
// }

// // ── Globe city positions ──────────────────────────────────────────────
// const GLOBE_CITIES = [
//   { lat: 40.7, lon: -74 },   // New York
//   { lat: 51.5, lon: -0.1 },  // London
//   { lat: 41.9, lon: 12.5 },  // Rome
//   { lat: 41.3, lon: 19.8 },  // Tirana
//   { lat: 25.3, lon: 51.5 },  // Doha
//   { lat: 24.5, lon: 54.4 },  // Abu Dhabi
// ]

// // ══════════════════════════════════════════════════════════════════════
// export default function CinematicCanvas() {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const [isPlaneImageLoaded, setIsPlaneImageLoaded] = useState(false)
//   const [planeImg, setPlaneImg] = useState<HTMLImageElement | null>(null);
//   useEffect(() => {
//     const img = new Image();
//     img.src = PlnImage.src; // Check karein path sahi hai ya nahi
//     img.onload = () => setPlaneImg(img);
//   }, []);
//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext('2d')!

//     let W = 0, H = 0
//     let animFrame: number
//     let globeAngle = 0
    
//     // Particles
//     let particles: Particle[] = []
    
//     // Plane state
//     const planes: PlaneState[] = [
//       { t: Math.PI/2, speed: 0.021, trailPoints: [], maxTrail: 180 },
//       // { t: Math.PI / 2, speed: 0.012, trailPoints: [], maxTrail: 180 },
//     ]

//     // ── Resize ─────────────────────────────────────────────────────────
//     function resize() {
//       W = canvas!.width = window.innerWidth
//       H = canvas!.height = window.innerHeight
//       // Reinit particles on resize
//       particles = Array.from({ length: 40 }, () => ({
//         x: Math.random() * W,
//         y: Math.random() * H,
//         vx: (Math.random() - 0.5) * 0.25,
//         vy: (Math.random() - 0.5) * 0.25,
//         size: Math.random() * 1.4 + 0.3,
//         alpha: Math.random() * 0.35 + 0.08,
//       }))
//     }
//     resize()
//     window.addEventListener('resize', resize)

//     // ── 1. PARTICLES ───────────────────────────────────────────────────
//     function drawParticles() {
//       particles.forEach(p => {
//         if (p.x < 0 || p.x > W) p.vx *= -1
//         if (p.y < 0 || p.y > H) p.vy *= -1
//         p.x += p.vx; p.y += p.vy
//         ctx.beginPath()
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
//         ctx.fillStyle = `rgba(0,212,255,${p.alpha})`
//         ctx.fill()
//       })
//       // Connection lines between close particles
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x
//           const dy = particles[i].y - particles[j].y
//           const distSq = dx*dx + dy*dy;
//           if (distSq < 130*130) {
//             ctx.beginPath()
//             ctx.moveTo(particles[i].x, particles[i].y)
//             ctx.lineTo(particles[j].x, particles[j].y)
//             ctx.strokeStyle = `rgba(0,212,255,${0.055 * (1 - distSq / 130)})`
//             ctx.lineWidth = 0.5
//             ctx.stroke()
//           }
//         }
//       }
//     }

//     // ── 2. HUD RINGS ──────────────────────────────────────────────────
//     function drawHUDRings() {
//       const rx = W * 0.72
//       const ry = H * 0.46
//       const maxR = Math.min(W, H) * 0.72
//       const t = Date.now() / 1000

//       // Ambient glow behind rings
//       const atmo = ctx.createRadialGradient(rx, ry, maxR * 0.8, rx, ry, maxR * 1.8)
//       atmo.addColorStop(0, 'rgba(0,212,255,0.04)')
//       atmo.addColorStop(1, 'transparent')
//       ctx.beginPath(); ctx.arc(rx, ry, maxR * 1.3, 0, Math.PI * 2)
//       ctx.fillStyle = atmo; ctx.fill()

//       // Ring definitions: [radiusFactor, angularSpeed, dashArray, alpha, lineWidth]
//       // To ADD a new ring: append a row here
//       const rings: [number, number, number[], number, number][] = [  
//         [1.00, 0.3, [10,10], 0.15, 1],
//         [0.84, 0.8, [8,6], 0.1, 1.5],
//         [0.68, 0.6, [4,4], 0.13, 0.8],
//         [0.58, -1.8, [12,4], 0.55, 2],
//         [0.40, -0.7, [6,3], 0.65, 1.5],
//         [0.18, -3, [3,2], 1, 3]
//       ]

//       rings.forEach(([rf, speed, dash, alpha, lw]) => {
//         console.log(`rf: ${rf} || speed: ${speed} || dash: ${dash} || aplha: ${alpha} || lw: ${lw}`);
//         const r = maxR * rf
//         ctx.save()
//         ctx.translate(rx, ry)
//         ctx.rotate(t * speed)
//         ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2)
//         ctx.strokeStyle = `rgba(0,212,255,${alpha})`
//         ctx.lineWidth = lw
//         if (dash.length) ctx.setLineDash(dash)
//         ctx.lineDashOffset = -t * speed * 50  // <-- add this
//         ctx.stroke()
//         ctx.lineDashOffset = 0
//         ctx.setLineDash([])
//         // Extra blur glow on bright rings
//         if (alpha > 0.45) {
//           ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2)
//           ctx.strokeStyle = `rgba(0,212,255,${alpha * 0.25})`
//           ctx.lineWidth = lw + 7
//           ctx.filter = 'blur(2px)'
//           ctx.stroke()
//           ctx.filter = 'none'
//         }
//         ctx.restore()
//       })

//       // Tick marks on main ring
//       const tickR = maxR * 0.58
//       ctx.save()
//       ctx.translate(rx, ry)
//       ctx.rotate(t * -5)
//       for (let i = 0; i < 72; i++) {
//         const a = (i / 72) * Math.PI * 2
//         const isLong = i % 6 === 0
//         const len = isLong ? 14 : 7
//         ctx.beginPath()
//         ctx.moveTo(Math.cos(a) * tickR, Math.sin(a) * tickR)
//         ctx.lineTo(Math.cos(a) * (tickR - len), Math.sin(a) * (tickR - len))
//         ctx.strokeStyle = `rgba(0,212,255,${isLong ? 0.7 : 0.28})`
//         ctx.lineWidth = isLong ? 1.5 : 0.7
//         ctx.stroke()
//       }
//       ctx.restore()

//       // Inner crosshair lines
//       ctx.save()
//       ctx.translate(rx, ry)
//       ctx.rotate(t * 0.4)
//       ;[[1,0],[0,1],[-1,0],[0,-1]].forEach(([dx, dy]) => {
//         ctx.beginPath()
//         ctx.moveTo(dx * maxR * 0.22, dy * maxR * 0.22)
//         ctx.lineTo(dx * maxR * 0.42, dy * maxR * 0.42)
//         ctx.strokeStyle = 'rgba(0,212,255,0.5)'
//         ctx.lineWidth = 1
//         ctx.stroke()
//       })
//       ctx.restore()

//       // Core center glow
//       const coreGlow = ctx.createRadialGradient(rx, ry, 0, rx, ry, maxR * 0.18)
//       coreGlow.addColorStop(0, 'rgba(0,212,255,0.28)')
//       coreGlow.addColorStop(1, 'transparent')
//       ctx.beginPath(); ctx.arc(rx, ry, maxR * 0.18, 0, Math.PI * 2)
//       ctx.fillStyle = coreGlow; ctx.fill()
//     }

//     // ── 3. HOLOGRAPHIC GLOBE ──────────────────────────────────────────
//     function drawGlobe() {
//       const gx = W * 0.72
//       const gy = H * 0.46
//       const R = Math.min(W, H) * 0.32 * 0.48
//       const t = Date.now() / 1000

//       // Base fill
//       const bg = ctx.createRadialGradient(gx - R * 0.3, gy - R * 0.3, 0, gx, gy, R)
//       bg.addColorStop(0, 'rgba(0,50,90,0.22)')
//       bg.addColorStop(1, 'rgba(0,5,20,0.0)')
//       ctx.beginPath(); ctx.arc(gx, gy, R, 0, Math.PI * 2)
//       ctx.fillStyle = bg; ctx.fill()

//       // Latitude rings
//       for (let lat = -75; lat <= 75; lat += 15) {
//         const cosLat = Math.cos((lat * Math.PI) / 180)
//         const sinLat = Math.sin((lat * Math.PI) / 180)
//         const yr = gy - sinLat * R
//         const xr = cosLat * R
//         if (xr < 2) continue
//         ctx.beginPath()
//         ctx.ellipse(gx, yr, xr, xr * 0.16, 0, 0, Math.PI * 2)
//         ctx.strokeStyle = 'rgba(0,212,255,0.12)'
//         ctx.lineWidth = 0.6; ctx.stroke()
//       }

//       // Longitude lines
//       for (let lon = 0; lon < 180; lon += 20) {
//         ctx.beginPath()
//         let first = true
//         for (let a = 0; a <= 360; a += 10) {
//           const p = latLon3D(a - 90, lon, globeAngle)
//           const px = gx + p.x * R
//           const py = gy - p.y * R
//           if (first) { ctx.moveTo(px, py); first = false }
//           else ctx.lineTo(px, py)
//         }
//         ctx.strokeStyle = 'rgba(0,212,255,0.08)'
//         ctx.lineWidth = 0.4; ctx.stroke()
//       }

//       // Globe edge glow
//       ctx.beginPath(); ctx.arc(gx, gy, R, 0, Math.PI * 2)
//       ctx.strokeStyle = 'rgba(0,212,255,0.55)'; ctx.lineWidth = 1.2; ctx.stroke()
//       ctx.beginPath(); ctx.arc(gx, gy, R + 3, 0, Math.PI * 2)
//       ctx.strokeStyle = 'rgba(0,212,255,0.18)'; ctx.lineWidth = 5; ctx.stroke()

//       // Orbit belt
//       ctx.save()
//       ctx.translate(gx, gy)
//       ctx.rotate((globeAngle * Math.PI) / 180 * 0.4)
//       ctx.scale(1, 0.3)
//       ctx.beginPath(); ctx.arc(0, 0, R * 1.2, 0, Math.PI * 2)
//       ctx.strokeStyle = 'rgba(0,212,255,0.14)'
//       ctx.lineWidth = 0.8; ctx.setLineDash([4, 8]); ctx.stroke()
//       ctx.setLineDash([]); ctx.restore()

//       // City dots
//       GLOBE_CITIES.forEach((c, i) => {
//         const p = latLon3D(c.lat, c.lon, globeAngle)
//         if (p.z > 0) {
//           const px = gx + p.x * R
//           const py = gy - p.y * R
//           const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + i * 1.2)
//           ctx.beginPath(); ctx.arc(px, py, 3 + pulse * 3, 0, Math.PI * 2)
//           ctx.fillStyle = `rgba(0,212,255,${0.15 * pulse})`; ctx.fill()
//           ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2)
//           ctx.fillStyle = '#00D4FF'; ctx.fill()
//           ctx.beginPath(); ctx.arc(px, py, 1.2, 0, Math.PI * 2)
//           ctx.fillStyle = '#fff'; ctx.fill()
//         }
//       })

//       globeAngle += 0.18
//     }

//     // ── 4. LIGHTNING ARCS ─────────────────────────────────────────────
//     function drawLightningArcs() {
//       const cx = W * 0.72
//       const cy = H * 0.46
//       const R = Math.min(W, H) * 0.32 * 0.58
//       const t = Date.now() / 1000

//       for (let arc = 0; arc < 4; arc++) {
//         const baseAngle = t * (arc % 2 === 0 ? 1.2 : -0.8) + arc * (Math.PI / 2)
//         const arcLen = Math.PI * 0.15 + 0.1 * Math.sin(t * 3 + arc)
//         ctx.save()
//         ctx.translate(cx, cy)
//         ctx.strokeStyle = `rgba(100,200,255,${0.3 + 0.3 * Math.sin(t * 5 + arc * 1.3)})`
//         ctx.lineWidth = 1.5
//         ctx.shadowColor = '#00D4FF'; ctx.shadowBlur = 8
//         ctx.beginPath()
//         const steps = 7
//         for (let i = 0; i <= steps; i++) {
//           const a = baseAngle + (i / steps) * arcLen
//           const jitter = Math.sin(t * 20 + i * 3.7 + arc * 1.1) * 6
//           const r = R + jitter
//           const x = Math.cos(a) * r
//           const y = Math.sin(a) * r
//           if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
//         }
//         ctx.stroke()
//         ctx.shadowBlur = 0; ctx.restore()
//       }
//     }


//     // ── 5a. AIRPLANE — get path position ──────────────────────────────
//     function planePos(t: number, offset = 1) {
//       const cx = W * 0.5
//       const cy = H * 0.42

//       const rx = W * (0.30 + offset * 0.08)
//       const ry = H * (0.20 + offset * 0.05)

//       return {
//         x: cx + rx * Math.sin(t),
//         y: cy + ry * Math.sin(2 * t) * 0.5,
//       }
//     }

//     function planeAngle(t: number) {
//       const dt = 0.01
//       const p1 = planePos(t)
//       const p2 = planePos(t + dt)
//       return Math.atan2(p2.y - p1.y, p2.x - p1.x)
//     }

//     // ── 5b. AIRPLANE — draw trail ──────────────────────────────────────
//     function drawPlaneTrail(plane: PlaneState) {
//       const pts = plane.trailPoints
//       if (pts.length < 2) return
//       for (let i = 1; i < pts.length; i++) {
//         const prog = i / pts.length
//         ctx.beginPath()
//         ctx.moveTo(pts[i-1].x, pts[i-1].y)
//         ctx.lineTo(pts[i].x, pts[i].y)
//         ctx.strokeStyle = `rgba(0,212,255,${prog * 0.45})`
//         ctx.lineWidth = prog * 2.5
//         ctx.lineCap = 'round'
//         ctx.stroke()
//       }
//       // Blur glow on recent trail
//       if (pts.length > 10) {
//         const recent = pts.slice(-30)
//         ctx.beginPath()
//         ctx.moveTo(recent[0].x, recent[0].y)
//         recent.forEach(p => ctx.lineTo(p.x, p.y))
//         ctx.strokeStyle = 'rgba(0,212,255,0.14)'
//         ctx.lineWidth = 9
//         ctx.filter = 'blur(4px)'; ctx.stroke(); ctx.filter = 'none'
//       }
//     }

//     // ── 5c. AIRPLANE — draw plane body (using image) 
//   function drawPlaneBody(pos: { x: number; y: number }, angle: number) {
//     const s = 0.5; // Scale
//     ctx.save();
//     ctx.translate(pos.x, pos.y);
//     // Image ka orientation theek karne ke liye +Math.PI/2 lagaya hai
//     ctx.rotate(angle + Math.PI);

//     if (planeImg) {
//       const width = planeImg.width * s;
//       const height = planeImg.height * s;
//       ctx.drawImage(planeImg, -width / 2, -height / 2, width, height);
//     }
//     ctx.restore();
//   }

//     // ── 5d. AIRPLANE — exhaust particles ─────────────────────────────
//     // function drawExhaust(pos: { x: number; y: number }, angle: number) {
//     //   const t = Date.now() / 1000
//     //   for (let i = 0; i < 6; i++) {
//     //     const off = ((t * 7 + i * 0.8) % 1)
//     //     const spread = (Math.random() - 0.5) * 6
//     //     const ex = pos.x - Math.cos(angle) * (24 + off * 30) + Math.sin(angle) * spread
//     //     const ey = pos.y - Math.sin(angle) * (24 + off * 30) + Math.cos(angle) * spread
//     //     ctx.beginPath()
//     //     ctx.arc(ex, ey, (1 - off) * 3 + 0.5, 0, Math.PI * 4)
//     //     ctx.fillStyle = `rgba(255,255,255,${(1 - off) * 0.7})`
//     //     ctx.fill()
//     //   }
//     // }
//     function drawExhaust(pos: { x: number; y: number }, angle: number) {
//   const t = Date.now() / 1000

//   for (let i = 0; i < 12; i++) { // particle count double for bigger smoke
//     const off = ((t * 2 + i * 0.25) % 1)
//     const spread = (Math.random() - 0.5) * 80 // zyada spread for wider smoke
//     const ex = pos.x - Math.cos(angle) * (20 + off * 50) + Math.sin(angle) * spread
//     const ey = pos.y - Math.sin(angle) * (20 + off * 50) + Math.cos(angle) * spread
//     const size = (1 - off) * 6 + 2 // bigger particles

//     // White smoke with gradient fade
//     const alpha = (1 - off) * 0.35
//     ctx.beginPath()
//     ctx.arc(ex, ey, size, 0, Math.PI * 2)
//     ctx.fillStyle = `rgba(255,255,255,${alpha})`

//     // Glow effect
//     ctx.shadowColor = 'rgba(255,255,255,0.5)'
//     ctx.shadowBlur = 12
//     ctx.fill()
//     ctx.shadowBlur = 0
//   }
// }

//     // ── 6. FLOATING HUD DATA PANELS ───────────────────────────────────
//     function drawHUDPanel(
//       x: number, y: number, w: number, h: number,
//       label: string, value: string, sub: string,
//       bars: number[], floatPhase: number
//     ) {
//       const t = Date.now() / 1000
//       const fy = y + Math.sin(t * 0.8 + floatPhase) * 6

//       // Background
//       ctx.fillStyle = 'rgba(3,7,15,0.82)'; ctx.strokeStyle = 'rgba(0,212,255,0.18)'
//       ctx.lineWidth = 1; ctx.beginPath(); ctx.rect(x, fy, w, h); ctx.fill(); ctx.stroke()

//       // Top accent
//       ctx.beginPath(); ctx.moveTo(x, fy); ctx.lineTo(x + w * 0.6, fy)
//       ctx.strokeStyle = 'rgba(0,212,255,0.7)'; ctx.lineWidth = 1.5; ctx.stroke()

//       // Left bar
//       ctx.fillStyle = 'rgba(0,212,255,0.5)'; ctx.fillRect(x, fy, 2, h)

//       // Text: label
//       ctx.fillStyle = 'rgba(0,212,255,0.6)'; ctx.font = '8px "Share Tech Mono", monospace'
//       ctx.fillText(label, x + 12, fy + 18)

//       // Text: value
//       ctx.fillStyle = '#D8EEFF'; ctx.font = 'bold 18px "Orbitron", monospace'
//       ctx.fillText(value, x + 12, fy + 42)

//       // Text: sub
//       ctx.fillStyle = 'rgba(106,139,170,0.8)'; ctx.font = '9px "Share Tech Mono", monospace'
//       ctx.fillText(sub, x + 12, fy + 57)

//       // Bar chart
//       const bw = 6, bGap = 4, bMaxH = 20, bY = fy + h - 12
//       bars.forEach((v, i) => {
//         ctx.fillStyle = v > 0.6 ? 'rgba(0,212,255,0.8)' : 'rgba(0,212,255,0.22)'
//         ctx.fillRect(x + 12 + i * (bw + bGap), bY - v * bMaxH, bw, v * bMaxH)
//       })

//       // Corner brackets
//       const cm = 6
//       ctx.strokeStyle = 'rgba(0,212,255,0.4)'; ctx.lineWidth = 1
//       ;[[x, fy], [x+w, fy], [x, fy+h], [x+w, fy+h]].forEach(([cx2, cy2], i) => {
//         const sx = i % 2 === 0 ? 1 : -1
//         const sy = i < 2 ? 1 : -1
//         ctx.beginPath()
//         ctx.moveTo(cx2, cy2 + sy * cm); ctx.lineTo(cx2, cy2); ctx.lineTo(cx2 + sx * cm, cy2)
//         ctx.stroke()
//       })
//     }

//     function drawAllHUDPanels() {
//       // drawHUDPanel(32, 90, 200, 106, 'THREAT ASSESSMENT', 'MANAGED', 'Status: Low / Controlled',
//       //   [0.3, 0.5, 0.7, 0.45, 0.85, 0.6, 0.4], 0.3)
//       // drawHUDPanel(32, H - 215, 180, 95, 'ACTIVE DETAILS', '14 OPS', '5 jurisdictions active',
//       //   [0.6, 0.8, 0.5, 0.9, 0.7, 0.4, 0.65], -0.2)
//       if (W > 900) {
//         drawHUDPanel(W - 232, H * 0.3, 195, 95, 'RESPONSE TIME', '< 4 HRS', 'Worldwide deployment',
//           [0.9, 0.7, 0.8, 0.6, 0.75, 0.85, 0.5], 0.4)
//       }
//     }

//     // ── MAIN RENDER LOOP ──────────────────────────────────────────────
//     function render() {
//       if (document.hidden) return
//       ctx.clearRect(0, 0, W, H)

//       // Subtle background radial glow behind rings
//       const bgGrad = ctx.createRadialGradient(W*0.72, H*0.44, 0, W*0.5, H*0.5, Math.max(W,H)*0.8)
//       bgGrad.addColorStop(0, 'rgba(0,30,60,0.07)')
//       bgGrad.addColorStop(1, 'transparent')
//       ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, W, H)

//       drawParticles()
//       drawHUDRings()
//       drawGlobe()
//       drawLightningArcs()

//       // Airplane: update state then draw
//       planes.forEach((plane,i) => {

//         plane.t += plane.speed

//         const pos = planePos(plane.t,i)
//         const ang = planeAngle(plane.t)

//         plane.trailPoints.push({ ...pos, age: 0 })

//         if (plane.trailPoints.length > plane.maxTrail)
//           plane.trailPoints.shift()

//         plane.trailPoints.forEach(p => p.age++)

//         drawPlaneTrail(plane)
//         drawPlaneBody(pos, ang)
//         drawExhaust(pos, ang)

//       })
//       drawAllHUDPanels()

//       animFrame = requestAnimationFrame(render)
//     }

//     render()

//     return () => {
//       cancelAnimationFrame(animFrame)
//       window.removeEventListener('resize', resize)
//     }
//   }, [planeImg])

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: 'fixed',
//         top: 0, left: 0,
//         width: '100%', height: '100%',
//         zIndex: 2,
//         pointerEvents: 'none',
//       }}
//     />
//   )
// }


'use client'

import { useEffect, useRef, useState } from 'react'
import PlnImage from '@/assets/plane.png'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; alpha: number
}
interface TrailPoint { x: number; y: number; age: number }
interface PlaneState { t: number; speed: number; trailPoints: TrailPoint[]; maxTrail: number }

function latLon3D(lat: number, lon: number, rot: number) {
  const la = (lat * Math.PI) / 180
  const lo = ((lon + rot) * Math.PI) / 180
  return {
    x: Math.cos(la) * Math.sin(lo),
    y: Math.sin(la),
    z: Math.cos(la) * Math.cos(lo),
  }
}

const GLOBE_CITIES = [
  { lat: 40.7, lon: -74 },
  { lat: 51.5, lon: -0.1 },
  { lat: 41.9, lon: 12.5 },
  { lat: 25.3, lon: 51.5 },
  { lat: 24.5, lon: 54.4 },
]

// ── Pre-computed exhaust offsets (Math.random ek baar) ──────────────
const EXHAUST_OFFSETS = Array.from({ length: 10 }, () => (Math.random() - 0.5) * 50)

export default function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [planeImg, setPlaneImg] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new Image()
    img.src = PlnImage.src
    img.onload = () => setPlaneImg(img)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })!

    let W = 0, H = 0
    let animFrame: number
    let globeAngle = 0
    let frameCount = 0  // ← FPS throttle ke liye

    let particles: Particle[] = []
    const planes: PlaneState[] = [
      { t: Math.PI / 2, speed: 0.021, trailPoints: [], maxTrail: 100 }, // maxTrail 180→100
    ]

    function resize() {
      W = canvas!.width = window.innerWidth
      H = canvas!.height = window.innerHeight
      // Particles 40 → 22
      particles = Array.from({ length: 22 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.3 + 0.08,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    // ── 1. PARTICLES ───────────────────────────────────────────────────
    function drawParticles() {
      const CONNECT_DIST_SQ = 110 * 110  // 130→110, fewer connections
      particles.forEach(p => {
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        p.x += p.vx; p.y += p.vy
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`
        ctx.fill()
      })
      // O(n²) — lekin n=22 hai toh 231 checks only
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < CONNECT_DIST_SQ) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${0.05 * (1 - distSq / CONNECT_DIST_SQ)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    // ── 2. HUD RINGS ──────────────────────────────────────────────────
    function drawHUDRings() {
      const rx = W * 0.72
      const ry = H * 0.46
      const maxR = Math.min(W, H) * 0.72
      const t = Date.now() / 1000

      // Rings — console.log HATAYI, blur HATAYI sirf bright rings pe glow raha
      const rings: [number, number, number[], number, number][] = [
        [1.00, 0.3,  [10, 10], 0.12, 1  ],
        [0.84, 0.8,  [8,  6 ], 0.09, 1.5],
        [0.68, 0.6,  [4,  4 ], 0.11, 0.8],
        [0.58, -1.8, [12, 4 ], 0.50, 2  ],
        [0.40, -0.7, [6,  3 ], 0.60, 1.5],
        [0.18, -3,   [3,  2 ], 0.9,  3  ],
      ]

      rings.forEach(([rf, speed, dash, alpha, lw]) => {
        const r = maxR * rf
        ctx.save()
        ctx.translate(rx, ry)
        ctx.rotate(t * speed)
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,212,255,${alpha})`
        ctx.lineWidth = lw
        if (dash.length) ctx.setLineDash(dash)
        ctx.lineDashOffset = -t * speed * 50
        ctx.stroke()
        ctx.lineDashOffset = 0
        ctx.setLineDash([])
        // Glow — blur hatayi, sirf thick stroke se simulate
        if (alpha > 0.45) {
          ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(0,212,255,${alpha * 0.18})`
          ctx.lineWidth = lw + 8
          ctx.stroke()  // ← ctx.filter='blur' NAHI
        }
        ctx.restore()
      })

      // Tick marks (every 2nd frame pe sirf)
      if (frameCount % 2 === 0) {
        const tickR = maxR * 0.58
        ctx.save()
        ctx.translate(rx, ry)
        ctx.rotate(t * -5)
        for (let i = 0; i < 72; i++) {
          const a = (i / 72) * Math.PI * 2
          const isLong = i % 6 === 0
          const len = isLong ? 14 : 7
          ctx.beginPath()
          ctx.moveTo(Math.cos(a) * tickR, Math.sin(a) * tickR)
          ctx.lineTo(Math.cos(a) * (tickR - len), Math.sin(a) * (tickR - len))
          ctx.strokeStyle = `rgba(0,212,255,${isLong ? 0.65 : 0.22})`
          ctx.lineWidth = isLong ? 1.5 : 0.7
          ctx.stroke()
        }
        ctx.restore()
      }

      // Crosshair
      ctx.save()
      ctx.translate(rx, ry)
      ctx.rotate(t * 0.4)
      ;[[1,0],[0,1],[-1,0],[0,-1]].forEach(([dx, dy]) => {
        ctx.beginPath()
        ctx.moveTo(dx * maxR * 0.22, dy * maxR * 0.22)
        ctx.lineTo(dx * maxR * 0.42, dy * maxR * 0.42)
        ctx.strokeStyle = 'rgba(0,212,255,0.45)'
        ctx.lineWidth = 1; ctx.stroke()
      })
      ctx.restore()

      // Core glow
      const coreGlow = ctx.createRadialGradient(rx, ry, 0, rx, ry, maxR * 0.18)
      coreGlow.addColorStop(0, 'rgba(0,212,255,0.22)')
      coreGlow.addColorStop(1, 'transparent')
      ctx.beginPath(); ctx.arc(rx, ry, maxR * 0.18, 0, Math.PI * 2)
      ctx.fillStyle = coreGlow; ctx.fill()
    }

    // ── 3. GLOBE (har 2nd frame update) ───────────────────────────────
    function drawGlobe() {
      const gx = W * 0.72
      const gy = H * 0.46
      const R = Math.min(W, H) * 0.32 * 0.48
      const t = Date.now() / 1000

      const bg = ctx.createRadialGradient(gx - R * 0.3, gy - R * 0.3, 0, gx, gy, R)
      bg.addColorStop(0, 'rgba(0,50,90,0.20)')
      bg.addColorStop(1, 'rgba(0,5,20,0.0)')
      ctx.beginPath(); ctx.arc(gx, gy, R, 0, Math.PI * 2)
      ctx.fillStyle = bg; ctx.fill()

      // Lat rings — 15 → 20 step (fewer rings)
      for (let lat = -75; lat <= 75; lat += 20) {
        const cosLat = Math.cos((lat * Math.PI) / 180)
        const sinLat = Math.sin((lat * Math.PI) / 180)
        const yr = gy - sinLat * R
        const xr = cosLat * R
        if (xr < 2) continue
        ctx.beginPath()
        ctx.ellipse(gx, yr, xr, xr * 0.16, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0,212,255,0.10)'
        ctx.lineWidth = 0.6; ctx.stroke()
      }

      // Longitude lines — 20 → 30 step
      for (let lon = 0; lon < 180; lon += 30) {
        ctx.beginPath()
        let first = true
        for (let a = 0; a <= 360; a += 12) {  // 10→12 steps
          const p = latLon3D(a - 90, lon, globeAngle)
          const px = gx + p.x * R
          const py = gy - p.y * R
          if (first) { ctx.moveTo(px, py); first = false }
          else ctx.lineTo(px, py)
        }
        ctx.strokeStyle = 'rgba(0,212,255,0.07)'
        ctx.lineWidth = 0.4; ctx.stroke()
      }

      ctx.beginPath(); ctx.arc(gx, gy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0,212,255,0.5)'; ctx.lineWidth = 1.2; ctx.stroke()
      ctx.beginPath(); ctx.arc(gx, gy, R + 3, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0,212,255,0.15)'; ctx.lineWidth = 5; ctx.stroke()

      // City dots — 5 cities (ek hatayi)
      GLOBE_CITIES.forEach((c, i) => {
        const p = latLon3D(c.lat, c.lon, globeAngle)
        if (p.z > 0) {
          const px = gx + p.x * R
          const py = gy - p.y * R
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + i * 1.2)
          ctx.beginPath(); ctx.arc(px, py, 2 + pulse * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,212,255,${0.12 * pulse})`; ctx.fill()
          ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fillStyle = '#00D4FF'; ctx.fill()
        }
      })

      globeAngle += 0.18
    }

    // ── 4. LIGHTNING (simplified, 3 arcs → 2) ─────────────────────────
    function drawLightningArcs() {
      const cx = W * 0.72
      const cy = H * 0.46
      const R = Math.min(W, H) * 0.32 * 0.58
      const t = Date.now() / 1000

      for (let arc = 0; arc < 2; arc++) {  // 4→2 arcs
        const baseAngle = t * (arc % 2 === 0 ? 1.2 : -0.8) + arc * Math.PI
        const arcLen = Math.PI * 0.15 + 0.1 * Math.sin(t * 3 + arc)
        ctx.save()
        ctx.translate(cx, cy)
        ctx.strokeStyle = `rgba(100,200,255,${0.25 + 0.25 * Math.sin(t * 5 + arc)})`
        ctx.lineWidth = 1.2
        // shadowBlur hatayi — perf killer
        ctx.beginPath()
        const steps = 5  // 7→5
        for (let i = 0; i <= steps; i++) {
          const a = baseAngle + (i / steps) * arcLen
          const jitter = Math.sin(t * 20 + i * 3.7 + arc * 1.1) * 5
          const r = R + jitter
          if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
          else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
        }
        ctx.stroke()
        ctx.restore()
      }
    }

    // ── 5. PLANE ──────────────────────────────────────────────────────
    function planePos(t: number, offset = 1) {
      return {
        x: W * 0.5 + W * (0.30 + offset * 0.08) * Math.sin(t),
        y: H * 0.42 + H * (0.20 + offset * 0.05) * Math.sin(2 * t) * 0.5,
      }
    }

    function planeAngle(t: number) {
      const p1 = planePos(t), p2 = planePos(t + 0.01)
      return Math.atan2(p2.y - p1.y, p2.x - p1.x)
    }

    function drawPlaneTrail(plane: PlaneState) {
      const pts = plane.trailPoints
      if (pts.length < 2) return
      for (let i = 1; i < pts.length; i++) {
        const prog = i / pts.length
        ctx.beginPath()
        ctx.moveTo(pts[i-1].x, pts[i-1].y)
        ctx.lineTo(pts[i].x, pts[i].y)
        ctx.strokeStyle = `rgba(0,212,255,${prog * 0.4})`
        ctx.lineWidth = prog * 2
        ctx.stroke()
      }
      // Trail glow — ctx.filter blur HATAYI, sirf alpha stroke
      if (pts.length > 10) {
        const recent = pts.slice(-20)  // 30→20
        ctx.beginPath()
        ctx.moveTo(recent[0].x, recent[0].y)
        recent.forEach(p => ctx.lineTo(p.x, p.y))
        ctx.strokeStyle = 'rgba(0,212,255,0.10)'
        ctx.lineWidth = 7
        ctx.stroke()  // ← filter:'blur' NAHI
      }
    }

    function drawPlaneBody(pos: { x: number; y: number }, angle: number) {
      if (!planeImg) return
      ctx.save()
      ctx.translate(pos.x, pos.y)
      ctx.rotate(angle + Math.PI)
      const s = 0.5
      ctx.drawImage(planeImg, -planeImg.width * s / 2, -planeImg.height * s / 2, planeImg.width * s, planeImg.height * s)
      ctx.restore()
    }

    function drawExhaust(pos: { x: number; y: number }, angle: number) {
      const t = Date.now() / 1000
      // Math.random() NAHI — pre-computed offsets use kar rhe
      for (let i = 0; i < 8; i++) {  // 12→8
        const off = ((t * 2 + i * 0.3) % 1)
        const spread = EXHAUST_OFFSETS[i % EXHAUST_OFFSETS.length]
        const ex = pos.x - Math.cos(angle) * (20 + off * 40) + Math.sin(angle) * spread
        const ey = pos.y - Math.sin(angle) * (20 + off * 40) + Math.cos(angle) * spread
        ctx.beginPath()
        ctx.arc(ex, ey, (1 - off) * 5 + 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${(1 - off) * 0.28})`
        ctx.fill()  // shadowBlur NAHI
      }
    }

    // ── 6. HUD PANEL ──────────────────────────────────────────────────
    function drawHUDPanel(
      x: number, y: number, w: number, h: number,
      label: string, value: string, sub: string,
      bars: number[], floatPhase: number
    ) {
      const t = Date.now() / 1000
      const fy = y + Math.sin(t * 0.8 + floatPhase) * 6

      ctx.fillStyle = 'rgba(3,7,15,0.82)'; ctx.strokeStyle = 'rgba(0,212,255,0.18)'
      ctx.lineWidth = 1; ctx.beginPath(); ctx.rect(x, fy, w, h); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(x, fy); ctx.lineTo(x + w * 0.6, fy)
      ctx.strokeStyle = 'rgba(0,212,255,0.65)'; ctx.lineWidth = 1.5; ctx.stroke()
      ctx.fillStyle = 'rgba(0,212,255,0.45)'; ctx.fillRect(x, fy, 2, h)
      ctx.fillStyle = 'rgba(0,212,255,0.55)'; ctx.font = '8px monospace'
      ctx.fillText(label, x + 12, fy + 18)
      ctx.fillStyle = '#D8EEFF'; ctx.font = 'bold 18px monospace'
      ctx.fillText(value, x + 12, fy + 42)
      ctx.fillStyle = 'rgba(106,139,170,0.75)'; ctx.font = '9px monospace'
      ctx.fillText(sub, x + 12, fy + 57)

      const bw = 6, bGap = 4, bMaxH = 20, bY = fy + h - 12
      bars.forEach((v, i) => {
        ctx.fillStyle = v > 0.6 ? 'rgba(0,212,255,0.75)' : 'rgba(0,212,255,0.2)'
        ctx.fillRect(x + 12 + i * (bw + bGap), bY - v * bMaxH, bw, v * bMaxH)
      })

      const cm = 6
      ctx.strokeStyle = 'rgba(0,212,255,0.35)'; ctx.lineWidth = 1
      ;[[x, fy], [x+w, fy], [x, fy+h], [x+w, fy+h]].forEach(([cx2, cy2], i) => {
        const sx = i % 2 === 0 ? 1 : -1
        const sy = i < 2 ? 1 : -1
        ctx.beginPath()
        ctx.moveTo(cx2, cy2 + sy * cm); ctx.lineTo(cx2, cy2); ctx.lineTo(cx2 + sx * cm, cy2)
        ctx.stroke()
      })
    }

    function drawAllHUDPanels() {
      if (W > 900) {
        drawHUDPanel(W - 232, H * 0.3, 195, 95, 'RESPONSE TIME', '< 4 HRS',
          'Worldwide deployment', [0.9, 0.7, 0.8, 0.6, 0.75, 0.85, 0.5], 0.4)
      }
    }

    // ── RENDER LOOP ───────────────────────────────────────────────────
    function render() {
      if (document.hidden) return

      frameCount++
      ctx.clearRect(0, 0, W, H)

      const bgGrad = ctx.createRadialGradient(W*0.72, H*0.44, 0, W*0.5, H*0.5, Math.max(W,H)*0.8)
      bgGrad.addColorStop(0, 'rgba(0,30,60,0.06)')
      bgGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, W, H)

      drawParticles()
      drawHUDRings()
      drawGlobe()

      // Lightning — har 2nd frame
      // if (frameCount % 2 === 0) drawLightningArcs()

      // planes.forEach((plane, i) => {
      //   plane.t += plane.speed
      //   const pos = planePos(plane.t, i)
      //   const ang = planeAngle(plane.t)
      //   plane.trailPoints.push({ ...pos, age: 0 })
      //   if (plane.trailPoints.length > plane.maxTrail) plane.trailPoints.shift()
      //   plane.trailPoints.forEach(p => p.age++)
      //   drawPlaneTrail(plane)
      //   drawPlaneBody(pos, ang)
      //   drawExhaust(pos, ang)
      // })

      // drawAllHUDPanels()
      animFrame = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [planeImg])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 2, pointerEvents: 'none',
      }}
    />
  )
}