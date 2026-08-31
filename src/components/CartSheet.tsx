'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Plus, Minus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet'
import { useCartStore } from '../../store/useCartStore'

export function CartSheet() {
  const cartItems = useCartStore((state) => state.items)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const totalPrice = useCartStore((state) => state.getTotalPrice())
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='relative h-16 w-16 rounded-none bg-transparent hover:bg-transparent text-white font-bold transition-colors'
          aria-label='Ouvrir le panier'
        >
          <ShoppingCart className='h-9 w-9 stroke-[1.5]' />
          {totalItems > 0 && (
            /* Badge de compteur ultra-discret : un simple point texte nu sans bulle rouge massive */
            <span className='absolute top-2 right-2 flex h-4 w-4 items-center justify-center font-sans text-[10px] font-bold text-black border-b border-black bg-white select-none rounded-lg'>
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side='right'
        className='w-full sm:max-w-md flex flex-col justify-between p-6 md:p-8 bg-white rounded-none border-l border-gray-100 focus-visible:outline-hidden'
      >
        <div className='flex flex-col flex-1 overflow-hidden'>
          <SheetHeader className='pb-4 space-y-1 text-left'>
            <SheetTitle className='font-sans text-xs font-bold uppercase tracking-[0.14em] text-black flex items-center justify-between'>
              <span>Mon Panier ({totalItems})</span>
            </SheetTitle>
            <SheetDescription className='sr-only'>
              Liste des articles ajoutés à votre panier d'achat.
            </SheetDescription>
          </SheetHeader>
          <Separator className='bg-gray-100' />

          {/* ─── LISTE DES ARTICLES SCROLLABLE ─── */}
          <div className='flex-1 overflow-y-auto mt-4 space-y-5 pr-1 text-left custom-scrollbar'>
            {cartItems.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-20 text-center space-y-3'>
                <ShoppingCart className='h-8 w-8 text-gray-200 stroke-[1.2]' />
                <p className='font-sans text-xs uppercase tracking-[0.14em] text-gray-400'>
                  Votre panier est vide.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between gap-4 py-1.5 group/item'
                >
                  <div className='flex items-center gap-4 min-w-0 flex-1'>
                    {/* Conteneur Image Produit Filaire */}
                    <div className='relative h-16 w-14 border border-gray-100 bg-white rounded-none overflow-hidden shrink-0'>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className='object-cover p-0.5'
                      />
                    </div>

                    {/* Métadonnées */}
                    <div className='space-y-1 min-w-0'>
                      <h4 className='font-serif text-sm font-light text-black tracking-wide lowercase first-letter:uppercase truncate max-w-[160px] md:max-w-[180px]'>
                        <Link href={`/produit/${item.slug}`}>{item.name}</Link>
                      </h4>
                      <p className='font-sans text-xs font-medium text-gray-900'>
                        {(item.price * (item.quantity || 1)).toLocaleString()}{' '}
                        FCFA
                      </p>
                    </div>
                  </div>

                  {/* Contrôle des Quantités Linéaire Filaire */}
                  <div className='flex items-center border border-gray-200 rounded-none h-7 bg-transparent shrink-0'>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          Math.max(1, (item.quantity || 1) - 1),
                        )
                      }
                      className='w-7 h-full flex items-center justify-center text-gray-400 hover:text-black transition-colors active:bg-gray-50'
                      aria-label='Diminuer la quantité'
                    >
                      <Minus className='h-2.5 w-2.5' />
                    </button>
                    <span className='w-6 text-center font-sans text-xs text-black font-light select-none'>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity || 1) + 1)
                      }
                      className='w-7 h-full flex items-center justify-center text-gray-400 hover:text-black transition-colors active:bg-gray-50'
                      aria-label='Augmenter la quantité'
                    >
                      <Plus className='h-2.5 w-2.5' />
                    </button>
                  </div>

                  {/* Bouton de Suppression Rapide au bout de la ligne */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className='text-gray-300 hover:text-black p-1 transition-colors shrink-0'
                    aria-label="Retirer l'article"
                  >
                    <X className='h-3.5 w-3.5 stroke-[1.5]' />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ─── FOOTER DU PANIER (SOUS-TOTAL & ACTIONS FIXES) ─── */}
        {cartItems.length > 0 && (
          <SheetFooter className='flex-col sm:flex-col gap-4 pt-5 border-t border-gray-100 w-full bg-white'>
            <div className='flex items-center justify-between w-full font-sans text-xs font-light text-gray-500'>
              <span className='uppercase tracking-[0.11em]'>Sous-total</span>
              <span className='font-medium text-base tracking-tight text-black'>
                {totalPrice.toLocaleString()} FCFA
              </span>
            </div>

            <div className='flex flex-col gap-2 w-full pt-1'>
              {/* Bouton principal : Commander */}
              <SheetClose asChild>
                <Button
                  asChild
                  className='w-full h-11 bg-black text-white hover:bg-zinc-800 rounded-none text-[11px] font-sans font-light uppercase tracking-[0.14em] shadow-none transition-colors'
                >
                  <Link href='/commande'>Passer la commande</Link>
                </Button>
              </SheetClose>

              {/* Bouton secondaire : Voir le Panier complet */}
              <SheetClose asChild>
                <Button
                  variant='ghost'
                  asChild
                  className='w-full h-9 bg-transparent border border-gray-100 text-gray-500 hover:text-black hover:border-gray-300 hover:bg-transparent rounded-none text-[10px] font-sans font-light uppercase tracking-[0.14em] transition-colors'
                >
                  <Link href='/panier'>Voir le panier complet</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
