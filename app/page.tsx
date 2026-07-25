import { HeroSlider } from '@/components/HeroSlider'
import { PromoBanner } from '@/components/PromoBanner'
import { ProductGrid } from '@/components/ProductGrid'
import { getPaginatedProducts } from '../types/wooCommerceApi'

export const revalidate = 3600 * 24

export default async function HomePage() {
  const paginatedProducts = await getPaginatedProducts(1, 15) // Récupère les 15 premiers produits

  const { data, pagination } = paginatedProducts

  return (
    <div className='flex flex-col gap-12 md:gap-16 pb-16'>
      {/* 1. HERO SLIDER BANNER */}
      <section aria-label='Bannières publicitaires'>
        <HeroSlider />
      </section>

      {/* 2. GRILLE DE PRODUITS */}
      <ProductGrid
        products={data?.map((product) => ({
          ...product,
          imageUrl: product.images?.[0]?.src,
          id: String(product.id),
          imageAlt: product.name,
        }))}
        title='Notre Catalogue'
        description='Découvrez nos produits les plus populaires et profitez de nos offres exceptionnelles.'
      />

      {/* 5. BANNIÈRE PROMO INTERMÉDIAIRE */}
      <section className='container mx-auto px-4'>
        <PromoBanner
          title='Livraison Gratuite !'
          description="Profitez de la livraison offerte sur toute votre commande dès 35 000 XOF d'achat."
          bgClass='bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black'
        />
      </section>
    </div>
  )
}
