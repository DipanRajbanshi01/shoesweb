import { motion } from 'framer-motion'
import { clsx } from 'clsx'

export function ColorSelector({ colors, selected, onChange }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">Color</span>
        {selected && (
          <span className="text-xs text-gray-400 font-mono">{selected}</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {colors.map((color) => (
          <motion.button
            key={color}
            whileTap={{ scale: 0.88 }}
            onClick={() => onChange(color)}
            title={color}
            className={clsx(
              'w-8 h-8 rounded-full transition-all duration-200',
              selected === color
                ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white dark:ring-offset-surface-dark scale-110'
                : 'hover:scale-105 ring-1 ring-gray-200 dark:ring-gray-700'
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  )
}
