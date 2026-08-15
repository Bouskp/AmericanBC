// app/api/revalidate/route.js
import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const code = process.env.WOOCOMMERCE_WEBHOOK_SECRET || ''

export async function POST(req: NextRequest) {
  const signature = req.headers.get('x-wc-webhook-signature')
  const body = await req.text()
  console.log(code, signature)

  // Vérification de la signature WooCommerce
  const hash = crypto.createHmac('sha256', code).update(body).digest('base64')

  if (hash !== signature) {
    return NextResponse.json({ message: 'Signature invalide' }, { status: 401 })
  }

  const data = JSON.parse(body)
  const slug = data.slug

  revalidateTag(`product-${slug}`, 'page')
  revalidatePath(`/produit/${slug}`, 'page')
  revalidateTag('shop', 'max') // pour les pages catégorie/listing

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
