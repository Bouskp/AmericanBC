import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { decode } from 'html-entities'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatHtmlString(input: string): string {
  const premierDecodage = decode(input || '')
  const htmlFinalInterpretable = decode(premierDecodage)
    .replace(/<br\s*\/?>/gi, '')
    .replace(/<hr\s*\/?>/gi, '')
    .replace(/<p>&nbsp;<\/p>/gi, '')
    .replace(/>\s+</g, '><')
    .trim()
  return htmlFinalInterpretable
}

export const mainLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Boutique', href: '/boutique' },
  { label: 'En gros', href: '/en-gros' },
  { label: 'Qui sommes-nous ?', href: '/contacts' },
]

export function presenterMontant(
  prix: string | number,
  devise?: string,
): string {
  const montant =
    typeof prix === 'string' ? parseFloat(prix.replace(',', '.')) : prix

  const options: Intl.NumberFormatOptions = devise
    ? { style: 'currency', currency: devise, minimumFractionDigits: 0 }
    : { minimumFractionDigits: 0 }

  return new Intl.NumberFormat('fr-FR', options).format(montant)
}
