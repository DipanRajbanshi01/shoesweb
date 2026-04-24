import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { CATEGORIES } from '../../data/products'

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function CategoryCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        to={`/shop/${category.slug}`}
        className="group block relative rounded-3xl overflow-hidden aspect-[3/4]"
      >
        {/* Image */}
        <img
          src={category.image}
          alt={category.label}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-1">
            {category.description}
          </p>
          <div className="flex items-center justify-between">
            <h3 className="text-white text-2xl font-bold">{category.label}</h3>
            <span className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-accent group-hover:border-accent transition-all duration-300">
              <ArrowIcon />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function CategoriesSection() {
  return (
    <section className="section-gap layout-pad">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="text-accent text-sm font-semibold uppercase tracking-widest">Browse by</span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Shop the Collection
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {CATEGORIES.map((cat, i) => (
          <CategoryCard key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </section>
  )
}
