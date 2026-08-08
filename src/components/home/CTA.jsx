import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button'
import Hyperspeed from './Hyperspeed'

export default function CTA({
  eyebrow = 'Let\u2019s Build',
  title = 'Have a product idea? Let\u2019s make it real.',
  description = 'Book a free 30-minute discovery call — no pitch deck, just a straight conversation about scope, timeline, and budget.',
}) {
  // Memoize effectOptions so WebGL scene doesn't continuously recreate on re-renders
  const hyperspeedOptions = useMemo(
    () => ({
      distortion: 'turbulentDistortion',
      length: 400,
      roadWidth: 20,
      islandWidth: 6,
      lanesPerRoad: 9,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5],
      lightStickHeight: [1.3, 1.7],
      movingAwaySpeed: [60, 80],
      movingCloserSpeed: [-120, -160],
      carLightsLength: [400 * 0.03, 400 * 0.2],
      carLightsRadius: [0.05, 0.14],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.8, 0.8],
      carFloorSeparation: [0, 5],
      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x0a0c10, // Matches theme deep background
        shoulderLines: 0xffffff,
        brokenLines: 0xffffff,
        leftCars: [0xd856bf, 0x6750a2, 0xc247ac], // Violet accents
        rightCars: [0x06b6d4, 0x0e5ea5, 0x324555], // Cyan/Deep blue accents
        sticks: 0x06b6d4, // Cyan light sticks
      },
    }),
    []
  )

  return (
    <section className="section py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="glass-panel relative overflow-hidden rounded-[2.5rem] border border-white/10 px-8 py-20 text-center sm:px-16"
      >
        {/* --- Hyperspeed Background Canvas --- */}
        <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden">
          <Hyperspeed effectOptions={hyperspeedOptions} />
        </div>

        {/* --- Gradient Overlays for Legibility & Theme Integration --- */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[2px]" />
        
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-violet/30 blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -bottom-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan/20 blur-3xl opacity-60" />

        {/* --- Content --- */}
        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="eyebrow inline-block rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1 text-xs font-semibold tracking-widest text-cyan uppercase backdrop-blur-md">
            {eyebrow}
          </span>

          <h2 className="mt-6 text-balance font-display text-3xl font-bold text-white sm:text-5xl sm:leading-tight">
            {title}
          </h2>

          <p className="mt-4 text-balance text-base leading-relaxed text-ink-muted sm:text-lg">
            {description}
          </p>

          <div className="mt-10 flex justify-center">
            <Button
              to="/contact"
              icon={ArrowUpRight}
              className="shadow-glow transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}