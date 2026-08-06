import CountUp from 'react-countup'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Wraps react-countup with a framer-motion viewport trigger so the count
 * animates once, the first time it scrolls into view (not on every render).
 */
export default function StatCounter({ value, suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-1 text-center"
    >
      <span className="font-display text-4xl font-bold gradient-text sm:text-5xl">
        {inView ? <CountUp end={value} duration={2.2} suffix={suffix} /> : '0'}
      </span>
      <span className="text-sm text-ink-muted">{label}</span>
    </motion.div>
  )
}
