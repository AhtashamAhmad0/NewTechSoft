import { motion } from 'framer-motion'

/**
 * The core visual signature of the redesign: a frosted glass panel.
 * `hover` toggles the lift + brighten interaction used on clickable cards.
 * `delay` staggers entrance animation when rendered inside a mapped list.
 */
export default function GlassCard({ children, className = '', hover = true, delay = 0, as: Component = 'div' }) {
  const MotionComponent = motion(Component)

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={`glass-panel ${hover ? 'glass-hover' : ''} p-6 ${className}`}
    >
      {children}
    </MotionComponent>
  )
}
