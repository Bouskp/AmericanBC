import { ProductCard2 } from './produit/ProductCard2'

interface Product {
  id: string
  name: string
  price: string
  slug: string
  onSale?: boolean
  oldPrice?: string
  images: string[]
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
  // Cas vide : Fin, discret et élégant sans boîte massive autour
  if (!products || products.length === 0) {
    return (
      <div className='w-full text-center py-16 border-t border-b border-gray-50'>
        <p className='font-sans text-xs uppercase tracking-[0.14em] text-gray-400'>
          Aucun produit trouvé dans cette collection.
        </p>
      </div>
    )
  }

  return (
    <div className='w-full space-y-10'>
      {/* En-tête de la grille : Typographie éditoriale */}
      {(title || description) && (
        <div className='flex flex-col gap-2 text-left border-b border-gray-50 pb-6'>
          {title && (
            <h2 className='font-serif text-2xl md:text-3xl font-light text-black tracking-wide lowercase first-letter:uppercase'>
              {title}
            </h2>
          )}
          {description && (
            <p className='font-sans text-xs uppercase tracking-[0.14em] text-gray-400'>
              {description}
            </p>
          )}
        </div>
      )}

      {/* 
        LA GRILLE RESPONSIVE ÉPURÉE :
        - Remplacement du container par w-full pour laisser s'aligner par rapport au layout parent
        - Augmentation des écarts (gap-x-6 gap-y-12) pour donner de l'air aux visuels des produits
        - Alignement sur 4 colonnes max (lg:grid-cols-4) pour éviter l'effet "tassé" du grid-cols-5
      */}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12'>
        {products.map((product) => (
          <ProductCard2
            key={product.id}
            name={product.name}
            price={product.price}
            slug={product.slug}
            imageUrl={product.images[0]}
            id={product.id.toString()}
          />
        ))}
      </div>
    </div>
  )
}
