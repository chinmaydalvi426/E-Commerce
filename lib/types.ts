export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image?: string
  category: string
  rating: number
  reviews: number
  isNew?: boolean
  discount?: number
}

export interface CartItem extends Product {
  quantity: number
}

