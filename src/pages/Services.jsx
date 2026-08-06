import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import Icon from '../components/ui/Icon'
import CTA from '../components/home/CTA'
import { SERVICES } from '../data/siteData'

export default function Services() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="What We Offer"
        title="Every service your product actually needs."
        description="From first sketch to production infrastructure — pick one service or lean on us end-to-end."
      />

      <section className="section flex flex-col gap-6">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.slug}
            id={service.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.05 }}
            className="glass-panel glass-hover grid gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-start"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-grad-brand/20">
              <Icon name={service.icon} size={30} className="text-cyan-soft" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">{service.title}</h2>
              <p className="mt-3 max-w-2xl text-ink-muted">{service.description}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-primary/90">
                    <Check size={16} className="mt-0.5 shrink-0 text-cyan-soft" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </section>

      <CTA
        eyebrow="Not Sure Where to Start?"
        title="Book a free scoping call."
        description="We'll help you figure out which services your project actually needs — no upsell, just a plan."
      />
    </>
  )
}
