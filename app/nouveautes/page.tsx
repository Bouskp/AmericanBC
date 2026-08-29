import { notFound } from 'next/navigation'
import { ArrowDownAZ } from 'lucide-react'
import { ProductCard2 } from '@/components/produit/ProductCard2' // Importation alignée sur votre composant épuré
import { getNewsProducts } from '../../types/wooCommerceApi'

export const revalidate = 3600

export default async function NewArrivalsPage() {
  const { data: newProducts } = await getNewsProducts(1, 20)

  return (
    // max-w-7xl et padding augmenté pour s'aligner harmonieusement avec la boutique principale
    <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16'>
      {/* ─── EN-TÊTE DE LA PAGE ÉPURÉ ─── */}
      <header className='border-b border-gray-100 pb-8 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-left'>
        <div className='space-y-2.5'>
          {/* Label textuel fin et espacé - Signature de la marque */}
          <p className='font-sans text-xs uppercase tracking-[0.14em] text-gray-400'>
            Derniers Arrivages
          </p>
          {/* Titre style éditorial / presse */}
          <h1 className='font-serif text-3xl md:text-4xl font-light text-black tracking-wide lowercase first-letter:uppercase'>
            Les nouveautés
          </h1>
          <p className='font-sans text-xs text-gray-400 max-w-xl leading-relaxed'>
            Découvrez nos articles les plus récents, mis en ligne cette semaine
            et disponibles immédiatement.
          </p>
        </div>

        {/* Indicateur de tri discret (sans bordure lourde, texte fin) */}
        <div className='flex items-center gap-1.5 text-[11px] font-sans font-light uppercase tracking-[0.14em] text-gray-400 py-1'>
          <ArrowDownAZ className='h-3.5 w-3.5 stroke-[1.5]' />
          <span>Trié par date</span>
        </div>
      </header>

      {/* ─── GRILLE DES NOUVEAUTÉS ─── */}
      {newProducts.length === 0 ? (
        // Cas vide minimaliste avec fines lignes horizontales
        <div className='w-full text-center py-16 border-t border-b border-gray-50'>
          <p className='font-sans text-xs uppercase tracking-[0.14em] text-gray-400'>
            Aucune nouveauté n'a été ajoutée récemment.
          </p>
        </div>
      ) : (
        /* 
          Grille aérée à 4 colonnes max (lg:grid-cols-4) pour éviter de tasser les visuels
          et gap-y-12 pour laisser respirer les détails textuels.
        */
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12'>
          {newProducts.map((product) => (
            <ProductCard2
              key={product.id}
              id={String(product.id)}
              name={product.name}
              price={product.price}
              slug={product.slug}
              imageUrl={product.images?.[0]?.src || ''}
            />
          ))}
        </div>
      )}
    </div>
  )
}
