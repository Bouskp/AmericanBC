'use client'
import * as React from 'react'
import Link from 'next/link'
import { ShoppingCart, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ProductCardProps {
  id: string
  name: string
  price: string
  slug: string
  image: string
  onSale?: boolean
  oldPrice?: string
}

export function ProductCard({
  id,
  name,
  price,
  slug,
  image,
  onSale = false,
  oldPrice,
}: ProductCardProps) {
  return (
    <Card className='group overflow-hidden  bg-card text-card-foreground shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full flex flex-col relative'>
      {/* 1. BADGE DE SÉLECTION (Ex: SOLDES) */}
      {onSale && (
        <span className='absolute top-2.5 left-2.5 z-10 inline-flex items-center text-[15px] font-bold tracking-wider uppercase bg-red-600 text-white px-2 py-0.5 rounded-md shadow-sm'>
          Promo
        </span>
      )}

      {/* 2. ZONE IMAGE + BOUTONS SURVOL */}
      <div className='relative aspect-square w-full bg-muted overflow-hidden shrink-0'>
        {/* Remplacer cette div par le composant <Image /> de Next.js en production */}
        <div className='absolute inset-0 flex items-center justify-center text-xs text-muted-foreground group-hover:scale-105 transition-transform duration-500'>
          <Image
            src={image || '/images/placeholder.jpg'}
            alt={name}
            fill
            className='object-cover'
            loading='eager'
          />
        </div>

        {/* BOUTONS D'ACTION RAPIDE (Affichés proprement au survol sur PC) */}
        <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-10 hidden md:flex'>
          <Button
            size='icon'
            variant='secondary'
            className='rounded-full h-9 w-9 shadow'
            asChild
          >
            <Link href={`/produit/${slug}`} aria-label='Voir le produit'>
              <Eye className='h-4 w-4' />
            </Link>
          </Button>
          <Button
            size='icon'
            variant='default'
            className='rounded-full h-9 w-9 shadow'
            aria-label='Ajouter au panier'
          >
            <ShoppingCart className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* 3. DÉTAILS ET TEXTES */}
      <div className='p-3.5 flex-1 flex flex-col justify-between gap-3'>
        <div className='space-y-1'>
          {/* Titre du produit (limité à 2 lignes proprement) */}
          <h3 className='text-sm leading-tight group-hover:text-primary transition-colors line-clamp-3 min-h-[3rem] leading-1.5 text-center'>
            <Link href={`/produit/${slug}`}>{name}</Link>
          </h3>
        </div>

        {/* Prix et Bouton d'achat direct mobile */}
        <div className='flex items-center justify-between gap-2 pt-1'>
          <div className='flex flex-wrap items-baseline gap-1.5'>
            <span className='text-base tracking-tight'>{price} FCFA</span>
            {onSale && oldPrice && (
              <span className='text-xs text-muted-foreground line-through opacity-70'>
                {`${oldPrice}`}
              </span>
            )}
          </div>

          {/* Petit bouton panier toujours visible sur mobile pour faciliter l'achat rapide */}
          <Button
            size='icon'
            variant='secondary'
            className='h-8 w-8 rounded-lg shrink-0 md:hidden'
            aria-label='Ajouter au panier'
          >
            <ShoppingCart className='h-3.5 w-3.5' />
          </Button>
        </div>
      </div>
    </Card>
  )
}
