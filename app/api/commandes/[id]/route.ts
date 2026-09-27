import { getOrder } from '@/lib/woocommerce'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const order = await getOrder(id)
    return NextResponse.json({
      status: order.status,
      total: order.total,
      paymentMethod: order.payment_method,
    })
  } catch (err: any) {
    console.error('get order error:', err)
    return NextResponse.json({ error: err.message }, { status: 404 })
  }
}
