'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

const slides = [
  {
    id: 1,
    title: 'Nouvelle Collection Disponible',
    description:
      'Découvrez nos nouveautés exclusives sélectionnées pour vous au meilleur prix.',
    cta: 'Voir le catalogue',
    href: '/category/tous-les-produits',
    bgClass: 'bg-zinc-700 text-white',
  },
  {
    id: 2,
    title: 'Livraison Rapide à Abidjan',
    description:
      "Commandez aujourd'hui et recevez votre colis chez vous sous 24h à 48h.",
    cta: 'Acheter maintenant',
    href: '/category/tous-les-produits',
    imageUrl:
      'https://api.americansbeautycenter.com/wp-content/uploads/2026/07/banner.png',
  },
  {
    id: 3,
    title: 'Paiement à la Livraison',
    description:
      'Achetez en toute confiance. Vérifiez votre produit et payez sur place en espèces ou Mobile Money.',
    cta: 'Découvrir nos produits',
    href: '/category/tous-les-produits',
    bgClass: 'bg-zinc-200 text-primary-foreground',
  },
]

export function HeroSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  )

  return (
    <div className='w-full overflow-hidden select-none'>
      <Carousel
        plugins={[plugin.current]}
        className='w-full'
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide) => {
            const hasImage = !!slide.imageUrl
            return (
              <CarouselItem key={slide.id}>
                <div
                  className={`relative w-full min-h-[380px] md:min-h-[500px] flex flex-col items-center justify-center p-6 md:p-12 text-center transition-all duration-500 ${
                    // Si le slide a une image, le texte est forcé en blanc. Sinon, on utilise la couleur unie définie.
                    hasImage ? 'text-white bg-zinc-900' : slide.bgClass
                  }`}
                >
                  {/* ─── RENDU CONDITIONNEL DE L'IMAGE DE FOND ─── */}
                  {hasImage && slide.imageUrl && (
                    <>
                      <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        fill
                        priority
                        sizes='100vw'
                        className='object-cover object-center pointer-events-none'
                      />
                      {/* Voile noir d'overlay appliqué uniquement s'il y a une image */}
                      <div className='absolute inset-0 bg-black/50' />
                    </>
                  )}

                  {/* ─── BLOC TEXTE ET ACTIONS ─── */}
                  <div className='max-w-2xl mx-auto space-y-4 md:space-y-6 relative z-10'>
                    <span
                      className={`inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-sm ${
                        hasImage
                          ? 'bg-white/20'
                          : 'bg-black/10 dark:bg-white/10'
                      }`}
                    >
                      American Beauty Center
                    </span>

                    <h1 className='text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight'>
                      {slide.title}
                    </h1>

                    <p className='text-sm md:text-base opacity-90 max-w-lg mx-auto font-medium leading-relaxed'>
                      {slide.description}
                    </p>

                    <div className='pt-2'>
                      <Button
                        asChild
                        size='lg'
                        variant={
                          !hasImage && slide.bgClass?.includes('bg-secondary')
                            ? 'secondary'
                            : 'default'
                        }
                        className='font-bold shadow-md hover:scale-105 transition-transform'
                      >
                        <Link href={slide.href}>{slide.cta}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
