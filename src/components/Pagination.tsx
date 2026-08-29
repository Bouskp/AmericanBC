'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    // scroll: false évite un saut de page brutal, l'expérience utilisateur reste fluide
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // Logique intelligente pour afficher "1 ... 4 5 6 ... 20" au lieu de tous les chiffres
  const getVisiblePages = () => {
    const pages: (number | string)[] = []
    const range = 1 // Nombre de pages à afficher avant et après la page courante

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - range && i <= currentPage + range)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages
  }

  return (
    <div className='flex items-center justify-center gap-1 md:gap-4 mt-12 py-4 border-t border-gray-50 w-full'>
      {/* Bouton Précédent : Texte brut, fin, en majuscules */}
      <Button
        variant='ghost'
        size='sm'
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className='font-sans text-[11px] uppercase tracking-[0.14em] font-light text-black hover:bg-transparent hover:text-gray-400 disabled:opacity-20 transition-colors'
      >
        ← Précédent
      </Button>

      {/* Liste des numéros de pages aérée */}
      <div className='flex items-center gap-1 font-sans text-xs'>
        {getVisiblePages().map((p, index) => {
          if (p === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className='px-2 text-gray-300 select-none font-light'
              >
                ...
              </span>
            )
          }

          const isCurrent = p === currentPage

          return (
            <Button
              key={`page-${p}`}
              variant='ghost'
              size='sm'
              onClick={() => goToPage(p as number)}
              className={`
                h-8 w-8 p-0 rounded-none text-xs transition-all duration-300 font-light
                ${
                  isCurrent
                    ? 'text-black font-bold border-b border-black bg-transparent hover:bg-transparent'
                    : 'text-gray-400 hover:text-black hover:bg-transparent'
                }
              `}
            >
              {p}
            </Button>
          )
        })}
      </div>

      {/* Bouton Suivant : Aligné symétriquement */}
      <Button
        variant='ghost'
        size='sm'
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className='font-sans text-[11px] uppercase tracking-[0.14em] font-light text-black hover:bg-transparent hover:text-gray-400 disabled:opacity-20 transition-colors'
      >
        Suivant →
      </Button>
    </div>
  )
}
