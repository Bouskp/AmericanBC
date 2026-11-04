'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type OrderInfo = {
  status: string
  total: string
  paymentMethod: string
}

function ConfirmationContent() {
  const params = useSearchParams()
  const orderId = params.get('order_id')
  const key = params.get('key')
  const [order, setOrder] = useState<OrderInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!orderId || !key) {
      setError(true)
      setLoading(false)
      return
    }

    async function fetchOrder() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/commandes/${orderId}?key=${encodeURIComponent(key!)}`,
        )
        if (!res.ok) throw new Error('Commande introuvable')
        setOrder(await res.json())
      } catch (err) {
        console.error('fetch order error:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, key])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p>Chargement de votre commande…</p>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h1>⚠️ Commande introuvable</h1>
        <p>Impossible de retrouver les détails de cette commande.</p>
        <Link href='/boutique'>Retourner à la boutique</Link>
      </div>
    )
  }

  const isOnline = order.paymentMethod === 'cinetpay'
  const isPaid = order.status === 'processing' || order.status === 'completed'
  const total = Number(order.total).toLocaleString()

  // Paiement en ligne non (encore) confirmé
  if (isOnline && !isPaid) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem',
          maxWidth: 500,
          margin: '0 auto',
        }}
      >
        <h1>⏳ Paiement en attente</h1>
        <p>
          Nous n'avons pas encore reçu la confirmation du paiement de la
          commande <strong>#{orderId}</strong>. Si vous avez été débité, elle
          sera validée automatiquement dans quelques minutes.
        </p>
        <Link href='/boutique'>Retourner à la boutique</Link>
      </div>
    )
  }

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '4rem',
        maxWidth: 500,
        margin: '0 auto',
      }}
    >
      <h1>✅ {isOnline ? 'Paiement confirmé' : 'Commande confirmée'}</h1>
      <p>
        Votre commande <strong>#{orderId}</strong> a bien été enregistrée.
      </p>

      <div
        style={{
          background: '#f5f5f5',
          borderRadius: 8,
          padding: '1.5rem',
          margin: '1.5rem 0',
          textAlign: 'left',
        }}
      >
        <p>
          💰 <strong>{isOnline ? 'Montant payé' : 'Montant à régler'} :</strong>{' '}
          {total} FCFA
        </p>
        <p>
          📦 <strong>Mode de paiement :</strong>{' '}
          {isOnline
            ? 'Paiement en ligne (CinetPay)'
            : 'Paiement à la livraison'}
        </p>
      </div>

      <p>
        {isOnline
          ? 'Notre équipe va préparer votre commande et vous contacter pour la livraison.'
          : 'Notre équipe va vous contacter prochainement pour confirmer les détails de livraison. Merci de préparer le montant exact à la réception de votre commande.'}
      </p>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>Chargement…</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
