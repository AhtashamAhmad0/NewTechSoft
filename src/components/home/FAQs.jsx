import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { FAQS } from '../../data/siteData'

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="glass-panel overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-medium sm:text-lg">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/5 text-cyan-soft"
        >
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-5 text-sm text-ink-muted">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section">
      <SectionHeading eyebrow="FAQs" title="Answers before you ask." />
      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
        {FAQS.map((faq, i) => (
          <FaqItem
            key={faq.question}
            faq={faq}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  )
}
