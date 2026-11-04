'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Status = 'pending' | 'success' | 'failed' | 'review' | 'timeout'

const POLL_INTERVAL_MS = 3000
const MAX_ATTEMPTS = 40 // 40 x 3 s = 2 minutes

function ReturnContent() {
  const params = useSearchParams()
  const transactionId = params.get('transaction_id')
  const [status, setStatus] = useState<Status>('pending')

  useEffect(() => {
    if (!transactionId || !/^WC\d+-/.test(transactionId)) {
      setStatus('failed')
      return
    }

    let attempts = 0
    let stopped = false

    async function check() {
      attempts++
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/paiement?transaction_id=${encodeURIComponent(transactionId!)}`,
        )
        if (res.ok) {
          const data = await res.json()
          if (data.status === 'processing' || data.status === 'completed') {
            return finish('success')
          }
          if (data.status === 'failed' || data.status === 'cancelled') {
            return finish('failed')
          }
          if (data.status === 'on-hold') {
            return finish('review')
          }
        }
      } catch (err) {
        console.error('payment status error:', err)
      }
      if (attempts >= MAX_ATTEMPTS) finish('timeout')
    }

    function finish(next: Status) {
      stopped = true
      clearInterval(interval)
      setStatus(next)
    }

    check() // première vérification immédiate
    const interval = setInterval(() => {
      if (!stopped) check()
    }, POLL_INTERVAL_MS)

    return () => {
      stopped = true
      clearInterval(interval)
    }
  }, [transactionId])

  if (status === 'pending') return <p>Vérification du paiement en cours…</p>
  if (status === 'success') return <p>✅ Paiement confirmé, merci !</p>
  if (status === 'review')
    return (
      <p>
        ⚠️ Votre paiement est en cours de vérification. Notre équipe vous
        contactera très bientôt.
      </p>
    )
  if (status === 'timeout')
    return (
      <div>
        <p>
          Nous n'avons pas encore reçu la confirmation de votre paiement. Si
          vous avez été débité, votre commande sera validée automatiquement dans
          quelques minutes. Sinon, contactez-nous.
        </p>
        <Link href='/boutique'>Retourner à la boutique</Link>
      </div>
    )
  return (
    <div>
      <p>❌ Le paiement a échoué ou a été annulé.</p>
      <Link href='/panier'>Retourner au panier</Link>
    </div>
  )
}

export default function ReturnPage() {
  return (
    <Suspense fallback={<p>Chargement…</p>}>
      <ReturnContent />
    </Suspense>
  )
}
