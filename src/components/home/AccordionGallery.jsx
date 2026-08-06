import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Icon from '../ui/Icon'
import Button from '../ui/Button'

export default function AccordionGallery({
  items = [],
  defaultIndex = 0,
  trigger = 'hover',
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  return (
    <div className="flex flex-col gap-4 lg:h-[480px] lg:flex-row lg:gap-4">
      {items.map((item, index) => {
        const isActive = activeIndex === index

        const handleInteraction = () => {
          setActiveIndex(index)
        }

        return (
          <motion.div
            key={item.slug || item.title || index}
            layout
            onClick={trigger === 'click' ? handleInteraction : undefined}
            onMouseEnter={trigger === 'hover' ? handleInteraction : undefined}
            transition={{
              layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
            }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-500 ${
              isActive
                ? 'lg:flex-[3.5] border-cyan/40 bg-gradient-to-br from-deep via-deep/90 to-cyan/10 shadow-[0_0_40px_rgba(6,182,212,0.15)]'
                : 'lg:flex-1 border-white/10 bg-deep/50 hover:border-white/20 hover:bg-white/[0.03]'
            } p-6 sm:p-8 backdrop-blur-xl cursor-pointer`}
          >
            {/* Gradient Ambient Highlight */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                isActive ? 'opacity-100' : 'opacity-0'
              } bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.15),transparent_60%)]`}
            />

            {/* Top Row: Header Index & Service Icon */}
            <div className="relative z-10 flex items-center justify-between">
              <div
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-cyan to-violet text-deep shadow-glow scale-110'
                    : 'border border-white/10 bg-white/5 text-cyan-soft'
                }`}
              >
                <Icon name={item.icon} size={24} />
              </div>

              <span className="font-mono text-sm font-semibold tracking-wider text-ink-faint">
                0{index + 1}
              </span>
            </div>

            {/* Middle Section: Collapsed vs Expanded Text Content */}
            <div className="relative z-10 mt-8 flex flex-col justify-end">
              <h3
                className={`font-display font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-2xl sm:text-3xl text-white mb-3'
                    : 'text-lg sm:text-xl text-ink-primary group-hover:text-cyan-soft'
                }`}
              >
                {item.title}
              </h3>

              {/* Description & Details (Animated reveal when active) */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 10 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
                      {item.short || item.description}
                    </p>

                    {/* Service Feature Tags (If provided) */}
                    {item.features && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.features.map((feat) => (
                          <span
                            key={feat}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-muted"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-6 pt-2">
                      <Button
                        to={`/services#${item.slug}`}
                        variant="secondary"
                        icon={ArrowUpRight}
                        className="text-xs"
                      >
                        Explore Service
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subtle Active Accent Edge Indicator */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 ${
                isActive ? 'bg-gradient-to-r from-cyan via-violet to-amber' : 'bg-transparent'
              }`}
            />
          </motion.div>
        )
      })}
    </div>
  )
}