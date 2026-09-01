import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import CategorySlider from '../components/CategorySlider.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterBar from '../components/FilterBar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { subscribeToProducts } from '../firebase/productsService.js'
import { slideUp } from '../utils/animations.js'

export default function Menu() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ vegetarian: false, spicy: false, popular: false })
  const [sortBy, setSortBy] = useState('popular')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (category !== 'all') {
      list = list.filter((p) => p.category === category)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    if (filters.vegetarian) list = list.filter((p) => p.vegetarian)
    if (filters.spicy) list = list.filter((p) => p.spicy)
    if (filters.popular) list = list.filter((p) => p.popular)

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      default:
        list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
    }

    return list
  }, [products, category, search, filters, sortBy])

  return (
    <div className="menu-page section" id="menu">
      <div className="container">
        <motion.div
          className="section-heading"
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="eyebrow">Our Menu</span>
          <h1>Explore Our Menu</h1>
          <p>Freshly prepared favorites made just for you.</p>
        </motion.div>

        <div className="menu-search-row">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <CategorySlider selected={category} onSelect={setCategory} />

        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <p className="results-count">
          {loading ? 'Loading...' : `${filteredProducts.length} dishes found`}
        </p>

        <ProductGrid products={filteredProducts} loading={loading} />
      </div>
    </div>
  )
}