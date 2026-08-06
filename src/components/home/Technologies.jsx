import React from 'react'
import LogoLoop from './LogoLoop'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiFlutter,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiFigma,
} from 'react-icons/si'

// Tech logos paired with official hex brand colors
const TECH_LOGOS = [
  {
    node: <SiReact />,
    title: 'React',
    href: 'https://react.dev',
    color: '#61DAFB',
  },
  {
    node: <SiNextdotjs />,
    title: 'Next.js',
    href: 'https://nextjs.org',
    color: '#FFFFFF',
  },
  {
    node: <SiTypescript />,
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org',
    color: '#3178C6',
  },
  {
    node: <SiTailwindcss />,
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
    color: '#06B6D4',
  },
  {
    node: <SiPython />,
    title: 'Python',
    href: 'https://www.python.org',
    color: '#3776AB',
  },
  {
    node: <SiFlutter />,
    title: 'Flutter',
    href: 'https://flutter.dev',
    color: '#02569B',
  },
  {
    node: <SiNodedotjs />,
    title: 'Node.js',
    href: 'https://nodejs.org',
    color: '#5FA04E',
  },
  {
    node: <SiPostgresql />,
    title: 'PostgreSQL',
    href: 'https://www.postgresql.org',
    color: '#4169E1',
  },
  {
    node: <SiDocker />,
    title: 'Docker',
    href: 'https://www.docker.com',
    color: '#2496ED',
  },
  {
    node: <SiFigma />,
    title: 'Figma',
    href: 'https://www.figma.com',
    color: '#F24E1E',
  },
]

export default function Technologies() {
  return (
    <section className="relative border-y border-white/10 bg-white/[0.02] py-10">
      <div className="mb-6 text-center">
        <span className="eyebrow">Technologies We Use</span>
      </div>

      <div className="relative overflow-hidden">
        {/* Left and Right Fade Edge Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-deep via-deep/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-deep via-deep/80 to-transparent" />

        {/* Infinite Logo Marquee */}
        <LogoLoop
          logos={TECH_LOGOS}
          speed={35}
          direction="left"
          gap={24}
          scaleOnHover
          pauseOnHover
        />
      </div>
    </section>
  )
}