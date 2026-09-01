import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, MapPin, Clock, Receipt } from 'lucide-react'

export default function OrderSuccess() {
  const location = useLocation()
  const data = location.state || {
    orderNumber: 'FR482913',
    total: 0,
    address: 'N/A',
    estimatedTime: '30-45 min',
  }

  return (
    <div className="container section order-success">
      <motion.div
        className="success-check"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Check size={44} strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        Order Confirmed!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="success-subtitle"
      >
        Your delicious food is on its way.
      </motion.p>

      <motion.div
        className="success-card card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="success-row">
          <Receipt size={18} />
          <div><span>Order Number</span><strong>{data.orderNumber}</strong></div>
        </div>
        <div className="success-row">
          <Clock size={18} />
          <div><span>Estimated Delivery</span><strong>{data.estimatedTime}</strong></div>
        </div>
        <div className="success-row">
          <MapPin size={18} />
          <div><span>Delivery Address</span><strong>{data.address}</strong></div>
        </div>
        <div className="success-total">
          <span>Total Paid</span>
          <strong>Rs. {Math.round(data.total).toLocaleString()}</strong>
        </div>
      </motion.div>

      <motion.div className="success-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <Link to="/menu" className="btn btn-outline">Track Order</Link>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </motion.div>
    </div>
  )
}