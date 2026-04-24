import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../../data/products'
import { ProductGrid } from '../shop/ProductGrid'

export function FeaturedProducts() {
  const featured = PRODUCTS.slice(0, 4)

  return (
    <section className="section-gap layout-pad bg-surface-light dark:bg-surface-dark">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between mb-10"
      >
        <div>
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">
            Hand-picked
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Featured Products
          </h2>
        </div>
        <Link
          to="/shop"
          className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
        >
          View all
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <ProductGrid products={featured} columns={4} />
      </motion.div>

      {/* Mobile "View all" */}
      <div className="mt-10 text-center sm:hidden">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-accent transition-colors"
        >
          View all products
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
