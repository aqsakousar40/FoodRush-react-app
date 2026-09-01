import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Info } from 'lucide-react'
import { toastVariants } from '../utils/animations.js'

const icons = {
  success: <CheckCircle2 size={20} color="var(--green)" />,
  error: <XCircle size={20} color="var(--coral-deep)" />,
  info: <Info size={20} color="var(--coral)" />,
}

export default function Toast({ message, type = 'success' }) {
  return (
    <motion.div
      className="toast glass"
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      {icons[type]}
      <span>{message}</span>
    </motion.div>
  )
}