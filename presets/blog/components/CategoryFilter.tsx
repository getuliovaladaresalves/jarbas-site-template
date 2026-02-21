'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface Category {
  id: string
  title: string
  slug: string
}

export function CategoryFilter({ categories, activeSlug }: { categories: Category[]; activeSlug?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleClick(slug?: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set('category', slug)
    } else {
      params.delete('category')
    }
    params.delete('page')
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleClick()}
        className={`px-4 py-1.5 rounded-full text-sm transition-colors ${!activeSlug ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleClick(cat.slug)}
          className={`px-4 py-1.5 rounded-full text-sm transition-colors ${activeSlug === cat.slug ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  )
}
