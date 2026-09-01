import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard.jsx'
import SkeletonCard from './SkeletonCard.jsx'

export default function ProductGrid({ products, loading = false }) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>No dishes found</h3>
        <p>Try adjusting your search or filters to find what you're craving.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}