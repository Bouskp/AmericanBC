import { parseNotification, verifyNotification } from 'cinetpay-js'
import { client } from '../route' // ou dupliquer l'instanciation
import { updateOrder, getOrder } from '@/lib/woocommerce'
import { NextResponse } from 'next/server'

// À remplacer par Redis/DB en prod (persistant entre invocations serverless)
const processed = new Set<string>()

function extractOrderId(merchantTransactionId: string): number {
  const match = merchantTransactionId.match(/^WC(\d+)-/)
  if (!match) throw new Error('merchantTransactionId invalide')
  return parseInt(match[1], 10)
}

export async function POST(req: Request) {
  const body = await req.json()
  const notification = parseNotification(body)

  if (processed.has(notification.transactionId)) {
    return NextResponse.json({ ok: true })
  }

  // Ne jamais faire confiance au body seul : reconfirmation serveur-à-serveur
  const status = await client.payment.getStatus(
    notification.merchantTransactionId,
    'CI',
  )

  const orderId = extractOrderId(notification.merchantTransactionId)
  const order = await getOrder(orderId)
  if (order.status !== 'pending') {
    return NextResponse.json({ ok: true }) // déjà traité
  }

  if (status.status === 'SUCCESS') {
    await updateOrder(orderId, { status: 'processing', set_paid: true })
  } else {
    await updateOrder(orderId, { status: 'failed' })
  }

  processed.add(notification.transactionId)
  return NextResponse.json({ ok: true })
}
