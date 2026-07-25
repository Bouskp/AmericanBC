import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'

export function FilterSidebar() {
  return (
    <Card className='border-muted/60 shadow-sm'>
      <CardContent className='p-5 space-y-6'>
        {/* Filtre 1 : Trier par */}
        <div className='space-y-2'>
          <h3 className='text-xs font-bold uppercase tracking-wider text-zinc-400'>
            Trier par
          </h3>
          <div className='flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400'>
            <label className='flex items-center gap-2 cursor-pointer hover:text-primary'>
              <input
                type='radio'
                name='sort'
                defaultChecked
                className='accent-primary'
              />
              <span>Nouveautés</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer hover:text-primary'>
              <input type='radio' name='sort' className='accent-primary' />
              <span>Prix : Croissant</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer hover:text-primary'>
              <input type='radio' name='sort' className='accent-primary' />
              <span>Prix : Décroissant</span>
            </label>
          </div>
        </div>

        {/* Filtre 2 : Disponibilité (COD / Stock) */}
        <div className='space-y-2 border-t pt-4'>
          <h3 className='text-xs font-bold uppercase tracking-wider text-zinc-400'>
            Options
          </h3>
          <div className='flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400'>
            <label className='flex items-center gap-2 cursor-pointer hover:text-primary'>
              <input
                type='checkbox'
                className='rounded border-zinc-300 accent-primary'
              />
              <span>Articles en Stock</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer hover:text-primary'>
              <input
                type='checkbox'
                className='rounded border-zinc-300 accent-primary'
              />
              <span>Éligible Cash on Delivery</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
