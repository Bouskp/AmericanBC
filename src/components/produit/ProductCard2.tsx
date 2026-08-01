'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  name: string
  price: string
  slug: string
  imageUrl: string
  category?: string
}

export function ProductCard2({
  name,
  price,
  slug,
  imageUrl,
  category,
}: ProductCardProps) {
  return (
    <div className='group relative flex flex-col gap-4 bg-white p-2 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50'>
      {/* ─── ZONE IMAGE : PORTRAIT 4/5 ─── */}
      <Link
        href={`/produit/${slug}`}
        className='relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#FFF]'
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          priority
          sizes='(max-width: 768px) 50vw, 25vw'
          className='object-contain p-6 transition-transform duration-700 ease-in-out group-hover:scale-110'
        />

        {/* Badge discret sur l'image */}
        <div className='absolute top-3 left-3'>
          <span className='bg-white/80 backdrop-blur-md text-[px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter text-zinc-500 border border-zinc-100'>
            Nouveauté
          </span>
        </div>
      </Link>

      {/* ─── INFOS ET ACTIONS ─── */}
      <div className='flex flex-col gap-3 px-2 pb-2'>
        <div className='space-y-1'>
          {/* Catégorie */}
          {category && (
            <p className='text-[px] uppercase tracking-[em] text-zinc-400 font-bold'>
              {category}
            </p>
          )}

          {/* Nom du produit (Instrument Serif) */}
          <h3 className='font-sans  text-lg md:text-xl text-zinc-900 leading-tight text-clamp-2'>
            <Link href={`/produit/${slug}`}>{name}</Link>
          </h3>
        </div>

        {/* LIGNE DE PRIX ET BOUTON D'ACTION */}
        <div className='flex items-center justify-between mt-1'>
          <div className='text-base font-medium text-zinc-600'>
            <span>{Number(price).toLocaleString()} FCFA</span>
          </div>

          {/* BOUTON AJOUTER AU PANIER ÉPURÉ */}
          <Button
            size='sm'
            variant='outline'
            className='h-10 px-4 rounded-full border-none hover:bg-brand-gold hover:text-white hover:border-zinc-900 transition-all duration-300 group/btn gap-2'
          >
            <Plus className='h-4 w-4 transition-transform group-hover/btn:rotate-90' />
            <span className='text-xs font-bold uppercase tracking-tight'>
              Ajouter
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
