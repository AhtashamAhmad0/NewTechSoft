import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import ChromaGrid from './ChromaGrid'
import { PORTFOLIO } from '../../data/siteData'

// High-quality, modern tech/UI Unsplash images for realistic project previews
const PROJECT_IMAGES = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', // Analytics Dashboard / Web Platform
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', // Modern Abstract / AI App
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80', // Portfolio & SaaS UI
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', // Data & Business Intelligence
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80', // Mobile UI & E-commerce
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80', // Developer Tools / Code Interface
]

// Corresponding Chroma color accents for each card
const ACCENT_PALETTES = [
  { borderColor: '#06B6D4', gradient: 'linear-gradient(135deg, rgba(6,182,212,0.25), transparent)' },
  { borderColor: '#8B5CF6', gradient: 'linear-gradient(135deg, rgba(139,92,246,0.25), transparent)' },
  { borderColor: '#10B981', gradient: 'linear-gradient(135deg, rgba(16,185,129,0.25), transparent)' },
  { borderColor: '#F59E0B', gradient: 'linear-gradient(135deg, rgba(245,158,11,0.25), transparent)' },
  { borderColor: '#EC4899', gradient: 'linear-gradient(135deg, rgba(236,72,153,0.25), transparent)' },
  { borderColor: '#3B82F6', gradient: 'linear-gradient(135deg, rgba(59,130,246,0.25), transparent)' },
]

export default function PortfolioPreview() {
  // Map realistic images and chroma styling to portfolio data
  const chromaItems = PORTFOLIO.map((project, idx) => {
    const palette = ACCENT_PALETTES[idx % ACCENT_PALETTES.length]
    const fallbackImage = PROJECT_IMAGES[idx % PROJECT_IMAGES.length]

    return {
      ...project,
      image: project.image || project.cover || fallbackImage,
      borderColor: project.borderColor || palette.borderColor,
      gradient: project.gradient || palette.gradient,
      url: project.url || `/portfolio#${project.slug || idx}`,
    }
  })

  return (
    <section className="section relative overflow-hidden py-20">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/3 -z-10 h-96 w-96 rounded-full bg-cyan/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 -z-10 h-96 w-96 rounded-full bg-violet/10 blur-[140px]" />

      {/* Header Row */}
      <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          align="left"
          eyebrow="Selected Work"
          title="Recent projects we're proud of."
        />
        <Button to="/portfolio" variant="ghost" icon={ArrowRight} className="shrink-0">
          Full Portfolio
        </Button>
      </div>

      {/* Interactive Chroma Grid */}
      <ChromaGrid
        items={chromaItems}
        radius={350}
        fadeOut={0.5}
      />
    </section>
  )
}