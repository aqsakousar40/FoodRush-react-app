import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import FeaturesSection from '../components/FeaturesSection.jsx'
import Menu from './Menu.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'
import { scrollToSection } from '../utils/scrollToSection.js'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      const timer = setTimeout(() => scrollToSection(location.state.scrollTo), 120)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [location.state])

  return (
    <div>
      <Hero />
      <FeaturesSection />

      <Menu />

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <div>
            <h2>Hungry? Let's fix that.</h2>
            <p>Fresh meals, fast delivery, and a menu you'll keep coming back to.</p>
          </div>
          <Link to="/cart" className="btn btn-dark">
            View Cart <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <About />
      <Contact />
    </div>
  )
}