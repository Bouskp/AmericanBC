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
