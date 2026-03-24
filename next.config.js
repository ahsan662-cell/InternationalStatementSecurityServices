/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allows Three.js to work without SSR issues
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    domains: [], // your domains if any
  },
}

module.exports = nextConfig
