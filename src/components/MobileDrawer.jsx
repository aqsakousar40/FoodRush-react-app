import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Heart, User, Sun, Moon } from 'lucide-react'
import { drawerVariants, overlayVariants, staggerContainer, slideRight } from '../utils/animations.js'
import { useTheme } from '../context/ThemeContext.jsx'

export default function MobileDrawer({ open, onClose, links, onNavClick }) {
  const { isDark, toggleTheme } = useTheme()

  function handleClick(id) {
    onNavClick(id)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="drawer-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.aside
            className="mobile-drawer glass"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="drawer-header">
              <span className="logo-text">FoodRush</span>
              <button className="icon-btn" onClick={onClose} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            <motion.nav
              className="drawer-links"
              variants={staggerContainer(0.06, 0.1)}
              initial="hidden"
              animate="visible"
            >
              {links.map((link) => (
                <motion.div key={link.id} variants={slideRight}>
                  <button className="drawer-link" onClick={() => handleClick(link.id)}>
                    {link.name}
                  </button>
                </motion.div>
              ))}
              <motion.div variants={slideRight}>
                <Link to="/favorites" onClick={onClose} className="drawer-link">
                  <Heart size={18} /> Favorites
                </Link>
              </motion.div>
            </motion.nav>

            <div className="drawer-footer">
              <button className="btn btn-outline" onClick={toggleTheme}>
                {isDark ? <Moon size={17} /> : <Sun size={17} />}
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </button>
              <button className="btn btn-primary">
                <User size={17} /> Login
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}