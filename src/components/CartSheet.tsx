import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
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
} from '@/components/ui/sheet'
import { useCartStore } from '../../store/useCartStore'
import { use } from 'react'

// Données fictives du panier (à lier avec votre Zustand ou CoCart)

export function CartSheet() {
  const cartItems = useCartStore((state) => state.items)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const totalPrice = useCartStore((state) => state.getTotalPrice())

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='lg'
          className='relative'
          aria-label='Ouvrir le panier'
        >
          <ShoppingCart className='size-7' />
          {
            <span className='absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] text-white'>
              {totalItems}
            </span>
          }
        </Button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='w-full sm:max-w-md flex flex-col justify-between p-6'
      >
        <div>
          <SheetHeader className='pb-4'>
            <SheetTitle className='flex items-center gap-2 text-xl font-bold'>
              <ShoppingCart className='h-5 w-5 text-white' /> Mon Panier (
              {totalItems})
            </SheetTitle>
            <SheetDescription className='sr-only'>
              Liste des articles ajoutés à votre panier d'achat.
            </SheetDescription>
          </SheetHeader>
          <Separator />

          {/* LISTE DES ARTICLES */}
          <div className='flex-1 overflow-y-auto max-h-[60vh] mt-4 space-y-4 pr-1'>
            {cartItems.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-12 text-center'>
                <ShoppingCart className='h-12 w-full text-zinc-300 mb-3' />
                <p className='text-sm'>Votre panier est encore vide.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between gap-4 py-2'
                >
                  <div className='flex items-center gap-3'>
                    {/* Conteneur Image Produit */}
                    <div className='relative h-16 w-16 rounded-md bg-abc-charcoal flex items-center justify-center text-[10px] overflow-hidden shrink-0'>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='space-y-1'>
                      <h4 className='text-sm font-medium line-clamp-1 max-w-[180px]'>
                        {item.name}
                      </h4>
                      <p className='text-xs text-white font-bold'>
                        {(item.price * item.quantity).toLocaleString()} XOF
                      </p>
                    </div>
                  </div>

                  {/* Contrôle des Quantités */}
                  <div className='flex items-center gap-2 border rounded-md p-1 bg-background'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-6 w-6 rounded-sm'
                    >
                      <Minus className='h-3 w-3' />
                    </Button>
                    <span className='text-xs font-semibold px-1'>
                      {item.quantity}
                    </span>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-6 w-6 rounded-sm'
                    >
                      <Plus className='h-3 w-3' />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ─── FOOTER DU PANIER (SOUS-TOTAL & CHECKOUT) ─── */}
        {cartItems.length > 0 && (
          <SheetFooter className='flex-col sm:flex-col gap-4 pt-4 border-t w-full'>
            <div className='flex items-center justify-between w-full text-sm'>
              <span className='text-muted-foreground'>Sous-total :</span>
              <span className='font-bold text-lg text-zinc-900 dark:text-zinc-100'>
                {totalPrice.toLocaleString()} XOF
              </span>
            </div>

            <div className='flex flex-col gap-2 w-full'>
              <Button asChild className='w-full' size='lg'>
                <Link href='/checkout'>Passer à la caisse</Link>
              </Button>
              <Button variant='outline' asChild className='w-full' size='sm'>
                <Link href='/panier'>Voir le panier complet</Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
