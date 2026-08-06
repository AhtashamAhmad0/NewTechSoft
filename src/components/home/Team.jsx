import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Twitter, Github, Sparkles, Code2, Cpu, Rocket } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { TEAM } from '../../data/siteData'

// High quality avatars for team members
const TEAM_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
]

const ACCENT_COLORS = [
  { text: 'text-cyan-400', border: 'hover:border-cyan-500/50', glow: 'rgba(6,182,212,0.15)', badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' },
  { text: 'text-violet-400', border: 'hover:border-violet-500/50', glow: 'rgba(139,92,246,0.15)', badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20' },
  { text: 'text-emerald-400', border: 'hover:border-emerald-500/50', glow: 'rgba(16,185,129,0.15)', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  { text: 'text-amber-400', border: 'hover:border-amber-500/50', glow: 'rgba(245,158,11,0.15)', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
]

export default function Team() {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <section className="relative overflow-hidden py-24" onMouseMove={handleMouseMove}>
      {/* Dynamic Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[150px]" />
      
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Core Engineers & Creators"
          title="Small team, senior work."
          description="Every project is staffed with builders who ship, not account managers relaying requests."
        />

        {/* Top Hero Stats Banner */}
        <div className="mb-12 mt-8 grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-2xl lg:grid-cols-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
              <Code2 size={24} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-slate-400">Hands-on Code</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-violet-400">
              <Cpu size={24} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">Senior</p>
              <p className="text-xs text-slate-400">Architect Level</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <Sparkles size={24} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">Zero</p>
              <p className="text-xs text-slate-400">Middle Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
              <Rocket size={24} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">Fast</p>
              <p className="text-xs text-slate-400">Direct Execution</p>
            </div>
          </div>
        </div>

        {/* Team Bento Spotlight Cards */}
        <div ref={containerRef} className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Spotlight overlay following mouse */}
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6,182,212,0.12), transparent 80%)`,
            }}
          />

          {TEAM.map((member, i) => {
            const style = ACCENT_COLORS[i % ACCENT_COLORS.length]
            const avatarImg = member.avatar || member.image || TEAM_AVATARS[i % TEAM_AVATARS.length]

            return (
              <motion.div
                key={member.name || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${style.border}`}
                style={{
                  boxShadow: `0 10px 30px -10px ${style.glow}`,
                }}
              >
                {/* Top Card Decorator Bar */}
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 group-hover:via-cyan-400" />

                <div>
                  {/* Avatar Frame with Online Pulse Indicator */}
                  <div className="relative mb-6 inline-block">
                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-white/10 bg-slate-800 transition-transform duration-500 group-hover:scale-105 group-hover:border-white/30">
                      <img
                        src={avatarImg}
                        alt={member.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    {/* Active status dot */}
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950">
                      <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                    </span>
                  </div>

                  {/* Member Info */}
                  <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${style.badge}`}>
                    {member.role || 'Senior Developer'}
                  </span>

                  <h3 className="mt-4 font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {member.bio || 'Specializes in high-performance web systems, resilient state management, and modern UI engineering.'}
                  </p>
                </div>

                {/* Social Links Bar */}
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
                    Connect
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={member.linkedin || '#'}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a
                      href={member.twitter || '#'}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} Twitter`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400"
                    >
                      <Twitter size={16} />
                    </a>
                    <a
                      href={member.github || '#'}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} GitHub`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400"
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}