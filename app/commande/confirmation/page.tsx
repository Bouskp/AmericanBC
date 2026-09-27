'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type OrderInfo = {
  status: string
  total: string
  paymentMethod: string
}

export default function SuccessPage() {
  const params = useSearchParams()
  const orderId = params.get('order_id')
  const [order, setOrder] = useState<OrderInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!orderId) {
      setError(true)
      setLoading(false)
      return
    }

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/commandes/${orderId}`)
        if (!res.ok) throw new Error('Commande introuvable')
        const data = await res.json()
        setOrder(data)
      } catch (err) {
        console.error('fetch order error:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p>Chargement de votre commande…</p>
      </div>
    )
  }

  if (error || !orderId) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h1>⚠️ Commande introuvable</h1>
        <p>Impossible de retrouver les détails de cette commande.</p>
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
      <h1>✅ Commande confirmée</h1>
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
          💰 <strong>Montant à régler :</strong> {order?.total} FCFA
        </p>
        <p>
          📦 <strong>Mode de paiement :</strong> Paiement à la livraison
        </p>
      </div>

      <p>
        Notre équipe va vous contacter prochainement pour confirmer les détails
        de livraison. Merci de préparer le montant exact à la réception de votre
        commande.
      </p>
    </div>
  )
}
