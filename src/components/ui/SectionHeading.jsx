import { motion } from 'framer-motion'

/**
 * Consistent section heading used across every page.
 * `eyebrow` is the small mono label above the title (e.g. "SERVICES"),
 * matching the "structural devices encode information" design principle —
 * it tells the reader what category of content follows.
 */
export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex max-w-2xl flex-col gap-4 ${alignment}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-balance text-3xl font-semibold text-ink-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-balance text-base text-ink-muted sm:text-lg">{description}</p>
      )}
    </motion.div>
  )
}
