import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import { SERVICES } from '../../data/siteData'

export default function ServicesMinimal() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="section py-16">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          align="left"
          eyebrow="What We Do"
          title="Services built around your product, not our template."
        />
        <Button to="/services" variant="ghost" icon={ArrowRight} className="shrink-0">
          All Services
        </Button>
      </div>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {SERVICES.map((service, i) => (
          <motion.a
            key={service.slug || service.title}
            href={`/services#${service.slug}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative flex flex-col gap-4 py-8 transition-colors duration-300 md:flex-row md:items-center md:justify-between md:py-10"
          >
            {/* Subtle row hover glow background */}
            <div
              className={`absolute inset-0 -z-10 rounded-2xl bg-white/[0.02] transition-opacity duration-300 ${
                hoveredIndex === i ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <div className="flex items-center gap-6">
              <span className="font-mono text-sm font-semibold text-ink-faint transition-colors duration-300 group-hover:text-cyan">
                0{i + 1}
              </span>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-cyan-soft transition-all duration-300 group-hover:border-cyan/30 group-hover:bg-cyan/10">
                <Icon name={service.icon} size={20} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-ink-primary transition-colors duration-300 group-hover:text-white">
                {service.title}
              </h3>
            </div>

            <div className="flex items-center gap-8 md:max-w-md">
              <p className="text-sm text-ink-muted transition-colors duration-300 group-hover:text-ink-primary">
                {service.short}
              </p>
              <div className="hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 transition-all duration-300 group-hover:rotate-45 group-hover:border-cyan group-hover:bg-cyan group-hover:text-deep md:grid">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}