import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { subscribeToProducts } from '../firebase/productsService.js'
import ProductGrid from '../components/ProductGrid.jsx'
import { slideUp } from '../utils/animations.js'

export default function Favorites() {
  const { favorites } = useFavorites()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const favoriteProducts = products.filter((p) => favorites.includes(p.id))

  if (loading) {
    return (
      <div className="container section">
        <p>Loading...</p>
      </div>
    )
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="container section">
        <div className="empty-cart">
          <motion.div
            className="empty-cart-icon"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={54} />
          </motion.div>
          <h2>Save your favorite meals here.</h2>
          <p>Tap the heart icon on any dish to add it to your favorites.</p>
          <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container section">
      <motion.div className="section-heading" variants={slideUp} initial="hidden" animate="visible">
        <span className="eyebrow">Saved for later</span>
        <h1>Your Favorites</h1>
      </motion.div>

      <ProductGrid products={favoriteProducts} />
    </div>
  )
} 