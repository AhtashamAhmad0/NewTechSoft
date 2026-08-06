import { Check, ArrowUpRight } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import Process from '../components/home/Process'
import CTA from '../components/home/CTA'
import { PRODUCTS } from '../data/siteData'

export default function Products() {
  return (
    <>
      <PageHero
        crumb="Products"
        eyebrow="In-House Products"
        title="Software we built, maintain, and use ourselves."
        description="Alongside client work, we ship our own SaaS tools — built with the same stack we recommend to you."
      />

      <section className="section grid gap-6 lg:grid-cols-3">
        {PRODUCTS.map((product, i) => (
          <GlassCard key={product.name} delay={i * 0.1} className="flex flex-col">
            <span className="eyebrow">{product.tagline}</span>
            <h3 className="mt-3 font-display text-2xl font-semibold">{product.name}</h3>
            <p className="mt-3 text-sm text-ink-muted">{product.description}</p>
            <ul className="mt-6 flex flex-1 flex-col gap-2.5">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check size={16} className="mt-0.5 shrink-0 text-cyan-soft" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="ghost" className="mt-6 w-full" icon={ArrowUpRight}>
              Learn More
            </Button>
          </GlassCard>
        ))}
      </section>

      <Process />

      <CTA
        eyebrow="Want Something Custom?"
        title="We can build your version of this."
        description="Every product above started as a client idea. Tell us what you're picturing."
      />
    </>
  )
}
