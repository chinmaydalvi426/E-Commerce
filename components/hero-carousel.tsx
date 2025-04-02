"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=1600",
    title: "Summer Collection 2023",
    description: "Discover the latest trends for the season",
    link: "/category/summer",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=1600",
    title: "New Arrivals",
    description: "Be the first to shop our newest styles",
    link: "/products/new",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=1600",
    title: "Special Offers",
    description: "Up to 50% off on selected items",
    link: "/sale",
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [current])

  return (
    <div className="relative">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`relative transition-opacity duration-500 ${index === current ? "opacity-100" : "opacity-0 hidden"}`}
        >
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white p-4 max-w-md">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="mb-4">{slide.description}</p>
                <Button asChild>
                  <Link href={slide.link}>Shop Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === current ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  )
}

