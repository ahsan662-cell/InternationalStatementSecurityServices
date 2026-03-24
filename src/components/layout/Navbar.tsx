
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from "@/assets/LogoISSS.png"

const NAV_LINKS = [
  { label: 'About', href: '/About' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '/Gallery' },
  { label: 'Contact', href: '#contact' },
  { label: 'Careers', href: '/Career' },
  { label: 'Training', href: 'https://ardianrexhepi.com/trainings/' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        background: scrolled
          ? 'rgba(3,7,15,0.96)'
          : 'linear-gradient(180deg, rgba(3,7,15,0.92) 0%, transparent 100%)',
        borderBottom: `1px solid ${scrolled ? 'rgba(0,212,255,0.12)' : 'rgba(0,212,255,0.05)'}`,
        backdropFilter: 'blur(12px)',
      }}
    >

      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={Logo.src} alt="logo" style={{ width: 60 }} />
      </Link>

      {/* Desktop Nav */}
      <ul
        className="nav-desktop"
        style={{
          display: 'flex',
          gap: 48,
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              style={{
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: 17,
                letterSpacing: '2px',
                color: 'var(--muted)',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA Desktop */}
      <a
        href="#contact"
        className="btn-primary nav-desktop"
        style={{ fontSize: 14, padding: '8px 18px', background:"#ff0d00" }}
      >
        Contact Us
      </a>

      {/* Mobile Menu Button */}
      <div
        className="nav-mobile"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          fontSize: 26,
          color: 'white',
          cursor: 'pointer',
        }}
      >
        ☰
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            style={{
              position: 'absolute',
              top: '70px',
              left: 0,
              right: 0,
              background: '#000000',
              padding: '30px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              borderTop: '1px solid rgba(0,212,255,0.15)'
            }}
          >
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: '"Share Tech Mono", monospace',
                  fontSize: 18,
                  letterSpacing: '2px',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  textTransform: 'uppercase'
                }}
              >
                {link.label}
              </a>
            ))}

            <a href="#contact" className="btn-primary" style={{background:"#ff0d00", fontSize:15, textAlign:"center"}}>
              Contact Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}