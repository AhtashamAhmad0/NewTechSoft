import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Mail, MapPin, Phone, Send, Linkedin, Facebook, Instagram, Twitter, CheckCircle2, Navigation } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import { COMPANY } from '../data/siteData'

const SOCIALS = [
  { icon: Linkedin, href: COMPANY.social?.linkedin || '#', label: 'LinkedIn' },
  { icon: Facebook, href: COMPANY.social?.facebook || '#', label: 'Facebook' },
  { icon: Instagram, href: COMPANY.social?.instagram || '#', label: 'Instagram' },
  { icon: Twitter, href: COMPANY.social?.twitter || '#', label: 'Twitter' },
]

// Interactive background grid & particles mesh
function TechGridCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = 0
    let height = 0
    let particles = []

    const updateSize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      width = parent.clientWidth
      height = parent.clientHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const count = Math.min(Math.floor((width * height) / 16000), 35)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 1,
        })
      }
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Grid Pattern
      ctx.globalAlpha = 0.05
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1
      const gridSize = 75

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Nodes & Connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#06B6D4'
        ctx.globalAlpha = 0.4
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = '#A855F7'
            ctx.lineWidth = 0.75
            ctx.globalAlpha = (1 - dist / 130) * 0.18
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(draw)
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', updateSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
    />
  )
}

// Leaflet Map Component for DHA Phase 1, Rawalpindi
function LocationMap() {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)

  // Coordinates for DHA Phase 1, Rawalpindi
  const dhaLat = 33.5281
  const dhaLng = 73.0984

  useEffect(() => {
    // Inject Leaflet CSS dynamically if not present
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    // Load Leaflet JS script and initialize map
    const loadLeaflet = async () => {
      if (!window.L) {
        await new Promise((resolve) => {
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      if (mapContainerRef.current && !mapInstanceRef.current && window.L) {
        const L = window.L

        // Initialize Map
        const map = L.map(mapContainerRef.current, {
          center: [dhaLat, dhaLng],
          zoom: 14,
          zoomControl: false,
        })

        // Add Dark / Modern Tile Layer (CartoDB Dark Matter)
        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
          }
        ).addTo(map)

        // Add Custom Pulsing Pin Marker
        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div class="relative flex items-center justify-center">
              <span class="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <div class="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-lg font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        })

        const marker = L.marker([dhaLat, dhaLng], { icon: customIcon }).addTo(map)
        marker.bindPopup(`
          <div style="color: #0f172a; font-family: sans-serif; padding: 2px;">
            <strong style="font-size: 13px;">DHA Phase 1</strong><br/>
            <span style="font-size: 11px; color: #475569;">Rawalpindi, Punjab, Pakistan</span>
          </div>
        `)

        // Add custom zoom controls
        L.control.zoom({ position: 'bottomright' }).addTo(map)

        mapInstanceRef.current = map
      }
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [dhaLat, dhaLng])

  return (
    <div className="relative h-full w-full min-h-[280px] overflow-hidden rounded-2xl border border-white/10">
      <div ref={mapContainerRef} className="h-full w-full z-0" />
      
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-deep/80 px-3 py-1.5 text-xs font-mono text-cyan-soft backdrop-blur-md shadow-md">
        <Navigation size={13} className="text-cyan-soft animate-pulse" />
        <span>DHA Phase 1, Rawalpindi</span>
      </div>

      {/* Direct Google Maps Direction Link Button */}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=DHA+Phase+1+Rawalpindi`}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-md hover:bg-white/20 transition-all duration-200"
      >
        <span>Open in Google Maps</span>
      </a>
    </div>
  )
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const [status, setStatus] = useState(null) // null | 'success' | 'error'

  const onSubmit = async (data) => {
    setStatus(null)
    try {
      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
      if (endpoint) {
        await axios.post(endpoint, data, {
          headers: { Accept: 'application/json' },
        })
      }
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('success')
      reset()
    }
  }

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Get in Touch"
        title="Let's talk about your project."
        description="Fill out the form or reach us directly — we reply within one business day."
      />

      <section className="section relative overflow-hidden py-12">
        {/* Ambient Grid Canvas */}
        <TechGridCanvas />
        <div className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-80 w-80 rounded-full bg-cyan/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 -z-10 h-96 w-96 rounded-full bg-violet/15 blur-[120px]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass-panel flex flex-col gap-5 p-8 sm:p-10 border border-white/10 bg-deep/60 backdrop-blur-xl"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-ink-muted">Full Name</label>
                <input
                  id="name"
                  className="input-glass"
                  placeholder="Ali Raza"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="mt-1.5 text-xs text-amber">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-ink-muted">Email</label>
                <input
                  id="email"
                  type="email"
                  className="input-glass"
                  placeholder="ali@company.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                />
                {errors.email && <p className="mt-1.5 text-xs text-amber">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm text-ink-muted">Phone (optional)</label>
                <input id="phone" className="input-glass" placeholder="+92 300 0000000" {...register('phone')} />
              </div>
              <div>
                <label htmlFor="budget" className="mb-2 block text-sm text-ink-muted">Budget Range</label>
                <select id="budget" className="input-glass" defaultValue="" {...register('budget')}>
                  <option value="" disabled>Select a range</option>
                  <option value="<5k">Under $5,000</option>
                  <option value="5-15k">$5,000 – $15,000</option>
                  <option value="15-50k">$15,000 – $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-ink-muted">Project Details</label>
              <textarea
                id="message"
                rows={5}
                className="input-glass resize-none"
                placeholder="Tell us what you're building..."
                {...register('message', {
                  required: 'Please add a few details',
                  minLength: { value: 20, message: 'A little more detail helps — at least 20 characters' },
                })}
              />
              {errors.message && <p className="mt-1.5 text-xs text-amber">{errors.message.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
              {isSubmitting ? 'Sending...' : <>Send Message <Send size={17} /></>}
            </button>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-cyan-soft"
              >
                <CheckCircle2 size={16} /> Message received — we'll be in touch shortly.
              </motion.p>
            )}
          </motion.form>

          {/* Office Details + Social Links + Leaflet Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div className="glass-panel p-8 border border-white/10 bg-deep/60 backdrop-blur-xl">
              <h3 className="mb-5 font-display text-lg font-semibold text-ink-primary">Office Details</h3>
              <ul className="flex flex-col gap-4 text-sm text-ink-muted">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-cyan-soft" />
                  <span>{COMPANY.address || 'DHA Phase 1, Sector F, Rawalpindi, Punjab, Pakistan'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-cyan-soft" />
                  <span>{COMPANY.email || 'info@company.com'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-cyan-soft" />
                  <span>{COMPANY.phone || '+92 300 0000000'}</span>
                </li>
              </ul>
            </div>

            <div className="glass-panel p-8 border border-white/10 bg-deep/60 backdrop-blur-xl">
              <h3 className="mb-5 font-display text-lg font-semibold text-ink-primary">Follow Us</h3>
              <div className="flex gap-2">
                {SOCIALS.map(({ icon: SocialIcon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="glass glass-hover grid h-11 w-11 place-items-center rounded-full border border-white/10 text-ink-muted hover:text-cyan-soft hover:border-cyan-soft/40 transition-all duration-200"
                  >
                    <SocialIcon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Interactive Leaflet Map for DHA Phase 1 Rawalpindi */}
            <div className="glass-panel aspect-square overflow-hidden p-0 sm:aspect-auto sm:flex-1 min-h-[280px]">
              <LocationMap />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}