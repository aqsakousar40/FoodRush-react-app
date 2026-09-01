import { useNavigate, useLocation } from 'react-router-dom'
import { scrollToSection } from '../utils/scrollToSection.js'

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  </svg>
)
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.9 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2Z" />
  </svg>
)
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="currentColor" d="M23 12s0-3.6-.5-5.3a3 3 0 0 0-2.1-2.1C18.7 4 12 4 12 4s-6.7 0-8.4.6A3 3 0 0 0 1.5 6.7C1 8.4 1 12 1 12s0 3.6.5 5.3a3 3 0 0 0 2.1 2.1C5.3 20 12 20 12 20s6.7 0 8.4-.6a3 3 0 0 0 2.1-2.1c.5-1.7.5-5.3.5-5.3Z" />
    <path fill="#16110C" d="M9.8 8.6 15.8 12l-6 3.4V8.6Z" />
  </svg>
)

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  function handleNavClick(id) {
    if (location.pathname === '/') {
      scrollToSection(id)
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand">
          <div className="navbar-logo">
            <span className="logo-mark">F</span>
            <span className="logo-text">FoodRush</span>
          </div>
          <p>Fresh food delivered with love.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <button onClick={() => handleNavClick('home')}>Home</button>
          <button onClick={() => handleNavClick('menu')}>Menu</button>
          <button onClick={() => handleNavClick('about')}>About</button>
          <button onClick={() => handleNavClick('contact')}>Contact</button>
        </div>

        <div className="footer-col">
          <h4>Customer Support</h4>
          <a href="#faq">FAQ</a>
          <a href="#help">Help Center</a>
          <a href="#delivery">Delivery Info</a>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" aria-label="Youtube"><YoutubeIcon /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 FoodRush. All rights reserved.</p>
      </div>
    </footer>
  )
}