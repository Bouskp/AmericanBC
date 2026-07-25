import type { Metadata } from 'next'

// Configuration de base du site
export const SITE_CONFIG = {
  name: "American's Beauty Center",
  description:
    'LA BOUTIQUE DES PRODUITS AUTHENTIQUES EN CÔTE D’IVOIRE'.toLocaleLowerCase(),
  url: 'https://www.americansbeautycenter.com',
  defaultOgImage: '/images/og-default.jpg',
}

// 1. Métadonnées globales (Accueil, À propos, etc.)
export const defaultMetadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`, // Exemple: "Chaussures | ÉcoBoutique"
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: SITE_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// 2. Générateur de métadonnées dynamiques pour les pages Produits
interface ProductMetadataProps {
  title: string
  description: string
  slug: string
  imageUrl: string
  category: string
  price?: string
  inStock?: boolean
}

export function generateProductMetadata({
  title,
  description,
  slug,
  imageUrl,
  category,
  price,
  inStock = true,
}: ProductMetadataProps): Metadata {
  const productUrl = `${SITE_CONFIG.url}/produits/${slug}`

  return {
    title: title,
    description: description,
    alternates: {
      canonical: productUrl,
    },

    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
    },
    // Ajout de balises spécifiques lues par certains robots et extensions
    other: {
      'product:price:amount': price || '',
      'product:price:currency': 'XOF',
      'product:availability': inStock ? 'instock' : 'out of stock',
      'product:category': category,
    },
  }
}
