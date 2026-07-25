import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Tag } from 'lucide-react'

interface PromoBannerProps {
  title: string
  description: string
  badge?: string
  ctaText?: string
  ctaHref?: string
  bgClass?: string // Permet de changer la couleur de fond à la volée
}

export function PromoBanner({
  title,
  description,
  badge = 'Offre Spéciale',
  ctaText = 'En profiter',
  ctaHref = '#catalogue',
  bgClass = 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black',
}: PromoBannerProps) {
  return (
    <div
      className={`w-full rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden shadow-sm relative border border-muted/20 ${bgClass}`}
    >
      {/* Texture d'arrière-plan discrète pour le style */}
      <div className='absolute -right-10 -bottom-10 opacity-10 pointer-events-none'>
        <Tag className='h-40 w-40 rotate-12' />
      </div>

      {/* BLOC TEXTE */}
      <div className='space-y-3 max-w-2xl relative z-10'>
        {/* Petit badge d'accroche */}
        <span className='inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase bg-white/10 dark:bg-black/10 px-2.5 py-1 rounded-full backdrop-blur-sm'>
          <Tag className='h-3 w-3 text-primary animate-pulse' />
          {badge}
        </span>

        {/* Titre de l'offre */}
        <h3 className='text-2xl md:text-3xl font-extrabold tracking-tight leading-tight'>
          {title}
        </h3>

        {/* Description de l'offre */}
        <p className='text-sm opacity-90 leading-relaxed max-w-xl'>
          {description}
        </p>
      </div>

      {/* BOUTON D'ACTION (CTA) */}
      <div className='w-full md:w-auto shrink-0 relative z-10 pt-2 md:pt-0'>
        <Button
          asChild
          size='lg'
          variant={bgClass.includes('bg-primary') ? 'secondary' : 'default'}
          className='w-full md:w-auto font-bold shadow-md group hover:scale-[1.02] transition-all'
        >
          <Link
            href={ctaHref}
            className='flex items-center justify-center gap-2'
          >
            {ctaText}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </Button>
      </div>
    </div>
  )
}
