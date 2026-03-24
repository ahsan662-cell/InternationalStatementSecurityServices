
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SplashScreen from '@/components/ui/SplashScreen'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: 'International Statement Security Services | Elite Protection Worldwide',
  description:
    'Tailored close protection and executive security services for VVIP clients, royal families, and high-net-worth individuals. Operating in New York, London, Rome, Tirana, Doha, and Abu Dhabi.',
  keywords: [
    'close protection', 'executive security', 'VIP bodyguard', 'personal security',
    'New York bodyguard', 'London security', 'Qatar security', 'Abu Dhabi protection',
  ],
  openGraph: {
    title: 'International Statement Security Services',
    description: 'Elite Protection. Global Reach. Zero Compromise.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body>
        <Navbar />
        {/* <SplashScreen /> */}
        {/* Custom cursor — replaces the default OS cursor */}
        {/* <CustomCursor /> */}
        {children}
        <Footer/>  
      </body>
      
    </html>
  )
}
