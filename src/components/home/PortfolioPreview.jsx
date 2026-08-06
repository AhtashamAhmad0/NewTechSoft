import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { PORTFOLIO } from '../../data/siteData'

import 'swiper/css'
import 'swiper/css/navigation'

export default function PortfolioPreview() {
  return (
    <section className="section">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading align="left" eyebrow="Selected Work" title="Recent projects we're proud of." />
        <Button to="/portfolio" variant="ghost" icon={ArrowRight} className="shrink-0">
          Full Portfolio
        </Button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1.05}
        navigation
        autoplay={{ delay: 4200, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1.4 },
          1024: { slidesPerView: 2.3 },
          1280: { slidesPerView: 2.8 },
        }}
        className="portfolio-swiper mt-12 !overflow-visible !pb-4"
      >
        {PORTFOLIO.map((project) => (
          <SwiperSlide key={project.title}>
            <div className="glass glass-hover group flex h-full flex-col justify-between rounded-2xl p-7">
              <div>
                <span className="eyebrow">{project.category}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{project.summary}</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-ink-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-cyan-soft transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
