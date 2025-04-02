import { NextResponse } from "next/server"

// Mock products data - in a real app, this would come from MongoDB
const products = [
  {
    id: "1",
    name: "Classic White Shirt",
    brand: "StyleBrand",
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    category: "men",
    subcategory: "shirts",
    rating: 4.5,
    reviewCount: 127,
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    brand: "DenimCo",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    category: "men",
    subcategory: "jeans",
    rating: 4.2,
    reviewCount: 89,
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
  },
  {
    id: "3",
    name: "Summer Floral Dress",
    brand: "Floralia",
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    category: "women",
    subcategory: "dresses",
    rating: 4.7,
    reviewCount: 156,
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
  },
  {
    id: "4",
    name: "Casual Sneakers",
    brand: "FootStyle",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    category: "accessories",
    subcategory: "shoes",
    rating: 4.4,
    reviewCount: 112,
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
  },
  {
    id: "5",
    name: "Leather Jacket",
    brand: "LeatherLux",
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    category: "men",
    subcategory: "jackets",
    rating: 4.8,
    reviewCount: 78,
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
  },
  {
    id: "6",
    name: "Printed T-Shirt",
    brand: "GraphicTees",
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    category: "men",
    subcategory: "t-shirts",
    rating: 4.1,
    reviewCount: 203,
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
  },
  {
    id: "7",
    name: "Formal Blazer",
    brand: "FormalEdge",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    category: "men",
    subcategory: "blazers",
    rating: 4.6,
    reviewCount: 67,
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
  },
  {
    id: "8",
    name: "Designer Handbag",
    brand: "BagCouture",
    price: 69.99,
    originalPrice: 99.99,
    discount: 30,
    category: "accessories",
    subcategory: "bags",
    rating: 4.9,
    reviewCount: 142,
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Filter by category
  const category = searchParams.get("category")
  const subcategory = searchParams.get("subcategory")
  const query = searchParams.get("query")?.toLowerCase()

  let filteredProducts = [...products]

  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.category === category)
  }

  if (subcategory) {
    filteredProducts = filteredProducts.filter((product) => product.subcategory === subcategory)
  }

  if (query) {
    filteredProducts = filteredProducts.filter(
      (product) => product.name.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query),
    )
  }

  return NextResponse.json(filteredProducts)
}

export async function POST(request: Request) {
  try {
    const product = await request.json()

    // In a real app, this would save to MongoDB
    // For now, we'll just return the product with a mock ID
    const newProduct = {
      ...product,
      id: (products.length + 1).toString(),
      rating: 0,
      reviewCount: 0,
    }

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

