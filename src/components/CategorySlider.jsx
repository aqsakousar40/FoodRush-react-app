import { motion } from 'framer-motion'
import { categories } from '../data/products.js'

export default function CategorySlider({ selected, onSelect }) {
  return (
    <div className="category-slider no-scrollbar">
      {categories.map((cat) => {
        const isActive = selected === cat.id
        return (
          <button
            key={cat.id}
            className={`category-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(cat.id)}
          >
            <div className="category-image-wrap">
              <img src={cat.image} alt={cat.name} />
              {isActive && (
                <motion.div
                  className="category-ring"
                  layoutId="category-ring"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </div>
            <span>{cat.name}</span>
          </button>
        )
      })}
    </div>
  )
}