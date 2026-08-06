import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import { SERVICES } from '../../data/siteData'

export default function ServicesOverview() {
  return (
    <section className="section">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          align="left"
          eyebrow="What We Do"
          title="Services built around your product, not our template."
        />
        <Button to="/services" variant="ghost" icon={ArrowRight} className="shrink-0">
          All Services
        </Button>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <GlassCard key={service.slug} delay={i * 0.06} className="flex flex-col">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-grad-brand/20">
              <Icon name={service.icon} className="text-cyan-soft" />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold">{service.title}</h3>
            <p className="text-sm text-ink-muted">{service.short}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
