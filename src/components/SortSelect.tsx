'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Nouveautés' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'popularity-desc', label: 'Popularité' },
  { value: 'title-asc', label: 'Nom (A-Z)' },
]

export default function SortSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get('sort') ?? 'date-desc'

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'date-desc') {
      params.delete('sort') // Valeur par défaut, on nettoie l'URL
    } else {
      params.set('sort', value)
    }
    params.delete('page') // On repart à la page 1 lors d'un nouveau tri
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Select value={currentSort} onValueChange={handleChange}>
      {/* 
        SelectTrigger Épuré :
        - rounded-none : Angles droits stricts
        - border-0 border-b border-gray-200 : Seule une fine ligne sous le tri apparaît
        - bg-transparent px-0 : Pas de fond gris ni de padding interne lourd
        - text-xs uppercase tracking-[0.14em] : Typographie éditoriale de luxe
      */}
      <SelectTrigger className='w-[180px] rounded-none border-0 border-b border-gray-200 bg-transparent px-0 h-9 text-[11px] font-sans font-light uppercase tracking-[0.14em] text-black focus:ring-0 focus:ring-offset-0 shadow-none transition-colors hover:border-black group'>
        <span className='text-gray-400 mr-1 normal-case tracking-normal font-normal'>
          Trier par :{' '}
        </span>
        <SelectValue placeholder='Nouveautés' />
      </SelectTrigger>

      {/* 
        SelectContent Épuré :
        - rounded-none : Suppression complète des arrondis
        - border-gray-100 : Contours extrêmement doux pour le menu
      */}
      <SelectContent className='rounded-none border-gray-100 bg-white shadow-xl shadow-black/5 min-w-[180px]'>
        {SORT_OPTIONS.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className='rounded-none text-xs font-sans font-light text-gray-600 focus:bg-gray-50 focus:text-black cursor-pointer py-2.5 transition-colors data-[state=checked]:font-medium data-[state=checked]:text-black'
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
