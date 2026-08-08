import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#0a0e1a] text-white">
      <Navbar />
      
      {/* Reduced animation complexity: Hardware-accelerated fade without forcing 'wait' mode */}
      <main 
        key={location.pathname} 
        className="flex-1 pt-20 transition-opacity duration-300 ease-out"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}