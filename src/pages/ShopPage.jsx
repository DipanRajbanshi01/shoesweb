import { useState, useMemo, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS } from '../data/products'
import { ProductGrid } from '../components/shop/ProductGrid'
import { FilterSidebar } from '../components/shop/FilterSidebar'

function SlidersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="8" cy="6" r="2" fill="white" />
      <circle cx="16" cy="12" r="2" fill="white" />
      <circle cx="10" cy="18" r="2" fill="white" />
    </svg>
  )
}

export function ShopPage() {
  const { category: categoryParam } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [filters, setFilters] = useState({
    category: categoryParam || searchParams.get('category') || '',
    sizes: [],
    priceRange: [0, 50000],
    sortBy: searchParams.get('sort') || 'featured',
  })

  // Simulate loading
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 550)
    return () => clearTimeout(t)
  }, [filters])

  // Sync URL
  function handleFilterChange(next) {
    setFilters(next)
    const params = new URLSearchParams()
    if (next.category) params.set('category', next.category)
    if (next.sortBy !== 'featured') params.set('sort', next.sortBy)
    setSearchParams(params)
  }

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filters.category && p.category !== filters.category && p.gender !== filters.category) {
        return false
      }
      if (p.price > filters.priceRange[1]) return false
      if (filters.sizes.length > 0 && !filters.sizes.some((s) => p.sizes.includes(s))) {
        return false
      }
      return true
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price
      if (filters.sortBy === 'price-desc') return b.price - a.price
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      return 0
    })
  }, [filters])

  const categoryTitle =
    filters.category
      ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1)
      : 'All Products'

  return (
    <div className="pt-20 md:pt-24">
      {/* Page Header */}
      <div className="layout-pad py-10 md:py-14 border-b border-gray-100 dark:border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-2">Collection</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {categoryTitle}
          </h1>
          <p className="mt-2 text-gray-400 text-sm">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </p>
        </motion.div>
      </div>

      <div className="layout-pad py-10">
        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-24 self-start">
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </aside>

          {/* Product Area */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Bar */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400 transition-colors"
              >
                <SlidersIcon />
                Filters
                {(filters.category || filters.sizes.length > 0) && (
                  <span className="w-2 h-2 rounded-full bg-accent" />
                )}
              </button>
              <span className="text-sm text-gray-400">{filtered.length} items</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={JSON.stringify(filters)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ProductGrid products={filtered} loading={loading} columns={3} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onClose={() => setMobileFiltersOpen(false)}
            isMobile
          />
        )}
      </AnimatePresence>
    </div>
  )
}
