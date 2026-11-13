'use client'

import * as React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import ProductFilters from '@/components/ProductFilters'

type Term = { id: number; name: string; slug: string; count: number }

export default function MobileFilters({
  categories,
  brands,
  total,
  activeLabel,
}: {
  categories: Term[]
  brands: Term[]
  total: number
  activeLabel?: string
}) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Catégorie et marque sont exclusives : 0 ou 1 filtre actif
  const hasFilter = Boolean(
    searchParams.get('category') || searchParams.get('brand'),
  )

  return (
    <div className='lg:hidden sticky top-0 z-30 -mx-4 mb-6 bg-brand-red px-4 py-3 text-white shadow-md'>
      <div className='flex items-center justify-between gap-3'>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type='button'
              className='relative inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-brand-red shadow-sm transition-transform active:scale-95'
            >
              <SlidersHorizontal className='h-4 w-4' aria-hidden />
              Filtrer
              {hasFilter && (
                <span className='ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white'>
                  1
                </span>
              )}
            </button>
          </SheetTrigger>

          <SheetContent
            side='bottom'
            className='max-h-[85vh] overflow-y-auto rounded-t-3xl px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          >
            <SheetHeader className='mb-5 flex-row items-center justify-between space-y-0 border-b border-gray-200 pb-4 text-left'>
              <SheetTitle className='text-base font-bold uppercase tracking-[0.12em]'>
                Filtrer par
              </SheetTitle>
              {hasFilter && (
                <button
                  type='button'
                  onClick={() => {
                    router.push(pathname, { scroll: false })
                    setOpen(false)
                  }}
                  className='mr-8 text-sm font-medium text-brand-red underline underline-offset-4'
                >
                  Tout effacer
                </button>
              )}
            </SheetHeader>

            <ProductFilters
              categories={categories}
              brands={brands}
              onChange={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <p className='text-sm text-white'>
          <span className='font-bold'>{total}</span> produit
          {total > 1 ? 's' : ''}
        </p>
      </div>

      {/* Filtre actif, effaçable d'un tap */}
      {activeLabel && (
        <button
          type='button'
          onClick={() => router.push(pathname, { scroll: false })}
          className='mt-3 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/15 px-4 py-1.5 text-sm font-medium text-white'
        >
          {activeLabel}
          <X className='h-4 w-4' aria-hidden />
          <span className='sr-only'>Effacer le filtre</span>
        </button>
      )}
    </div>
  )
}
