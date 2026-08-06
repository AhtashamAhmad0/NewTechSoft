import { Linkedin, Twitter } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import { TEAM } from '../../data/siteData'

export default function Team() {
  return (
    <section className="section">
      <SectionHeading
        eyebrow="The Team"
        title="Small team, senior work."
        description="Every project is staffed with people who ship, not account managers relaying requests."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member, i) => (
          <GlassCard key={member.name} delay={i * 0.08} className="flex flex-col items-center text-center">
            <div className="mb-4 grid h-20 w-20 place-items-center rounded-full bg-grad-brand text-xl font-bold text-deep">
              {member.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <h3 className="font-display text-lg font-semibold">{member.name}</h3>
            <p className="mb-4 text-sm text-ink-muted">{member.role}</p>
            <div className="flex gap-2">
              <span className="glass grid h-9 w-9 place-items-center rounded-full text-ink-muted">
                <Linkedin size={15} />
              </span>
              <span className="glass grid h-9 w-9 place-items-center rounded-full text-ink-muted">
                <Twitter size={15} />
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
