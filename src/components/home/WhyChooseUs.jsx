import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import Icon from '../ui/Icon'
import StatCounter from '../ui/StatCounter'
import { WHY_CHOOSE_US, STATS } from '../../data/siteData'

export default function WhyChooseUs() {
  return (
    <section className="section">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="Engineering discipline, design instinct."
        description="We pair product-design thinking with production-grade engineering — so what ships looks as good as the mockup and holds up under real traffic."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_CHOOSE_US.map((item, i) => (
          <GlassCard key={item.title} delay={i * 0.08}>
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-grad-brand/20">
              <Icon name={item.icon} className="text-cyan-soft" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-ink-muted">{item.description}</p>
          </GlassCard>
        ))}
      </div>

      <div className="glass-panel mt-14 grid grid-cols-2 gap-8 p-8 sm:p-10 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}
