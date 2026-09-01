import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Heart, ArrowLeft } from 'lucide-react'
import { sizeOptions, extraOptions } from '../data/products.js'
import { getProductById } from '../firebase/productsService.js'
import { useCart } from '../context/CartContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { showToast } from '../components/ToastContainer.jsx'
import QuantitySelector from '../components/QuantitySelector.jsx'
import { slideRight, slideLeft } from '../utils/animations.js'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  const [size, setSize] = useState('regular')
  const [extras, setExtras] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      const data = await getProductById(id)
      setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="container section">
        <p>Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container section">
        <div className="empty-state">
          <h3>Product not found</h3>
          <p>This dish may have been removed from our menu.</p>
          <Link to="/menu" className="btn btn-primary" style={{ marginTop: 20 }}>
            Back to Menu
          </Link>
        </div>
      </div>
    )
  }

  const favorited = isFavorite(product.id)

  function toggleExtra(extraId) {
    setExtras((prev) =>
      prev.includes(extraId) ? prev.filter((e) => e !== extraId) : [...prev, extraId]
    )
  }

  const sizeDelta = sizeOptions.find((s) => s.id === size)?.priceDelta || 0
  const extrasTotal = extras.reduce((sum, extraId) => {
    const extra = extraOptions.find((e) => e.id === extraId)
    return sum + (extra ? extra.price : 0)
  }, 0)
  const unitPrice = product.price + sizeDelta + extrasTotal
  const totalPrice = unitPrice * quantity

  function handleAddToCart() {
    const extraNames = extras.map((eid) => extraOptions.find((e) => e.id === eid)?.name)
    addToCart(product, { size, extras: extraNames, quantity, unitPrice })
    showToast(`${product.name} added to cart`)
  }

  return (
    <div className="container section product-details">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className="product-details-grid">
        <motion.div
          className="product-details-image"
          variants={slideRight}
          initial="hidden"
          animate="visible"
        >
          <img src={product.image} alt={product.name} />
          <button
            className={`favorite-btn details-fav ${favorited ? 'active' : ''}`}
            onClick={() => toggleFavorite(product.id)}
            aria-label="Toggle favorite"
          >
            <Heart size={20} fill={favorited ? 'currentColor' : 'none'} />
          </button>
        </motion.div>

        <motion.div variants={slideLeft} initial="hidden" animate="visible">
          <span className="eyebrow">{product.category}</span>
          <h1 className="details-title">{product.name}</h1>

          <div className="product-rating" style={{ marginBottom: 16 }}>
            <Star size={16} fill="var(--gold)" color="var(--gold)" />
            {product.rating} <em>({product.reviews} reviews)</em>
          </div>

          <p className="details-desc">{product.description}</p>

          <div className="option-group">
            <h4>Size</h4>
            <div className="option-pills">
              {sizeOptions.map((opt) => (
                <button
                  key={opt.id}
                  className={`option-pill ${size === opt.id ? 'active' : ''}`}
                  onClick={() => setSize(opt.id)}
                >
                  {opt.name}
                  {opt.priceDelta > 0 && ` +Rs.${opt.priceDelta}`}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <h4>Extras</h4>
            <div className="option-pills">
              {extraOptions.map((opt) => (
                <button
                  key={opt.id}
                  className={`option-pill ${extras.includes(opt.id) ? 'active' : ''}`}
                  onClick={() => toggleExtra(opt.id)}
                >
                  {opt.name} +Rs.{opt.price}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <h4>Special Instructions</h4>
            <textarea
              className="special-notes"
              placeholder="e.g. No onions, extra spicy, allergy notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="details-footer">
            <QuantitySelector
              size="lg"
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
            <button className="btn btn-primary details-add-btn" onClick={handleAddToCart}>
              Add to Cart — Rs. {totalPrice.toLocaleString()}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}