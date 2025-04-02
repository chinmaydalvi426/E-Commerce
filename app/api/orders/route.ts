import { NextResponse } from "next/server"

// Mock orders data - in a real app, this would come from MongoDB
const orders = [
  {
    id: "order1",
    userId: "1",
    items: [
      {
        productId: "1",
        name: "Classic White Shirt",
        price: 49.99,
        quantity: 1,
        size: "M",
        color: "White",
      },
      {
        productId: "2",
        name: "Slim Fit Jeans",
        price: 59.99,
        quantity: 1,
        size: "32",
        color: "Blue",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    paymentMethod: "Credit Card",
    paymentDetails: {
      last4: "4242",
      brand: "Visa",
    },
    subtotal: 109.98,
    shipping: 0,
    discount: 0,
    total: 109.98,
    status: "delivered",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-18T14:20:00Z",
  },
  {
    id: "order2",
    userId: "1",
    items: [
      {
        productId: "5",
        name: "Leather Jacket",
        price: 129.99,
        quantity: 1,
        size: "L",
        color: "Black",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    paymentMethod: "PayPal",
    paymentDetails: {
      email: "john@example.com",
    },
    subtotal: 129.99,
    shipping: 0,
    discount: 0,
    total: 129.99,
    status: "shipped",
    createdAt: "2023-07-20T15:45:00Z",
    updatedAt: "2023-07-21T09:10:00Z",
  },
  {
    id: "order3",
    userId: "2",
    items: [
      {
        productId: "3",
        name: "Summer Floral Dress",
        price: 39.99,
        quantity: 1,
        size: "S",
        color: "Floral",
      },
      {
        productId: "8",
        name: "Designer Handbag",
        price: 69.99,
        quantity: 1,
        size: "One Size",
        color: "Brown",
      },
    ],
    shippingAddress: {
      name: "Jane Smith",
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
    paymentMethod: "Credit Card",
    paymentDetails: {
      last4: "1234",
      brand: "Mastercard",
    },
    subtotal: 109.98,
    shipping: 0,
    discount: 10.0,
    total: 99.98,
    status: "processing",
    createdAt: "2023-08-05T12:15:00Z",
    updatedAt: "2023-08-05T12:15:00Z",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const orderId = searchParams.get("orderId")

  // In a real app, this would be protected by authentication

  if (orderId) {
    const order = orders.find((order) => order.id === orderId)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }
    return NextResponse.json(order)
  }

  if (userId) {
    const userOrders = orders.filter((order) => order.userId === userId)
    return NextResponse.json(userOrders)
  }

  return NextResponse.json(orders)
}

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    // Validate required fields
    if (!orderData.userId || !orderData.items || !orderData.shippingAddress || !orderData.paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, we would validate the user, check product availability, etc.

    const newOrder = {
      id: `order${orders.length + 1}`,
      ...orderData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In a real app, this would save to MongoDB

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

