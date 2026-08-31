import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { presenterMontant } from '@/lib/utils'

type RelatedProduct = {
  id: number
  slug: string
  name: string
  price?: string
  regular_price?: string
  sale_price?: string
  on_sale?: boolean
  average_rating?: string
  rating_count?: number
  images?: { src: string }[]
}

function RelatedProductCard({ product }: { product: RelatedProduct }) {
  const image = product.images?.[0]?.src
  const isOnSale = Boolean(
    product.on_sale && product.sale_price && product.regular_price,
  )
  const rating = Number(product.average_rating ? product.average_rating : 2)

  return (
    <Link
      href={`/produit/${product.slug}`}
      className='group flex flex-col border-black/20 border rounded-sm'
    >
      <div className='relative aspect-square overflow-hidden rounded-2xl bg-white'>
        {image && (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes='(min-width: 768px) 25vw, 50vw'
            className='object-contain transition-transform duration-300 group-hover:scale-[1.04]'
          />
        )}
        {isOnSale && (
          <span className='absolute left-3 top-3 rounded-full bg-[#E2735C] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.06em] text-[#FAF7F2]'>
            Promo
          </span>
        )}
      </div>

      <div className='mt-3 space-y-1 px-px'>
        {rating > 0 && (
          <div className='flex items-center gap-1'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className='h-3 w-3'
                fill={i < Math.round(rating) ? '#2B4235' : 'none'}
                stroke='#2B4235'
                strokeWidth={1.5}
              />
            ))}
            {product.rating_count ? (
              <span className='ml-1 text-[11px] text-[#231F1A]/50'>
                ({product.rating_count})
              </span>
            ) : null}
          </div>
        )}

        <h3 className='line-clamp-2 font-serif text-[15px] leading-snug text-black'>
          {product.name}
        </h3>

        <div className='flex items-baseline gap-2'>
          {isOnSale ? (
            <>
              <span className='text-sm font-semibold text-[#E2735C]'>
                {presenterMontant(product.sale_price || 0)} FCFA
              </span>
              <span className='text-xs text-[#231F1A]/40 line-through'>
                {presenterMontant(product.regular_price || 0)} FCFA
              </span>
            </>
          ) : (
            <span className='text-sm font-semibold text-[#231F1A]'>
              {presenterMontant(product.price || 0)} FCFA
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export function RelatedProducts({ products }: { products: RelatedProduct[] }) {
  if (!products.length) return null

  return (
    <section className='border-t border-[#E7DFD2] bg-[#FAF7F2]'>
      <div className='container mx-auto max-w-6xl px-4 py-12 md:py-16'>
        <div className='mb-8 flex items-end justify-between'>
          <div>
            <h2 className="mt-1 font-['Fraunces',_serif] text-2xl text-[#231F1A] md:text-3xl">
              Vous aimerez aussi
            </h2>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6'>
          {products.map((product) => (
            <RelatedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
