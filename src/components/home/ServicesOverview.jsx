import { ArrowUpRight, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import { SERVICES } from '../../data/siteData'

export default function ServicesOverview() {
  return (
    <section className="section relative overflow-hidden py-20">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 right-1/4 -z-10 h-96 w-96 rounded-full bg-cyan/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 -z-10 h-96 w-96 rounded-full bg-violet/10 blur-[130px]" />

      {/* Header */}
      <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          align="left"
          eyebrow="What We Do"
          title="Services built around your product, not our template."
        />
        <Button to="/services" variant="ghost" icon={ArrowRight} className="shrink-0">
          All Services
        </Button>
      </div>

      {/* Modern Card Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <a
            key={service.slug || service.title || i}
            href={`/services#${service.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-deep/40 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan/40 hover:bg-white/[0.03] hover:shadow-[0_10px_40px_rgba(6,182,212,0.12)]"
          >
            {/* Corner Backlight Flare on Hover */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-gradient-to-br from-cyan/30 to-violet/30 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div>
              {/* Header Icon + Number */}
              <div className="mb-8 flex items-center justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-cyan-soft transition-all duration-500 group-hover:border-cyan/40 group-hover:bg-gradient-to-br group-hover:from-cyan group-hover:to-violet group-hover:text-deep group-hover:shadow-glow">
                  <Icon name={service.icon} size={24} />
                </div>
                <span className="font-mono text-xs font-bold tracking-widest text-ink-faint transition-colors duration-300 group-hover:text-cyan">
                  0{i + 1}
                </span>
              </div>

              {/* Title & Short Description */}
              <h3 className="mb-3 font-display text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-soft">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-ink-primary/90">
                {service.short}
              </p>
            </div>

            {/* Bottom Row */}
            <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-5">
              <span className="text-xs font-semibold tracking-wider text-ink-faint uppercase transition-colors duration-300 group-hover:text-white">
                Learn More
              </span>
              <div className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-ink-faint transition-all duration-300 group-hover:border-cyan group-hover:bg-cyan group-hover:text-deep group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}