import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { fetchProductById, fetchRelatedProducts } from "@/lib/api"
import ProductCard from "@/components/product-card"
import AddToCartButton from "@/components/add-to-cart-button"

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Add error handling for data fetching
  let product
  let relatedProducts = []

  try {
    product = await fetchProductById(params.id)

    if (!product) {
      notFound()
    }

    relatedProducts = await fetchRelatedProducts(product.category, product.id)
  } catch (error) {
    console.error("Failed to fetch product data:", error)
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products" className="text-primary hover:underline flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-muted rounded-lg overflow-hidden">
          <img
            src={product.image || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            className="w-full h-[500px] object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <Button key={size} variant="outline" className="h-10 px-4">
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {["Black", "White", "Blue", "Red"].map((color) => (
                <Button key={color} variant="outline" className="h-10 px-4">
                  {color}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <AddToCartButton product={product} />
            <Button variant="outline">Add to Wishlist</Button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

