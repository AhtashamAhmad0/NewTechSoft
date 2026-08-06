import Hero from '../components/home/Hero'
import Technologies from '../components/home/Technologies'
import WhyChooseUs from '../components/home/WhyChooseUs'
import ServicesOverview from '../components/home/ServicesOverview'
import PortfolioPreview from '../components/home/PortfolioPreview'
import Team from '../components/home/Team'
import Process from '../components/home/Process'
import Testimonials from '../components/home/Testimonials'
import FAQs from '../components/home/FAQs'
import CTA from '../components/home/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Technologies />
      <WhyChooseUs />
      <ServicesOverview />
      <PortfolioPreview />
      <Team />
      <Process />
      <Testimonials />
      <FAQs />
      <CTA />
    </>
  )
}
