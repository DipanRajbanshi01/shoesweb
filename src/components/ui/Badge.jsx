import { clsx } from 'clsx'

const variants = {
  new: 'bg-accent text-white',
  trending: 'bg-gray-900 dark:bg-white text-white dark:text-gray-900',
  sale: 'bg-emerald-500 text-white',
}

export function Badge({ label, variant = 'new', className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase',
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
