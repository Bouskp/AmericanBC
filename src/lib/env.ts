// lib/env.ts

/**
 * URL publique de l'app Next.js elle-même (pas WooCommerce).
 * - En dev local : l'URL ngrok (pour que CinetPay puisse joindre le webhook)
 * - En prod : le vrai domaine
 */
export function getAppUrl(): string {
  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    if (!process.env.NGROK_URL) {
      throw new Error(
        'NGROK_URL manquant en développement — lance ngrok et renseigne .env.local',
      )
    }
    return process.env.NGROK_URL
  }

  const prodUrl =
    process.env.NEXT_PUBLIC_APP_URL || process.env.WOOCOMMERCE_SITE_URL
  if (!prodUrl) {
    throw new Error('APP_URL manquant en production')
  }
  return prodUrl
}
