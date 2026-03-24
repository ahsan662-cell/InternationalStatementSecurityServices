'use client'

import { useEffect } from 'react'

/**
 * ScrollReveal
 * ─────────────────────────────────────────────────────
 * Two jobs:
 *  1. Initialises Lenis smooth scrolling
 *  2. Wires up IntersectionObserver for .reveal elements
 *
 * Usage in your components:
 *   Add className="reveal" to any element you want to
 *   fade-up on scroll. Optionally add "reveal-delay-1"
 *   through "reveal-delay-4" for staggered children.
 *
 * To add a new animation variant:
 *   1. Add a new CSS class in globals.css (e.g. .reveal-left)
 *   2. That class gets .visible added automatically here
 */
export default function ScrollReveal() {
  useEffect(() => {
    // ── Lenis smooth scroll ──────────────────────────────
    let lenis: any = null

    async function initLenis() {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        })

        const raf = (time: number) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch {
        // Lenis not available — native scroll works fine as fallback
      }
    }
    initLenis()

    // ── IntersectionObserver for .reveal elements ────────
    const revealEls = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Unobserve after first reveal (animates once)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    revealEls.forEach(el => observer.observe(el))

    return () => {
      observer.disconnect()
      lenis?.destroy()
    }
  }, [])

  return null // This component renders nothing — it's purely functional
}
