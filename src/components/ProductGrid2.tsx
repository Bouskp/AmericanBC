import { presenterMontant } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  slug: string
  price_html?: string
  price: string
  images?: { src: string }[]
}

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className='text-xs uppercase tracking-[0.14em] text-gray-400 py-16 text-center'>
        Aucun produit ne correspond à ces critères.
      </p>
    )
  }

  return (
    // Augmentation de l'espace entre les cartes (gap-x-8 gap-y-12) pour aérer le catalogue
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12'>
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/produit/${product.slug}`} // Aligné sur votre sitemap.ts (/produit/[slug])
          className='group flex flex-col'
        >
          {/* Conteneur d'image : Fond blanc pur ou transparent, pas d'arrondis pour un effet carré parfait */}
          <div className='aspect-square relative overflow-hidden border border-gray-50 rounded-none'>
            {product.images?.[0] ? (
              <Image
                src={product.images[0].src}
                alt={product.name}
                fill
                sizes='(max-w-768px) 50vw, (max-w-1024px) 33vw, 25vw'
                priority={products.indexOf(product) < 6} // Optimise le chargement des 6 premières images au-dessus de la ligne de flottaison
                className='object-contain transition-transform duration-700 ease-out group-hover:scale-102'
              />
            ) : (
              // Fallback minimaliste si aucune image n'est disponible
              <div className='absolute inset-0 bg-gray-50 flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-300'>
                Pas d'image
              </div>
            )}
          </div>

          {/* Métadonnées du produit alignées à gauche et espacées */}
          <div className='mt-4 space-y-1 text-left flex-1 flex flex-col justify-between'>
            <div>
              {/* Style éditorial : Police Serif, légère, élégante en minuscules */}
              <h3 className='font-serif text-sm md:text-base font-light text-black tracking-wide leading-tight lowercase first-letter:uppercase transition-colors group-hover:text-gray-600'>
                {product.name}
              </h3>
            </div>

            {/* Prix : Discret, épuré, nettoyé de ses styles agressifs */}
            {product.price_html && (
              <div
                className='font-sans text-sm md:text-sm font-medium text-gray-900 mt-1
                  [&_ins]:no-underline [&_ins]:font-bold [&_del]:text-gray-400 [&_del]:text-xs [&_del]:mr-2'
              >
                {`${presenterMontant(product.price)} FCFA`}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
