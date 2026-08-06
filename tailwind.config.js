/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        deep: {
          DEFAULT: '#0A0E1A', // primary background — near-black navy
          panel: '#10152A',   // secondary panel background
          rim: '#161C33',     // slightly raised surface
        },
        // Brand accents
        violet: {
          DEFAULT: '#7C5CFF',
          soft: '#A78BFF',
        },
        cyan: {
          DEFAULT: '#2DD4FF',
          soft: '#7FE7FF',
        },
        amber: {
          DEFAULT: '#FFB020',
          soft: '#FFCA6B',
        },
        ink: {
          primary: '#F5F7FF',
          muted: '#9AA3C7',
          faint: '#5C6488',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'mesh-1':
          'radial-gradient(60% 50% at 15% 10%, rgba(124,92,255,0.28) 0%, rgba(124,92,255,0) 60%), radial-gradient(50% 45% at 90% 20%, rgba(45,212,255,0.22) 0%, rgba(45,212,255,0) 60%), radial-gradient(55% 55% at 50% 100%, rgba(124,92,255,0.16) 0%, rgba(124,92,255,0) 60%)',
        'grad-brand': 'linear-gradient(135deg, #7C5CFF 0%, #2DD4FF 100%)',
        'grad-warm': 'linear-gradient(135deg, #FFB020 0%, #FF6B6B 100%)',
        noise:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255,255,255,0.08)',
        glow: '0 0 40px -8px rgba(124,92,255,0.55)',
        'glow-cyan': '0 0 40px -8px rgba(45,212,255,0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        blink: 'blink 1s step-start infinite',
        marquee: 'marquee 28s linear infinite',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
}
