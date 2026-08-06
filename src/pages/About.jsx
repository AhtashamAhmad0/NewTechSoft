import { motion } from 'framer-motion'
import { Target, Eye, Heart } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import GlassCard from '../components/ui/GlassCard'
import Team from '../components/home/Team'
import Process from '../components/home/Process'
import CTA from '../components/home/CTA'
import StatCounter from '../components/ui/StatCounter'
import { STATS } from '../data/siteData'

const MISSION_PILLARS = [
  { icon: Target, title: 'Our Mission', text: 'Build digital products that make businesses genuinely easier to run — not just prettier.' },
  { icon: Eye, title: 'Our Vision', text: 'Become the studio Pakistani and global startups trust first when an idea needs to become real software.' },
  { icon: Heart, title: 'Our Values', text: 'Honest estimates, visible progress, and code we would be comfortable inheriting ourselves.' },
]

export default function About() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About New Tech Softs"
        title="A software house built around craft, not headcount."
        description="Founded in Islamabad, we work with founders and teams who want their software to feel as considered as their brand."
      />

      <section className="section grid gap-6 sm:grid-cols-3">
        {MISSION_PILLARS.map((pillar, i) => (
          <GlassCard key={pillar.title} delay={i * 0.1}>
            <pillar.icon className="mb-4 text-cyan-soft" size={28} />
            <h3 className="mb-2 font-display text-lg font-semibold">{pillar.title}</h3>
            <p className="text-sm text-ink-muted">{pillar.text}</p>
          </GlassCard>
        ))}
      </section>

      <section className="section">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Six years, one obsession: shipping well."
              description="We started as a two-person freelance team building websites for local businesses. Today we're a full studio covering web, mobile, and AI — but the standard hasn't changed: every project gets senior attention, from the first wireframe to the last deploy."
            />
          </motion.div>
          <div className="glass-panel grid grid-cols-2 gap-8 p-8 sm:p-10">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <Process />
      <Team />
      <CTA
        eyebrow="Join Our Client List"
        title="Ready to work with a team that ships?"
        description="Tell us about your project — we'll reply within one business day with next steps."
      />
    </>
  )
}
