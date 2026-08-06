import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import CTA from '../components/home/CTA'
import { BLOG_POSTS } from '../data/siteData'

export default function Blog() {
  const categories = useMemo(() => ['All', ...new Set(BLOG_POSTS.map((p) => p.category))], [])
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCategory = active === 'All' || post.category === active
    const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <>
      <PageHero
        crumb="Blog"
        eyebrow="Notes From the Studio"
        title="Writing on design, engineering, and process."
        description="Practical posts from the projects we actually work on — no filler."
      />

      <section className="section">
        <div className="mb-10 flex flex-col items-center gap-5">
          <div className="glass flex w-full max-w-md items-center gap-3 rounded-full px-5 py-3">
            <Search size={17} className="text-ink-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-transparent text-sm text-ink-primary placeholder:text-ink-faint outline-none"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  active === cat ? 'bg-grad-brand text-deep' : 'glass text-ink-muted hover:text-ink-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div
                layout
                key={post.slug}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="glass glass-hover group flex h-full flex-col justify-between rounded-2xl p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="eyebrow">{post.category}</span>
                      <span className="text-xs text-ink-faint">{post.readTime}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold leading-snug">{post.title}</h3>
                    <p className="mt-3 text-sm text-ink-muted">{post.excerpt}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-ink-faint">{post.date}</span>
                    <ArrowUpRight
                      size={18}
                      className="text-cyan-soft transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-ink-muted">No articles match "{query}" in {active}.</p>
        )}
      </section>

      <CTA eyebrow="Stay in the Loop" title="Want posts like these in your inbox?" description="One email a month. No spam, unsubscribe anytime." />
    </>
  )
}
