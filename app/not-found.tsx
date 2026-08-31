import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center bg-white select-none'>
      {/* Structure de l'erreur */}
      <div className='space-y-5 max-w-md mx-auto flex flex-col items-center'>
        {/* Le code d'erreur fait office de micro-label discret */}
        <p className='font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400'>
          Erreur 404
        </p>

        {/* Titre style éditorial / presse */}
        <h1 className='font-serif text-3xl md:text-4xl font-light text-black tracking-wide lowercase first-letter:uppercase leading-tight'>
          Page introuvable
        </h1>

        {/* Descriptif fin et aéré */}
        <p className='font-sans text-xs text-gray-400 font-light leading-relaxed max-w-xs'>
          L'article ou la page que vous recherchez n'est plus disponible ou a
          été déplacé.
        </p>

        {/* ─── ACTIONS MINIMALISTES ─── */}
        <div className='pt-6 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto'>
          {/* Action principale : Retour à l'accueil / Boutique */}
          <Link
            href='/boutique'
            className='w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-none bg-black px-6 text-[11px] font-sans font-light uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-zinc-800 shadow-xs gap-2 group'
          >
            Découvrir la boutique
            <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 stroke-[1.5]' />
          </Link>

          {/* Action secondaire : Les nouveautés */}
          <Link
            href='/nouveautes'
            className='w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-none bg-transparent border border-gray-100 px-6 text-[11px] font-sans font-light uppercase tracking-[0.14em] text-gray-500 transition-all duration-300 hover:text-black hover:border-gray-300 hover:bg-transparent'
          >
            Voir les nouveautés
          </Link>
        </div>
      </div>
    </div>
  )
}
