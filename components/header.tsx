"use client";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Fashion Store
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/products" className="hover:text-primary">Shop</Link>
            <Link href="/categories" className="hover:text-primary">Categories</Link>
            <Link href="/sale" className="hover:text-primary">Sale</Link>
            <Button variant="outline">
              <Link href="/cart">Cart (0)</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

