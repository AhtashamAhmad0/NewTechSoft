import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button'

export default function CTA({
  eyebrow = 'Let\u2019s Build',
  title = 'Have a product idea? Let\u2019s make it real.',
  description = 'Book a free 30-minute discovery call — no pitch deck, just a straight conversation about scope, timeline, and budget.',
}) {
  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="glass-panel relative overflow-hidden px-8 py-16 text-center sm:px-16"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet/30 blur-3xl" />
        <span className="eyebrow relative">{eyebrow}</span>
        <h2 className="relative mx-auto mt-4 max-w-xl text-balance font-display text-3xl font-semibold sm:text-4xl">
          {title}
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-balance text-ink-muted">{description}</p>
        <div className="relative mt-8 flex justify-center">
          <Button to="/contact" icon={ArrowUpRight}>
            Get in Touch
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
