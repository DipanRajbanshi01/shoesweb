import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { PRODUCTS } from '../../data/products'
import { ProductCard } from '../shop/ProductCard'

export function TrendingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const trending = PRODUCTS.filter((p) => p.isTrending).slice(0, 5)

  return (
    <section className="section-gap">
      <div className="layout-pad">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">Hot right now</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Trending Now
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
          >
            See all
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div
        ref={ref}
        className="pl-6 md:pl-12 lg:pl-20 overflow-x-auto hide-scrollbar"
      >
        <div className="flex gap-4 md:gap-6 w-max md:w-auto pb-4">
          {trending.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-64 md:w-auto md:flex-1 flex-shrink-0"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
