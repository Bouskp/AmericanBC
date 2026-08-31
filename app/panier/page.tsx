'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Plus, Minus, X, ArrowRight } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore()

  // Calcul du sous-total
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  )
  const shippingFee = 0 // Exemple de livraison gratuite, ou à modifier selon vos règles

  if (items.length === 0) {
    return (
      <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-24 text-center space-y-4'>
        <h1 className='font-serif text-3xl font-light text-black tracking-wide lowercase first-letter:uppercase'>
          Votre panier est vide
        </h1>
        <p className='font-sans text-xs uppercase tracking-[0.14em] text-gray-400 max-w-sm mx-auto leading-relaxed'>
          Prenez le temps de parcourir nos collections cosmétiques exclusives en
          provenance des États-Unis.
        </p>
        <div className='pt-4'>
          <Link
            href='/boutique'
            className='inline-flex h-11 items-center justify-center rounded-none bg-black px-6 text-[11px] font-sans font-light uppercase tracking-[0.14em] text-white transition-colors hover:bg-zinc-800'
          >
            Retourner à la boutique
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16'>
      {/* En-tête épuré */}
      <header className='mb-12 border-b border-gray-100 pb-6 text-left'>
        <h1 className='font-serif text-3xl md:text-4xl font-light text-black tracking-wide lowercase first-letter:uppercase'>
          Votre panier
        </h1>
        <p className='mt-2 font-sans text-xs uppercase tracking-[0.14em] text-gray-400'>
          {items.length} article{items.length > 1 ? 's' : ''} sélectionné
          {items.length > 1 ? 's' : ''}
        </p>
      </header>

      {/* Grille principale asymétrique à 12 colonnes */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12 items-start'>
        {/* LISTE DES ARTICLES (Gauche - 7 colonnes) */}
        <div className='lg:col-span-7 divide-y divide-gray-100 border-t border-b border-gray-100'>
          {items.map((item) => (
            <div
              key={item.id}
              className='flex gap-6 py-6 items-center justify-between'
            >
              {/* Visuel Produit carré sans arrondis */}
              <div className='relative h-24 w-20 shrink-0 overflow-hidden bg-white border border-gray-100 rounded-none'>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className='object-cover p-1'
                />
              </div>

              {/* Détails Typographiques du Produit */}
              <div className='flex-1 min-w-0 space-y-1'>
                {item.category && (
                  <p className='text-[10px] font-sans font-light uppercase tracking-[0.14em] text-gray-400'>
                    {item.category}
                  </p>
                )}
                <h3 className='font-serif text-sm md:text-base font-light text-black tracking-wide lowercase first-letter:uppercase truncate hover:text-gray-600 transition-colors'>
                  <Link href={`/produit/${item.slug}`}>{item.name}</Link>
                </h3>
                <p className='font-sans text-xs md:text-sm font-medium text-gray-900 lg:hidden'>
                  {item.price.toLocaleString()} FCFA
                </p>
              </div>

              {/* Sélecteur de Quantité Linéaire Épuré & Prix unitaire */}
              <div className='flex items-center gap-6 md:gap-10'>
                <div className='flex items-center border border-gray-200 rounded-none h-8 bg-transparent'>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        Math.max(1, (item.quantity || 1) - 1),
                      )
                    }
                    className='w-8 h-full flex items-center justify-center text-gray-400 hover:text-black transition-colors active:bg-gray-50'
                    aria-label='Diminuer la quantité'
                  >
                    <Minus className='h-3 w-3' />
                  </button>
                  <span className='w-8 text-center font-sans text-xs text-black font-light select-none'>
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, (item.quantity || 1) + 1)
                    }
                    className='w-8 h-full flex items-center justify-center text-gray-400 hover:text-black transition-colors active:bg-gray-50'
                    aria-label='Augmenter la quantité'
                  >
                    <Plus className='h-3 w-3' />
                  </button>
                </div>

                {/* Prix Unitaire (Affiché uniquement sur écran moyen/grand pour épurer) */}
                <div className='hidden lg:block font-sans text-sm font-medium text-gray-900 w-24 text-right'>
                  {(item.price * (item.quantity || 1)).toLocaleString()} FCFA
                </div>

                {/* Bouton de Suppression Discret */}
                <button
                  onClick={() => removeItem(item.id)}
                  className='text-gray-300 hover:text-black transition-colors p-1'
                  aria-label="Supprimer l'article"
                >
                  <X className='h-4 w-4 stroke-[1.5]' />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RÉSUMÉ DE COMMANDE STICKY (Droite - 5 colonnes) */}
        <aside className='lg:col-span-5 w-full lg:sticky lg:top-24 space-y-6 border border-gray-100 bg-white p-6 md:p-8 rounded-none shadow-xs'>
          <h2 className='font-sans text-xs font-bold uppercase tracking-[0.14em] text-black border-b border-gray-50 pb-4'>
            Résumé de la commande
          </h2>

          <div className='space-y-4 border-b border-gray-50 pb-5 font-sans text-xs font-light text-gray-500'>
            <div className='flex justify-between items-center'>
              <span>Sous-total</span>
              <span className='font-medium text-gray-900 text-sm'>
                {subtotal.toLocaleString()} FCFA
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span>Frais de livraison</span>
            </div>
          </div>

          <div className='flex justify-between items-baseline font-sans text-black'>
            <span className='text-xs uppercase tracking-[0.11em] font-medium'>
              Total
            </span>
            <span className='text-lg md:text-xl font-medium tracking-tight'>
              {(subtotal + shippingFee).toLocaleString()} FCFA
            </span>
          </div>

          {/* Bouton d'action principal - Passage en caisse / Livraison */}
          <div className='pt-2'>
            <Link
              href='/commande' // Lien vers votre page de checkout / validation de commande
              className='w-full flex h-11 items-center justify-center rounded-none bg-black px-6 text-[11px] font-sans font-light uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-zinc-800 shadow-sm gap-2 group'
            >
              Passer la commande
              <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-1 stroke-[1.5]' />
            </Link>
          </div>

          <p className='text-[10px] font-sans font-light text-gray-400 text-center leading-normal pt-2'>
            Paiement disponible par Mobile Money ou en Cash à la livraison.
          </p>
        </aside>
      </div>
    </div>
  )
}
