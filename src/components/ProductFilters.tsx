'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Term {
  id: number
  name: string
  slug: string
  count: number
}

export default function ProductFilters({
  categories,
  brands,
  onChange,
}: {
  categories: Term[]
  brands: Term[]
  onChange?: () => void
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
    // Catégorie et marque sont exclusives : on efface l'autre
    params.delete(key === 'category' ? 'brand' : 'category')
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    onChange?.() // ferme le panneau mobile après un choix
  }

  return (
    <div className='space-y-8'>
      <FilterGroup
        title='Catégorie'
        items={categories}
        current={currentCategory}
        onSelect={(v) => updateFilter('category', v)}
      />

      <div className='border-t border-gray-200' />

      <FilterGroup
        title='Marque'
        items={brands}
        current={currentBrand}
        onSelect={(v) => updateFilter('brand', v)}
      />
    </div>
  )
}

function FilterGroup({
  title,
  items,
  current,
  onSelect,
}: {
  title: string
  items: Term[]
  current: string
  onSelect: (value: string) => void
}) {
  return (
    <div>
      <h3 className='mb-3 text-xs font-bold uppercase tracking-[0.12em] text-secondary'>
        {title}
      </h3>

      <ul className='space-y-1.5'>
        <li>
          <FilterButton
            label='Toutes'
            active={!current}
            onClick={() => onSelect('')}
          />
        </li>

        {items.map((item) => (
          <li key={item.id}>
            <FilterButton
              label={item.name}
              count={item.count}
              active={current === item.slug}
              onClick={() => onSelect(item.slug)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function FilterButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count?: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'group flex w-full items-center gap-3 rounded-lg border-l-4 px-3 py-2.5 text-left text-sm transition-colors',
        active
          ? 'border-brand-red bg-brand-red/10 font-semibold text-brand-red'
          : 'border-transparent text-primary hover:bg-black/5',
      )}
    >
      {/* Pastille : coche rouge si sélectionné, cercle vide sinon */}
      <span
        aria-hidden
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          active
            ? 'border-brand-red bg-brand-red text-white'
            : 'border-gray-300 group-hover:border-brand-red/60',
        )}
      >
        {active && <Check className='h-3 w-3' strokeWidth={3} />}
      </span>

      <span className='flex-1 truncate'>{label}</span>

      {count !== undefined && (
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-xs tabular-nums',
            active ? 'bg-brand-red text-white' : 'bg-black/5 text-secondary',
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}
