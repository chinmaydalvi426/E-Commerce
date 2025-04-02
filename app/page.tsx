"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function Home() {
  const carouselSlides = [
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3",
      title: "New Season Arrivals",
      description: "Discover the latest trends in fashion and accessories for your wardrobe"
    },
    {
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3",
      title: "Winter Collection",
      description: "Stay warm and stylish with our curated winter essentials"
    },
    {
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3",
      title: "Mega Sale",
      description: "Up to 70% off on selected items. Limited time offer!"
    },
    {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3",
      title: "Trendy Styles",
      description: "Express yourself with the latest fashion trends"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <Splide
          options={{
            type: 'loop',
            autoplay: true,
            pauseOnHover: false,
            resetProgress: false,
            height: '500px',
            interval: 5000,
            arrows: true,
            pagination: true,
            rewind: true,
          }}
        >
          {carouselSlides.map((slide, index) => (
            <SplideSlide key={index}>
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-8 z-20 text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 hero-title tracking-tight">{slide.title}</h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-xl tracking-wide">
                    {slide.description}
                  </p>
                  <div>
                    <Button asChild size="lg" className="mr-4">
                      <Link href="/products">Shop Now</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="text-black border-white hover:text-black hover:bg-white">
                      <Link href="/products">View Collections</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Featured Categories</h2>
          <Link href="/products" className="text-primary hover:underline">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Women",
              image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3"
            },
            {
              name: "Men",
              image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-4.0.3"
            },
            {
              name: "Accessories",
              image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3"
            }
          ].map((category) => (
            <div key={category.name} className="relative h-[300px] rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/50 transition-colors" />
              <img
                src={category.image}
                alt={`${category.name} category`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-white">
                <h3 className="text-2xl font-bold mb-4">{category.name}</h3>
                <Button asChild variant="outline" className="text-black border-white hover:text-black hover:bg-white">
                  <Link href={`/products?category=${category.name.toLowerCase()}`}>Shop Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-center tracking-tight">Subscribe to Our Newsletter</h2>
          <p className="text-center mb-6">Stay updated with our latest offers and new arrivals</p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  )
}

