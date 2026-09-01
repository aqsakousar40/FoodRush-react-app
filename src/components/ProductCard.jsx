import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Star, Plus } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { showToast } from './ToastContainer.jsx'
import { slideUp } from '../utils/animations.js'

export default function ProductCard({ product }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const { isFavorite, toggleFavorite } = useFavorites()
  const { addToCart } = useCart()
  const favorited = isFavorite(product.id)

  function handleMouseMove(e) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 6
    const rotateX = ((centerY - y) / centerY) * 6
    setTilt({ rotateX, rotateY })
  }

  function handleMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  function handleAddToCart(e) {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, { size: 'regular', extras: [], quantity: 1 })
    showToast(`${product.name} added to cart`)
  }

  function handleToggleFavorite(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product.id)
    showToast(
      favorited ? `Removed from favorites` : `${product.name} added to favorites`,
      favorited ? 'info' : 'success'
    )
  }

  return (
    <motion.div variants={slideUp} style={{ perspective: 1000 }}>
      <Link to={`/product/${product.id}`}>
        <motion.div
          ref={cardRef}
          className="product-card card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
          whileHover={{ scale: 1.03, y: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="product-image-wrap">
            <motion.img
              src={product.image}
              alt={product.name}
              className="product-image"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
            />
            <button
              className={`favorite-btn ${favorited ? 'active' : ''}`}
              onClick={handleToggleFavorite}
              aria-label="Toggle favorite"
            >
              <Heart size={17} fill={favorited ? 'currentColor' : 'none'} />
            </button>
            {product.popular && <span className="popular-badge">Popular</span>}
          </div>

          <div className="product-info">
            <span className="product-category">{product.category}</span>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-desc">{product.description}</p>

            <div className="product-meta">
              <span className="product-rating">
                <Star size={14} fill="var(--gold)" color="var(--gold)" />
                {product.rating} <em>({product.reviews})</em>
              </span>
            </div>

            <div className="product-footer">
              <span className="product-price">Rs. {product.price.toLocaleString()}</span>
              <button className="add-cart-btn" onClick={handleAddToCart} aria-label="Add to cart">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}