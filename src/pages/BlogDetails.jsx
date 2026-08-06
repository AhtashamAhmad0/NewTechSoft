import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from 'lucide-react'
import CTA from '../components/home/CTA'
import { BLOG_POSTS } from '../data/siteData'

// Original placeholder body copy, written for this template — not sourced
// from any external article. Swap with real CMS content in production.
const BODY_PARAGRAPHS = [
  'When we started applying this idea across client projects, the first thing we noticed was how much it changed the review conversation. Instead of debating opinions, we were debating outcomes — which made feedback faster and far less personal.',
  'The technical implementation matters less than the discipline behind it. Most teams already have the tools they need; what is usually missing is a shared definition of "done" that everyone — design, engineering, and the client — actually agrees on before work starts.',
  'We rolled this out gradually, starting with a single internal project before bringing it into client work. That staging mattered: it gave us room to be wrong in private before being wrong in public.',
  'A few months in, the biggest measurable shift was in revision cycles. Projects that adopted this approach needed roughly a third fewer rounds of feedback to reach final sign-off, simply because ambiguity was removed earlier in the process.',
]

export default function BlogDetails() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  const related = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 3)
  const fallbackRelated = related.length ? related : BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3)

  if (!post) return <Navigate to="/blog" replace />

  return (
    <>
      {/* Banner */}
      <section className="section pb-10 pt-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink-primary">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <span className="eyebrow">{post.category}</span>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-ink-muted">
            <span className="flex items-center gap-2"><Calendar size={15} /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock size={15} /> {post.readTime}</span>
          </div>
        </motion.div>
      </section>

      {/* Detail content */}
      <section className="container-narrow pb-20">
        <div className="glass-panel mb-10 aspect-[16/7] w-full bg-gradient-to-br from-violet/20 via-transparent to-cyan/20" />
        <p className="text-lg text-ink-primary/90">{post.excerpt}</p>
        <div className="mt-6 flex flex-col gap-5 text-ink-muted">
          {BODY_PARAGRAPHS.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* Related Posts */}
      <section className="section pt-0">
        <h2 className="mb-8 font-display text-2xl font-semibold">Related Posts</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {fallbackRelated.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="glass glass-hover group flex flex-col justify-between rounded-2xl p-6"
            >
              <div>
                <span className="eyebrow">{p.category}</span>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug">{p.title}</h3>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-ink-faint">
                {p.date}
                <ArrowUpRight size={16} className="text-cyan-soft transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTA />
    </>
  )
}
