import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
  title: string
  image: string
  link: string
}

export function CategoryCard({ title, image, link }: CategoryCardProps) {
  return (
    <Link href={link} className="group">
      <div className="relative overflow-hidden rounded-md">
        <div className="aspect-square relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h3 className="text-white font-bold text-xl">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}

