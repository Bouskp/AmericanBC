'use client'

import { Plus } from 'lucide-react'

const PHONE_NUMBER = '2250707879292'
const DEFAULT_MESSAGE =
  "Bonjour, je souhaite avoir plus d'informations sur vos produits."

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <a
      href={whatsappUrl}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Contactez-nous sur WhatsApp'
      className='fixed bottom-6 right-6 z-50 flex h-11 w-11 md:w-auto items-center justify-center rounded-none bg-black/95 md:px-3.5 text-white transition-all duration-300 hover:bg-black hover:-translate-y-1 shadow-sm border border-white/10 group gap-2'
    >
      {/* ─── VECTEUR WHATSAPP ÉPURÉ ─── */}
      <svg
        viewBox='0 0 24 24'
        className='h-6 w-6 transition-transform duration-500 ease-out group-hover:scale-105'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' />
        <path d='M9 10a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a4 4 0 0 1-4-4v-1z' />
      </svg>

      {/* Label textuel affiché uniquement sur ordinateur */}
      <span className='hidden md:inline font-sans text-[10px] font-light uppercase tracking-[0.14em] text-white/90 group-hover:text-white transition-colors select-none'>
        Contact
      </span>
    </a>
  )
}
