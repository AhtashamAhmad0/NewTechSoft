import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="section flex min-h-[70vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 -z-10 rounded-full bg-violet/20 blur-3xl" />
        <svg width="220" height="180" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g404" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7C5CFF" />
              <stop offset="100%" stopColor="#2DD4FF" />
            </linearGradient>
          </defs>
          <rect x="20" y="30" width="180" height="120" rx="18" className="fill-white/5" stroke="url(#g404)" strokeWidth="2" />
          <circle cx="60" cy="70" r="6" fill="#7C5CFF" />
          <circle cx="82" cy="70" r="6" fill="#2DD4FF" />
          <circle cx="104" cy="70" r="6" fill="#FFB020" />
          <text x="110" y="120" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="42" fontWeight="700" fill="url(#g404)">
            404
          </text>
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">This page didn't ship.</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-muted">
          The page you're looking for doesn't exist or may have moved. Let's get you back on track.
        </p>
        <div className="mt-8">
          <Button to="/" icon={Home}>Go Home</Button>
        </div>
      </motion.div>
    </section>
  )
}
