'use client'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FilterSidebar } from '@/components/filter/FilterSideBar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet'

export function MobileFilterTrigger() {
  return (
    <div className='md:hidden w-full sm:w-auto'>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='w-full sm:w-auto gap-2 font-semibold'
          >
            <SlidersHorizontal className='h-4 w-4' />
            Filtrer & Trier
          </Button>
        </SheetTrigger>
        <SheetContent side='bottom' className='h-[70vh] rounded-t-xl p-6'>
          <SheetHeader className='text-left pb-4'>
            <SheetTitle className='text-lg font-bold'>
              Filtres de recherche
            </SheetTitle>
            <SheetDescription className='sr-only'>
              Ajustez l'affichage des produits de ce rayon.
            </SheetDescription>
          </SheetHeader>

          {/* On réutilise directement le même composant de filtres qu'on décaisse de sa carte */}
          <div className='overflow-y-auto h-full pb-12'>
            <FilterSidebar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
