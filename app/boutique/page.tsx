import ProductFilters from '@/components/ProductFilters'
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

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string; brand?: string }>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const perPage = PER_PAGE

  const [categories, brands] = await Promise.all([
    getAllCategories(),
    getAllBrands(),
  ])
  const category = categories.find((c) => c.slug === params.category)
  const brand = brands.find((b) => b.slug === params.brand)

  let result
  if (category) {
    result = await getProductByCategoryPagination(category.id, page, perPage)
  } else if (brand) {
    result = await getProductByBrandPagination(brand.id, page, perPage)
  } else {
    result = await getPaginatedProducts(page, perPage)
  }
  const { data: products, pagination } = result

  // Détermination du titre de la collection en cours
  const currentTitle = category?.name || brand?.name || 'Boutique'

  return (
    <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16'>
      {/* En-tête de la Collection Épuré */}
      <header className='mb-12 border-b border-gray-100 pb-8 text-left'>
        <h1 className='font-serif text-3xl md:text-4xl font-light text-black tracking-wide lowercase first-letter:uppercase'>
          {currentTitle}
        </h1>
        <p className='mt-2 font-sans text-xs uppercase tracking-[0.14em] text-gray-400'>
          {pagination.total} produit{pagination.total > 1 ? 's' : ''} trouvé
          {pagination.total > 1 ? 's' : ''}
        </p>
      </header>

      {/* Grille principale : Layout asymétrique et aéré */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 items-start'>
        {/* Barre latérale des filtres - Alignée à gauche, fine et discrète */}
        <aside className='lg:col-span-3 w-full lg:sticky lg:top-24 border-t lg:border-t-0 pt-6 lg:pt-0 border-gray-100'>
          <h2 className='font-sans text-xs font-bold uppercase tracking-[0.14em] text-black mb-6'>
            Filtrer par
          </h2>
          <ProductFilters categories={categories} brands={brands} />
        </aside>

        {/* Section principale : Grille de produits */}
        <main className='lg:col-span-9 w-full space-y-12'>
          <ProductGrid
            products={products.map((p) => ({
              ...p,
              id: p.id.toString(),
              images: p.images.map((p) => p.src),
            }))}
          />

          {/* Pagination isolée avec de l'espace */}
          <div className='pt-8 border-t border-gray-100 flex justify-center'>
            <Pagination currentPage={page} totalPages={pagination.totalPages} />
          </div>
        </main>
      </div>
    </div>
  )
}
