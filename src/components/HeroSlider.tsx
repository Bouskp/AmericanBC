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
import banner2 from '../images/banner2.png'
import banner3 from '../images/banner3.png'

const slides = [
  {
    id: 1,
    title: 'Nouvelle Collection Disponible',
    description:
      'Découvrez nos nouveautés exclusives sélectionnées pour vous au meilleur prix.',
    cta: 'Voir le catalogue',
    href: '/category/tous-les-produits',
    imageUrl: banner2,
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
    bgClass: '',
  },
  {
    id: 3,
    title: 'Paiement à la Livraison',
    description:
      'Achetez en toute confiance. Vérifiez votre produit et payez sur place en espèces ou Mobile Money.',
    cta: 'Découvrir nos produits',
    href: '/category/tous-les-produits',
    imageUrl: banner3,
    bgClass: '',
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
            return (
              <CarouselItem key={slide.id}>
                <div
                  className={`relative w-full min-h-[380px] md:min-h-[500px] flex flex-col items-center justify-center p-6 md:p-12 text-center transition-all duration-500`}
                >
                  {/* ─── RENDU CONDITIONNEL DE L'IMAGE DE FOND ─── */}
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    priority
                    sizes='100vw'
                    className='object-cover object-center pointer-events-none'
                  />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
