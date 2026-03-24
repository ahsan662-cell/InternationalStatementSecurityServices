'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import TickerSection from '@/components/sections/TickerSection'
import ServicesSection from '@/components/sections/ServicesSection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import LocationsSection from '@/components/sections/LocationsSection'
import ContactSection from '@/components/sections/ContactSection'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useEffect, useRef } from 'react'
import GlobalSecurityOps from '@/components/sections/WhatWeOperate'
import SplashScreen from '@/components/ui/SplashScreen'
import AudioPlayer from '@/components/sections/Audio'
import SecurityServicesCards from '@/components/sections/ProfessionalSecurity'
import FactsSection from '@/components/sections/FactSection'
import MissionStatement from '@/components/sections/MissionStatements'
import FaqSection from '@/components/sections/FAQsection'
import AboutContact from '@/components/sections/AboutSection'
import CinematicCanvas from '@/components/3d/CinematicCanvas'
// import music from '../../public/audio/mountain-war.mp3'
// Load the 3D canvas scene client-side only (Three.js needs the browser)
// const CinematicCanvas = dynamic(
//   () => import('@/components/3d/CinematicCanvas'),
//   { ssr: false }
// )


export default function Home() {
  return (
    <div style={{width:"100%"}}>
      <audio
        id="bg-audio"
        src="/audio/mountain-war.mp3"
        loop
        preload="auto"
      />
      {/* Scroll behavior smoother (Lenis) */}
      <ScrollReveal />

      {/* Full-screen fixed 3D canvas — renders behind everything */}
      {/* <CinematicCanvas /> */}
    
      {/* Page sections — each is its own component you can edit independently */}
      <main style={{
        width: "100vw",
        overflowX: "hidden"
      }}>
         {/* <AudioPlayer/> */}
        <HeroSection />
        <TickerSection />
        <LocationsSection />
        <MissionStatement/>
        <SecurityServicesCards/>
        <GlobalSecurityOps/>
        <ServicesSection />
        <FactsSection/>
        <WhyUsSection />
        <FaqSection/>
        <AboutContact/>
        <ContactSection />
      </main>
    </div>
  )
}
