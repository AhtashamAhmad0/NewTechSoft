import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * react-router-dom does not reset scroll position between route changes
 * by default. Mounted once near the root inside <App /> to fix that.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])

  return null
}
