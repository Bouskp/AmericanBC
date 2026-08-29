'use client'

import { useState } from 'react'
import { Star, Minus, Plus, Leaf } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { presenterMontant } from '@/lib/utils'

type WooAttribute = {
  name: string
  options: string[]
}

type WooTag = {
  id: number
  name: string
}
type Brand = {
  id: number
  name: string
  slug: string
}

type Product = {
  id: string
  name: string
  price?: string
  regular_price?: string
  sale_price?: string
  on_sale?: boolean
  short_description?: string
  description?: string
  average_rating?: string
  rating_count?: number
  stock_status?: 'instock' | 'outofstock' | 'onbackorder'
  tags?: WooTag[]
  attributes?: WooAttribute[]
  brands?: Brand[]
  contenance: string
  actifs_cles: string
  utilisation: string
}

function AccordionDemo({
  value,
  trigger,
  content,
}: {
  value: string
  trigger: string
  content: string
}) {
  return (
    <AccordionItem value={value} className='mt-2'>
      <AccordionTrigger className='uppercase'>{trigger}</AccordionTrigger>
      <AccordionContent>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </AccordionContent>
    </AccordionItem>
  )
}

function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className='flex items-center gap-1.5'>
      <div className='flex items-center gap-0.5'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className='h-3.5 w-3.5'
            fill={i < Math.round(rating) ? '#2B4235' : 'none'}
            stroke='#2B4235'
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className='text-xs tracking-wide text-[#231F1A]/70'>
        {rating.toFixed(1)} {count ? `· ${count} avis` : ''}
      </span>
    </div>
  )
}

export function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)

  const rating = Number(product.average_rating ?? 2)
  const hasReviews = (product.rating_count ?? 0) > 0
  const isOnSale = Boolean(
    product.on_sale && product.sale_price && product.regular_price,
  )
  const inStock = product.stock_status !== 'outofstock'

  // "Actifs clés" — utilise vos tags WooCommerce comme étiquette d'ingrédients
  const keyActives = product.tags?.map((t) => t.name) ?? []

  return (
    <div className='flex flex-col gap-6'>
      {/* Marque + titre */}
      <div className='space-y-2'>
        {product.brands && (
          <p className='text-lg font-serif uppercase tracking-[0.14em] text-black font-bold'>
            {product.brands.map((item) => (
              <span key={item.id}>{item.name}</span>
            ))}
          </p>
        )}
        <h1 className='font-serif text-black leading-tight md:text-[34px] text-lg font-bold'>
          {product.name}
        </h1>
      </div>

      {/* Note */}
      {hasReviews && (
        <StarRating rating={rating} count={product.rating_count} />
      )}

      {/* Prix */}
      <div className='flex items-baseline gap-3'>
        {isOnSale ? (
          <>
            <span className='text-2xl font-semibold text-black'>
              {presenterMontant(product.sale_price || 0)} FCFA
            </span>
            <span className='text-base text-[#231F1A]/40 line-through'>
              {presenterMontant(product.regular_price || 0)} FCFA
            </span>
          </>
        ) : (
          <span className='text-2xl font-semibold text-black'>
            {presenterMontant(product.price || 0)} FCFA
          </span>
        )}
      </div>

      {/* Description courte */}
      {product.short_description && (
        <p
          className='text-base leading-relaxed text-black'
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        />
      )}

      {/* Étiquettes d'actifs clés — élément signature, façon fiche labo */}
      {keyActives.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {keyActives.map((active) => (
            <span
              key={active}
              className='inline-flex items-center gap-1.5 rounded-full border border-[#2B4235]/25 bg-[#2B4235]/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.04em] text-[#2B4235]'
            >
              <Leaf className='h-3 w-3' strokeWidth={2} />
              {active}
            </span>
          ))}
        </div>
      )}

      {/* Type / usage rapide */}

      {/* Quantité + Ajouter au panier */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
        <div className='flex w-fit items-center rounded-full border border-[#E7DFD2]'>
          <button
            type='button'
            aria-label='Diminuer la quantité'
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className='flex h-11 w-11 items-center justify-center text-[#231F1A] transition hover:text-[#2B4235]'
          >
            <Minus className='h-4 w-4' />
          </button>
          <span className='w-8 text-center text-sm font-medium tabular-nums'>
            {quantity}
          </span>
          <button
            type='button'
            aria-label='Augmenter la quantité'
            onClick={() => setQuantity((q) => q + 1)}
            className='flex h-11 w-11 items-center justify-center text-[#231F1A] transition hover:text-[#2B4235]'
          >
            <Plus className='h-4 w-4' />
          </button>
        </div>

        <button
          type='button'
          disabled={!inStock}
          className='h-11 flex-1 rounded-full bg-[#2B4235] px-6 text-sm font-medium uppercase tracking-[0.06em] text-[#FAF7F2] transition hover:bg-[#233529] disabled:cursor-not-allowed disabled:bg-[#231F1A]/20 disabled:text-[#231F1A]/50'
        >
          {inStock ? 'Ajouter au panier' : 'Rupture de stock'}
        </button>
      </div>

      {/* Accordéon détails */}
      <div className='mt-2 w-full md:max-w-md ml-0 px-4 md:px-0 py-2'>
        <Accordion type='single' collapsible className='space-y-4'>
          {product.contenance && (
            <AccordionDemo
              trigger='contenance'
              value='contenance'
              content={product.contenance}
            />
          )}
          {product.actifs_cles && (
            <AccordionDemo
              trigger='actifs clés'
              value='actifs-cles'
              content={product.actifs_cles}
            />
          )}
          {product.utilisation && (
            <AccordionDemo
              trigger='utilisation'
              value='utilisation'
              content={product.utilisation}
            />
          )}
        </Accordion>
      </div>
    </div>
  )
}
