import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  title: string
  slug: string
  price: number
  compareAtPrice?: number
  image?: { url?: string; alt?: string } | null
}

function formatBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function ProductCard({ title, slug, price, compareAtPrice, image }: ProductCardProps) {
  const discount = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null

  return (
    <Link href={`/produtos/${slug}`} className="group block rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="relative aspect-square bg-gray-100">
        {image?.url && (
          <Image src={image.url} alt={image.alt || title} fill className="object-cover group-hover:scale-105 transition-transform" />
        )}
        {discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm group-hover:text-blue-600 transition-colors line-clamp-2">{title}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold">{formatBRL(price)}</span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-sm text-gray-400 line-through">{formatBRL(compareAtPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
