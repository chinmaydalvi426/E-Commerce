import { NextResponse } from "next/server"

// Mock users data - in a real app, this would come from MongoDB
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "hashed_password_1", // In a real app, this would be properly hashed
    addresses: [
      {
        id: "addr1",
        type: "home",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
        isDefault: true,
      },
    ],
    wishlist: ["1", "5", "8"],
    orders: ["order1", "order2"],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "hashed_password_2",
    addresses: [
      {
        id: "addr2",
        type: "home",
        street: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        country: "USA",
        isDefault: true,
      },
    ],
    wishlist: ["3", "4"],
    orders: ["order3"],
  },
]

export async function GET(request: Request) {
  // In a real app, this would be protected by authentication
  return NextResponse.json(
    users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    })),
  )
}

export async function POST(request: Request) {
  try {
    const userData = await request.json()

    // Check if email already exists
    const existingUser = users.find((user) => user.email === userData.email)
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    // In a real app, we would hash the password here
    const newUser = {
      id: (users.length + 1).toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // Should be hashed in production
      addresses: [],
      wishlist: [],
      orders: [],
    }

    // In a real app, this would save to MongoDB

    return NextResponse.json(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

