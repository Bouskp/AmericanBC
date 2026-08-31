'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '../../store/useCartStore'

type PaymentMethod = 'cinetpay' | 'cod'

export default function CheckoutPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cinetpay')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [customer, setCustomer] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_1: '',
    city: '',
  })

  const cartItems = useCartStore((state) => state.items)
  const totalPrice = useCartStore((state) => state.getTotalPrice())

  const shippingFee = customer.city.toLowerCase() === 'abidjan' ? 2000 : 4000
  const total = totalPrice + (customer.city ? shippingFee : 0)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: cartItems,
          customer,
          payment_method: paymentMethod,
          total,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue')
      }

      if (paymentMethod === 'cinetpay') {
        window.location.href = data.payment_url
      } else {
        router.push(`/checkout/confirmation?order_id=${data.order_id}`)
      }
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16'>
      {/* Bouton Retour Panier */}
      <div className='mb-10 text-left'>
        <Link
          href='/panier'
          className='inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.14em] text-gray-400 hover:text-black transition-colors group'
        >
          <ArrowLeft className='h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5 stroke-[1.5]' />
          Retour au panier
        </Link>
      </div>

      {/* Layout à 12 colonnes */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12 items-start'>
        {/* ─── COLONNE DE GAUCHE : FORMULAIRE (7 colonnes) ─── */}
        <main className='lg:col-span-7 space-y-10'>
          <section className='space-y-1.5 text-left'>
            <h1 className='font-serif text-3xl font-light text-black tracking-wide lowercase first-letter:uppercase'>
              Validation de commande
            </h1>
            <p className='font-sans text-xs uppercase tracking-[0.14em] text-gray-400'>
              Coordonnées de livraison et facturation
            </p>
          </section>

          <form onSubmit={handleSubmit} className='space-y-8 text-left'>
            {/* BLOC 1 : IDENTITÉ */}
            <div className='space-y-6'>
              <h2 className='font-sans text-xs font-bold uppercase tracking-[0.14em] text-black border-b border-gray-50 pb-2'>
                01. Informations personnelles
              </h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div className='space-y-1.5'>
                  <label className='font-sans text-[10px] uppercase tracking-[0.14em] text-gray-400 font-medium'>
                    Prénom *
                  </label>
                  <input
                    name='first_name'
                    required
                    value={customer.first_name}
                    onChange={handleChange}
                    className='w-full h-11 border-0 border-b border-gray-200 bg-transparent rounded-none px-0 text-sm font-sans font-light text-black placeholder:text-gray-300 focus:outline-hidden focus:border-black transition-colors'
                    placeholder='Votre prénom'
                  />
                </div>
                <div className='space-y-1.5'>
                  <label className='font-sans text-[10px] uppercase tracking-[0.14em] text-gray-400 font-medium'>
                    Nom de famille *
                  </label>
                  <input
                    name='last_name'
                    required
                    value={customer.last_name}
                    onChange={handleChange}
                    className='w-full h-11 border-0 border-b border-gray-200 bg-transparent rounded-none px-0 text-sm font-sans font-light text-black placeholder:text-gray-300 focus:outline-hidden focus:border-black transition-colors'
                    placeholder='Votre nom de famille'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div className='space-y-1.5'>
                  <label className='font-sans text-[10px] uppercase tracking-[0.14em] text-gray-400 font-medium'>
                    Adresse email *
                  </label>
                  <input
                    name='email'
                    type='email'
                    required
                    value={customer.email}
                    onChange={handleChange}
                    className='w-full h-11 border-0 border-b border-gray-200 bg-transparent rounded-none px-0 text-sm font-sans font-light text-black placeholder:text-gray-300 focus:outline-hidden focus:border-black transition-colors'
                    placeholder='adresse@exemple.com'
                  />
                </div>
                <div className='space-y-1.5'>
                  <label className='font-sans text-[10px] uppercase tracking-[0.14em] text-gray-400 font-medium'>
                    Téléphone (WhatsApp de préférence) *
                  </label>
                  <input
                    name='phone'
                    required
                    value={customer.phone}
                    onChange={handleChange}
                    className='w-full h-11 border-0 border-b border-gray-200 bg-transparent rounded-none px-0 text-sm font-sans font-light text-black placeholder:text-gray-300 focus:outline-hidden focus:border-black transition-colors'
                    placeholder='Ex: 07 00 00 00 00'
                  />
                </div>
              </div>
            </div>

            {/* BLOC 2 : DESTINATION */}
            <div className='space-y-6 pt-2'>
              <h2 className='font-sans text-xs font-bold uppercase tracking-[0.14em] text-black border-b border-gray-50 pb-2'>
                02. Lieu de livraison
              </h2>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                <div className='sm:col-span-2 space-y-1.5'>
                  <label className='font-sans text-[10px] uppercase tracking-[0.14em] text-gray-400 font-medium'>
                    Adresse exacte & repères *
                  </label>
                  <input
                    name='address_1'
                    required
                    value={customer.address_1}
                    onChange={handleChange}
                    className='w-full h-11 border-0 border-b border-gray-200 bg-transparent rounded-none px-0 text-sm font-sans font-light text-black placeholder:text-gray-300 focus:outline-hidden focus:border-black transition-colors'
                    placeholder='Ex: Riviera Palmeraie, non loin de...'
                  />
                </div>
                <div className='space-y-1.5'>
                  <label className='font-sans text-[10px] uppercase tracking-[0.14em] text-gray-400 font-medium'>
                    Ville de destination *
                  </label>
                  <select
                    name='city'
                    required
                    value={customer.city}
                    onChange={handleChange}
                    className='w-full h-11 border-0 border-b border-gray-200 bg-transparent rounded-none px-0 text-sm font-sans font-light text-black focus:outline-hidden focus:border-black transition-colors cursor-pointer'
                  >
                    <option value=''>Sélectionnez</option>
                    <option value='Abidjan'>Abidjan</option>
                    <option value='Intérieur'>Intérieur du pays</option>
                  </select>
                </div>
              </div>
            </div>

            {/* BLOC 3 : MODE DE PAIEMENT */}
            <div className='space-y-6 pt-2'>
              <h2 className='font-sans text-xs font-bold uppercase tracking-[0.14em] text-black border-b border-gray-50 pb-2'>
                03. Mode de règlement
              </h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* Option CinetPay */}
                <label
                  className={`border p-4 rounded-none cursor-pointer flex flex-col justify-between h-24 transition-all duration-300 select-none ${
                    paymentMethod === 'cinetpay'
                      ? 'border-black bg-gray-50/40'
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <div className='flex justify-between items-center w-full'>
                    <span className='font-sans text-xs font-medium uppercase tracking-wide text-black'>
                      Paiement sécurisé en ligne
                    </span>
                    <input
                      type='radio'
                      name='payment_method'
                      value='cinetpay'
                      checked={paymentMethod === 'cinetpay'}
                      onChange={() => setPaymentMethod('cinetpay')}
                      className='sr-only'
                    />
                    {paymentMethod === 'cinetpay' && (
                      <Check className='h-4 w-4 text-black stroke-[1.5]' />
                    )}
                  </div>
                  <p className='font-sans text-[11px] font-light text-gray-400 leading-snug'>
                    Mobile Money (Wave, Orange, MTN, Moov) ou carte bancaire.
                  </p>
                </label>

                {/* Option Paiement à la livraison */}
                <label
                  className={`border p-4 rounded-none cursor-pointer flex flex-col justify-between h-24 transition-all duration-300 select-none ${
                    paymentMethod === 'cod'
                      ? 'border-black bg-gray-50/40'
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <div className='flex justify-between items-center w-full'>
                    <span className='font-sans text-xs font-medium uppercase tracking-wide text-black'>
                      Paiement à la livraison
                    </span>
                    <input
                      type='radio'
                      name='payment_method'
                      value='cod'
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className='sr-only'
                    />
                    {paymentMethod === 'cod' && (
                      <Check className='h-4 w-4 text-black stroke-[1.5]' />
                    )}
                  </div>
                  <p className='font-sans text-[11px] font-light text-gray-400 leading-snug'>
                    Réglez en espèces à la réception de votre commande.
                  </p>
                </label>
              </div>
            </div>

            {error && <p className='font-sans text-xs text-red-500'>{error}</p>}

            <Button
              type='submit'
              disabled={loading || !customer.city}
              className='w-full h-11 bg-black text-white hover:bg-zinc-800 rounded-none text-[11px] font-sans font-light uppercase tracking-[0.14em] shadow-none transition-colors disabled:opacity-30'
            >
              {loading
                ? 'Traitement en cours...'
                : paymentMethod === 'cinetpay'
                  ? `Payer maintenant (${total.toLocaleString()} FCFA)`
                  : `Confirmer ma commande (${total.toLocaleString()} FCFA)`}
            </Button>
          </form>
        </main>

        {/* ─── COLONNE DE DROITE : RÉCAPITULATIF (5 colonnes, sticky) ─── */}
        <aside className='lg:col-span-5 lg:sticky lg:top-16'>
          <div className='border border-gray-100 p-6 md:p-8 space-y-6 text-left'>
            <h2 className='font-sans text-xs font-bold uppercase tracking-[0.14em] text-black border-b border-gray-50 pb-3'>
              Détails de l'achat
            </h2>

            <ul className='space-y-4'>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className='flex justify-between items-start gap-4'
                >
                  <div>
                    <p className='font-sans text-xs font-light text-black leading-snug'>
                      {item.name}
                    </p>
                    <p className='font-sans text-[10px] uppercase tracking-[0.1em] text-gray-400 mt-1'>
                      Quantité : {item.quantity}
                    </p>
                  </div>
                  <p className='font-sans text-xs font-light text-black whitespace-nowrap'>
                    {(item.price * item.quantity).toLocaleString()} FCFA
                  </p>
                </li>
              ))}
            </ul>

            <div className='space-y-2 pt-4 border-t border-gray-50'>
              <div className='flex justify-between font-sans text-xs font-light text-gray-500'>
                <span>Sous-total</span>
                <span>{totalPrice.toLocaleString()} FCFA</span>
              </div>
              <div className='flex justify-between font-sans text-xs font-light text-gray-500'>
                <span>Frais de livraison</span>
                <span>
                  {customer.city
                    ? `${shippingFee.toLocaleString()} FCFA`
                    : 'En attente de la ville'}
                </span>
              </div>
            </div>

            <div className='flex justify-between items-baseline pt-4 border-t border-gray-100'>
              <span className='font-sans text-xs font-bold uppercase tracking-[0.14em] text-black'>
                Montant global
              </span>
              <span className='font-serif text-xl font-light text-black'>
                {total.toLocaleString()} FCFA
              </span>
            </div>

            <div className='flex items-center gap-2 pt-4 text-gray-400'>
              <ShieldCheck className='h-3.5 w-3.5 stroke-[1.5]' />
              <span className='font-sans text-[10px] uppercase tracking-[0.12em]'>
                Passerelle cryptée & sécurisée
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
