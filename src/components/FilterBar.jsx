import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import { modalVariants } from '../utils/animations.js'

const sortOptions = [
  { value: 'popular', label: 'Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
]

export default function FilterBar({ filters, onFilterChange, sortBy, onSortChange }) {
  const [openPanel, setOpenPanel] = useState(null) // 'filters' | 'sort' | null
  const wrapRef = useRef(null)

  const activeCount = Object.values(filters).filter(Boolean).length

  function toggleFilter(key) {
    onFilterChange({ ...filters, [key]: !filters[key] })
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenPanel(null)
      }
    }
    function handleEscape(e) {
      if (e.key === 'Escape') setOpenPanel(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className="filter-bar" ref={wrapRef}>
      <div className="filter-bar-buttons">
        <button
          className="filter-btn btn-outline btn"
          onClick={() => setOpenPanel((p) => (p === 'filters' ? null : 'filters'))}
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeCount > 0 && <span className="filter-count">{activeCount}</span>}
        </button>

        <div className="sort-wrap">
          <button
            className="filter-btn btn-outline btn"
            onClick={() => setOpenPanel((p) => (p === 'sort' ? null : 'sort'))}
          >
            Sort: {sortOptions.find((o) => o.value === sortBy)?.label}
            <ChevronDown size={16} />
          </button>
          <AnimatePresence>
            {openPanel === 'sort' && (
              <motion.div
                className="sort-dropdown card"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`sort-option ${sortBy === opt.value ? 'active' : ''}`}
                    onClick={() => {
                      onSortChange(opt.value)
                      setOpenPanel(null)
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {openPanel === 'filters' && (
          <motion.div
            className="filter-panel card"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <label className="filter-checkbox">
              <input type="checkbox" checked={!!filters.vegetarian} onChange={() => toggleFilter('vegetarian')} />
              Vegetarian
            </label>
            <label className="filter-checkbox">
              <input type="checkbox" checked={!!filters.spicy} onChange={() => toggleFilter('spicy')} />
              Spicy
            </label>
            <label className="filter-checkbox">
              <input type="checkbox" checked={!!filters.popular} onChange={() => toggleFilter('popular')} />
              Popular
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}