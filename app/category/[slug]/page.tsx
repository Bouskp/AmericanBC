import { notFound } from 'next/navigation'
import {
  getAllCategories,
  getCategoryBySlug,
  getProductByCategoryPagination,
} from '../../../types/wooCommerceApi'
import { FilterSidebar } from '@/components/filter/FilterSideBar'
import { ProductGrid } from '@/components/ProductGrid'
import { MobileFilterTrigger } from '@/components/filter/MobileFilter'

export const revalidate = 86400 // Revalidation toutes les 24h

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  const products = await getProductByCategoryPagination(
    category?.id || 0,
    1,
    15,
  ) // Récupère les 15 premiers produits de la catégorie

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

  // const filteredProducts = allProducts.filter((p) => p.category === categoryId)

  return (
    <div className='container mx-auto px-4 py-8 max-w-6xl'>
      {/* EN-TÊTE DE LA CATEGORIE */}
      <div className='border-b pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4'>
        <div className='space-y-1'>
          <h1 className='text-2xl md:text-4xl font-extrabold tracking-tight text-zinc-500 dark:text-zinc-20'>
            {category.name}
          </h1>
        </div>

        {/* Déclencheur des filtres pour Mobile uniquement */}
        <MobileFilterTrigger />
      </div>

      {/* 
      AGENCEMENT EN GRILLE :
      - Sur mobile : 1 seule colonne (la grille de produits prend tout l'espace)
      - À partir de md (PC) : 2 colonnes (Filtres à gauche [250px], Produits à droite [restant])
    */}
      <div className='flex flex-col md:flex-row gap-8 items-start'>
        {/* COLONNE GAUCHE (Filtres PC) - Masquée sur mobile */}
        <aside className='w-[240px] shrink-0 sticky top-24 hidden md:block'>
          <FilterSidebar />
        </aside>

        {/* COLONNE DROITE (Grille de Produits) */}
        <main className='flex-1 w-full'>
          <div className='flex justify-between items-center mb-4 text-base text-muted-foreground'>
            <span>{products.data.length} articles trouvés</span>
          </div>

          {/* On réutilise notre ProductGrid qui intègre le composant Price converti */}
          <ProductGrid
            products={
              products.data.length > 0
                ? products.data.map((p) => ({
                    ...p,
                    id: String(p.id),
                    price: p.price,
                    imageUrl: p.images?.[0]?.src,
                    imageAlt: p.name,
                  }))
                : []
            }
          />
        </main>
      </div>
    </div>
  )
}
