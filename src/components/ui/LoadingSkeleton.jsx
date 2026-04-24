export function CardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
      <div className="aspect-square shimmer-bg" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/3 rounded-full shimmer-bg" />
        <div className="h-4 w-2/3 rounded-full shimmer-bg" />
        <div className="h-4 w-1/4 rounded-full shimmer-bg" />
      </div>
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 layout-pad section-gap">
      <div className="space-y-4">
        <div className="aspect-square rounded-3xl shimmer-bg" />
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 w-20 rounded-xl shimmer-bg" />
          ))}
        </div>
      </div>
      <div className="space-y-6 pt-4">
        <div className="h-3 w-1/4 rounded-full shimmer-bg" />
        <div className="h-8 w-3/4 rounded-full shimmer-bg" />
        <div className="h-6 w-1/4 rounded-full shimmer-bg" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded-full shimmer-bg" />
          <div className="h-4 w-5/6 rounded-full shimmer-bg" />
          <div className="h-4 w-4/6 rounded-full shimmer-bg" />
        </div>
      </div>
    </div>
  )
}
