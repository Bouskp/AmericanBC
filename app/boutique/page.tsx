import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { X } from 'lucide-react'
import ProductFilters from '@/components/ProductFilters'
import MobileFilters from '@/components/filter/MobileFilter'
import { ProductGrid } from '@/components/ProductGrid'
import Pagination from '@/components/Pagination'
import {
  getAllBrands,
  getAllCategories,
  getPaginatedProducts,
  getProductByCategoryPagination,
  getProductByBrandPagination,
} from '../../types/wooCommerceApi'

const PER_PAGE = 30
const BASE_PATH = '/boutique'

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string; brand?: string }>
}

/* ─── SEO ─── */
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams
  const [categories, brands] = await Promise.all([
    getAllCategories(),
    getAllBrands(),
  ])
  const category = categories.find((c) => c.slug === params.category)
  const brand = brands.find((b) => b.slug === params.brand)
  const page = Number(params.page) || 1

  const name = category?.name || brand?.name || 'Boutique'
  const qs = new URLSearchParams()
  if (category) qs.set('category', category.slug)
  else if (brand) qs.set('brand', brand.slug)
  if (page > 1) qs.set('page', String(page))
  const query = qs.toString()

  return {
    title: page > 1 ? `${name} – Page ${page}` : name,
    description: `Découvrez notre sélection ${
      category || brand ? `« ${name} »` : 'de produits'
    } avec livraison rapide à Abidjan et paiement à la livraison.`,
    alternates: { canonical: `${BASE_PATH}${query ? `?${query}` : ''}` },
  }
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1

  const [allCategories, allBrands] = await Promise.all([
    getAllCategories(),
    getAllBrands(),
  ])

  const categories = allCategories.filter((c) => c.count > 0)
  const brands = allBrands.filter((b) => b.count > 0)

  const category = categories.find((c) => c.slug === params.category)
  const brand = brands.find((b) => b.slug === params.brand)

  let result
  if (category) {
    result = await getProductByCategoryPagination(category.id, page, PER_PAGE)
  } else if (brand) {
    result = await getProductByBrandPagination(brand.id, page, PER_PAGE)
  } else {
    result = await getPaginatedProducts(page, PER_PAGE)
  }
  const { data: products, pagination } = result

  const currentTitle = category?.name || brand?.name || 'Boutique'
  const hasFilter = Boolean(category || brand)

  return (
    <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-16'>
      {/* ─── En-tête ─── */}
      <header className='mb-6 md:mb-12 border-b border-gray-200 pb-5 md:pb-8'>
        <h1 className='font-serif text-2xl md:text-5xl font-bold text-brand-red tracking-wide uppercase'>
          {currentTitle}
        </h1>

        {/* Compteur + pastille : desktop uniquement */}
        <div className='hidden lg:block'>
          <p className='mt-3 font-sans text-base text-secondary'>
            <span className='font-semibold text-primary'>
              {pagination.total}
            </span>{' '}
            produit{pagination.total > 1 ? 's' : ''} trouvé
            {pagination.total > 1 ? 's' : ''}
          </p>
          {hasFilter && (
            <Link
              href={BASE_PATH}
              className='mt-4 inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/5 px-4 py-1.5 text-sm font-medium text-brand-red transition-colors hover:bg-brand-red hover:text-white'
            >
              {currentTitle}
              <X className='h-4 w-4' aria-hidden />
              <span className='sr-only'>Effacer le filtre</span>
            </Link>
          )}
        </div>
      </header>

      {/* ─── Barre de filtres mobile (collante) ─── */}
      <Suspense fallback={null}>
        <MobileFilters
          categories={categories}
          brands={brands}
          total={pagination.total}
          activeLabel={hasFilter ? currentTitle : undefined}
        />
      </Suspense>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-x-10 lg:gap-x-16 gap-y-10 items-start'>
        {/* ─── Filtres (desktop uniquement) ─── */}
        <aside className='hidden lg:block lg:col-span-3 w-full lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-2xl border border-gray-200 bg-brand-cream p-6'>
          <h2 className='mb-6 border-b border-gray-200 pb-4 font-sans text-sm font-bold uppercase tracking-[0.12em] text-primary'>
            Filtrer par
          </h2>
          <Suspense fallback={null}>
            <ProductFilters categories={categories} brands={brands} />
          </Suspense>
        </aside>

        {/* ─── Produits ─── */}
        <main className='lg:col-span-9 w-full space-y-10'>
          {products.length > 0 ? (
            <ProductGrid
              products={products.map((p) => ({
                ...p,
                id: p.id.toString(),
                images: p.images.map((img) => img.src),
              }))}
            />
          ) : (
            <div className='rounded-2xl border border-dashed border-gray-300 py-16 text-center'>
              <p className='text-lg font-semibold text-primary'>
                Aucun produit ne correspond à votre sélection.
              </p>
              <Link
                href={BASE_PATH}
                className='mt-4 inline-block rounded-full bg-brand-red px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-red-dark'
              >
                Voir tous les produits
              </Link>
            </div>
          )}

          {pagination.totalPages > 1 && (
            <div className='pt-8 border-t border-gray-200 flex justify-center'>
              <Pagination
                currentPage={page}
                totalPages={pagination.totalPages}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
