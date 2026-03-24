"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Qatar from "@/assets/Qatar.webp"
import Abudabi from "@/assets/AbuDhabi.webp"
import London from "@/assets/London.webp"
import Traina from "@/assets/tirana.webp"
import Dubai from "@/assets/Dubaii.webp"
import NewYork from "@/assets/NYC.webp"
import Italy from "@/assets/Italy.webp"
import Slider1 from "@/assets/Gallery/cp6.webp"
import Slider2 from "@/assets/Gallery/cp5.webp"
import Slider3 from "@/assets/Gallery/cp4.webp"
import Slider4 from "@/assets/Gallery/cp3.webp"
import Slider5 from "@/assets/Gallery/cp8.webp"
import Slider6 from "@/assets/Gallery/cp7.webp"
import Slider7 from "@/assets/slider7.webp"
import Slider8 from "@/assets/slider8.webp"
import Slider9 from "@/assets/slider9.webp"
import Slider10 from "@/assets/Gallery/self3.webp"
import Slider11 from "@/assets/Gallery/ep1.webp"
import Slider12 from "@/assets/Gallery/cp13.webp"
import Slider13 from "@/assets/Gallery/cp12.webp"
import Slider14 from "@/assets/Gallery/st4.webp"
import Slider15 from "@/assets/Gallery/st2.webp"
import Slider16 from "@/assets/Gallery/cp1.webp"
import Owner from "@/assets/owner.webp"
// ─── Types ────────────────────────────────────────────────────────────────────
interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
  description: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

// ─── Slider images — REPLACE these srcs with your actual images ───────────────
const SLIDER_IMAGES = [
  {
    id: 1,
    src: London.src,
    caption: "London - United Kingdom",
    sub: "Worldwide Operations",
  },
  {
    id: 2,
    src: Qatar.src,
    caption: "Doha - Qatar",
    sub: "Corporate & VIP Protection",
  },
  {
    id: 3,
    src: Dubai.src,
    caption: "Dubai - UAE",
    sub: "7 Strategic Locations",
  },
  {
    id: 4,
    src: Abudabi.src,
    caption: "Abu Dhabi - UAE",
    sub: "Discreet & Professional",
  },
  {
    id: 5,
    src: NewYork.src,
    caption: "New York - United States",
    sub: "Precision. Discretion. Excellence.",
  },
  {
    id: 6,
    src: Italy.src,
    caption: "Rome - Italy",
    sub: "Precision. Discretion. Excellence.",
  },
  {
    id: 7,
    src: Traina.src,
    caption: "Tirana - Albania",
    sub: "Precision. Discretion. Excellence.",
  },
];

// ─── Auto-sliding image carousel ─────────────────────────────────────────────
function ImageSlider() {
  const [current, setCurrent]   = useState(0);
  const [direction, setDir]     = useState(1); // 1=next, -1=prev
  const intervalRef             = useRef<ReturnType<typeof setInterval> | null>(null);
  const total                   = SLIDER_IMAGES.length;

  const go = useCallback((idx: number, dir: number) => {
    setDir(dir);
    setCurrent((idx + total) % total);
  }, [total]);

  const next = useCallback(() => go(current + 1, 1),  [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  // Auto-advance every 5 s
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next]);

  // Pause on hover
  const pause  = () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  const resume = () => { intervalRef.current = setInterval(next, 5000); };

  const variants = {
    enter:   (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center:  { x: 0, opacity: 1 },
    exit:    (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={resume}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(200px, 38vw, 480px)',
        overflow: 'hidden',
        border: '1px solid rgba(220,38,38,0.22)',
        background: '#0a0000',
        marginBottom: 'clamp(24px,3vw,40px)',
        paddingTop:"60px",
      }}
    >
      {/* ── Slides ── */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Image */}
          <img
            src={SLIDER_IMAGES[current].src}
            alt={SLIDER_IMAGES[current].caption}
            style={{ width: '100%', height: '100%', objectFit: 'fill', objectPosition: 'center', display: 'block', filter: 'brightness(0.52) saturate(0.7)' }}
          />

          {/* Dark gradient bottom */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 45%, transparent 100%)', pointerEvents: 'none' }}/>

          {/* Red left strip */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: 'linear-gradient(to bottom, transparent, rgba(220,38,38,0.8), transparent)', pointerEvents: 'none' }}/>

          {/* Scan line */}
          <motion.div
            initial={{ top: '-2%' }}
            animate={{ top: '102%' }}
            transition={{ duration: 2.2, ease: 'linear', repeat: Infinity, repeatDelay: 1.5 }}
            style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(220,38,38,0.55),transparent)', pointerEvents: 'none' }}
          />

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            style={{ position: 'absolute', bottom: 'clamp(16px,2.5vw,28px)', left: 'clamp(16px,3vw,32px)', right: 'clamp(60px,8vw,120px)' }}
          >
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', color: 'rgba(220,80,80,0.9)', textTransform: 'uppercase', marginBottom: 6, fontFamily: "'Barlow Condensed', sans-serif" }}>
              {SLIDER_IMAGES[current].sub}
            </p>
            <h3 style={{ fontSize: 'clamp(16px,3vw,30px)', fontWeight: 600, color: '#ffffff', letterSpacing: '0.05em', fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
              {SLIDER_IMAGES[current].caption}
            </h3>
          </motion.div>

          {/* Corner brackets */}
          <span style={{ position: 'absolute', top: 10, left: 10, width: 16, height: 16, borderTop: '1.5px solid rgba(220,38,38,0.7)', borderLeft: '1.5px solid rgba(220,38,38,0.7)', pointerEvents: 'none' }}/>
          <span style={{ position: 'absolute', top: 10, right: 10, width: 16, height: 16, borderTop: '1.5px solid rgba(220,38,38,0.7)', borderRight: '1.5px solid rgba(220,38,38,0.7)', pointerEvents: 'none' }}/>
          <span style={{ position: 'absolute', bottom: 10, left: 10, width: 16, height: 16, borderBottom: '1.5px solid rgba(220,38,38,0.7)', borderLeft: '1.5px solid rgba(220,38,38,0.7)', pointerEvents: 'none' }}/>
          <span style={{ position: 'absolute', bottom: 10, right: 10, width: 16, height: 16, borderBottom: '1.5px solid rgba(220,38,38,0.7)', borderRight: '1.5px solid rgba(220,38,38,0.7)', pointerEvents: 'none' }}/>
        </motion.div>
      </AnimatePresence>

      {/* ── Prev button ── */}
      <button
        onClick={prev}
        style={{
          position: 'absolute', left: 'clamp(8px,1.5vw,16px)', top: '50%', transform: 'translateY(-50%)',
          zIndex: 20, width: 'clamp(32px,4vw,44px)', height: 'clamp(32px,4vw,44px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(220,38,38,0.4)', cursor: 'pointer',
          clipPath: 'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))',
          transition: 'all .2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(180,0,0,0.7)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.9)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.6)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.4)'; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(220,100,100,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      {/* ── Next button ── */}
      <button
        onClick={next}
        style={{
          position: 'absolute', right: 'clamp(8px,1.5vw,16px)', top: '50%', transform: 'translateY(-50%)',
          zIndex: 20, width: 'clamp(32px,4vw,44px)', height: 'clamp(32px,4vw,44px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(220,38,38,0.4)', cursor: 'pointer',
          clipPath: 'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))',
          transition: 'all .2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(180,0,0,0.7)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.9)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.6)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.4)'; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(220,100,100,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* ── Dot indicators ── */}
      <div style={{ position: 'absolute', bottom: 'clamp(10px,1.5vw,16px)', right: 'clamp(16px,2.5vw,28px)', display: 'flex', gap: 6, zIndex: 20 }}>
        {SLIDER_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > current ? 1 : -1)}
            style={{
              width: i === current ? 20 : 6, height: 6, borderRadius: 3, border: 'none', cursor: 'pointer',
              background: i === current ? 'rgba(220,38,38,0.9)' : 'rgba(255,255,255,0.25)',
              transition: 'all .3s',
              boxShadow: i === current ? '0 0 8px rgba(220,38,38,0.7)' : 'none',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div style={{ position: 'absolute', top: 'clamp(10px,1.5vw,16px)', right: 'clamp(16px,2.5vw,28px)', zIndex: 20, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: '0.18em', color: 'rgba(200,80,80,0.8)' }}>
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FILTERS = [
  "All",
  "Close Protection",
  "Executive Protection",
  "Secure Transportation",
  "Global Operations",
];

const galleryItems: GalleryItem[] = [
  { id: 1, src: Slider1.src, alt: "Executive Arrival", title: "Celebrity Protection", category: "Global Operations", description: "High-profile movement with controlled entry and perimeter awareness." },
  { id: 2, src: Slider2.src, alt: "Tactical Readiness", title: "Celebrity Protection", category: "Global Operations", description: "Prepared teams operating with precision in high-pressure environments." },
  { id: 3, src: Slider3.src, alt: "Secure Transfer", title: "Celebrity Protection", category: "Global Operations", description: "Discrete client movement managed from arrival to departure." },
  { id: 4, src: Slider4.src, alt: "VIP Escort", title: "Celebrity Protection", category: "Global Operations", description: "Close-range protective coverage in premium and public environments." },
  { id: 5, src: Slider5.src, alt: "Convoy Coordination", title: "Celebrity Protection", category: "Global Operations", description: "Vehicle positioning and movement planning with constant oversight." },
  { id: 6, src: Slider6.src, alt: "City Deployment", title: "Celebrity Protection", category: "Global Operations", description: "Professional teams operating across major international locations." },
  { id: 7, src: Slider7.src, alt: "Operational Briefing", title: "Event Security", category: "Global Operations", description: "Intelligence-led preparation supporting executive security missions." },
  { id: 8, src: Slider8.src, alt: "Arrival Security", title: "Corporate Security", category: "Global Operations", description: "Low-profile transportation with full situational awareness." },
  { id: 9, src: Slider9.src, alt: "Command Center", title: "Celebrity Protection", category: "Global Operations", description: "Real-time monitoring and intelligence support for operational continuity." },
  { id: 10, src: Owner.src, alt: "Aerial Surveillance", title: "Executive Protection", category: "Global Operations", description: "Expanded visibility and tactical support for sensitive movements." },
  { id: 11, src: Slider10.src, alt: "Rapid Mobility", title: "Event Security", category: "Global Operations", description: "Advanced transport coordination where timing and readiness matter most." },
  { id: 12, src: Slider11.src, alt: "Night Presence", title: "Corpotate Security", category: "Global Protection", description: "Visible strength with discreet execution in urban environments." },
  { id: 13, src: Slider12.src, alt: "Night Presence", title: "Red Carpet Security", category: "Global Protection", description: "Visible strength with discreet execution in urban environments." },
  // { id: 14, src: Slider13.src, alt: "Night Presence", title: "Night Presence", category: "Global Protection", description: "Visible strength with discreet execution in urban environments." },
  { id: 15, src: Slider14.src, alt: "Night Presence", title: "Secure Transportation", category: "Global Protection", description: "Visible strength with discreet execution in urban environments." },
  { id: 16, src: Slider15.src, alt: "Night Presence", title: "Luxury Transportation", category: "Global Protection", description: "Visible strength with discreet execution in urban environments." },
  { id: 17, src: Slider16.src, alt: "Night Presence", title: "Celebrity Protection", category: "Global Protection", description: "Visible strength with discreet execution in urban environments." },
];

const NAVBAR_XS = 56;
const NAVBAR_SM = 64;
const NAVBAR_LG = 80;

function useNavbarOffset(): number {
  const [offset, setOffset] = useState(NAVBAR_LG);
  useEffect(() => {
    const calc = () => { const w = window.innerWidth; setOffset(w < 640 ? NAVBAR_XS : w < 1024 ? NAVBAR_SM : NAVBAR_LG); };
    calc(); window.addEventListener("resize", calc); return () => window.removeEventListener("resize", calc);
  }, []);
  return offset;
}

function useGridCols(): number {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const calc = () => { const w = window.innerWidth; setCols(w < 480 ? 1 : w < 768 ? 2 : w < 1024 ? 3 : 4); };
    calc(); window.addEventListener("resize", calc); return () => window.removeEventListener("resize", calc);
  }, []);
  return cols;
}

function RedParticles() {
  const ref = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(Array.from({ length: 60 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2.8 + 0.7, opacity: Math.random() * 0.6 + 0.12, duration: Math.random() * 4 + 2, delay: Math.random() * 3 })));
  }, []);
  useEffect(() => {
    if (!ref.current || !particles.length) return;
    ref.current.querySelectorAll<HTMLElement>(".p-dot").forEach((el) => {
      gsap.to(el, { opacity: 0.03, scale: 0.15, duration: parseFloat(el.dataset.dur ?? "3"), delay: parseFloat(el.dataset.del ?? "0"), repeat: -1, yoyo: true, ease: "power1.inOut" });
    });
  }, [particles]);
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div key={p.id} className="p-dot absolute rounded-full bg-red-500" data-dur={p.duration} data-del={p.delay} style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }} />
      ))}
    </div>
  );
}

function FrameEdge() {
  return (
    <>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-90 z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-90 z-10 pointer-events-none" />
      <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent opacity-90 z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent opacity-90 z-10 pointer-events-none" />
      {["-top-5 -left-5", "-top-5 -right-5", "-bottom-5 -left-5", "-bottom-5 -right-5"].map((p) => (
        <div key={p} className={`absolute ${p} w-28 h-28 bg-red-800 opacity-20 rounded-full blur-3xl pointer-events-none z-0`} />
      ))}
    </>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xl sm:text-2xl font-semibold text-white leading-none">{value}</span>
      <span className="text-xs text-zinc-400 tracking-wide">{label}</span>
    </div>
  );
}

function FilterBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button onClick={onClick} whileTap={{ scale: 0.95 }} className="relative px-4 py-2 text-xs sm:text-sm rounded-full border transition-colors duration-300 whitespace-nowrap"
      style={{ border: active ? "1px solid rgba(220,38,38,0.8)" : "1px solid rgba(255,255,255,0.1)", background: active ? "rgba(180,0,0,0.35)" : "rgba(255,255,255,0.03)", color: active ? "#fff" : "rgba(200,200,200,0.75)", boxShadow: active ? "0 0 20px rgba(220,38,38,0.25), inset 0 0 12px rgba(220,38,38,0.1)" : "none", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}>
      {label}
      {active && <motion.span layoutId="active-filter-dot" className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" style={{ boxShadow: "0 0 6px rgba(220,38,38,0.9)" }} />}
    </motion.button>
  );
}

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const enter = useCallback(() => { setHovered(true); if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.28, ease: "power2.out" }); }, []);
  const leave = useCallback(() => { setHovered(false); if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.38, ease: "power2.in" }); }, []);
  return (
    <motion.article className="relative overflow-hidden cursor-pointer group" initial={{ opacity: 1, y: 20, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 1, scale: 0.94 }} transition={{ duration: 0.5, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }} onMouseEnter={enter} onMouseLeave={leave} onTouchStart={enter} onTouchEnd={leave} style={{ border: "1px solid rgba(220,38,38,0.2)", background: "#060000", minHeight: "220px" }}>
      <motion.img src={item.src} alt={item.alt} className="absolute inset-0 w-full h-full object-contain select-none" draggable={false} animate={{ scale: hovered ? 1.08 : 1, filter: hovered ? "brightness(0.55) saturate(0.75)" : "brightness(0.98) saturate(0.6)" }} transition={{ duration: 0.5, ease: "easeOut" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0, background: "linear-gradient(135deg, rgba(200,0,0,0.18) 0%, transparent 65%)", boxShadow: "inset 0 0 35px rgba(200,0,0,0.3)" }} />
      <motion.div className="absolute inset-0 pointer-events-none" animate={{ boxShadow: hovered ? "inset 0 0 0 1px rgba(220,38,38,0.95)" : "inset 0 0 0 1px rgba(220,38,38,0.15)" }} transition={{ duration: 0.25 }} />
      <AnimatePresence>{hovered && (<motion.div className="absolute left-0 right-0 h-px bg-red-400 pointer-events-none" style={{ opacity: 0.45 }} initial={{ top: "0%" }} animate={{ top: "100%" }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: "linear" }} />)}</AnimatePresence>
      <div className="absolute top-0 left-0 pointer-events-none transition-all duration-300" style={{ width: "clamp(12px, 2vw, 18px)", height: "clamp(12px, 2vw, 18px)", borderTop: `1.5px solid rgba(220,38,38,${hovered ? "0.95" : "0.6"})`, borderLeft: `1.5px solid rgba(220,38,38,${hovered ? "0.95" : "0.6"})` }} />
      <div className="absolute bottom-0 right-0 pointer-events-none transition-all duration-300" style={{ width: "clamp(12px, 2vw, 18px)", height: "clamp(12px, 2vw, 18px)", borderBottom: `1.5px solid rgba(220,38,38,${hovered ? "0.95" : "0.6"})`, borderRight: `1.5px solid rgba(220,38,38,${hovered ? "0.95" : "0.6"})` }} />
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-10">
        <motion.div className="inline-flex items-center mb-1.5 sm:mb-2" animate={{ opacity: hovered ? 1 : 0.7 }}>
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-red-300 px-2.5 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(220,38,38,0.35)", backdropFilter: "blur(6px)" }}>{item.category}</span>
        </motion.div>
        <h3 className="text-sm sm:text-base md:text-lg font-medium text-white leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em" }}>{item.title}</h3>
        <motion.p className="text-xs sm:text-sm text-zinc-300 leading-snug mt-1 line-clamp-2" animate={{ opacity: hovered ? 0.9 : 0, y: hovered ? 0 : 6 }} transition={{ duration: 0.3 }} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{item.description}</motion.p>
      </div>
    </motion.article>
  );
}

function CTASection() {
  return (
    <motion.div className="relative mt-8 sm:mt-12" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}>
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-5 sm:p-7" style={{ background: "rgba(10,0,0,0.75)", border: "1px solid rgba(220,38,38,0.18)", backdropFilter: "blur(8px)" }}>
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(220,38,38,0.8), transparent)" }} />
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400 mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Discretion. Precision. Excellence.</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>Operate at the highest professional standard.</h2>
          <p className="text-sm text-zinc-400 max-w-xl leading-relaxed" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Explore careers or request protection services through a premium, globally positioned brand experience.</p>
        </div>
        <div className="flex flex-row sm:flex-col lg:flex-row gap-3 flex-shrink-0">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-5 py-2.5 text-sm font-medium text-white rounded-sm" style={{ background: "rgba(180,0,0,0.85)", border: "1px solid rgba(220,38,38,0.5)", boxShadow: "0 0 24px rgba(220,38,38,0.3)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em" }}>EXPLORE CAREERS</motion.button>
          <motion.button whileHover={{ scale: 1.03, borderColor: "rgba(220,38,38,0.6)" }} whileTap={{ scale: 0.97 }} className="px-5 py-2.5 text-sm font-medium text-zinc-300 hover:text-white rounded-sm transition-colors" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em" }}>REQUEST SERVICES</motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const navbarOffset = useNavbarOffset();
  const cols = useGridCols();
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? galleryItems : galleryItems.filter((i) => i.category === activeFilter);
  const rows = Math.ceil(filtered.length / cols);
  const rowH = cols === 1 ? 220 : cols === 2 ? 200 : cols === 3 ? 210 : 230;

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    if (badgeRef.current) tl.fromTo(badgeRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
    if (titleRef.current) tl.fromTo(titleRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" }, "-=0.2");
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="relative w-full min-h-screen" style={{ background: "radial-gradient(ellipse at 50% 0%, #120000 0%, #000 55%)", fontFamily: "'Barlow Condensed', sans-serif", paddingTop: `${navbarOffset + 20}px`, paddingBottom: "clamp(24px, 4vw, 60px)", paddingLeft: "clamp(14px, 4vw, 48px)", paddingRight: "clamp(14px, 4vw, 48px)" }}>
        <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(rgba(255,30,30,0.55) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.08 }} />
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(160,0,0,0.22) 0%, transparent 45%),radial-gradient(ellipse at 100% 100%, rgba(160,0,0,0.22) 0%, transparent 45%),radial-gradient(ellipse at 100% 0%, rgba(120,0,0,0.12) 0%, transparent 45%),radial-gradient(ellipse at 0% 100%, rgba(120,0,0,0.12) 0%, transparent 45%),radial-gradient(ellipse at 50% 0%, rgba(100,0,0,0.35) 0%, transparent 40%)" }} />
        <RedParticles />

        {/* ── HERO ── */}
        <section className="relative z-10 mb-8 sm:mb-10 pb-6 sm:pb-8 pt-5" style={{ borderBottom: "1px solid rgba(220,38,38,0.15)" }}>
          <div ref={badgeRef} className="mb-4 inline-flex items-center gap-2" style={{ opacity: 0 }}>
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" /><span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" /></span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-300 px-4 py-1 rounded-full" style={{ border: "1px solid rgba(220,38,38,0.35)", background: "rgba(180,0,0,0.12)" }}>International Statement Security Services</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <h1 ref={titleRef} className="text-white font-semibold leading-none" style={{ fontSize: "clamp(38px, 7vw, 80px)", letterSpacing: "0.06em", opacity: 0, textTransform: "uppercase" }}>Gallery</h1>
              <div className="mt-2 mb-4" style={{ width: "clamp(48px, 8vw, 80px)", height: 2, background: "linear-gradient(to right, rgba(220,38,38,0.9), transparent)" }} />
              <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed" style={{ letterSpacing: "0.02em" }}>Operational excellence in motion. A visual overview of close protection, executive protection, secure transportation, and global deployments.</p>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }} className="grid grid-cols-2 gap-4 p-4 sm:p-5" style={{ background: "rgba(8,0,0,0.7)", border: "1px solid rgba(220,38,38,0.18)", backdropFilter: "blur(8px)" }}>
              <StatCard value="7+" label="Operating Locations" />
              <StatCard value="24/7" label="Readiness" />
              <StatCard value="Global" label="Protective Coverage" />
              <StatCard value="Elite" label="Professional Standard" />
            </motion.div>
          </div>
        </section>

        {/* ── IMAGE SLIDER (new) ── */}
        <div className="relative z-10">
          <ImageSlider />
        </div>

        {/* ── FILTERS ── */}
        <motion.section className="relative z-10 mb-6 flex flex-wrap gap-2 sm:gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          {FILTERS.map((f) => <FilterBtn key={f} label={f} active={activeFilter === f} onClick={() => setActiveFilter(f)} />)}
          <span className="ml-auto self-center text-xs text-zinc-600" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em" }}>{filtered.length} / {galleryItems.length}</span>
        </motion.section>

        {/* ── GALLERY FRAME ── */}
        <div className="relative z-10" style={{ background: "rgba(3,0,0,0.9)", border: "1px solid rgba(160,0,0,0.3)", boxShadow: "0 0 80px rgba(140,0,0,0.09), 0 0 160px rgba(80,0,0,0.06)", padding: "clamp(10px, 2vw, 24px)" }}>
          <FrameEdge />
          <AnimatePresence mode="popLayout">
            <div key={activeFilter} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, ${rowH}px)`, gap: "clamp(2px, 0.4vw, 5px)" }}>
              {filtered.map((item, i) => <GalleryCard key={item.id} item={item} index={i} />)}
            </div>
          </AnimatePresence>
          <div className="mt-3" style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(220,38,38,0.4), transparent)", opacity: 0.5 }} />
        </div>

        {/* ── CTA ── */}
        <div className="relative z-10"><CTASection /></div>
      </div>
    </>
  );
}