// 'use client'

// import { useEffect, useState } from "react"
// import Logo from "@/assets/LogoISSS.png"

// export default function SplashScreen() {
//   const [visible, setVisible] = useState(true)

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setVisible(false)
//     }, 1000) // splash duration

//     return () => clearTimeout(timer)
//   }, [])

//   if (!visible) return null

//   return (
//     <div className="splash-screen">
//       <div className="logo-container">
//         <img src={Logo.src} alt="logo" className="logo"/>
//         <p className="boot-text">INTERNATIONAL STATEMENT SECURITY SERVICES</p>
//       </div>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from "react"
import Logo from "@/assets/LogoISSS.png"

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Auto-hide after 4 seconds even if no click
    const timer = setTimeout(() => {
      setVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    // User ne click kiya — audio start karo
    const audio = document.getElementById('bg-audio') as HTMLAudioElement
    if (audio) {
      audio.volume = 0.4
      audio.play().catch(() => {})
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="splash-screen"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="logo-container">
        <img src={Logo.src} alt="logo" className="logo" />
        <p className="boot-text">INTERNATIONAL STATEMENT SECURITY SERVICES</p>

        {/* Click hint */}
        <p style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.25em',
          color: 'rgba(0,212,255,0.5)',
          marginTop: 32,
          animation: 'blink 1.5s infinite',
        }}>
          CLICK ANYWHERE TO ENTER
        </p>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}