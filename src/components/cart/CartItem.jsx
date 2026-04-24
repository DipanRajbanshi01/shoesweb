import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatPrice'

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  )
}

export function CartItem({ item }) {
  const { removeItem, updateQty } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      className="flex gap-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0"
    >
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{item.brand}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate mt-0.5">
          {item.name}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Size: {item.selectedSize}
          {item.selectedColor && (
            <>
              {' · '}
              <span
                className="inline-block w-3 h-3 rounded-full border border-gray-200 align-middle ml-1"
                style={{ backgroundColor: item.selectedColor }}
              />
            </>
          )}
        </p>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity */}
          <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5">
            <button
              onClick={() => updateQty(item.cartItemId, item.quantity - 1)}
              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              −
            </button>
            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQty(item.cartItemId, item.quantity + 1)}
              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              +
            </button>
          </div>

          {/* Price + Remove */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.cartItemId)}
              className="text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors"
              aria-label="Remove item"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
