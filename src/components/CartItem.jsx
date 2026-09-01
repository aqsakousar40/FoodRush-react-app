import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import QuantitySelector from './QuantitySelector.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function CartItem({ item }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart()
  const lineTotal = item.unitPrice * item.quantity

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40, height: 0 }}
      transition={{ duration: 0.3 }}
      className="cart-item card"
    >
      <img src={item.image} alt={item.name} className="cart-item-image" />

      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p className="cart-item-options">
          {item.size !== 'regular' && <span>Size: {item.size}</span>}
          {item.extras.length > 0 && <span>+ {item.extras.join(', ')}</span>}
        </p>
        <span className="cart-item-price">Rs. {item.unitPrice.toLocaleString()}</span>
      </div>

      <div className="cart-item-actions">
        <QuantitySelector
          quantity={item.quantity}
          onIncrease={() => increaseQuantity(item.key)}
          onDecrease={() => decreaseQuantity(item.key)}
        />
        <span className="cart-item-subtotal">Rs. {lineTotal.toLocaleString()}</span>
        <button
          className="cart-remove-btn"
          onClick={() => removeFromCart(item.key)}
          aria-label="Remove item"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </motion.div>
  )
}