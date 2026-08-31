import { NextRequest, NextResponse } from 'next/server'

const WC_URL = `${process.env.WOOCOMMERCE_API_URL}/wp-json/wc/v3` // ex: /wp-json/wc/v3
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET

const CINETPAY_API_KEY = process.env.CINETPAY_API_KEY
const CINETPAY_PASSWORD = process.env.CINETPAY_PASSWORD
const SITE_URL = process.env.WOOCOMMERCE_SITE_URL // ex: https://ton-site.com

function wcAuthHeader() {
  const token = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64')
  return `Basic ${token}`
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { cart, customer, payment_method, total } = body

    if (!cart?.length || !customer || !payment_method || !total) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    // 1. Créer la commande WooCommerce (pending pour CinetPay, processing pour COD)
    const orderPayload = {
      payment_method,
      payment_method_title:
        payment_method === 'cinetpay' ? 'CinetPay' : 'Paiement à la livraison',
      set_paid: false,
      status: payment_method === 'cod' ? 'processing' : 'pending',
      billing: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        address_1: customer.address_1,
        city: customer.city,
      },
      shipping: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        address_1: customer.address_1,
        city: customer.city,
      },
      line_items: cart.map((item: any) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
    }

    const orderRes = await fetch(`${WC_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: wcAuthHeader(),
      },
      body: JSON.stringify(orderPayload),
    })

    if (!orderRes.ok) {
      const err = await orderRes.text()
      console.error('Erreur création commande WooCommerce:', err)
      return NextResponse.json(
        { error: 'Impossible de créer la commande' },
        { status: 500 },
      )
    }

    const order = await orderRes.json()

    // 2. Paiement à la livraison -> on s'arrête là
    if (payment_method === 'cod') {
      return NextResponse.json({ order_id: order.id })
    }

    // 3. CinetPay -> initier le paiement
    const cinetpayPayload = {
      apikey: CINETPAY_API_KEY,
      apiPassword: CINETPAY_PASSWORD,
      transaction_id: `order-${order.id}-${Date.now()}`,
      amount: total,
      currency: 'XOF',
      description: `Commande #${order.id}`,
      customer_name: customer.first_name,
      customer_surname: customer.last_name,
      customer_email: customer.email,
      customer_phone_number: customer.phone,
      customer_address: customer.address_1,
      customer_city: customer.city,
      notify_url: `${SITE_URL}/api/cinetpay/notify`,
      return_url: `${SITE_URL}/checkout/confirmation?order_id=${order.id}`,
      channels: 'ALL',
      metadata: `wc_order_id=${order.id}`,
    }

    const cpRes = await fetch('https://api.cinetpay.net/v1/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cinetpayPayload),
    })

    const cpData = await cpRes.json()

    if (cpData.code !== '201') {
      console.error('Erreur CinetPay:', cpData)
      return NextResponse.json(
        { error: cpData.message || "Erreur lors de l'initiation du paiement" },
        { status: 500 },
      )
    }

    return NextResponse.json({
      order_id: order.id,
      payment_url: cpData.data.payment_url,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
