import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductGallery from '@/components/produit/ProductGallery'
import { ProductInfo } from '@/components/produit/ProductInfo'
import { RelatedProducts } from '@/components/RelatedProduct'
import { Truck, ShieldCheck, RotateCcw } from 'lucide-react'
import {
  getAllProductsSlug,
  getRelatedProducts,
  productBySlug,
} from '../../../types/wooCommerceApi'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await productBySlug(slug)
  const seo = product?.yoast_head_json

  return {
    title: seo?.title || `${product?.name} | AmericansBeautyCenter`,
    description: product?.short_description,
    alternates: {
      canonical:
        seo?.canonical ||
        `https://www.americansbeautycenter.com/produit/${slug}`,
    },
    openGraph: {
      title: seo?.og_title || seo?.title || product?.name,
      description: seo?.og_description || product?.description,
      images: seo?.og_image ? [{ url: seo.og_image[0].url }] : [],
    },
  }
}

export async function generateStaticParams() {
  const products = await getAllProductsSlug()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const productResponse = await productBySlug(slug)

  if (!productResponse) {
    notFound()
  }

  const product = {
    ...productResponse,
    images: productResponse.images?.map((img) => img.src) || [],
    id: String(productResponse.id),
    name: productResponse.name || '',
  }

  const relatedProducts = productResponse.upsell_ids?.length
    ? await getRelatedProducts(productResponse.upsell_ids)
    : []

  return (
    <div className='bg-white'>
      <div className='container mx-auto max-w-6xl px-4 py-8 md:py-12'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start lg:gap-16'>
          {/* Galerie — sticky au scroll sur desktop */}
          <div className='md:sticky md:top-24'>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Informations produit */}
          <div className='space-y-8 pb-24 md:pb-0'>
            <ProductInfo
              product={{
                ...product,
                imageUrl: product.images?.[0],
              }}
            />

            {/* Réassurance */}
            <div className='grid grid-cols-1 gap-4  pt-6 text-xs text-black sm:grid-cols-3'>
              <div className='flex items-center gap-2'>
                <Truck className='h-5 w-5 shrink-0 text-[#2B4235]' />
                <span>Livraison express à Abidjan</span>
              </div>
              <div className='flex items-center gap-2'>
                <ShieldCheck className='h-5 w-5 shrink-0 text-[#2B4235]' />
                <span>Paiement sécurisé sur place</span>
              </div>
              <div className='flex items-center gap-2'>
                <RotateCcw className='h-5 w-5 shrink-0 text-[#2B4235]' />
                <span>Vérification du produit avant achat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produits associés */}
      <RelatedProducts products={relatedProducts} />

      {/* Barre CTA fixe — mobile uniquement */}
      <div className='fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-[#E7DFD2] bg-[#FAF7F2]/95 px-4 py-3 backdrop-blur md:hidden'>
        <div>
          <p className='text-[10px] uppercase tracking-[0.08em] text-[#231F1A]/60'>
            Prix
          </p>
          <p className='text-base font-semibold text-[#231F1A]'>
            {product.price} FCFA
          </p>
        </div>
        <button
          type='button'
          className='h-11 flex-1 max-w-[220px] rounded-full bg-[#2B4235] text-sm font-medium uppercase tracking-[0.06em] text-[#FAF7F2]'
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  )
}
