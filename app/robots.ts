import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', // On bloque les routes API internes
        '/admin/', // On cache la page de connexion administration si elle existe
        '/checkout/', // Inutile d'indexer la page de paiement
        '/cart/', // Inutile d'indexer le panier
      ],
    },
    // On indique automatiquement l'adresse de votre sitemap dynamique
    sitemap: 'https://americansbeautycenter.com/sitemap.xml',
  }
}
