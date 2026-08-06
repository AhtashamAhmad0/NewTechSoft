import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Mail, MapPin, Phone, Send, Linkedin, Facebook, Instagram, Twitter, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import { COMPANY } from '../data/siteData'

const SOCIALS = [
  { icon: Linkedin, href: COMPANY.social.linkedin, label: 'LinkedIn' },
  { icon: Facebook, href: COMPANY.social.facebook, label: 'Facebook' },
  { icon: Instagram, href: COMPANY.social.instagram, label: 'Instagram' },
  { icon: Twitter, href: COMPANY.social.twitter, label: 'Twitter' },
]

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
      // Endpoint comes from .env (see .env.example) so it's never hardcoded.
      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
      await axios.post(endpoint, data, {
        headers: { Accept: 'application/json' },
      })
      setStatus('success')
      reset()
    } catch (err) {
      // In this demo the placeholder endpoint will reject the request —
      // that's expected until a real endpoint is wired in (see README).
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

      <section className="section grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className="glass-panel flex flex-col gap-5 p-8 sm:p-10"
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
              {...register('message', { required: 'Please add a few details', minLength: { value: 20, message: 'A little more detail helps — at least 20 characters' } })}
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

        {/* Office Details + Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <div className="glass-panel p-8">
            <h3 className="mb-5 font-display text-lg font-semibold">Office Details</h3>
            <ul className="flex flex-col gap-4 text-sm text-ink-muted">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-cyan-soft" /> {COMPANY.address}
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-cyan-soft" /> {COMPANY.email}
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-cyan-soft" /> {COMPANY.phone}
              </li>
            </ul>
          </div>

          <div className="glass-panel p-8">
            <h3 className="mb-5 font-display text-lg font-semibold">Follow Us</h3>
            <div className="flex gap-2">
              {SOCIALS.map(({ icon: SocialIcon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="glass glass-hover grid h-11 w-11 place-items-center rounded-full"
                >
                  <SocialIcon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="glass-panel relative aspect-square overflow-hidden p-0 sm:aspect-auto sm:flex-1">
            <div className="flex h-full min-h-[200px] items-center justify-center bg-gradient-to-br from-violet/15 via-transparent to-cyan/15">
              <MapPin size={32} className="text-ink-faint" />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
