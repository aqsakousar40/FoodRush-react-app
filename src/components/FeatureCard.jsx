import { motion } from 'framer-motion'
import { slideUp } from '../utils/animations.js'

export default function FeatureCard({ icon: Icon, title, text }) {
  return (
    <motion.div
      className="feature-card card"
      variants={slideUp}
      whileHover={{ y: -8, boxShadow: '0 20px 45px rgba(36,27,20,0.14)' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="feature-icon"
        whileHover={{ rotate: 8, scale: 1.08 }}
        transition={{ duration: 0.3 }}
      >
        <Icon size={26} />
      </motion.div>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.div>
  )
}