import { ImageResponse } from 'next/og'
import { productBySlug } from '../../../types/wooCommerceApi'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await productBySlug(slug)

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: '#ffffff',
      }}
    >
      <h1 style={{ fontSize: 60 }}>{product?.name}</h1>
      <p style={{ fontSize: 32, color: '#666' }}>{product?.price} FCFA</p>
    </div>,
    { ...size },
  )
}
