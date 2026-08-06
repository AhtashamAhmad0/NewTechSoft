import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/**
 * Compact hero used on every inner page (About, Services, Portfolio...).
 * Keeps the glass-mesh atmosphere consistent with the homepage hero
 * without repeating its full layout.
 */
export default function PageHero({ eyebrow, title, description, crumb }) {
  return (
    <section className="section pb-14 pt-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-2xl flex-col items-center gap-4"
      >
        <div className="flex items-center gap-2 text-xs text-ink-faint">
          <Link to="/" className="hover:text-ink-muted">Home</Link>
          <ChevronRight size={12} />
          <span className="text-ink-muted">{crumb}</span>
        </div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="text-balance font-display text-4xl font-semibold sm:text-5xl">{title}</h1>
        {description && <p className="text-balance text-lg text-ink-muted">{description}</p>}
      </motion.div>
    </section>
  )
}
