// app/api/revalidate/route.js
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.WOOCOMMERCE_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Token invalide' }, { status: 401 })
  }

  const body = await request.json()
  const { slug } = body

  try {
    if (slug) {
      revalidatePath(`/produit/${slug}`)
    }
    revalidatePath('/boutique') // liste des produits
    revalidateTag('products', 'max')
    revalidatePath('/')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json(
      { message: 'Erreur revalidation' },
      { status: 500 },
    )
  }
}
