import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ChromaGrid({
  items = [],
  radius = 350,
  fadeOut = 0.6,
  className = '',
}) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 })
    setHoveredIndex(null)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {/* Global Chromatic Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, ${fadeOut}), transparent 80%)`,
        }}
      />

      {items.map((item, i) => {
        const isHovered = hoveredIndex === i
        const accentBorder = item.borderColor || '#06B6D4'
        const cardGradient =
          item.gradient ||
          'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.05), transparent)'

        return (
          <motion.a
            key={item.title || item.slug || i}
            href={item.url || item.link || `/portfolio#${item.slug}`}
            onMouseEnter={() => setHoveredIndex(i)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-deep/50 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent sm:p-7"
            style={{
              boxShadow: isHovered
                ? `0 12px 40px -10px ${accentBorder}33, inset 0 0 0 1px ${accentBorder}88`
                : 'none',
            }}
          >
            {/* Custom Chroma Radial Spotlight per card */}
            <div
              className="pointer-events-none absolute -inset-px transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${accentBorder}25, transparent 70%)`,
              }}
            />

            {/* Custom Background Gradient Overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: cardGradient }}
            />

            <div className="relative z-10">
              {/* Optional Project Image / Visual Badge */}
              {item.image && (
                <div className="mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              )}

              {/* Eyebrow / Category */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-wider text-cyan-soft uppercase">
                  {item.category || item.subtitle || 'Selected Project'}
                </span>
                {item.handle && (
                  <span className="text-xs text-ink-faint">{item.handle}</span>
                )}
              </div>

              {/* Title & Summary */}
              <h3 className="mt-3 font-display text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-soft">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-ink-primary/90">
                {item.summary || item.description}
              </p>
            </div>

            {/* Footer Row: Tags + Interactive Arrow */}
            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-5">
              <div className="flex flex-wrap gap-2">
                {(item.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-muted transition-colors duration-300 group-hover:border-white/20 group-hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-ink-faint transition-all duration-300 group-hover:rotate-45 group-hover:border-cyan group-hover:bg-cyan group-hover:text-deep"
                style={{
                  borderColor: isHovered ? accentBorder : undefined,
                  backgroundColor: isHovered ? accentBorder : undefined,
                }}
              >
                <ArrowUpRight size={18} />
              </div>
            </div>
          </motion.a>
        )
      })}
    </div>
  )
}