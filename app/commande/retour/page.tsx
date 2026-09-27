'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ReturnPage() {
  const params = useSearchParams()
  console.log(params)
  const transactionId = params.get('transaction_id')
  const [status, setStatus] = useState<'pending' | 'processing' | 'failed'>(
    'pending',
  )

  useEffect(() => {
    if (!transactionId) return
    const orderId = transactionId.match(/^WC(\d+)-/)?.[1]
    if (!orderId) return

    const interval = setInterval(async () => {
      const res = await fetch(`/api/paiement?transaction_id=${transactionId}`)
      const data = await res.json()
      if (data.status === 'processing' || data.status === 'completed') {
        setStatus('processing')
        clearInterval(interval)
      } else if (data.status === 'failed' || data.status === 'cancelled') {
        setStatus('failed')
        clearInterval(interval)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [transactionId])

  if (status === 'pending') return <p>Vérification du paiement en cours…</p>
  if (status === 'processing') return <p>✅ Paiement confirmé, merci !</p>
  return <p>❌ Le paiement a échoué ou a été annulé.</p>
}
