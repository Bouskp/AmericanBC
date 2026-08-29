'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface Term {
  id: number
  name: string
  slug: string
  count: number
}

export default function ProductFilters({
  categories,
  brands,
}: {
  categories: Term[]
  brands: Term[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category') ?? ''
  const currentBrand = searchParams.get('brand') ?? ''

  function updateFilter(key: 'category' | 'brand', value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='space-y-6'>
      <FilterGroup
        title='Catégorie'
        items={categories}
        current={currentCategory}
        getValue={(c) => c.slug}
        onSelect={(v) => updateFilter('category', v)}
      />
      <FilterGroup
        title='Marque'
        items={brands}
        current={currentBrand}
        getValue={(b) => b.slug}
        onSelect={(v) => updateFilter('brand', v)}
      />
    </div>
  )
}

function FilterGroup({
  title,
  items,
  current,
  getValue,
  onSelect,
}: {
  title: string
  items: Term[]
  current: string
  getValue: (item: Term) => string
  onSelect: (value: string) => void
}) {
  return (
    <div>
      <h3 className='font-medium mb-2'>{title}</h3>
      <div className='space-y-1'>
        <button
          onClick={() => onSelect('')}
          className={`block text-sm ${!current ? 'font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Toutes
        </button>
        {items.map((item) => {
          const value = getValue(item)
          return (
            <button
              key={item.id}
              onClick={() => onSelect(value)}
              className={`block text-sm ${current === value ? 'font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {item.name} ({item.count})
            </button>
          )
        })}
      </div>
    </div>
  )
}
