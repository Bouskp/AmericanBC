const WOO_URL = process.env.WOOCOMMERCE_API_URL

function getAuthHeader() {
  const token = Buffer.from(
    `${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`,
  ).toString('base64')
  return `Basic ${token}`
}

export async function createOrder(orderData: any) {
  const res = await fetch(`${WOO_URL}/wp-json/wc/v3/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(orderData),
  })
  if (!res.ok) {
    const error = await res.json()
    console.log(error)
    throw new Error(`Erreur WooCommerce: ${error.message || res.statusText}`)
  }
  return res.json()
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  note = '',
): Promise<void> {
  const res = await fetch(`${WOO_URL}/wp-json/wc/v3/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify({ status }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(`Erreur WooCommerce: ${error.message || res.statusText}`)
  }
  const order = await res.json()

  // Ajouter une note privée sur la commande (traçabilité du paiement)
  if (note) {
    await fetch(`${WOO_URL}/wp-json/wc/v3/orders/${orderId}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({ note, customer_note: false }),
    })
  }

  return order
}

export async function getOrder(orderId: unknown) {
  const res = await fetch(`${WOO_URL}/wp-json/wc/v3/orders/${orderId}`, {
    headers: { Authorization: getAuthHeader() },
  })
  if (!res.ok) throw new Error('Commande introuvable')
  return res.json()
}

export async function updateOrder(
  id: number | string,
  payload: Record<string, any>,
) {
  const res = await fetch(`${WOO_URL}/wp-json/wc/v3/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorBody = await res.text()
    throw new Error(`WC updateOrder failed (${res.status}): ${errorBody}`)
  }

  return res.json()
}
