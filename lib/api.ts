// This file handles API calls to our Express.js backend
import { clear } from "console";
import type { Product } from "./types";

// API base URL (use environment variable for flexibility)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5328/api";

// API functions
export async function fetchProducts(
  category?: string,
  minPrice?: number,
  maxPrice?: number
): Promise<Product[]> {
  try {
    // Build query string
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (minPrice !== undefined) params.append("min_price", minPrice.toString());
    if (maxPrice !== undefined) params.append("max_price", maxPrice.toString());

    const queryString = params.toString() ? `?${params.toString()}` : "";

    // Fetch products
    const response = await fetch(`${API_BASE_URL}/products${queryString}`, {
      cache: "no-store", // Optional: disable caching for fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array on error
  }
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return undefined;
  }
}

export async function fetchRelatedProducts(category: string, excludeId: string): Promise<Product[]> {
  try {
    const params = new URLSearchParams({
      category,
      exclude_id: excludeId,
    });

    // Modified endpoint to match the backend structure
    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch related products: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching related products:", error);
    return []; // Return empty array on error
  }
}

// Cart API functions
export async function fetchCart(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`);

    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching cart:", error);
    return []; // Return empty array on error
  }
}

export async function addToCart(productId: string, quantity: number): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        quantity,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add to cart: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

export async function updateCartItem(productId: string, quantity: number): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        quantity,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update cart item: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
}

export async function removeFromCart(productId: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart?product_id=${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to remove from cart: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
}

export async function clearCart(): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to clear cart: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
}

// Auth API functions
export async function registerUser(userData: {
  email: string;
  password: string;
  name?: string;
}): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Registration failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function loginUser(credentials: { email: string; password: string }): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Login failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}