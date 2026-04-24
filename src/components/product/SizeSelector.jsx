import { motion } from 'framer-motion'
import { clsx } from 'clsx'

export function SizeSelector({ sizes, selected, onChange, error }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          Size <span className="text-gray-400 font-normal">(US)</span>
        </span>
        <button className="text-xs text-accent hover:underline font-medium">Size Guide</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <motion.button
            key={size}
            whileTap={{ scale: 0.93 }}
            onClick={() => onChange(size)}
            className={clsx(
              'h-11 min-w-[2.75rem] px-2 rounded-xl text-sm font-medium border-2 transition-all duration-200',
              selected === size
                ? 'border-accent bg-accent text-white'
                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-900'
            )}
          >
            {size}
          </motion.button>
        ))}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-500 font-medium"
        >
          Please select a size to continue
        </motion.p>
      )}
    </div>
  )
}
