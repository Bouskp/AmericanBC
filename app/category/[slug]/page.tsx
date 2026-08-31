import { notFound } from 'next/navigation'
import {
  getAllCategories,
  getCategoryBySlug,
  getProductByCategoryPagination,
} from '../../../types/wooCommerceApi'
import { ProductGrid } from '@/components/ProductGrid'
import SortSelect from '@/components/SortSelect'
import { Metadata } from 'next'

export const revalidate = 3600

function parseSortParam(sort?: string): {
  orderby?: string
  order?: 'asc' | 'desc'
} {
  switch (sort) {
    case 'price-asc':
      return { orderby: 'price', order: 'asc' }
    case 'price-desc':
      return { orderby: 'price', order: 'desc' }
    case 'popularity-desc':
      return { orderby: 'popularity', order: 'desc' }
    case 'title-asc':
      return { orderby: 'title', order: 'asc' }
    default:
      return { orderby: 'date', order: 'desc' }
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  const seo = category?.yoast_head_json

  return {
    title: seo?.title || `${category?.name} | AmericansBeautyCenter`,
    description: seo?.og_description || category?.description,
    alternates: {
      canonical: `https://www.americansbeautycenter.com/category/${slug}`,
    },
    openGraph: {
      title: seo?.og_title || seo?.title || category?.name,
      description: seo?.og_description || category?.description,
      images: seo?.og_image ? [{ url: seo.og_image[0].url }] : [],
    },
  }
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sort?: string }>
}) {
  const { slug } = await params
  const { sort: sortParam } = await searchParams
  const sort = parseSortParam(sortParam)

  const category = await getCategoryBySlug(slug)
  const products = await getProductByCategoryPagination(
    category?.id || 0,
    1,
    20,
    sort,
  )

  if (!category) {
    notFound()
  }

  if (!products || products.data.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-black text-base'>
          Aucun produit trouvé dans cette catégorie.
        </p>
        <p className='text-black text-base'>
          Les produits de cette catégorie sont actuellement indisponibles.
          Veuillez vérifier plus tard ou explorer d'autres catégories pour
          découvrir nos produits.
        </p>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-6xl'>
      <div className='border-b pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4'>
        <div className='space-y-1'>
          <h1 className='text-2xl md:text-4xl font-extrabold tracking-tight text-zinc-500 dark:text-zinc-20'>
            {category.name}
          </h1>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-8 items-start'>
        <main className='flex-1 w-full'>
          <div className='flex justify-between items-center mb-4 text-base text-muted-foreground'>
            <span>{products.data.length} articles trouvés</span>
            <SortSelect />
          </div>

          <ProductGrid
            products={
              products.data.length > 0
                ? products.data.map((p) => ({
                    ...p,
                    id: String(p.id),
                    price: p.price,
                    imageUrl: p.images?.[0]?.src,
                    imageAlt: p.name,
                    images: p.images.map((im) => im.src),
                  }))
                : []
            }
          />
        </main>
      </div>
    </div>
  )
}
