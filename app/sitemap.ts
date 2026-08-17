import { MetadataRoute } from 'next'
import {
  getAllProductsSlug,
  getAllCategoriesSlug,
} from '../types/wooCommerceApi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: 'https://americansbeautycenter.com',
      priority: 1,
      changeFrequency: 'daily',
    },
  ]

  let products: any = []
  let categories: any = []

  try {
    // 1. Récupération des catégories de manière isolée
    categories = await getAllCategoriesSlug()

    // On force un tableau vide si l'API a renvoyé autre chose (ex: un objet d'erreur)
    if (!Array.isArray(categories)) {
      console.warn(
        "sitemap.ts: getAllCategoriesSlug n'a pas retourné un tableau",
        categories,
      )
      categories = []
    }

    // 2. Petite pause de 300ms pour laisser souffler la base de données WordPress
    await new Promise((resolve) => setTimeout(resolve, 300))

    // 3. Récupération des produits
    products = await getAllProductsSlug()

    if (!Array.isArray(products)) {
      console.warn(
        "sitemap.ts: getAllProductsSlug n'a pas retourné un tableau",
        products,
      )
      products = []
    }
  } catch (error) {
    console.error(
      'sitemap.ts: échec critique lors de la récupération WooCommerce',
      error,
    )
    // En cas de crash, on livre au moins la page d'accueil pour éviter de bloquer le build de Next.js
    return staticUrls
  }

  // Génération sécurisée des URLs des produits
  const productUrls = products.map((p: any) => ({
    url: `https://americansbeautycenter.comproduit/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Génération sécurisée des URLs des catégories
  const categoryUrls = categories.map((c: any) => ({
    url: `https://americansbeautycenter.comcategory/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticUrls, ...productUrls, ...categoryUrls]
}
