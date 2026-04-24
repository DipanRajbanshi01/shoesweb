import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'

const CATEGORIES = ['men', 'formal', 'sneakers', 'sports']
const SIZES = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13]
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

function FilterSection({ title, children }) {
  return (
    <div className="py-5 border-b border-gray-100 dark:border-gray-800">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
        {title}
      </h4>
      {children}
    </div>
  )
}

export function FilterSidebar({ filters, onChange, onClose, isMobile }) {
  function setFilter(key, value) {
    onChange({ ...filters, [key]: value })
  }

  function toggleSize(size) {
    const next = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size]
    onChange({ ...filters, sizes: next })
  }

  function clearAll() {
    onChange({ category: '', sizes: [], priceRange: [0, 50000], sortBy: 'featured' })
  }

  const hasActive =
    filters.category || filters.sizes.length > 0 || filters.sortBy !== 'featured'

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between py-4 px-0 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
        <div className="flex items-center gap-3">
          {hasActive && (
            <button
              onClick={clearAll}
              className="text-xs text-accent font-medium hover:underline"
            >
              Clear all
            </button>
          )}
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Sort */}
        <FilterSection title="Sort by">
          <div className="space-y-2">
            {SORT_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={clsx(
                    'w-4 h-4 rounded-full border-2 transition-colors',
                    filters.sortBy === opt.value
                      ? 'border-accent bg-accent'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-gray-400'
                  )}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {opt.label}
                </span>
                <input
                  type="radio"
                  name="sort"
                  value={opt.value}
                  checked={filters.sortBy === opt.value}
                  onChange={() => setFilter('sortBy', opt.value)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Category */}
        <FilterSection title="Category">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter('category', filters.category === cat ? '' : cat)}
                className={clsx(
                  'px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-200',
                  filters.category === cat
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
              <span>Rs. {filters.priceRange[0].toLocaleString('en-IN')}</span>
              <span>Rs. {filters.priceRange[1].toLocaleString('en-IN')}+</span>
            </div>
            <input
              type="range"
              min={0}
              max={50000}
              step={500}
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])
              }
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-accent bg-gray-200 dark:bg-gray-700"
            />
          </div>
        </FilterSection>

        {/* Sizes */}
        <FilterSection title="Size (US)">
          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={clsx(
                  'w-11 h-9 rounded-lg text-xs font-medium transition-all duration-200',
                  filters.sizes.includes(size)
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Mobile apply button */}
      {isMobile && (
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold text-sm"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-950 rounded-t-3xl px-6 pb-6 pt-4 max-h-[85vh] flex flex-col"
          >
            <div className="w-10 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4" />
            {content}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return <div>{content}</div>
}
