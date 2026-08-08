import { ArrowUpRight, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import { SERVICES } from '../../data/siteData'

// Helper function to get appropriate background image for each service
const getServiceBackground = (service) => {
  switch (service.slug) {
    case 'branding':
      return "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop')"
    case 'digital-marketing':
      return "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop')"
    case 'analytics':
      return "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop')"
    case 'app-dev':
      return "url('https://images.unsplash.com/photo-1563207151-2244249a21b3?q=80&w=1000&auto=format&fit=crop')"
    case 'ui-design':
      return "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop')"
    default: // E-commerce or general digital context
      return "url('https://images.unsplash.com/photo-1556742049-31786274023b?q=80&w=1000&auto=format&fit=crop')"
  }
}

export default function ServicesOverview() {
  return (
    <section className="section relative overflow-hidden py-24 bg-[#0a0c10]">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-64 right-1/4 -z-10 h-96 w-96 rounded-full bg-cyan/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 -z-10 h-[500px] w-[500px] rounded-full bg-violet/10 blur-[150px]" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-20 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end border-b border-white/5 pb-10">
          <SectionHeading
            align="left"
            eyebrow="What We Do"
            title="Services built around your product, not our template."
            className="max-w-3xl"
          />
          <Button to="/services" variant="secondary" icon={ArrowRight} className="shrink-0 transition-all hover:scale-105">
            All Services
          </Button>
        </div>

        {/* Modern Card Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <a
              key={service.slug || service.title || i}
              href={`/services#${service.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#111319] p-9 shadow-inner-dark transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-3 hover:border-cyan/50 hover:bg-black hover:shadow-cyan-glow"
            >
              {/* --- New Realistic Image Layer --- */}
              {/* This layer is semi-transparent and uses luminosity blending, */}
              {/* creating a cool, integrated look with the dark theme. */}
              <div 
                className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center mix-blend-luminosity opacity-[0.03] transition-opacity duration-700 group-hover:opacity-[0.08]" 
                style={{ backgroundImage: getServiceBackground(service) }}
              />

              {/* Corner Backlight Flare on Hover */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-cyan/40 to-violet/40 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div>
                {/* Header Icon + Number */}
                <div className="mb-10 flex items-center justify-between">
                  {/* Icon Container - enhanced gradient & glow */}
                  <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/5 text-cyan-soft transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:border-cyan/40 group-hover:bg-gradient-to-br group-hover:from-cyan group-hover:to-violet group-hover:text-deep group-hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                    <Icon name={service.icon} size={28} />
                  </div>
                  {/* Number - enhanced visibility and dynamic color */}
                  <div className="text-right">
                    <span className="block font-mono text-xs font-medium tracking-[0.3em] text-ink-faint uppercase transition-colors duration-300 group-hover:text-cyan/80">
                      Service
                    </span>
                    <span className="block font-mono text-3xl font-bold tracking-tighter text-ink-muted transition-colors duration-300 group-hover:text-cyan">
                      0{i + 1}
                    </span>
                  </div>
                </div>

                {/* Title & Short Description */}
                <h3 className="mb-4 font-display text-2xl font-bold text-white transition-colors duration-300 group-hover:text-white">
                  {service.title}
                </h3>
                <p className="text-base leading-relaxed text-ink-muted transition-colors duration-500 group-hover:text-ink-primary/95">
                  {service.short}
                </p>
              </div>

              {/* Bottom Row - enhanced for better call-to-action feel */}
              <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-6 group-hover:border-white/10">
                <span className="text-sm font-semibold tracking-wide text-ink-faint uppercase transition-all duration-500 group-hover:text-cyan group-hover:tracking-wider">
                  Learn More
                </span>
                {/* Arrow - stronger contrast and rotation */}
                <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-cyan/20 text-cyan/70 transition-all duration-500 group-hover:border-cyan group-hover:bg-cyan group-hover:text-deep group-hover:rotate-45 group-hover:scale-110 group-hover:shadow-glow">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}