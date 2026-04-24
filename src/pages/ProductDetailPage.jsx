import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/CartContext'
import { ImageGallery } from '../components/product/ImageGallery'
import { SizeSelector } from '../components/product/SizeSelector'
import { ColorSelector } from '../components/product/ColorSelector'
import { ProductGrid } from '../components/shop/ProductGrid'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { formatPrice, formatDiscount } from '../utils/formatPrice'

function StarIcon({ filled = true }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      className={filled ? 'text-amber-400' : 'text-gray-300'}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  )
}

export function ProductDetailPage() {
  const { id } = useParams()
  const product = PRODUCTS.find((p) => p.id === id)
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  if (!product) return <Navigate to="/shop" replace />

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4)

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 3000)
      return
    }
    addItem(product, selectedSize, selectedColor || product.colors[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const discount = product.originalPrice
    ? formatDiscount(product.originalPrice, product.price)
    : null

  const stars = Math.round(product.rating)

  return (
    <div className="pt-20 md:pt-24">
      {/* Breadcrumb */}
      <div className="layout-pad py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Shop</Link>
          <span>/</span>
          <Link
            to={`/shop/${product.category}`}
            className="hover:text-gray-600 dark:hover:text-gray-300 capitalize transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-300 truncate max-w-[150px]">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="layout-pad py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ImageGallery images={product.images} productName={product.name} />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start"
          >
            {/* Brand + Badges */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                {product.brand}
              </span>
              {product.isNew && <Badge label="New" variant="new" />}
              {product.isTrending && <Badge label="Trending" variant="trending" />}
            </div>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < stars} />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                    {discount}
                  </span>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 dark:bg-gray-800" />

            {/* Color Selector */}
            <ColorSelector
              colors={product.colors}
              selected={selectedColor ?? product.colors[0]}
              onChange={setSelectedColor}
            />

            {/* Size Selector */}
            <SizeSelector
              sizes={product.sizes}
              selected={selectedSize}
              onChange={(s) => {
                setSelectedSize(s)
                setSizeError(false)
              }}
              error={sizeError}
            />

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-accent dark:hover:bg-accent dark:hover:text-white'
                }`}
              >
                {added ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <CartIcon />
                    Add to Cart
                  </>
                )}
              </motion.button>

              <button
                onClick={() => setWishlist((w) => !w)}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  wishlist
                    ? 'border-red-400 bg-red-50 text-red-500 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                aria-label="Add to wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: '🚚', label: 'Free shipping', sub: 'on orders Rs. 13,000+' },
                { icon: '↩', label: 'Easy returns', sub: '30 day policy' },
                { icon: '🔒', label: 'Secure checkout', sub: 'SSL encrypted' },
              ].map(({ icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50"
                >
                  <span className="text-xl mb-1">{icon}</span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{label}</span>
                  <span className="text-xs text-gray-400 mt-0.5">{sub}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Details Accordion */}
            <details className="group border-t border-gray-100 dark:border-gray-800 pt-4">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-gray-900 dark:text-white list-none">
                Specifications
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-200 group-open:rotate-180"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex justify-between">
                  <span>Brand</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{product.brand}</span>
                </li>
                <li className="flex justify-between">
                  <span>Category</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{product.category}</span>
                </li>
                <li className="flex justify-between">
                  <span>Available sizes</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {product.sizes[0]} – {product.sizes[product.sizes.length - 1]} US
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Colors available</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{product.colors.length}</span>
                </li>
              </ul>
            </details>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="layout-pad section-gap border-t border-gray-100 dark:border-gray-800">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">
              You may also like
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Related Products
            </h2>
          </motion.div>
          <ProductGrid products={related} columns={4} />
        </section>
      )}
    </div>
  )
}
