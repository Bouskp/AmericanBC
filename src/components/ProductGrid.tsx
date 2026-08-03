import { ProductCard2 } from './produit/ProductCard2'

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
      <div className='container text-center py-12 border rounded-xl bg-muted/20'>
        <p className='text-sm'>Aucun produit trouvé dans cette collection.</p>
      </div>
    )
  }

  return (
    <div className='container w-full space-y-6'>
      {/* En-tête de la grille (Optionnel) */}
      {(title || description) && (
        <div className='flex flex-col gap-1'>
          {title && (
            <h2 className='text-xl md:text-2xl font-bold  text-brand-red uppercase font-serif'>
              {title}
            </h2>
          )}
          {description && (
            <p className='text-xl text-muted-foreground'>{description}</p>
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
          <ProductCard2
            key={product.id}
            name={product.name}
            price={product.price}
            slug={product.slug}
            imageUrl={product.imageUrl}
            id={product.id.toString()}
          />
        ))}
      </div>
    </div>
  )
}
