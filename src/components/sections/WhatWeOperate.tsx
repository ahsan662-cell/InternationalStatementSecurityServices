// import { useState, useEffect } from "react";
// import Particles from './../../utils/Particles';
// interface Location {
//   id: number;
//   city: string;
//   country: string;
//   service: string;
//   tag: string;
//   coords: string;
//   image: string;
// }

// const locations: Location[] = [
//   {
//     id: 1,
//     city: "QATAR",
//     country: "DOHA",
//     service: "Executive Protection & VIP Security",
//     tag: "MIDDLE EAST",
//     coords: "25.2854° N, 51.5310° E",
//     image:
//       "https://images.unsplash.com/photo-1566288623394-377af472d81b?auto=format&fit=crop&w=1200&q=80",
//   },
//   {
//     id: 2,
//     city: "DUBAI",
//     country: "UAE",
//     service: "High-Net-Worth Protection Unit",
//     tag: "GULF REGION",
//     coords: "25.2048° N, 55.2708° E",
//     image:
//       "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=80",
//   },
//   {
//     id: 3,
//     city: "ABU DHABI",
//     country: "UAE",
//     service: "Government & VIP Security",
//     tag: "GULF REGION",
//     coords: "24.4539° N, 54.3773° E",
//     image:
//       "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80",
//   },
//   {
//     id: 4,
//     city: "LONDON",
//     country: "UNITED KINGDOM",
//     service: "Executive & Diplomatic Protection",
//     tag: "EUROPE",
//     coords: "51.5074° N, 0.1278° W",
//     image:
//       "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1200&q=80",
//   },
//   {
//     id: 5,
//     city: "NEW YORK",
//     country: "UNITED STATES",
//     service: "Corporate Executive Security",
//     tag: "AMERICAS",
//     coords: "40.7128° N, 74.0060° W",
//     image:
//       "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=80",
//   },
//   {
//     id: 6,
//     city: "TIRANA",
//     country: "ALBANIA",
//     service: "Strategic Security Operations",
//     tag: "BALKANS",
//     coords: "41.3275° N, 19.8187° E",
//     image:
//       "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
//   },
// ];

// const CrosshairIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//     <circle cx="12" cy="12" r="8" stroke="#00e5ff" strokeWidth="1.5" />
//     <circle cx="12" cy="12" r="3" stroke="#00e5ff" strokeWidth="1.5" />
//   </svg>
// );

// export default function GlobalSecurityOps() {
//   const [activeId, setActiveId] = useState<number | null>(null);
//   const [hoveredId, setHoveredId] = useState<number | null>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   return (
//     <div>
//         <div
//         style={{
//             background:
//             "linear-gradient(145deg, #050d12 0%, #091520 50%, #050d12 100%)",
//             minHeight: "100vh",
//             fontFamily: "'Rajdhani', monospace",
//             padding: "clamp(30px,6vw,60px) clamp(14px,5vw,24px)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             position:"relative",
//             zIndex:1
//         }}
//         >
//         <Particles
//             particleColors={["#1dd6ff","#1dd6ee","rgb(84, 189, 189)"]}
//             particleCount={600}
//             particleSpread={10}
//             speed={0.2}
//             particleBaseSize={100}
//             moveParticlesOnHover
//             alphaParticles={false}
//             disableRotation={false}
//             pixelRatio={1}
//             className={{}}
//             style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 zIndex: 0
//             }}
//         />
//         {/* HEADER */}
//         <div style={{ textAlign: "center", marginBottom: 40 , zIndex:1}}>
//             <h1
//             style={{
//                 fontSize: "clamp(28px,5vw,52px)",
//                 color: "#e8f4f8",
//                 letterSpacing: "0.15em",
//                 fontFamily: "Orbitron, monospace",
//             }}
//             >
//             GLOBAL SECURITY
//             <span style={{ color: "#00e5ff" }}> OPERATIONS</span>
//             </h1>

//             <p
//             style={{
//                 color: "#4a7a8a",
//                 fontSize: 13,
//                 letterSpacing: "0.25em",
//                 marginTop: 10,
//             }}
//             >
//             ELITE EXECUTIVE PROTECTION & STRATEGIC SECURITY SERVICES
//             </p>
//         </div>

//         {/* GRID */}
//         <div
//             style={{
//             width: "100%",
//             maxWidth: "1200px",
//             display: "flex",
//             flexDirection: "column",
//             gap: 16,
//             zIndex:1
//             }}
//         >
//             {locations.map((loc) => {
//             const isActive = activeId === loc.id;
//             const isHovered = hoveredId === loc.id;
//             const isHighlighted = isActive || isHovered;

//             return (
//                 <div
//                 key={loc.id}
//                 onClick={() => setActiveId(isActive ? null : loc.id)}
//                 onMouseEnter={() => setHoveredId(loc.id)}
//                 onMouseLeave={() => setHoveredId(null)}
//                 style={{
//                     display: "flex",
//                     flexDirection: isMobile ? "column" : "row",
//                     alignItems: isMobile ? "flex-start" : "center",
//                     background: isHighlighted
//                     ? "linear-gradient(90deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02))"
//                     : "rgba(255,255,255,0.03)",
//                     border: isHighlighted
//                     ? "1px solid rgba(0,229,255,0.5)"
//                     : "1px solid rgba(255,255,255,0.08)",
//                     backdropFilter: "blur(4px)",
//                     cursor: "pointer",
//                     transition: "all 0.25s ease",
//                     transform: isHovered ? "translateX(6px)" : "translateX(0)",
//                     boxShadow: isHighlighted
//                     ? "0 0 15px rgba(0,229,255,0.2)"
//                     : "none",
//                     position: "relative",
//                 }}
//                 >
//                 {/* TEXT */}
//                 <div
//                     style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 14,
//                     padding: isMobile ? "14px" : "18px",
//                     flex: 1,
//                     }}
//                 >
//                     <div
//                     style={{
//                         width: 40,
//                         height: 40,
//                         border: "1px solid #1a3a4a",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                     }}
//                     >
//                     <CrosshairIcon />
//                     </div>

//                     <div>
//                     <div
//                         style={{
//                         fontSize: isMobile ? 15 : 18,
//                         fontWeight: 700,
//                         color: "#e8f4f8",
//                         letterSpacing: "0.1em",
//                         fontFamily: "Orbitron, monospace",
//                         }}
//                     >
//                         {loc.city}{" "}
//                         <span style={{ color: "#00e5ff" }}>— {loc.country}</span>
//                     </div>

//                     <p
//                         style={{
//                         fontSize: 13,
//                         color: isHighlighted ? "#5ab8d0" : "#3a6070",
//                         margin: 0,
//                         }}
//                     >
//                         {loc.service}
//                     </p>
//                     </div>
//                 </div>

//                 {/* IMAGE */}
//                 <div
//                     style={{
//                     width: isMobile ? "100%" : "500px",
//                     height: isMobile ? "130px" : "150px",
//                     overflow: "hidden",
//                     borderLeft: isMobile ? "none" : "1px solid #1a3a4a",
//                     }}
//                 >
//                     <img
//                     src={loc.image}
//                     alt={loc.city}
//                     style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         filter: isHighlighted ? "brightness(0.9)" : "brightness(0.7)",
//                         transform: isHovered ? "scale(1.05)" : "scale(1)",
//                         transition: "all 0.4s ease",
//                     }}
//                     />
//                 </div>

//                 {isActive && (
//                     <div
//                     style={{
//                         position: "absolute",
//                         left: 0,
//                         top: 0,
//                         bottom: 0,
//                         width: 3,
//                         background: "#00e5ff",
//                     }}
//                     />
//                 )}
//                 </div>
//             );
//             })}
//         </div>

//         {/* FOOTER */}
//         <div style={{ marginTop: 40, textAlign: "center" }}>
//             <p
//             style={{
//                 fontSize: 10,
//                 letterSpacing: "0.2em",
//                 color: "#1a3a4a",
//                 fontFamily: "Orbitron",
//             }}
//             >
//             SECURE NETWORK ◈ ENCRYPTED CHANNEL ◈ AUTHORIZED PERSONNEL ONLY
//             </p>
//         </div>
//     </div>
//     </div>
//   );
// }


'use client'

import { useState, useEffect } from "react"
import Particles from './../../utils/Particles'
import bgImage from "@/assets/GLOBALOPERATIONS.webp";
import Qatar from "@/assets/Qatar.webp"
import Abudabi from "@/assets/AbuDhabi.webp"
import London from "@/assets/London.webp"
import Traina from "@/assets/tirana.webp"
import Dubai from "@/assets/Dubaii.webp"
import NewYork from "@/assets/NYC.webp"
import Italy from "@/assets/Italy.webp"
interface Location {
  id: number
  city: string
  country: string
  service: string
  tag: string
  image: string
}

const locations: Location[] = [
  { id: 1, city: "QATAR",     country: "DOHA",           service: "Executive Protection & VIP Security",  tag: "MIDDLE EAST", image: Qatar.src },
  { id: 2, city: "DUBAI",     country: "UAE",             service: "High-Net-Worth Protection Unit",       tag: "GULF REGION", image: Dubai.src },
  { id: 3, city: "ABU DHABI", country: "UAE",             service: "Government & VIP Security",            tag: "GULF REGION", image: Abudabi.src },
  { id: 4, city: "LONDON",    country: "UNITED KINGDOM",  service: "Executive & Diplomatic Protection",   tag: "EUROPE",      image: London.src },
  { id: 5, city: "NEW YORK",  country: "UNITED STATES",   service: "Corporate Executive Security",        tag: "AMERICAS",    image: NewYork.src },
  { id: 6, city: "ALBANIA",   country: "EUROPE",          service: "Strategic Security Operations",       tag: "BALKANS",     image: Traina.src },
  { id: 6, city: "ROME",   country: "ITALY",          service: "Strategic Security Operations",       tag: "BALKANS",     image: Italy.src },
]

const CrosshairIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9"   stroke={active ? "#4ab8ff" : "#1e5a7a"} strokeWidth="1.2" />
    <circle cx="12" cy="12" r="3"   stroke={active ? "#4ab8ff" : "#1e5a7a"} strokeWidth="1.2" />
    <line x1="12" y1="1.5" x2="12" y2="6.5"  stroke={active ? "#4ab8ff" : "#1e5a7a"} strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="12" y1="17.5" x2="12" y2="22.5" stroke={active ? "#4ab8ff" : "#1e5a7a"} strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="1.5" y1="12" x2="6.5" y2="12"  stroke={active ? "#4ab8ff" : "#1e5a7a"} strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="17.5" y1="12" x2="22.5" y2="12" stroke={active ? "#4ab8ff" : "#1e5a7a"} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const WorldMap = () => (
  <svg viewBox="0 0 1400 700" style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.15 }} xmlns="http://www.w3.org/2000/svg">
    <g stroke="#1a6aff" strokeWidth="0.35" opacity="0.5">
      {[70,140,210,280,350,420,490,560,630].map(y=><line key={y} x1="0" y1={y} x2="1400" y2={y}/>)}
      {[100,200,300,400,500,600,700,800,900,1000,1100,1200,1300].map(x=><line key={x} x1={x} y1="0" x2={x} y2="700"/>)}
    </g>
    {/* North America */}
    <path d="M80,75 L195,58 L275,78 L315,138 L295,218 L255,275 L215,315 L175,295 L138,255 L98,198 L68,138 Z" fill="#071828" stroke="#1a6aff" strokeWidth="0.9"/>
    <path d="M175,295 L238,305 L258,355 L238,415 L208,455 L188,435 L178,395 L168,355 Z" fill="#071828" stroke="#1a6aff" strokeWidth="0.9"/>
    {/* South America */}
    <path d="M218,415 L275,395 L315,435 L325,515 L305,595 L275,645 L248,635 L228,575 L208,495 Z" fill="#071828" stroke="#1a6aff" strokeWidth="0.9"/>
    {/* Europe */}
    <path d="M575,55 L678,50 L718,76 L728,128 L698,158 L658,168 L618,158 L588,128 Z" fill="#091e30" stroke="#1a6aff" strokeWidth="0.9"/>
    {/* Africa */}
    <path d="M595,195 L698,180 L758,215 L778,315 L758,428 L718,498 L678,518 L638,498 L595,428 L578,325 Z" fill="#071828" stroke="#1a6aff" strokeWidth="0.9"/>
    {/* Middle East */}
    <path d="M728,155 L818,150 L858,185 L848,248 L798,275 L758,265 Z" fill="#091e30" stroke="#1a8aff" strokeWidth="1"/>
    {/* Asia */}
    <path d="M818,45 L1098,38 L1178,76 L1198,158 L1158,218 L1078,258 L978,268 L898,248 L848,198 L828,138 Z" fill="#071828" stroke="#1a6aff" strokeWidth="0.9"/>
    {/* India */}
    <path d="M898,238 L958,232 L978,288 L958,358 L928,388 L898,368 L878,308 Z" fill="#071828" stroke="#1a6aff" strokeWidth="0.7"/>
    {/* SE Asia */}
    <path d="M1078,255 L1158,248 L1178,295 L1148,335 L1098,328 Z" fill="#071828" stroke="#1a6aff" strokeWidth="0.7"/>
    {/* Australia */}
    <path d="M1078,375 L1198,358 L1258,398 L1268,478 L1218,528 L1138,538 L1078,498 Z" fill="#071828" stroke="#1a6aff" strokeWidth="0.9"/>
    {/* Glowing dots at key locations */}
    {[[155,138],[620,108],[790,192],[858,172],[1098,158],[290,345]].map(([cx,cy],i)=>(
      <g key={i}>
        <circle cx={cx} cy={cy} r="4.5" fill="#1a8aff" opacity="0.95"/>
        <circle cx={cx} cy={cy} r="9"   fill="none" stroke="#1a8aff" strokeWidth="0.8" opacity="0.45"/>
        <circle cx={cx} cy={cy} r="16"  fill="none" stroke="#1a8aff" strokeWidth="0.4" opacity="0.2"/>
      </g>
    ))}
    {/* Connection lines */}
    <g stroke="#1a6aff" strokeWidth="0.6" opacity="0.3" strokeDasharray="5 7">
      <line x1="155" y1="138" x2="620" y2="108"/>
      <line x1="620" y1="108" x2="790" y2="192"/>
      <line x1="790" y1="192" x2="858" y2="172"/>
      <line x1="858" y1="172" x2="1098" y2="158"/>
      <line x1="155" y1="138" x2="290" y2="345"/>
      <line x1="620" y1="108" x2="790" y2="192"/>
    </g>
  </svg>
)

const RadarRings = () => (
  <svg viewBox="0 0 580 580" style={{ position:"absolute", right:"-3%", top:"50%", transform:"translateY(-50%)", width:"40%", height:"82%", opacity:0.18, pointerEvents:"none" }}>
    {[265,225,185,145,105,65,28].map((r,i)=>(
      <circle key={i} cx="290" cy="290" r={r} fill="none" stroke="#1a7aff" strokeWidth={i===0?0.9:0.5} strokeDasharray={i%2===0?"5 5":undefined}/>
    ))}
    <line x1="0"   y1="290" x2="580" y2="290" stroke="#1a7aff" strokeWidth="0.4" opacity="0.55"/>
    <line x1="290" y1="0"   x2="290" y2="580" stroke="#1a7aff" strokeWidth="0.4" opacity="0.55"/>
    <line x1="80"  y1="80"  x2="500" y2="500" stroke="#1a7aff" strokeWidth="0.3" opacity="0.28"/>
    <line x1="500" y1="80"  x2="80"  y2="500" stroke="#1a7aff" strokeWidth="0.3" opacity="0.28"/>
  </svg>
)

export default function GlobalSecurityOps() {
  const [activeId,  setActiveId]  = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [isMobile,  setIsMobile]  = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <div style={{ 
      position:"relative", 
      overflow:"hidden", 
      background:'radial-gradient(ellipse 80% 55% rgba(140,0,0,0.22) at 50% 0%, rgba(140,0,0,0.22) 0%, black  70%)', 
      minHeight:"100vh",
      // backgroundImage: `url(${bgImage.src})`, // your image
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex:10
     }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Rajdhani:wght@400;500;600&display=swap');

        @keyframes cardIn {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes borderBlink {
          0%,49%  { border-color: #AF0A00; box-shadow:0 0 16px #650405, 0 0 12px #AF0A00; }
          50%,99% { border-color: #650405; box-shadow:none; }
        }
        @keyframes barPulse {
          0%,49%  { opacity:1; }
          50%,99% { opacity:0; }
        }

        .loc-card {
          position:relative; display:flex; cursor:pointer;
          border:2px solid #650405;
          background: #330c0a0f !important;
          backdrop-filter:blur(3px);
          transition:background 0.25s;
          animation:cardIn 0.45s ease both;
          overflow:hidden;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .loc-card:hover {
          animation:cardIn 0.45s ease both, borderBlink 0.65s step-end infinite;
          background: #130908a5 !important;
          border: 1px solid #AF0A00;
        }
        .loc-card.is-active {
          border-color:rgba(255, 30, 30, 0.65) !important;
          background: #AF0A00 !important;
          box-shadow:0 0 22px #AF0A00,inset 0 0 14px #AF0A00;
          animation:none !important;
        }
        .loc-card .acc-bar {
          position:absolute; left:0; top:0; bottom:0; width:3px;
          background:linear-gradient(to bottom,transparent, #AF0A00,transparent);
          border-color:rgba(255, 30, 30, 0.65) !important;
          opacity:0;
        }
        .loc-card:hover .acc-bar { animation:barPulse 0.65s step-end infinite; }
        .loc-card.is-active .acc-bar { opacity:1; }
        .loc-card .top-line {
          position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(to right, #af090071,transparent);
          opacity:0; 
        }
        .loc-card:hover .top-line,
        .loc-card.is-active .top-line { opacity:1; border: 1px solid  #af090071}
        .loc-card::before,.loc-card::after {
          content:''; position:absolute; width:11px; height:11px; opacity:0; transition:opacity 0.2s;
        }
        .loc-card::before { top:0; right:0; border-top:1.5px solid #AF0A00; border-right:1.5px solid #AF0A00; }
        .loc-card::after  { bottom:0; left:0; border-bottom:1.5px solid #AF0A00; border-left:1.5px solid #AF0A00; }
        .loc-card:hover::before,.loc-card:hover::after,
        .loc-card.is-active::before,.loc-card.is-active::after { opacity:1; }
        // .loc-img { transition:filter 0.35s ease,transform 0.4s ease; }
        .loc-card:hover .loc-img,
        .loc-card.is-active .loc-img { filter:brightness(0.82) saturate(0.55) !important; transform:scale(1.05); }
        .img-fade {
          position:absolute; inset:0;
          background:linear-gradient(to right, #ff0d0042 0%, #ff0d0043 32%,rgba(3,14,30,0.04) 100%);
          pointer-events:none;
        }
      `}</style>

      {/* Layers */}
      {/* <WorldMap /> */}
      {/* <RadarRings /> */}

      {/* Particles */}
      {/* <Particles
        particleColors={["#4887ca","#ffffff","#fc0303"]}
        particleCount={4500}
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

      {/* Vignette */}
      <div style={{ position:"absolute", inset:0, background:"#000", pointerEvents:"none", zIndex:1 }}/>

      {/* Content */}
      <div style={{ position:"relative", zIndex:2, padding:"clamp(40px,6vw,72px) clamp(16px,5vw,40px)", display:"flex", flexDirection:"column", alignItems:"center" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:50 }}>
          <h1 style={{ fontSize:"clamp(20px,4.5vw,54px)", fontWeight:900, color:"#cce8ff", letterSpacing:"0.18em", margin:"0 0 12px", fontFamily:"Orbitron,monospace", textShadow:"0 0 50px #ff0d00" }}>
            GLOBAL SECURITY <span style={{ color:"#FF0D00" }}>OPERATIONS</span>
          </h1>
          <p style={{ color:"#f2f6f8", fontSize:'clamp(5px,15px,22px)', letterSpacing:"0.22em", margin:0, fontFamily:"Rajdhani,sans-serif", fontWeight:500 }}>
            Elite Executive Protection &amp; Strategic Security Services Worldwide
          </p>
        </div>

        {/* Cards */}
        <div style={{ width:"100%", display:"flex", flexDirection:"column", alignItems:"center",gap:12 }}>
          {locations.map((loc, index) => {
            const isActive      = activeId  === loc.id
            const isHovered     = hoveredId === loc.id
            const isHighlighted = isActive || isHovered

            return (
              <div
                key={loc.id}
                className={`loc-card${isActive?" is-active":""}`}
                style={{ flexDirection:isMobile?"column":"row", alignItems:isMobile?"flex-start":"center", justifyContent:"center", animationDelay:`${index*0.07}s`, height:isMobile?"auto":150,  width:isMobile?"auto":"80%"}}
                onClick={() => setActiveId(isActive ? null : loc.id)}
                onMouseEnter={() => setHoveredId(loc.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="acc-bar"/>
                <div className="top-line"/>

                {/* Text */}
                <div style={{ display:"flex", alignItems:"center", gap:16, padding:isMobile?"16px":"0 22px", flex:1, height:"100%" }}>
                  <div style={{ width:44, height:44, flexShrink:0, border:`1px solid ${isHighlighted?"#ff0d00":"#ff0d00"}`, display:"flex", alignItems:"center", justifyContent:"center", background:isHighlighted?"#9a3934":"#9a3934", transition:"all 0.2s", clipPath:"polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}>
                    <CrosshairIcon active={isHighlighted}/>
                  </div>
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontSize:isMobile?14:"clamp(13px,1.6vw,24px)", fontWeight:700, color:isHighlighted?"#d8f0ff":"#d8f0ff", letterSpacing:"0.12em", fontFamily:"Orbitron,monospace", lineHeight:1, marginBottom:7, transition:"color 0.2s", whiteSpace:"nowrap" }}>
                      {loc.city}
                      <span style={{ color:isHighlighted?"#3ab0ff":"rgba(30,160,255,0.5)", margin:"0 10px", fontWeight:300 }}>–</span>
                      {loc.country}
                    </div>
                    <div style={{ fontSize:20, color:isHighlighted?"#bfd6e5":"rgb(198, 224, 243)", fontFamily:"Rajdhani,sans-serif", fontWeight:500, letterSpacing:"0.04em", transition:"color 0.2s" }}>
                      {loc.service}
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div style={{ width:isMobile?"100%":"clamp(190px,28%,100%)", height:isMobile?120:"100%", flexShrink:0, position:"relative", overflow:"hidden", borderLeft:isMobile?"none":"1px solid rgba(30,100,180,0.14)", borderTop:isMobile?"1px solid #9a3934":"none" }}>
                  <img src={loc.image} alt={loc.city} className="loc-img" style={{ width:"100%", height:"100%", objectFit:"cover",display:"block" }}/>
                  <div className="img-fade"/>
                  <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.1) 3px,rgba(0,0,0,0.1) 4px)", pointerEvents:"none" }}/>
                  <div style={{ position:"absolute", top:5, right:5, width:9, height:9, borderTop:"1.5px solid rgba(30,160,255,0.55)", borderRight:"1.5px solid rgba(30,160,255,0.55)" }}/>
                  <div style={{ position:"absolute", bottom:5, right:5, width:9, height:9, borderBottom:"1.5px solid rgba(30,160,255,0.55)", borderRight:"1.5px solid rgba(30,160,255,0.55)" }}/>
                  <div style={{ position:"absolute", bottom:6, left:8, fontFamily:"Orbitron,monospace", fontSize:8, letterSpacing:"0.14em", color:"rgba(30,160,255,0.65)" }}>
                    {loc.tag}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div style={{ marginTop:44, textAlign:"center" }}>
          <div style={{ height:3, width:400, background:"linear-gradient(to right,transparent, #FFFFFF,transparent)", margin:"0 auto 14px" }}/>
          <p style={{ fontSize:18, letterSpacing:"0.22em", color:"#FFFFFF", fontFamily:"Orbitron,monospace", margin:0 }}>
            SECURE NETWORK ◈ ENCRYPTED CHANNEL ◈ AUTHORIZED PERSONNEL ONLY
          </p>
        </div>
      </div>
    </div>
  )
}