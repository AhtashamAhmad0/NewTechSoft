import SectionHeading from '../ui/SectionHeading'
import { PROCESS } from '../../data/siteData'

/**
 * Numbered steps are justified here — this genuinely is a sequential
 * process, so the 01/02/03/04 markers encode real order (per the
 * frontend-design skill's guidance on when numbering is appropriate).
 */
export default function Process() {
  return (
    <section className="section">
      <SectionHeading
        eyebrow="How We Work"
        title="A process that keeps you in the loop."
        description="Four stages, transparent at every step — no black-box development."
      />

      <div className="relative mt-14 grid gap-6 lg:grid-cols-4">
        <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
        {PROCESS.map((item) => (
          <div key={item.step} className="glass-panel glass-hover relative p-7">
            <span className="font-display text-4xl font-bold text-white/10">{item.step}</span>
            <h3 className="mt-3 font-display text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
