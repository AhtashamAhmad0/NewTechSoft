import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import CTA from '../components/home/CTA'
import { PORTFOLIO } from '../data/siteData'

// Interactive background grid mesh canvas
function GridCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    let width = 0
    let height = 0
    let particles = []

    const updateSize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      width = parent.clientWidth
      height = parent.clientHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const count = Math.min(Math.floor((width * height) / 15000), 40)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.8 + 1,
        })
      }
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Background ambient grid lines
      ctx.globalAlpha = 0.06
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1
      const gridSize = 80

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Floating ambient node particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#06B6D4'
        ctx.globalAlpha = 0.4
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = '#D946EF'
            ctx.lineWidth = 0.8
            ctx.globalAlpha = (1 - dist / 120) * 0.2
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(draw)
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', updateSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70"
    />
  )
}

// Fallback high-resolution project mockups matched by category / index
const SAMPLE_MOCKUPS = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop', // FinTech Dashboard
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop', // Mobile App Design
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop', // AI Dashboard / Analytics
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop', // SaaS Web App
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop', // Cybersecurity / Cloud Platform
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop', // E-commerce / Modern Web
]

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

      <section className="section relative overflow-hidden py-16">
        {/* Ambient Grid & Glow Background */}
        <GridCanvas />
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-violet/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 right-10 -z-10 h-80 w-80 rounded-full bg-cyan/10 blur-[100px]" />

        {/* Category Filters */}
        <div className="relative z-10 mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? 'bg-grad-brand text-deep shadow-glow font-semibold scale-105'
                  : 'glass text-ink-muted hover:text-ink-primary hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <motion.div layout className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => {
              // Priority fallback to item image or mapped placeholder
              const imageUrl =
                project.image ||
                project.cover ||
                SAMPLE_MOCKUPS[idx % SAMPLE_MOCKUPS.length]

              return (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="glass glass-hover group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-deep/60 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
                >
                  <div>
                    {/* Realistic Mockup Cover Image Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5">
                      <img
                        src={imageUrl}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/20 to-transparent opacity-80" />
                      
                      {/* Top Category Badge Overlay */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-deep/80 px-3 py-1 text-xs font-mono text-cyan-soft backdrop-blur-md">
                        <Sparkles size={12} className="text-violet-soft" />
                        {project.category}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-ink-primary transition-colors duration-200 group-hover:text-cyan-soft">
                        {project.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Tags & Action */}
                  <div className="mt-4 border-t border-white/5 p-6 pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-xs text-ink-faint"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-cyan-soft transition-all duration-300 group-hover:bg-cyan-soft group-hover:text-deep">
                        <ArrowUpRight
                          size={18}
                          className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
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