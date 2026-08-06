import React from 'react'

export default function LogoLoop({
  logos = [],
  speed = 30, // Loop duration in seconds
  direction = 'left',
  gap = 32,
  scaleOnHover = true,
  pauseOnHover = true,
}) {
  // Duplicate array 3x to guarantee seamless looping across wide viewports
  const duplicatedLogos = [...logos, ...logos, ...logos]

  return (
    <div className="group relative flex w-full overflow-hidden py-4">
      <div
        className={`flex w-max shrink-0 items-center animate-marquee ${
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          gap: `${gap}px`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
          animationDuration: `${speed}s`,
        }}
      >
        {duplicatedLogos.map((item, index) => {
          const isIcon = Boolean(item.node)

          return (
            <a
              key={`${item.title || index}-${index}`}
              href={item.href || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.title || item.alt}
              style={{ '--brand-color': item.color || 'inherit' }}
              className={`
                glass group/item relative flex items-center gap-3 rounded-full px-6 py-3
                text-ink-muted transition-all duration-300 ease-out
                hover:border-white/30 hover:bg-white/10 hover:text-white
                ${scaleOnHover ? 'hover:scale-110' : ''}
              `}
            >
              {/* Icon rendering with brand color transition on hover */}
              {isIcon ? (
                <span
                  className="text-2xl opacity-70 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:drop-shadow-[0_0_12px_var(--brand-color)]"
                  style={{
                    color: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    if (item.color) e.currentTarget.style.color = item.color
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'inherit'
                  }}
                >
                  {item.node}
                </span>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt || ''}
                  className="h-7 w-auto object-contain grayscale opacity-70 transition-all duration-300 group-hover/item:grayscale-0 group-hover/item:opacity-100"
                />
              )}

              {/* Title label */}
              {item.title && (
                <span className="text-sm font-medium tracking-wide">
                  {item.title}
                </span>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}