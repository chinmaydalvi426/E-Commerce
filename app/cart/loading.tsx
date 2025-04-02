export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-10 w-48 bg-muted animate-pulse rounded mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-muted animate-pulse rounded-lg h-[300px]"></div>
        </div>

        <div>
          <div className="bg-muted animate-pulse rounded-lg h-[300px]"></div>
        </div>
      </div>
    </div>
  )
}

