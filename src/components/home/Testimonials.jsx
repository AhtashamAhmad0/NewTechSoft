import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Quote } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { TESTIMONIALS } from '../../data/siteData'

import 'swiper/css'
import 'swiper/css/pagination'

export default function Testimonials() {
  return (
    <section className="section">
      <SectionHeading
        eyebrow="Client Feedback"
        title="What it's like working with us."
      />

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{ 768: { slidesPerView: 2 } }}
        className="testimonials-swiper mt-12 !pb-14"
      >
        {TESTIMONIALS.map((t) => (
          <SwiperSlide key={t.name}>
            <div className="glass-panel flex h-full flex-col gap-5 p-8">
              <Quote className="text-violet-soft" size={28} />
              <p className="text-balance text-lg text-ink-primary">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3 pt-2">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-grad-brand text-sm font-bold text-deep">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-ink-muted">{t.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
