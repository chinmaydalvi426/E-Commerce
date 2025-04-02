export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6"></div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 shrink-0">
          <div className="h-[400px] bg-muted animate-pulse rounded"></div>
        </aside>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-muted animate-pulse rounded-lg h-[300px]"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

