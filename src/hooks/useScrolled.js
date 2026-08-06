import { useEffect, useState } from 'react'

/**
 * Returns true once the page has scrolled past `threshold` px.
 * Used by the Navbar to switch from a transparent hero overlay
 * to a solid frosted-glass bar (PRD: "Sticky Navbar... Animated on Scroll").
 */
export default function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
