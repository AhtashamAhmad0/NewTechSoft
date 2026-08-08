import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Heart, Code2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Team from '../components/home/Team'
import Process from '../components/home/Process'
import CTA from '../components/home/CTA'
import StatCounter from '../components/ui/StatCounter'
import Button from '../components/ui/Button'
import { STATS } from '../data/siteData'

// Reliable Animated Canvas Background
function HeroAnimatedBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId

    const updateDimensions = () => {
      if (!canvas || !canvas.parentElement) return
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
    }

    updateDimensions()

    let width = canvas.width
    let height = canvas.height

    const particleCount = Math.min(Math.floor(width / 25), 45)
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(139, 92, 246, ',
      alpha: Math.random() * 0.5 + 0.3,
    }))

    const handleResize = () => {
      updateDimensions()
      width = canvas.width
      height = canvas.height
    }

    window.addEventListener('resize', handleResize)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.alpha})`
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
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - dist / 130)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 block h-full w-full opacity-80"
    />
  )
}

const MISSION_PILLARS = [
  {
    icon: Target,
    title: 'Our Mission',
    subtitle: 'Purpose-Driven Execution',
    text: 'Build digital products that make businesses genuinely easier to run — not just prettier.',
    accent: 'from-cyan to-blue-500',
    glow: 'rgba(6,182,212,0.15)',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    subtitle: 'Global Impact, Local Craft',
    text: 'Become the studio Pakistani and global startups trust first when an idea needs to become real software.',
    accent: 'from-violet to-purple-500',
    glow: 'rgba(139,92,246,0.15)',
  },
  {
    icon: Heart,
    title: 'Our Values',
    subtitle: 'Uncompromising Integrity',
    text: 'Honest estimates, visible progress, and code we would be comfortable inheriting ourselves.',
    accent: 'from-emerald-400 to-teal-500',
    glow: 'rgba(52,211,153,0.15)',
  },
]

export default function About() {
  return (
    <div className="relative overflow-hidden bg-[#0A0E1A] text-white">
      {/* ----------------- 1. ANIMATED HERO SECTION ----------------- */}
      <section className="relative min-h-[600px] overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
        {/* Animated Particle Mesh Background */}
        <HeroAnimatedBg />

        {/* Ambient Gradient Grid Underlay */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Radial Glow Orbs */}
        <div 
          className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[500px] w-[800px] -translate-x-1/2 opacity-40 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)',
            animationDuration: '6s',
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-cyan uppercase shadow-lg backdrop-blur-md"
            >
              <Sparkles size={14} />
              <span>About New Tech Softs</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-tight"
            >
              A software house built around{' '}
              <span className="bg-gradient-to-r from-cyan-soft via-cyan to-violet bg-clip-text text-transparent">
                craft
              </span>
              , not headcount.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-base text-ink-muted sm:text-xl sm:leading-relaxed"
            >
              Founded in Islamabad, we work with founders and teams who want their software to feel as considered as their brand.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Button to="/contact" icon={ArrowRight}>
                Start a Conversation
              </Button>
              <Button to="/portfolio" variant="ghost">
                View Our Work
              </Button>
            </motion.div>
          </div>

          {/* Floating Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mx-auto lg:max-w-4xl"
          >
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#111625]/90 p-4 shadow-xl backdrop-blur-md">
              <Code2 className="text-cyan" size={20} />
              <span className="text-sm font-medium text-slate-200">Production-Grade Clean Code</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#111625]/90 p-4 shadow-xl backdrop-blur-md">
              <ShieldCheck className="text-violet" size={20} />
              <span className="text-sm font-medium text-slate-200">100% Senior Engineers</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#111625]/90 p-4 shadow-xl backdrop-blur-md">
              <Sparkles className="text-emerald-400" size={20} />
              <span className="text-sm font-medium text-slate-200">Agile & Transparent Delivery</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- 2. MISSION, VISION & VALUES ----------------- */}
      <section className="relative border-t border-white/5 bg-[#0d1222] py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            align="center"
            eyebrow="Our Foundation"
            title="What drives every line of code we ship."
            description="Clear principles that guide our technical decisions, partner selection, and studio growth."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {MISSION_PILLARS.map((pillar, i) => {
              const IconComp = pillar.icon
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#13192b] p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.accent}`} />

                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle, ${pillar.glow} 0%, transparent 70%)` }}
                  />

                  <div>
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-soft shadow-inner transition-transform duration-500 group-hover:scale-110">
                      <IconComp size={28} />
                    </div>

                    <span className="block font-mono text-xs font-semibold tracking-wider text-cyan uppercase">
                      {pillar.subtitle}
                    </span>

                    <h3 className="mt-1 font-display text-2xl font-bold text-white">
                      {pillar.title}
                    </h3>

                    <p className="mt-4 text-base leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-slate-200">
                      {pillar.text}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 border-t border-white/5 pt-4 text-xs font-semibold text-ink-faint transition-colors duration-300 group-hover:text-cyan">
                    <span>Our Standard</span>
                    <span className="h-1 w-1 rounded-full bg-cyan" />
                    <span>Non-Negotiable</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ----------------- 3. STORY & STATS ----------------- */}
      <section className="relative border-t border-white/5 py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-semibold uppercase text-violet">
                Established 2020
              </div>
              <SectionHeading
                align="left"
                eyebrow="Our Story"
                title="Six years, one obsession: shipping well."
                description="We started as a two-person freelance team building websites for local businesses. Today we're a full studio covering web, mobile, and AI — but the standard hasn't changed: every project gets senior attention, from the first wireframe to the last deploy."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#13192b]/90 p-8 shadow-2xl sm:p-12"
            >
              <div 
                className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)' }}
              />

              <div className="relative z-10 grid grid-cols-2 gap-8 sm:gap-10">
                {STATS.map((stat) => (
                  <div key={stat.label} className="border-b border-white/5 pb-6 last:border-none sm:pb-0">
                    <StatCounter {...stat} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------- 4. PROCESS, TEAM & CTA ----------------- */}
      {/* <Process /> */}
      <Team />
      <CTA
        eyebrow="Join Our Client List"
        title="Ready to work with a team that ships?"
        description="Tell us about your project — we'll reply within one business day with next steps."
      />
    </div>
  )
}