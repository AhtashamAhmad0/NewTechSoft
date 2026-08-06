import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkle } from 'lucide-react'
import Button from '../ui/Button'
import CursorGrid from './CursorGrid'

const BUILD_LINES = [
  { label: 'web', text: 'npm run build -- --target=web', tint: 'text-cyan-soft' },
  { label: 'app', text: 'flutter build --release', tint: 'text-violet-soft' },
  { label: 'ai', text: 'python train.py --model=assistant', tint: 'text-amber-soft' },
]

function GlassTerminal() {
  const [lineIndex, setLineIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const current = BUILD_LINES[lineIndex].text
    let timeout

    if (phase === 'typing') {
      if (typed.length < current.length) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 35)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1100)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 700)
    } else if (phase === 'deleting') {
      if (typed.length > 0) {
        timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 18)
      } else {
        setLineIndex((i) => (i + 1) % BUILD_LINES.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [typed, phase, lineIndex])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      className="glass shadow-glow relative w-full max-w-md rounded-2xl p-1 z-10"
    >
      <div className="rounded-[14px] bg-deep/70 p-5 backdrop-blur-md">
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-xs text-ink-faint">newtechsofts — zsh</span>
        </div>
        <div className="flex flex-col gap-2 font-mono text-sm">
          {BUILD_LINES.map((line, i) => (
            <div key={line.label} className="flex min-h-[22px] items-center gap-2">
              <span className="text-ink-faint">➜</span>
              <span className={line.tint}>~/{line.label}</span>
              <span className="text-ink-primary">
                {i === lineIndex ? typed : i < lineIndex ? line.text : ''}
                {i === lineIndex && (
                  <span className="ml-0.5 inline-block h-4 w-[2px] animate-blink bg-cyan align-middle" />
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-ink-faint">
          <Sparkle size={14} className="text-amber" />
          Build status: <span className="text-cyan-soft">shipping</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="section relative flex min-h-[600px] flex-col items-center gap-14 overflow-hidden pt-8 lg:flex-row lg:items-center lg:gap-10 lg:pt-16">
      {/* Background Interactive CursorGrid */}
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full">
        <CursorGrid
          cellSize={70}
          color="#D946EF"
          radius={160}
          falloff="smooth"
          lineWidth={1.2}
          clickPulse
          pulseSpeed={600}
        />
      </div>

      {/* Hero Content Left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="z-10 flex flex-1 flex-col items-start gap-6"
      >
        <h1 className="text-balance font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
          We build the web, <br />
          app &amp; <span className="gradient-text">AI products</span> <br />
          your users remember.
        </h1>

        <p className="max-w-lg text-balance text-lg text-ink-muted">
          New Tech Softs designs and engineers premium digital products — from
          responsive websites to AI-powered apps — with a glass-clean UI and
          engineering you can hand off to any team.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button to="/contact" icon={ArrowUpRight}>
            Start a Project
          </Button>
          <Button to="/portfolio" variant="ghost">
            View Our Work
          </Button>
        </div>

        <div className="mt-4 flex items-center gap-6 text-sm text-ink-muted">
          <div className="flex -space-x-3">
            {['A', 'B', 'C', 'D'].map((seed) => (
              <span
                key={seed}
                className="grid h-9 w-9 place-items-center rounded-full border-2 border-deep bg-grad-brand text-xs font-semibold text-deep"
              >
                {seed}
              </span>
            ))}
          </div>
          <span>Trusted by 85+ growing businesses</span>
        </div>
      </motion.div>

      {/* Hero Content Right */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="absolute h-72 w-72 animate-float rounded-full bg-violet/20 blur-3xl" />
        <GlassTerminal />
      </div>
    </section>
  )
}