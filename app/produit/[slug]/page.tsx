import { notFound } from 'next/navigation'
import ProductGallery from '@/components/produit/ProductGallery'
import { ProductInfo } from '@/components/produit/ProductInfo'
import { ProductGrid } from '@/components/ProductGrid'
import { Truck, ShieldCheck, RotateCcw } from 'lucide-react'
import {
  getAllProductsSlug,
  productBySlug,
} from '../../../types/wooCommerceApi'

export const revalidate = 3600 * 24 // Revalidation toutes les 24h

export async function generateStaticParams() {
  // Récupère tous les produits pour générer les chemins statiques
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
  const product = {
    ...productResponse,
    images: productResponse?.images.map((img) => img.src) || [],
    id: String(productResponse?.id),
    name: productResponse?.name || '',
  }

  // Si le slug ne correspond à aucun de vos produits, on renvoie une page 404 propre
  if (!productResponse) {
    notFound()
  }

  return (
    <div className='container mx-auto px-4 py-8 md:py-12 max-w-6xl'>
      {/* 
        MISE EN PAGE DE LA FICHE :
        - 1 colonne sur mobile (galerie en haut, infos en bas)
        - 2 colonnes à partir des écrans md (PC / Tablettes)
      */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start'>
        {/* COLONNE GAUCHE : Galerie d'images */}
        <ProductGallery images={product.images} name={product.name} />

        {/* COLONNE DROITE : Informations, prix et actions d'achat */}
        <div className='space-y-8'>
          <ProductInfo product={product} />

          {/* Petits blocs de réassurance intégrés sous le bouton d'achat */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-6 text-xs text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <Truck className='h-5 w-5 text-primary shrink-0' />
              <span>Livraison express à Abidjan</span>
            </div>
            <div className='flex items-center gap-2'>
              <ShieldCheck className='h-5 w-5 text-primary shrink-0' />
              <span>Paiement sécurisé sur place</span>
            </div>
            <div className='flex items-center gap-2'>
              <RotateCcw className='h-5 w-5 text-primary shrink-0' />
              <span>Vérification du produit avant achat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
