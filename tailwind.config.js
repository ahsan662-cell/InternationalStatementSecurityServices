/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: '#00D4FF',
          dim: 'rgba(0,212,255,0.12)',
          glow: 'rgba(0,212,255,0.06)',
        },
        bg: {
          DEFAULT: '#03070F',
          2: '#060C18',
          3: '#080F1E',
        },
        text: {
          DEFAULT: '#D8EEFF',
          muted: '#6A8BAA',
        },
        gold: '#C8A84B',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        mono: ['"Share Tech Mono"', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'spin-reverse': 'spin-reverse 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scan': 'scan 5s linear infinite',
        'ticker': 'ticker 22s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 2s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          to: { transform: 'rotate(-360deg)' },
        },
        'scan': {
          '0%': { top: '-2%' },
          '100%': { top: '102%' },
        },
        'ticker': {
          to: { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.15 },
        },
      },
    },
  },
  plugins: [],
}
