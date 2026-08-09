import { useEffect, useRef } from 'react'
import { Check, ArrowUpRight, Sparkles } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import Process from '../components/home/Process'
import CTA from '../components/home/CTA'
import { PRODUCTS } from '../data/siteData'

// Interactive background grid & particles mesh
function TechGridCanvas() {
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
      const count = Math.min(Math.floor((width * height) / 16000), 35)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 1,
        })
      }
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Grid Pattern
      ctx.globalAlpha = 0.05
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1
      const gridSize = 75

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

      // Nodes & Connections
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

          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = '#A855F7'
            ctx.lineWidth = 0.75
            ctx.globalAlpha = (1 - dist / 130) * 0.18
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
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
    />
  )
}

// High-quality SaaS & DevTool product interface mockups
const PRODUCT_MOCKUPS = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop', // Analytics / SaaS Dashboard
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop', // AI Workspace / Automation Tool
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop', // Enterprise Cloud / Dev Management
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop', // Security & API Suite
]

export default function Products() {
  return (
    <>
      <PageHero
        crumb="Products"
        eyebrow="In-House Products"
        title="Software we built, maintain, and use ourselves."
        description="Alongside client work, we ship our own SaaS tools — built with the same stack we recommend to you."
      />

      <section className="section relative overflow-hidden py-16">
        {/* Ambient Grid & Lighting */}
        <TechGridCanvas />
        <div className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-80 w-80 rounded-full bg-cyan/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 -z-10 h-96 w-96 rounded-full bg-violet/15 blur-[120px]" />

        {/* Product Grid */}
        <div className="relative z-10 grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => {
            const imageUrl =
              product.image ||
              product.cover ||
              PRODUCT_MOCKUPS[i % PRODUCT_MOCKUPS.length]

            return (
              <GlassCard
                key={product.name}
                delay={i * 0.1}
                className="group flex flex-col overflow-hidden border border-white/10 p-0 transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
              >
                {/* Product Cover Image Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/5">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent opacity-90" />

                  {/* Top Tagline Badge Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-deep/80 px-3 py-1 text-xs font-mono text-cyan-soft backdrop-blur-md">
                    <Sparkles size={12} className="text-violet-soft" />
                    {product.tagline}
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="flex flex-1 flex-col p-6 pt-2">
                  <h3 className="font-display text-2xl font-semibold text-ink-primary transition-colors duration-200 group-hover:text-cyan-soft">
                    {product.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {product.description}
                  </p>

                  {/* Features List */}
                  <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-white/5 pt-5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink-muted">
                        <Check size={16} className="mt-0.5 shrink-0 text-cyan-soft" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <Button
                    variant="ghost"
                    className="mt-6 w-full border border-white/10 bg-white/5 hover:bg-white/10 hover:text-cyan-soft"
                    icon={ArrowUpRight}
                  >
                    Learn More
                  </Button>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </section>

      <Process />

      <CTA
        eyebrow="Want Something Custom?"
        title="We can build your version of this."
        description="Every product above started as a client idea. Tell us what you're picturing."
      />
    </>
  )
}