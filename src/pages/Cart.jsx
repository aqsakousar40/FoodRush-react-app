import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import CartItem from '../components/CartItem.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import { slideUp } from '../utils/animations.js'

export default function Cart() {
  const { cartItems } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="container section">
        <div className="empty-cart">
          <motion.div
            className="empty-cart-icon"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ShoppingBag size={54} />
          </motion.div>
          <h2>Your cart is feeling a little empty.</h2>
          <p>Add some delicious dishes to get started.</p>
          <Link to="/menu" className="btn btn-primary">
            Explore Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container section">
      <motion.div className="section-heading" variants={slideUp} initial="hidden" animate="visible">
        <span className="eyebrow">Your Order</span>
        <h1>Shopping Cart</h1>
      </motion.div>

      <div className="cart-layout">
        <div className="cart-items-list">
          <AnimatePresence mode="popLayout">
            {cartItems.map((item) => (
              <CartItem key={item.key} item={item} />
            ))}
          </AnimatePresence>
        </div>

        <OrderSummary
          buttonText="Proceed to Checkout"
          onButtonClick={() => navigate('/checkout')}
        />
      </div>
    </div>
  )
}