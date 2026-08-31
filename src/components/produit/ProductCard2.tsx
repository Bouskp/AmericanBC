'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '../../../store/useCartStore'

interface ProductCardProps {
  id: string
  name: string
  price: string
  slug: string
  imageUrl: string
  category?: string
}

export function ProductCard2({
  id,
  name,
  price,
  slug,
  imageUrl,
  category,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Évite de déclencher le lien de la carte lors du clic sur le bouton
    addItem({
      id,
      name,
      price: Number(price),
      slug,
      imageUrl: imageUrl,
      category,
    })
  }

  return (
    <div className='group relative flex flex-col bg-white border border-transparent rounded-lg transition-all duration-300 text-left'>
      {/* ─── ZONE IMAGE : PROPRE, CARRÉE OU PORTRAIT SANS COINS ARRONDIS ─── */}
      <Link
        href={`/produit/${slug}`}
        className='relative aspect-[4/5] w-full overflow-hidden border border-gray-100 rounded-none'
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes='(max-w-768px) 50vw, 25vw'
          className='object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-102'
        />

        {/* BOUTON D'AJOUT RAPIDE AU SURVOL (S'affiche élégamment sur ordinateur) */}
        <div className='absolute inset-x-3 bottom-3 opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 hidden md:block'>
          <Button
            size='sm'
            variant='default'
            onClick={handleAddToCart}
            className='w-full h-9 rounded-none bg-black/90 hover:bg-black text-white text-[11px] font-sans font-light uppercase tracking-[0.14em] transition-colors gap-1.5 shadow-sm'
          >
            <Plus className='h-3.5 w-3.5' />
            Ajouter au panier
          </Button>
        </div>
      </Link>

      {/* ─── METADONNÉES ET DETAILS (AÉRÉS ET ASSIGNÉS EN BAS) ─── */}
      <div className='pt-4 px-4 flex flex-col flex-1 justify-between'>
        <div className='space-y-2'>
          {/* Catégorie : Signature visuelle fine de la marque */}
          {category && (
            <p className='text-[10px] font-sans font-light uppercase tracking-[0.14em] text-gray-400'>
              {category}
            </p>
          )}

          {/* Nom du produit : Style Éditorial / Presse avec police Serif légère */}
          <h3 className='font-serif text-sm md:text-base font-light text-black tracking-wide leading-tight lowercase first-letter:uppercase transition-colors group-hover:text-gray-600 line-clamp-2'>
            <Link href={`/produit/${slug}`}>{name}</Link>
          </h3>
        </div>

        {/* Prix et bouton d'action mobile */}
        <div className='flex items-center justify-between mt-1 py-2'>
          <div className='font-sans text-sm md:text-base font-medium text-gray-900'>
            {Number(price).toLocaleString()} FCFA
          </div>

          {/* Bouton d'ajout minimaliste affiché UNIQUEMENT sur mobile (pour préserver l'UX tactile) */}
          <button
            onClick={handleAddToCart}
            aria-label='Ajouter au panier'
            className='md:hidden h-7 w-7 flex items-center justify-center border border-gray-200 rounded-none text-black active:bg-gray-50'
          >
            <Plus className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  )
}
