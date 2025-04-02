import Link from "next/link"
import type { Product } from "@/lib/types"
import AddToCartButton from "./add-to-cart-button"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Add default values to prevent rendering errors
  const {
    id = "",
    name = "",
    description = "",
    price = 0,
    originalPrice,
    image = "",
    isNew = false,
    discount = 0,
    rating = 0,
  } = product || {}

  if (!product) {
    return null // Don't render anything if product is undefined
  }

  return (
    <div className="group bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${id}`} className="block relative">
        <div className="aspect-square bg-muted overflow-hidden">
          <img
            src={image || "/placeholder.svg?height=300&width=300"}
            alt={name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        {isNew && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
            New
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${id}`} className="block">
            <h3 className="font-medium line-clamp-1">{name}</h3>
          </Link>
          <div className="flex items-center">
            {/* Replace complex SVG with simpler rating display */}
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-xs">{rating}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-muted-foreground text-sm line-through ml-2">${originalPrice.toFixed(2)}</span>
            )}
          </div>

          <AddToCartButton product={product} compact />
        </div>
      </div>
    </div>
  )
}

