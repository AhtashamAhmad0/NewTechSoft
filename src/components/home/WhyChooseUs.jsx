import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import StatCounter from '../ui/StatCounter'
import Icon from '../ui/Icon'
import { WHY_CHOOSE_US, STATS } from '../../data/siteData'

function SpotlightCard({ item, index }) {
  const cardRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  const isFeatured = index === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 ${
        isFeatured
          ? 'border-cyan/40 bg-gradient-to-b from-cyan/10 via-deep/60 to-deep/80 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
          : 'border-white/10 bg-deep/50 hover:border-white/20'
      } p-6 sm:p-8 backdrop-blur-xl`}
    >
      {/* Spotlight Cursor Glow Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(217, 70, 239, 0.15), transparent 80%)`,
        }}
      />

      {/* Top Header Row: Index Number & Icon */}
      <div className="mb-6 flex items-center justify-between">
        <div
          className={`grid h-12 w-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
            isFeatured
              ? 'bg-gradient-to-br from-cyan to-violet text-deep shadow-glow'
              : 'border border-white/10 bg-white/5 text-cyan-soft group-hover:border-cyan/30'
          }`}
        >
          <Icon name={item.icon} size={22} />
        </div>

        <span className="font-mono text-xs font-semibold tracking-wider text-ink-faint">
          0{index + 1}
        </span>
      </div>

      {/* Featured Badge */}
      {isFeatured && (
        <span className="mb-3 inline-block rounded-full bg-cyan/10 px-3 py-1 text-[11px] font-medium tracking-wide text-cyan-soft border border-cyan/20">
          Core Promise
        </span>
      )}

      {/* Card Content */}
      <h3 className="mb-3 font-display text-xl font-semibold text-ink-primary transition-colors group-hover:text-white">
        {item.title}
      </h3>

      <p className="text-sm leading-relaxed text-ink-muted group-hover:text-ink-primary/90">
        {item.description}
      </p>

      {/* Subtle Corner Accent Line */}
      <div className="absolute bottom-0 right-0 h-16 w-16 bg-gradient-to-tl from-violet/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  )
}

export default function WhyChooseUs() {
  return (
    <section className="section relative overflow-hidden py-20">
      {/* Ambient background blur circles */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-violet/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 -z-10 h-96 w-96 rounded-full bg-cyan/10 blur-[120px]" />

      <SectionHeading
        eyebrow="Why Choose Us"
        title="Engineering discipline, design instinct."
        description="We pair product-design thinking with production-grade engineering — so what ships looks as good as the mockup and holds up under real traffic."
      />

      {/* Modern Grid with Custom Interactive Spotlight Cards */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_CHOOSE_US.map((item, i) => (
          <SpotlightCard key={item.title} item={item} index={i} />
        ))}
      </div>

      {/* Executive Stat Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="glass relative mt-16 overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12"
      >
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cyan/20 blur-2xl" />

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                i !== 0 ? 'lg:pl-8' : ''
              }`}
            >
              <StatCounter {...stat} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}