"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingBag, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product-card"

// Mock product data - in a real app, this would come from an API
const product = {
  id: "1",
  name: "Classic White Shirt",
  brand: "StyleBrand",
  price: 49.99,
  originalPrice: 69.99,
  discount: 29,
  rating: 4.5,
  reviewCount: 127,
  description:
    "A timeless classic white shirt made from premium cotton. Perfect for formal occasions or casual wear when paired with jeans. Features a regular fit with button-down collar.",
  features: [
    "100% Premium Cotton",
    "Regular Fit",
    "Button-Down Collar",
    "Machine Washable",
    "Available in Multiple Sizes",
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["White", "Light Blue", "Black", "Navy"],
  images: [
    "/placeholder.svg?height=600&width=500",
    "/placeholder.svg?height=600&width=500",
    "/placeholder.svg?height=600&width=500",
    "/placeholder.svg?height=600&width=500",
  ],
}

// Mock similar products
const similarProducts = [
  {
    id: "2",
    name: "Slim Fit Jeans",
    brand: "DenimCo",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.2,
  },
  {
    id: "3",
    name: "Summer Floral Dress",
    brand: "Floralia",
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Casual Sneakers",
    brand: "FootStyle",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.4,
  },
  {
    id: "5",
    name: "Leather Jacket",
    brand: "LeatherLux",
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("White")
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(product.images[0])
  const [isWishlisted, setIsWishlisted] = useState(false)

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/category/men" className="hover:text-primary">
            Men
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/category/men/shirts" className="hover:text-primary">
            Shirts
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>{product.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image src={mainImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square rounded-md overflow-hidden border-2 ${mainImage === image ? "border-primary" : "border-transparent"}`}
                onClick={() => setMainImage(image)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-lg text-muted-foreground">{product.brand}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <span className="text-sm">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="text-sm font-medium text-green-600">{product.discount}% OFF</span>
              </>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className="h-10 px-4"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Select Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  className="h-10 px-4"
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decreaseQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" size="lg">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Bag
            </Button>
            <Button variant="outline" size="lg" onClick={toggleWishlist}>
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg flex items-center gap-3">
            <Truck className="h-5 w-5 text-muted-foreground" />
            <div className="text-sm">
              <p className="font-medium">Free Delivery</p>
              <p className="text-muted-foreground">Free standard shipping on orders over $50</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="p-4">
          <p className="text-muted-foreground">{product.description}</p>
        </TabsContent>
        <TabsContent value="features" className="p-4">
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="reviews" className="p-4">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">{product.rating}</div>
              <div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{product.reviewCount} reviews</p>
              </div>
            </div>
            <Button>Write a Review</Button>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Similar Products</h2>
          <Link href="/products" className="text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {similarProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              brand={product.brand}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              image={product.image}
              rating={product.rating}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

