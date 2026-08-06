import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import CTA from '../components/home/CTA'
import { PORTFOLIO } from '../data/siteData'

export default function Portfolio() {
  const categories = useMemo(
    () => ['All', ...new Set(PORTFOLIO.map((p) => p.category))],
    []
  )
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === active)

  return (
    <>
      <PageHero
        crumb="Portfolio"
        eyebrow="Our Work"
        title="Projects across web, mobile, and AI."
        description="A sample of what we've shipped for founders and teams across finance, retail, health, and logistics."
      />

      <section className="section">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-grad-brand text-deep'
                  : 'glass text-ink-muted hover:text-ink-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="glass glass-hover group flex h-full flex-col justify-between rounded-2xl p-7"
              >
                <div>
                  <span className="eyebrow">{project.category}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm text-ink-muted">{project.summary}</p>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-ink-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-cyan-soft transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <CTA
        eyebrow="Like What You See?"
        title="Let's add your project to this list."
      />
    </>
  )
}
