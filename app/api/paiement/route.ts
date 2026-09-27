import { getAppUrl } from '@/lib/env'
import { createOrder, getOrder, updateOrder } from '@/lib/woocommerce'
import { CinetPayClient, isFinalStatus } from 'cinetpay-js'
import { NextResponse } from 'next/server'

const appUrl = getAppUrl()

export const client = new CinetPayClient({
  credentials: {
    CI: {
      apiKey: process.env.CINETPAY_API_KEY!,
      apiPassword: process.env.CINETPAY_PASSWORD!,
    },
  },
  debug: true,
})

function buildMerchantTransactionId(orderId: number) {
  return `WC${orderId}-${Date.now().toString(36)}`
}

/**
 * Normalise un numéro de téléphone ivoirien (ou autre pays CinetPay)
 * vers le format international attendu par le SDK : +XXXXXXXXXXXX
 */
export function normalizePhoneNumber(
  raw: string,
  countryCode: string = '225', // Côte d'Ivoire par défaut
): string {
  if (!raw) throw new Error('Numéro de téléphone manquant')

  // 1. Supprimer tout ce qui n'est pas un chiffre ou un "+"
  let cleaned = raw.replace(/[^\d+]/g, '')

  // 2. Déjà au format international avec le bon indicatif
  if (cleaned.startsWith(`+${countryCode}`)) {
    return cleaned
  }

  // 3. Commence par "00" (format international alternatif) -> remplacer par "+"
  if (cleaned.startsWith('00')) {
    cleaned = '+' + cleaned.slice(2)
    return cleaned
  }

  // 4. Commence déjà par l'indicatif sans "+"
  if (cleaned.startsWith(countryCode)) {
    return `+${cleaned}`
  }

  // 5. Format local : commence par 0 -> on retire le 0 et on préfixe l'indicatif
  if (cleaned.startsWith('0')) {
    return `+${countryCode}${cleaned.slice(1)}`
  }

  // 6. Sinon on suppose que c'est déjà un numéro local sans le 0
  return `+${countryCode}${cleaned}`
}

function extractOrderId(merchantTransactionId: string): number {
  const match = merchantTransactionId.match(/^WC(\d+)-/)
  if (!match) throw new Error('merchantTransactionId invalide')
  return parseInt(match[1], 10)
}

export async function POST(req: Request) {
  try {
    const { cart, customer, paymentMethod } = await req.json()
    if (!cart?.length) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
    }

    if (!['cinetpay', 'cod'].includes(paymentMethod)) {
      return NextResponse.json(
        { error: 'Méthode de paiement invalide' },
        { status: 400 },
      )
    }

    const lineItems = cart.map((i: any) => ({
      product_id: i.id,
      quantity: i.qty,
    }))

    // --- Cas 1 : Paiement à la livraison ---
    if (paymentMethod === 'cod') {
      const order = await createOrder({
        status: 'processing', // ou 'on-hold' si tu veux valider manuellement avant préparation
        payment_method: 'cod',
        payment_method_title: 'Paiement à la livraison',
        set_paid: false,
        billing: customer,
        line_items: lineItems,
      })

      return NextResponse.json({
        orderId: order.id,
        paymentMethod: 'cod',
        redirectUrl: `/commande/confirmation?order_id=${order.id}`,
      })
    }

    const order = await createOrder({
      status: 'pending',
      payment_method: 'cinetpay',
      payment_method_title: 'CinetPay',
      set_paid: false,
      billing: customer,
      line_items: lineItems,
    })

    const merchantTransactionId = buildMerchantTransactionId(order.id)

    const payment = await client.payment.initialize(
      {
        currency: 'XOF',
        merchantTransactionId,
        amount: Math.round(Number(order.total)),
        lang: 'fr',
        designation: `Commande #${order.id}`,
        clientEmail: customer.email,
        clientFirstName: customer.first_name,
        clientLastName: customer.last_name,
        clientPhoneNumber: normalizePhoneNumber(customer.phone),
        successUrl: `${appUrl}/commande/retour?transaction_id=${merchantTransactionId}`,
        failedUrl: `${appUrl}/commande/retour?transaction_id=${merchantTransactionId}`,
        notifyUrl: `${appUrl}/api/paiement/webhook`,
        channel: 'PUSH',
      },
      'CI',
    )

    await updateOrder(order.id, {
      meta_data: [
        {
          key: '_cinetpay_merchant_transaction_id',
          value: merchantTransactionId,
        },
      ],
    })

    return NextResponse.json({
      orderId: order.id,
      merchantTransactionId,
      paymentMethod: 'cinetpay',
      paymentUrl: payment.paymentUrl,
      mustBeRedirected: payment.details.mustBeRedirected,
    })
  } catch (err: any) {
    console.error('checkout/init error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// GET : vérifie le statut réel d'un paiement (utilisé pour le polling côté frontend)
// Appel: /api/paiement?transaction_id=WC123-abc123
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const transactionId = searchParams.get('transaction_id')

    if (!transactionId) {
      return NextResponse.json(
        { error: 'transaction_id manquant' },
        { status: 400 },
      )
    }

    const orderId = extractOrderId(transactionId)
    const order = await getOrder(orderId)

    // Si la commande a déjà été mise à jour par le webhook, pas besoin de rappeler CinetPay
    if (order.status !== 'pending') {
      return NextResponse.json({ orderId, status: order.status })
    }

    // Sinon on revérifie auprès de CinetPay (le webhook peut être en retard)
    const status = await client.payment.getStatus(transactionId, 'CI')

    if (isFinalStatus(status.status) && status.status === 'SUCCESS') {
      await updateOrder(orderId, { status: 'processing', set_paid: true })
      return NextResponse.json({ orderId, status: 'processing' })
    }

    if (isFinalStatus(status.status) && status.status !== 'SUCCESS') {
      await updateOrder(orderId, { status: 'failed' })
      return NextResponse.json({ orderId, status: 'failed' })
    }

    return NextResponse.json({ orderId, status: 'pending' })
  } catch (err: any) {
    console.error('payment status error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
