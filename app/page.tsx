import Link from "next/link"
import { Button } from "@/components/ui/button"

// Simplified home page that doesn't depend on data fetching or client components
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
          <img
            src="/placeholder.svg?height=500&width=1200"
            alt="Fashion collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 z-20 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">New Season Arrivals</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-xl">
              Discover the latest trends in fashion and accessories for your wardrobe
            </p>
            <div>
              <Button asChild size="lg" className="mr-4">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:text-black hover:bg-white">
                <Link href="/products">View Collections</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Categories</h2>
          <Link href="/products" className="text-primary hover:underline">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Women", "Men", "Accessories"].map((category) => (
            <div key={category} className="relative h-[300px] rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/50 transition-colors" />
              <img
                src={`/placeholder.svg?height=300&width=400&text=${category}`}
                alt={`${category} category`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-white">
                <h3 className="text-2xl font-bold mb-4">{category}</h3>
                <Button asChild variant="outline" className="text-white border-white hover:text-black hover:bg-white">
                  <Link href={`/products?category=${category.toLowerCase()}`}>Shop Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Subscribe to Our Newsletter</h2>
          <p className="text-center mb-6">Stay updated with our latest offers and new arrivals</p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  )
}

