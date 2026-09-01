import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, ShoppingCart, Menu, User, Sun, Moon, LogOut } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { badgeBounce } from '../utils/animations.js'
import { scrollToSection } from '../utils/scrollToSection.js'
import { showToast } from './ToastContainer.jsx'
import MobileDrawer from './MobileDrawer.jsx'

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'Menu', id: 'menu' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { totalItems } = useCart()
  const { isDark, toggleTheme } = useTheme()
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleNavClick(id) {
    if (location.pathname === '/') {
      scrollToSection(id)
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  async function handleLogout() {
    try {
      await logout()
      showToast('Logged out successfully')
      navigate('/')
    } catch (err) {
      showToast('Failed to log out. Try again.')
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`navbar glass ${scrolled ? 'navbar-scrolled' : ''}`}
      >
        <div className="container navbar-inner">
          <button className="navbar-logo" onClick={() => handleNavClick('home')} style={{ background: 'none' }}>
            <span className="logo-mark">F</span>
            <span className="logo-text">FoodRush</span>
          </button>

          <nav className="navbar-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className="navbar-link"
                onClick={() => handleNavClick(link.id)}
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="navbar-actions">
            <button
              className="icon-btn desktop-only"
              aria-label="Search"
              onClick={() => handleNavClick('menu')}
            >
              <Search size={20} />
            </button>

            <button
              className="icon-btn desktop-only"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: 'flex' }}
                >
                  {isDark ? <Moon size={20} /> : <Sun size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <Link to="/favorites" className="icon-btn desktop-only" aria-label="Favorites">
              <Heart size={20} />
            </Link>

            <Link to="/cart" className="icon-btn cart-icon" aria-label="Cart">
              <ShoppingCart size={20} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    className="cart-badge"
                    variants={badgeBounce}
                    initial="initial"
                    animate="animate"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {currentUser ? (
              <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                  <User size={18} />
                  {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline login-btn"
                  aria-label="Logout"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline desktop-only login-btn">
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="btn btn-primary desktop-only login-btn">
                  <span>Sign Up</span>
                </Link>
              </>
            )}

            <button
              className="icon-btn hamburger"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={navLinks}
        onNavClick={handleNavClick}
      />
    </>
  )
}