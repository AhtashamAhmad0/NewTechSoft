import { TECHNOLOGIES } from '../../data/siteData'

/**
 * Infinite horizontal marquee of the tech stack. Duplicated once so the
 * CSS `marquee` keyframe (translateX 0 -> -50%) loops seamlessly.
 */
export default function Technologies() {
  const items = [...TECHNOLOGIES, ...TECHNOLOGIES]

  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-10">
      <div className="mb-6 text-center">
        <span className="eyebrow">Technologies We Use</span>
      </div>
      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-deep to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-deep to-transparent" />
        <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
          {items.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="glass rounded-full px-6 py-2.5 text-sm font-medium text-ink-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
