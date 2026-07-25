import * as React from 'react'
import { ProductCard } from '@/components/ProductCard'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  price: string
  slug: string
  onSale?: boolean
  oldPrice?: string
  imageUrl: string
  imageAlt: string
}

interface ProductGridProps {
  products: Product[]
  title?: string
  description?: string
}

export function ProductGrid({
  products,
  title,
  description,
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className='text-center py-12 border rounded-xl bg-muted/20'>
        <p className='text-muted-foreground text-sm'>
          Aucun produit trouvé dans cette collection.
        </p>
      </div>
    )
  }

  return (
    <div className='w-full space-y-6'>
      {/* En-tête de la grille (Optionnel) */}
      {(title || description) && (
        <div className='flex flex-col gap-1'>
          {title && (
            <h2 className='text-xl md:text-2xl font-bold  text-black'>
              {title}
            </h2>
          )}
          {description && (
            <p className='text-base text-muted-foreground'>{description}</p>
          )}
        </div>
      )}

      {/* 
        LA GRILLE RESPONSIVE : 
        - grid-cols-2 : 2 produits par ligne sur Mobile (Standard UX E-commerce)
        - sm:grid-cols-3 : 3 produits sur Tablettes
        - md:grid-cols-4 : 4 produits sur Écrans Moyens
        - lg:grid-cols-5 : 5 produits sur Grands Écrans PC
        - gap-4 : Espace de 16px constant entre les cartes
      */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            slug={product.slug}
            onSale={product.onSale}
            oldPrice={product.oldPrice}
            image={product.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}
