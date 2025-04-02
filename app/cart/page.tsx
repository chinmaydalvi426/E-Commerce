"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const [subtotal, setSubtotal] = useState(0)

  // Initialize cart using useCart hook
  const { cart, updateQuantity, removeFromCart, isLoading } = useCart()

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate subtotal whenever cart changes
  useEffect(() => {
    if (mounted) {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      setSubtotal(total)
    }
  }, [cart, mounted])

  // Show loading state until client-side rendering is complete
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading cart...</p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow-sm">
            <div className="p-6">
              <div className="hidden md:grid md:grid-cols-5 text-sm font-medium text-muted-foreground mb-4">
                <div className="col-span-2">Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
              </div>

              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 md:grid md:grid-cols-5 md:items-center">
                    <div className="flex items-center col-span-2 mb-4 md:mb-0">
                      <div className="w-20 h-20 bg-muted rounded-md overflow-hidden mr-4">
                        <img
                          src={item.image || "/placeholder.svg?height=80&width=80"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          disabled={isLoading}
                          className="text-sm text-red-500 hover:underline mt-1 disabled:opacity-50"
                        >
                          {isLoading ? "Removing..." : "Remove"}
                        </button>
                      </div>
                    </div>

                    <div className="mb-4 md:mb-0">
                      <div className="md:hidden text-sm font-medium text-muted-foreground mb-1">Price</div>$
                      {item.price.toFixed(2)}
                    </div>

                    <div className="mb-4 md:mb-0">
                      <div className="md:hidden text-sm font-medium text-muted-foreground mb-1">Quantity</div>
                      <div className="flex items-center w-24">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={isLoading}
                          className="w-8 h-8 flex items-center justify-center border border-input rounded-l-md disabled:opacity-50"
                        >
                          -
                        </button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                          disabled={isLoading}
                          className="w-10 h-8 text-center rounded-none border-y border-input disabled:opacity-50"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          className="w-8 h-8 flex items-center justify-center border border-input rounded-r-md disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="md:hidden text-sm font-medium text-muted-foreground mb-1">Total</div>$
                      {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full mb-4" size="lg" disabled={isLoading}>
              {isLoading ? "Processing..." : "Proceed to Checkout"}
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

