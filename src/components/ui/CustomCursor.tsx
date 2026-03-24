'use client'

import { useEffect, useRef } from 'react'

/**
 * CustomCursor
 * ─────────────────────────────────────────────────────
 * Replaces the OS cursor with two elements:
 *   • A small dot that follows the mouse exactly
 *   • A larger ring that lags behind (smooth follow)
 *
 * HOW TO CUSTOMISE:
 *   - Change dotSize / ringSize below
 *   - Change colors in the style objects
 *   - Add more states in the onMouseEnter/Leave listeners
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current!
    const ring = ringRef.current!
    let mx = 0, my = 0
    let rx = 0, ry = 0

    // Track mouse position
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    // Ring follows with lag
    function animateRing() {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      requestAnimationFrame(animateRing)
    }
    animateRing()

    // Enlarge ring on interactive elements
    const interactiveSelectors = 'a, button, [role="button"], .srv-card, .why-card, input, select, textarea'
    const onEnter = () => {
      ring.style.width = '44px'
      ring.style.height = '44px'
      ring.style.borderColor = 'var(--c)'
    }
    const onLeave = () => {
      ring.style.width = '26px'
      ring.style.height = '26px'
      ring.style.borderColor = 'rgba(0,212,255,0.5)'
    }

    // Delegate to document
    document.addEventListener('mouseover', (e) => {
      if ((e.target as Element).closest(interactiveSelectors)) onEnter()
    })
    document.addEventListener('mouseout', (e) => {
      if ((e.target as Element).closest(interactiveSelectors)) onLeave()
    })

    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      {/* Dot — exact position */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 10, height: 10,
          background: 'var(--c)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 8px var(--c)',
        }}
      />
      {/* Ring — lagging follow */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: 26, height: 26,
          border: '1px solid rgba(0,212,255,0.5)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.15s ease, height 0.15s ease, border-color 0.15s ease',
        }}
      />
    </>
  )
}
