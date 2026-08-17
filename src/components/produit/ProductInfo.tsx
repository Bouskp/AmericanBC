'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingBag, CheckCircle2, XCircle } from 'lucide-react'
import { formatHtmlString, presenterMontant } from '@/lib/utils'

export function ProductInfo({ product }: { product: any }) {
  const [quantity, setQuantity] = React.useState(1)

  return (
    <div className='space-y-4'>
      {/* SKU & Disponibilité */}
      <div className='flex items-center justify-between text-xs tracking-wide uppercase text-muted-foreground'>
        <span className='flex items-center gap-1.5 font-medium'>
          <>
            <CheckCircle2 className='h-3.5 w-3.5 text-emerald-600' />
            <span className='text-emerald-600 font-semibold'>
              Disponible immédiatement
            </span>
          </>
        </span>
      </div>

      {/* Nom du produit */}
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-700 dark:text-zinc-80'>
        {product.name}
      </h1>

      {/* Prix Converti */}
      <div className='text-2xl font-extrabold text-primary py-1 border-b'>
        {/* <Price amountInXof={Number(product.price)} /> */}
        {presenterMontant(product.price)} FCFA
      </div>

      {/* Description Courte */}
      <div className='space-y-2'>
        <h2 className='text-sm font-bold uppercase tracking-wider text-zinc-400'>
          Description
        </h2>
        <div
          dangerouslySetInnerHTML={{
            __html: formatHtmlString(product.description),
          }}
          className='prose prose-sm md:prose-base max-w-none prose-p:my-1 prose-headings:my-6'
        />

        {/* Sélecteur de quantité */}
        <div className='flex items-center border rounded-lg bg-background p-1 h-12 w-full sm:w-32 justify-between'>
          <Button
            variant='ghost'
            size='icon'
            className='h-9 w-9'
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className='text-sm font-bold w-8 text-center'>{quantity}</span>
          <Button
            variant='ghost'
            size='icon'
            className='h-9 w-9'
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>

        {/* Bouton Ajouter au panier */}
        <Button
          size='lg'
          className='flex-1 h-12 font-bold gap-2 text-base  hover:scale-[1.01] transition-transform'
          // disabled={!product.inStock}
        >
          <ShoppingBag className='h-6 w-6' />
          Ajouter au panier
        </Button>
      </div>
    </div>
  )
}
