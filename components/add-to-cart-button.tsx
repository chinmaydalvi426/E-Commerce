"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  compact?: boolean
}

export default function AddToCartButton({ product, compact = false }: AddToCartButtonProps) {
  const [mounted, setMounted] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart, isLoading } = useCart()

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to prevent hydration errors
  if (!mounted) {
    return null
  }

  const handleAddToCart = () => {
    setIsAdding(true)

    // Simulate a small delay to show loading state
    setTimeout(() => {
      addToCart({
        ...product,
        quantity: 1,
      })
      setIsAdding(false)
    }, 500)
  }

  if (compact) {
    return (
      <Button
        size="sm"
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={handleAddToCart}
        disabled={isAdding || isLoading}
      >
        {isAdding || isLoading ? <span className="animate-pulse">...</span> : <span>+</span>}
        <span className="sr-only">Add to cart</span>
      </Button>
    )
  }

  return (
    <Button onClick={handleAddToCart} disabled={isAdding || isLoading} className="flex-1">
      {isAdding || isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}

