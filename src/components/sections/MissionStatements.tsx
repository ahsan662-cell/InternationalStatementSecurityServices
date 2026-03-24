'use client'
import Bg from "@/assets/Landing-Page-Hero.webp"
import MissionStatementImg from "@/assets/missionEP.webp"
const checkItems = [
  'Bodyguard Hire',
  'Private Security and Personal Protection',
  'Close Protection Services in New York',
  'Residential Security',
  'Asset and High-Value Goods Protection',
  'Close Protection Chauffeur in New York / Security Driver Services',
]

export default function MissionStatement() {
  return (
    <section className="mission-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        /* ── Section ── */
        .mission-section {
          position: relative;
          min-height: 100vh;
          background: black;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(48px,7vw,100px) clamp(20px,5vw,64px);
          overflow: hidden;
          font-family: 'Rajdhani', sans-serif;
          backgroundImage:url(${Bg.src}),
          backgroundSize:"fill",
          backgroundPosition:"center",
          opacity:0.9,
          backgroundRepeat:"no-repeat",
          z-index:10;
        }

        /* Dot grid */
        .mission-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,160,255,0.14) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none; z-index: 0;
        }

        /* Perspective floor grid */
        .mission-section::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 40%;
          background-image:
            linear-gradient(rgba(0,160,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,160,255,0.06) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: bottom;
          pointer-events: none; z-index: 0;
        }

        /* ── Content layout ── */
        .mission-inner {
          position: relative; z-index: 2;
          width: 100%; max-width: 1200px;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
        }

        @media (max-width: 860px) {
          .mission-inner {
            grid-template-columns: 1fr;
            gap: clamp(40px, 6vw, 56px);
          }
        }

        /* ════════════════════════════
           LEFT — IMAGE CARD
        ════════════════════════════ */

        /* Animations */
        @keyframes borderPulse {
          0%,100% { filter: drop-shadow(0 0 6px #AF0A00) drop-shadow(0 0 16px #AF0A00); }
          50%      { filter: drop-shadow(0 0 2px rgba(0,150,255,0.3)); }
        }
        @keyframes cornerBreath {
          0%,100% { box-shadow: 0 0 9px #AF0A00, 0 0 20px #AF0A00; }
          50%      { box-shadow: 0 0 4px #AF0A00; }
        }
        @keyframes lightFlash {
          0%,78%,100% { opacity:0; }
          81%,87% { opacity:1; }
          84%,90% { opacity:0.2; }
        }
        @keyframes scanMove {
          0%   { top:-3%; opacity:0.9; }
          100% { top:108%; opacity:0; }
        }
        @keyframes outerGlow {
          0%,100% { opacity:0.35; transform:scale(1); }
          50%      { opacity:0.55; transform:scale(1.02); }
        }
        @keyframes imgCardIn {
          from { opacity:0; transform:translateX(-28px) scale(0.96); }
          to   { opacity:1; transform:translateX(0) scale(1); }
        }
        @keyframes textIn {
          from { opacity:0; transform:translateX(28px); }
          to   { opacity:1; transform:translateX(0); }
        }

        .img-card-wrap {
          position: relative;
          animation: imgCardIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Outer ambient ring */
        .img-outer-ring {
          position: absolute; inset: -12px;
          border: 1px solid #AF0A00;
          pointer-events: none; z-index: 0;
          animation: outerGlow 3s ease-in-out infinite;
          clip-path: polygon(0% 4%, 3.5% 0%, 96.5% 0%, 100% 4%, 100% 96%, 96.5% 100%, 3.5% 100%, 0% 96%);
        }

        /* Second outer ring */
        .img-outer-ring2 {
          position: absolute; inset: -22px;
          border: 0.5px solid #AF0A00;
          pointer-events: none; z-index: 0;
          animation: outerGlow 4s ease-in-out infinite 1s;
          clip-path: polygon(0% 3%, 2.5% 0%, 97.5% 0%, 100% 3%, 100% 97%, 97.5% 100%, 2.5% 100%, 0% 97%);
        }

        /* Image container with clip */
        .img-clip {
          position: relative;
          clip-path: polygon(
            0% 3.5%,
            3% 0%,
            97% 0%,
            100% 3.5%,
            100% 96.5%,
            97% 100%,
            3% 100%,
            0% 96.5%
          );
          overflow: hidden;
          aspect-ratio: 4/3;
        }

        .img-clip img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 20%;
          filter: brightness(0.75) saturate(0.75) contrast(1.05);
          display: block;
          transition: filter 0.4s ease, transform 0.5s ease;
        }

        .img-card-wrap:hover .img-clip img {
          filter: brightness(0.9) saturate(0.85);
          transform: scale(1.04);
        }

        /* Multi-layer overlay */
        .img-overlay {
          position: absolute; inset:0; pointer-events:none;
          background:
            // linear-gradient(180deg, #AF0A00 0%, #AF0A00 40%, #AF0A00 80%, #AF0A00 100%),
            // linear-gradient(90deg, #AF0A00 0%, transparent 35%, transparent 65%, #AF0A00 100%);
        }

        /* TV/news ticker bar at bottom */
        .img-ticker {
          position: absolute; bottom:0; left:0; right:0; z-index:5;
          padding: 8px 14px 10px;
          // background: #AF0A00;
          backdrop-filter: blur(4px);
          border-top: 1px solid #AF0A00;
          display: flex; align-items: center; gap: 10px;
          pointer-events:none;
        }
        .ticker-badge {
          background: #e8002d;
          color: white;
          font-family: 'Rajdhani', sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.1em;
          padding: 3px 7px;
          flex-shrink: 0;
        }
        .ticker-channel {
          font-family: 'Orbitron', monospace;
          font-size: 9px; letter-spacing: 0.15em;
          color: #AF0A00;
          font-weight: 600;
        }
        .ticker-text {
          font-family: 'Rajdhani', sans-serif;
          font-size: 10px; color: #AF0A00;
          letter-spacing: 0.08em;
          flex:1; text-align:right;
        }

        /* Side lightning */
        .img-lightning-l, .img-lightning-r {
          position: absolute; top:0; bottom:0; width:2.5px;
          background: linear-gradient(180deg, transparent 0%, #AF0A00 25%, #AF0A00 50%, #AF0A00 75%, transparent 100%);
          z-index: 6; pointer-events:none;
          animation: lightFlash 5s infinite;
        }
        .img-lightning-l { left:0; }
        .img-lightning-r { right:0; animation-delay:2.5s; }
        .img-card-wrap:hover .img-lightning-l,
        .img-card-wrap:hover .img-lightning-r {
          animation:none; opacity:1;
          box-shadow: 0 0 14px #AF0A00, 0 0 28px #AF0A00;
        }

        /* Scan line */
        .img-scan {
          position: absolute; left:0; right:0; height:3px;
          pointer-events:none; opacity:0; z-index:7;
          background: linear-gradient(90deg, transparent, #AF0A00, #AF0A00, #AF0A00, transparent);
          box-shadow: 0 0 8px #AF0A00;
        }
        .img-card-wrap:hover .img-scan { animation: scanMove 2.2s linear infinite; }

        /* SVG frame */
        .img-svg-frame {
          position: absolute; inset:0; width:100%; height:100%;
          pointer-events:none; z-index:8; overflow:visible;
        }
        .img-frame-main {
          fill:none; stroke: #AF0A00; stroke-width:1.4;
          animation: borderPulse 3s ease-in-out infinite;
          transition: stroke 0.3s, filter 0.3s;
        }
        .img-card-wrap:hover .img-frame-main {
          stroke:#AF0A00;
          filter: drop-shadow(0 0 8px #AF0A00) drop-shadow(0 0 22px #AF0A00);
          animation:none;
        }
        .img-frame-accent {
          fill:none; stroke:#AF0A00; stroke-width:3;
          filter: drop-shadow(0 0 5px #AF0A00);
        }
        .img-card-wrap:hover .img-frame-accent {
          filter: drop-shadow(0 0 12px #AF0A00) drop-shadow(0 0 26px #AF0A00);
        }
        .img-frame-tick {
          fill:none; stroke:#AF0A00; stroke-width:3.5;
          filter: drop-shadow(0 0 4px #AF0A00);
        }

        /* Corner brackets */
        .img-corner {
          position:absolute; width:16px; height:16px;
          z-index:9; pointer-events:none;
          animation: cornerBreath 2.5s ease-in-out infinite;
        }
        .img-corner.tl { top:5px; left:5px; border-top:2px solid #AF0A00; border-left:2px solid #AF0A00; }
        .img-corner.tr { top:5px; right:5px; border-top:2px solid #AF0A00; border-right:2px solid #AF0A00; }
        .img-corner.bl { bottom:5px; left:5px; border-bottom:2px solid #AF0A00; border-left:2px solid #AF0A00; }
        .img-corner.br { bottom:5px; right:5px; border-bottom:2px solid #AF0A00; border-right:2px solid #AF0A00; }
        .img-card-wrap:hover .img-corner {
          border-color: #AF0A00;
          box-shadow:0 0 12px #AF0A00, 0 0 28px #AF0A00;
          animation:none;
        }

        /* Side tick marks */
        .img-tick-l, .img-tick-r {
          position:absolute; top:50%; transform:translateY(-50%);
          width:4px; height:30px; z-index:9;
          background: #AF0A00;
          box-shadow: 0 0 7px #AF0A00;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .img-tick-l { left:0; }
        .img-tick-r { right:0; }
        .img-card-wrap:hover .img-tick-l,
        .img-card-wrap:hover .img-tick-r {
          background: #AF0A00;
          box-shadow: 0 0 16px #AF0A00, 0 0 30px #AF0A00;
        }

        /* ════════════════════════════
           RIGHT — TEXT CONTENT
        ════════════════════════════ */
        .mission-content {
          animation: textIn 0.7s cubic-bezier(0.22,1,0.36,1) both 0.15s;
        }

        .mission-title {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(22px, 3.5vw, 42px);
          letter-spacing: 0.12em;
          color: #AF0A00;
          margin: 0 0 clamp(16px,2.5vw,28px) 0;
          text-shadow: 0 0 26px #AF0A00, 0 0 55px #AF0A00;
          line-height: 1.15;
        }

        .mission-p {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(14px,1.5vw,17px);
          font-weight: 400;
          color: #a0c8dc;
          line-height: 1.7;
          margin: 0 0 clamp(12px,1.8vw,20px) 0;
          max-width: 580px;
        }

        .mission-p strong {
          color: #FFFFFF;
          font-weight: 700;
        }

        .mission-foundation {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(14px,1.5vw,17px);
          font-weight: 700;
          color: #FFFFFF;
          margin: clamp(18px,2.5vw,28px) 0 clamp(12px,1.5vw,18px) 0;
        }

        .mission-foundation em { font-style:normal; font-weight:700; }

        /* Check list */
        .check-list {
          list-style: none;
          margin: 0; padding: 0;
          display: flex; flex-direction: column;
          gap: clamp(8px,1.2vw,14px);
        }

        .check-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(13px,1.4vw,16px);
          font-weight: 500;
          color: #FFFFFF;
          line-height: 1.4;
          transition: color 0.2s;
        }

        .check-item:hover { color: #c8e4f2; }

        .check-icon {
          flex-shrink: 0;
          margin-top: 1px;
          color: #00ccff;
          filter: drop-shadow(0 0 4px rgba(10, 72, 89, 0.7));
        }

        /* Divider line under title */
        .mission-divider {
          width: clamp(60px,8vw,100px);
          height: 2px;
          background: linear-gradient(to right, #AF0A00, #AF0A00);
          box-shadow: 0 0 8px #AF0A00;
          margin-bottom: clamp(14px,2vw,24px);
        }

        @media (max-width: 480px) {
          .mission-title { letter-spacing: 0.06em; }
          .check-item { font-size: 13px; }
        }
      `}</style>

      <div className="mission-inner">

        {/* ── LEFT: Image card ── */}
        <div className="img-card-wrap">
          <div className="img-outer-ring2" />
          <div className="img-outer-ring" />

          <div className="img-clip">
            <img
              src={MissionStatementImg.src}
              alt="Security team"
            />
            <div className="img-overlay" />
            <div className="img-lightning-l" />
            <div className="img-lightning-r" />
            <div className="img-scan" />

            {/* SVG border frame */}
            <svg className="img-svg-frame" viewBox="0 0 100 75" preserveAspectRatio="none">
              <path className="img-frame-main" d="M3,3.5 L5.5,1 L94.5,1 L97,3.5 L97,71.5 L94.5,74 L5.5,74 L3,71.5 Z" />
              <line className="img-frame-accent" x1="35" y1="1"  x2="65" y2="1"  />
              <line className="img-frame-accent" x1="35" y1="74" x2="65" y2="74" />
              <line className="img-frame-tick"   x1="3"  y1="34" x2="3"  y2="42" />
              <line className="img-frame-tick"   x1="97" y1="34" x2="97" y2="42" />
              {/* Diagonal corner accents */}
              <line className="img-frame-main" x1="1" y1="16" x2="7" y2="1"   strokeWidth="0.7" opacity="0.5"/>
              <line className="img-frame-main" x1="99" y1="16" x2="93" y2="1"  strokeWidth="0.7" opacity="0.5"/>
              <line className="img-frame-main" x1="1" y1="59" x2="7" y2="74"  strokeWidth="0.7" opacity="0.5"/>
              <line className="img-frame-main" x1="99" y1="59" x2="93" y2="74" strokeWidth="0.7" opacity="0.5"/>
            </svg>

            {/* News ticker */}
            <div className="img-ticker">
              <span className="ticker-badge">LIVE</span>
              <span className="ticker-channel">STATEMENT SECURITY</span>
              <span className="ticker-text">GLOBAL OPERATIONS ACTIVE</span>
            </div>
          </div>

          {/* Corner brackets */}
          <div className="img-corner tl" /><div className="img-corner tr" />
          <div className="img-corner bl" /><div className="img-corner br" />
          {/* Side ticks */}
          <div className="img-tick-l" /><div className="img-tick-r" />
        </div>

        {/* ── RIGHT: Text content ── */}
        <div className="mission-content">
          <h2 className="mission-title">MISSION STATEMENT</h2>
          <div className="mission-divider" />

          <p className="mission-p">
            <strong>We are dedicated</strong> to providing security, safety, and consistent
            delivery of high-quality services.
          </p>

          <p className="mission-p">
            Our highly experienced personnel makes the world a safer place by
            employing their advanced training knowledge, skills, and use of
            modern technology and weapons.
          </p>

          <p className="mission-foundation">
            <em>This is what forms the foundation</em> for all our operations:
          </p>

          <ul className="check-list">
            {checkItems.map((item, i) => (
              <li key={i} className="check-item">
                <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 5" stroke="#AF0A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}