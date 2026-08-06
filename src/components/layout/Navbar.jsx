import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  ArrowUpRight,
  Home,
  Briefcase,
  Layers,
  BookOpen,
  Mail,
  HelpCircle
} from 'lucide-react'
import { NAV_LINKS, COMPANY } from '../../data/siteData'
import useScrolled from '../../hooks/useScrolled'

// Fallback icon resolver in case siteData only contains strings/paths
const getLinkIcon = (path, iconProp) => {
  if (iconProp) return iconProp
  switch (path.toLowerCase()) {
    case '/':
    case '/home':
      return Home
    case '/work':
    case '/projects':
    case '/portfolio':
      return Briefcase
    case '/services':
    case '/features':
      return Layers
    case '/blog':
    case '/articles':
      return BookOpen
    case '/contact':
      return Mail
    default:
      return HelpCircle
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(24)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'glass-nav bg-[#050B1A]/80 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        {/* Brand / Logo */}
        <NavLink
          to="/"
          className="group flex items-center gap-3 transition-transform duration-200 active:scale-95"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-grad-brand text-base font-extrabold text-deep shadow-lg ring-1 ring-white/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
            NT
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            <span className="transition-colors duration-200 group-hover:text-white/90">
              {COMPANY.name}
            </span>
          </span>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-1.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const IconComponent = getLinkIcon(link.path, link.icon)
            return (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {IconComponent && (
                        <IconComponent
                          size={16}
                          className={`transition-colors duration-200 ${
                            isActive
                              ? 'text-white'
                              : 'text-white/40 group-hover:text-white/80'
                          }`}
                        />
                      )}
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-white/10 border border-white/15 shadow-sm"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA Button */}
        <NavLink
          to="/contact"
          className="btn-primary hidden items-center gap-2 !px-5 !py-2.5 text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-lg active:scale-95 lg:inline-flex"
        >
          <span>Start a Project</span>
          <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </NavLink>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="glass grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/10 bg-[#050B1A]/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1.5 px-6 py-5 sm:px-8">
              {NAV_LINKS.map((link) => {
                const IconComponent = getLinkIcon(link.path, link.icon)
                return (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-white/10 text-white ring-1 ring-white/15'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {IconComponent && (
                            <IconComponent
                              size={18}
                              className={isActive ? 'text-white' : 'text-white/40'}
                            />
                          )}
                          <span>{link.label}</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                )
              })}
              
              <li className="pt-3 mt-2 border-t border-white/10">
                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary flex w-full items-center justify-center gap-2 !py-3 text-base font-semibold shadow-md"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight size={18} />
                </NavLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}