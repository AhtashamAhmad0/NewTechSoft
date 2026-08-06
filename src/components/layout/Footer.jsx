import { Link } from 'react-router-dom'
import { Linkedin, Facebook, Instagram, Twitter, Github, Mail, MapPin, Phone } from 'lucide-react'
import { NAV_LINKS, COMPANY, SERVICES } from '../../data/siteData'

const SOCIALS = [
  { icon: Linkedin, href: COMPANY.social.linkedin, label: 'LinkedIn' },
  { icon: Facebook, href: COMPANY.social.facebook, label: 'Facebook' },
  { icon: Instagram, href: COMPANY.social.instagram, label: 'Instagram' },
  { icon: Twitter, href: COMPANY.social.twitter, label: 'Twitter' },
  { icon: Github, href: COMPANY.social.github, label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-grad-brand text-sm font-bold text-deep">
              NT
            </span>
            <span className="font-display text-lg font-semibold">{COMPANY.name}</span>
          </Link>
          <p className="max-w-xs text-sm text-ink-muted">{COMPANY.description}</p>
          <div className="flex gap-2 pt-2">
            {SOCIALS.map(({ icon: SocialIcon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass glass-hover grid h-10 w-10 place-items-center rounded-full"
              >
                <SocialIcon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-ink-primary">
            Navigate
          </h4>
          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-sm text-ink-muted transition-colors hover:text-cyan-soft">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-ink-primary">
            Services
          </h4>
          <ul className="flex flex-col gap-2.5">
            {SERVICES.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link to="/services" className="text-sm text-ink-muted transition-colors hover:text-cyan-soft">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-ink-primary">
            Get in Touch
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-ink-muted">
            <li className="flex items-start gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-cyan-soft" /> {COMPANY.email}
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-cyan-soft" /> {COMPANY.phone}
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-cyan-soft" /> {COMPANY.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-ink-faint sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>Designed &amp; built with a Glass Morphism system.</p>
        </div>
      </div>
    </footer>
  )
}
