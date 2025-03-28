"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem } from "./types"

// Create a default context value to avoid undefined errors
const defaultContextValue = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  isLoading: false,
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isLoading: boolean
}

const CartContext = createContext<CartContextType>(defaultContextValue)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load cart from localStorage only on client-side
  useEffect(() => {
    if (isClient) {
      try {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
          setCart(JSON.parse(savedCart))
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [isClient])

  // Save cart to localStorage whenever it changes (only on client-side)
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart))
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error)
      }
    }
  }, [cart, isClient])

  const addToCart = async (item: CartItem) => {
    if (!item) return

    setIsLoading(true)

    try {
      // In a real app, you would call the API to add the item to the cart
      // For now, we'll just update the local state
      // await apiAddToCart(item.id, item.quantity);

      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id)

        if (existingItemIndex !== -1) {
          // Item already exists, update quantity
          const updatedCart = [...prevCart]
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + item.quantity,
          }
          return updatedCart
        } else {
          // Item doesn't exist, add it
          return [...prevCart, item]
        }
      })
    } catch (error) {
      console.error("Failed to add item to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromCart = async (id: string) => {
    if (!id) return

    setIsLoading(true)

    try {
      // In a real app, you would call the API to remove the item from the cart
      // For now, we'll just update the local state
      // await apiRemoveFromCart(id);

      setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Failed to remove item from cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    if (!id || quantity < 1) return

    setIsLoading(true)

    try {
      // In a real app, you would call the API to update the item quantity
      // For now, we'll just update the local state
      // await apiUpdateCartItem(id, quantity);

      setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
    } catch (error) {
      console.error("Failed to update item quantity:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = async () => {
    setIsLoading(true)

    try {
      // In a real app, you would call the API to clear the cart
      // For now, we'll just update the local state
      // await apiClearCart();

      setCart([])
    } catch (error) {
      console.error("Failed to clear cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isLoading }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

