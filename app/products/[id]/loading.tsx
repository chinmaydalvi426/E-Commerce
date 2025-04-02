export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-6 w-32 bg-muted animate-pulse rounded mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-muted animate-pulse rounded-lg h-[500px]"></div>

        <div>
          <div className="h-10 w-3/4 bg-muted animate-pulse rounded mb-4"></div>
          <div className="h-6 w-1/4 bg-muted animate-pulse rounded mb-6"></div>

          <div className="h-8 w-1/4 bg-muted animate-pulse rounded mb-6"></div>

          <div className="h-20 w-full bg-muted animate-pulse rounded mb-8"></div>

          <div className="h-6 w-1/4 bg-muted animate-pulse rounded mb-4"></div>
          <div className="flex gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-12 bg-muted animate-pulse rounded"></div>
            ))}
          </div>

          <div className="h-6 w-1/4 bg-muted animate-pulse rounded mb-4"></div>
          <div className="flex gap-2 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-16 bg-muted animate-pulse rounded"></div>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
            <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

