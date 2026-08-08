import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles, Code2, Cpu, Grid } from 'lucide-react'
import Icon from '../components/ui/Icon'
import CTA from '../components/home/CTA'
import Button from '../components/ui/Button'
import { SERVICES } from '../data/siteData'

const SERVICE_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    alt: 'Custom Software & Web Development',
  },
  {
    url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop',
    alt: 'Mobile Application Engineering',
  },
  {
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    alt: 'AI Integration & Machine Learning',
  },
  {
    url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop',
    alt: 'UI/UX Interface Design',
  },
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    alt: 'Cloud Architecture & DevOps',
  },
]

export default function Services() {
  return (
    <div className="relative overflow-hidden bg-[#0A0E1A] text-white">
      {/* ----------------- 1. HERO SECTION WITH SQUARE DESIGN ----------------- */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28">
        {/* Geometric Square Grid Pattern Background */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20 [mask-image:linear-gradient(to_bottom,white_40%,transparent_100%)]">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Ambient Floating Glowing Squares */}
        <motion.div 
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-20 right-[15%] h-32 w-32 rounded-lg border border-cyan/20 bg-cyan/5 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
        />
        <motion.div 
          animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute bottom-12 left-[10%] h-44 w-44 rounded-lg border border-violet/20 bg-violet/5 shadow-[0_0_40px_rgba(139,92,246,0.1)]"
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column: Text & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-md border border-cyan/30 bg-cyan/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-cyan uppercase shadow-lg">
                <Grid size={14} />
                <span>What We Offer</span>
              </div>

              <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-tight">
                Every service your product{' '}
                <span className="bg-gradient-to-r from-cyan-soft via-cyan to-violet bg-clip-text text-transparent">
                  actually needs.
                </span>
              </h1>

              <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
                From first sketch and architectural blueprint to production infrastructure — pick one specialized service or lean on us for end-to-end execution.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button to="/contact" icon={ArrowRight}>
                  Book a Scoping Call
                </Button>
                <Button to="/portfolio" variant="ghost">
                  Explore Past Work
                </Button>
              </div>

              {/* Square Feature Badges */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div className="border-l-2 border-cyan/60 pl-3">
                  <div className="text-2xl font-bold text-white font-display">100%</div>
                  <div className="text-xs text-ink-muted mt-0.5">In-House Team</div>
                </div>
                <div className="border-l-2 border-cyan/60 pl-3">
                  <div className="text-2xl font-bold text-cyan font-display">Agile</div>
                  <div className="text-xs text-ink-muted mt-0.5">2-Week Sprints</div>
                </div>
                <div className="border-l-2 border-violet/60 pl-3">
                  <div className="text-2xl font-bold text-violet font-display">24/7</div>
                  <div className="text-xs text-ink-muted mt-0.5">Post-Launch Care</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: High Quality Image with Square Frame Accents */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Outer Square Bracket Accents */}
              <div className="absolute -top-3 -left-3 h-8 w-8 border-l-2 border-t-2 border-cyan" />
              <div className="absolute -top-3 -right-3 h-8 w-8 border-r-2 border-t-2 border-cyan" />
              <div className="absolute -bottom-3 -left-3 h-8 w-8 border-l-2 border-b-2 border-violet" />
              <div className="absolute -bottom-3 -right-3 h-8 w-8 border-r-2 border-b-2 border-violet" />

              <div className="relative overflow-hidden rounded-xl border border-white/15 bg-[#111625] shadow-2xl">
                {/* Modern Tech Image */}
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Software Engineers Collaborating"
                  className="h-[420px] w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent opacity-80" />

                {/* Floating Square Overlay Badge 1 */}
                <div className="absolute top-6 left-6 flex items-center gap-3 rounded-lg border border-white/10 bg-[#111625]/90 p-3 shadow-xl backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan/20 text-cyan">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Production Ready</div>
                    <div className="text-[10px] text-ink-muted">Modern Stack Standards</div>
                  </div>
                </div>

                {/* Floating Square Overlay Badge 2 */}
                <div className="absolute bottom-6 right-6 flex items-center gap-3 rounded-lg border border-white/10 bg-[#111625]/90 p-3 shadow-xl backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-violet/20 text-violet">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Scalable Systems</div>
                    <div className="text-[10px] text-ink-muted">Built for High Concurrency</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------- 2. SERVICES LISTING WITH REALISTIC IMAGES ----------------- */}
      <section className="relative border-t border-white/5 bg-[#0d1222] py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="font-mono text-xs font-semibold tracking-wider text-cyan uppercase">
              End-To-End Capabilities
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
              Engineered for quality, performance, and long-term viability.
            </h2>
          </div>

          <div className="flex flex-col gap-16">
            {SERVICES.map((service, i) => {
              const imageData = SERVICE_IMAGES[i % SERVICE_IMAGES.length]
              const isEven = i % 2 === 0

              return (
                <motion.div
                  key={service.slug}
                  id={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#13192b] p-6 sm:p-10 shadow-2xl transition-all duration-500 hover:border-white/20"
                >
                  {/* Top Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan via-violet to-cyan opacity-80" />

                  <div className={`grid gap-8 lg:grid-cols-12 lg:items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    {/* Visual Image Column */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0e1a]">
                        <img
                          src={imageData.url}
                          alt={imageData.alt}
                          className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-72"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#13192b] via-transparent to-transparent opacity-60" />
                        <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0A0E1A]/80 border border-white/10 text-cyan-soft backdrop-blur-md">
                          <Icon name={service.icon} size={24} />
                        </div>
                      </div>
                    </div>

                    {/* Text Details Column */}
                    <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-ink-muted">
                        {service.description}
                      </p>

                      <div className="mt-6 border-t border-white/5 pt-6">
                        <span className="text-xs font-semibold tracking-wider text-cyan uppercase">
                          Key Deliverables
                        </span>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm text-slate-200">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-cyan/10 text-cyan">
                                <Check size={12} />
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ----------------- 3. CTA SECTION ----------------- */}
      <CTA
        eyebrow="Not Sure Where to Start?"
        title="Book a free scoping call."
        description="We'll help you figure out which services your project actually needs — no upsell, just a plan."
      />
    </div>
  )
}