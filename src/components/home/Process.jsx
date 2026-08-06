import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { PROCESS } from '../../data/siteData'

export default function Process() {
  return (
    <section className="section relative overflow-hidden py-24">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" />

      <SectionHeading
        eyebrow="How We Work"
        title="A process that keeps you in the loop."
        description="Four stages, transparent at every step — no black-box development."
      />

      {/* Timeline Outer Wrapper */}
      <div className="relative mx-auto mt-20 max-w-5xl px-4">
        {/* Animated Central Vertical Axis Line */}
        <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-white/10 hidden md:block">
          <motion.div
            initial={{ height: '0%' }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="w-full bg-gradient-to-b from-cyan via-violet to-cyan shadow-[0_0_15px_rgba(6,182,212,0.6)]"
          />
        </div>

        {/* Process Items Alternating Left / Right */}
        <div className="flex flex-col gap-12 md:gap-16">
          {PROCESS.map((item, index) => {
            const isEven = index % 2 === 0

            return (
              <div
                key={item.step || index}
                className="relative flex flex-col items-center md:flex-row"
              >
                {/* Central Animated Timeline Node (Center Dot) */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:flex"
                >
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-cyan/50 bg-deep p-1 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <span className="h-3 w-3 rounded-full bg-cyan animate-pulse" />
                  </div>
                </motion.div>

                {/* Card Container (Swaps sides on alternating indices) */}
                <div
                  className={`w-full md:w-1/2 ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12 md:text-left'
                  }`}
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isEven ? -50 : 50,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.1 }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-deep/50 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan/40 hover:bg-white/[0.03] hover:shadow-[0_10px_30px_rgba(6,182,212,0.12)] sm:p-8"
                  >
                    {/* Top Accent Gradient Line */}
                    <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-cyan/30 to-transparent transition-all duration-500 group-hover:via-cyan" />

                    <div
                      className={`flex flex-col gap-3 ${
                        isEven ? 'md:items-end' : 'md:items-start'
                      }`}
                    >
                      {/* Step Stage Tag */}
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-cyan uppercase">
                        Stage {item.step}
                      </span>

                      {/* Title */}
                      <h3 className="font-display text-2xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-soft">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-ink-primary/90">
                        {item.description}
                      </p>
                    </div>

                    {/* Giant Faded Number in Background */}
                    <span
                      className={`pointer-events-none absolute -bottom-4 font-display text-7xl font-extrabold text-white/[0.03] select-none transition-colors duration-500 group-hover:text-cyan/[0.08] ${
                        isEven ? 'right-6' : 'left-6'
                      }`}
                    >
                      {item.step}
                    </span>
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}