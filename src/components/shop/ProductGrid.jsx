import { ProductCard } from './ProductCard'
import { CardSkeleton } from '../ui/LoadingSkeleton'

export function ProductGrid({ products = [], loading = false, columns = 4 }) {
  const colClass = {
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }[columns] ?? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

  if (loading) {
    return (
      <div className={`grid grid-cols-1 ${colClass} gap-6 md:gap-8`}>
        {Array.from({ length: columns === 3 ? 6 : 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!loading && products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-4xl mb-4">👟</p>
        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">No products found</p>
        <p className="text-gray-400 dark:text-gray-600 text-sm mt-1">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-6 md:gap-8`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
