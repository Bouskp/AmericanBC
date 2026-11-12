'use client'

import * as React from 'react'
import Link from 'next/link'
import { getImageProps, type ImageProps } from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import olayBanner from '../images/BanniereOlay.png'
import ADClilicalsBanner from '../images/Banniere1ADClinicals.png'
import AmericansBanner from '../images/BanniereAmericanDreams.png'
import mobileAD from '../images/mobileAD.png'
import mobileOlay from '../images/mobileOlay.png'
import mobileAmericans from '../images/mobileAmericanDream.png'
import BannerOgx from '../images/BaniereOGX.png'
import mobileOGX from '../images/mobileOGX.png'

type Slide = {
  id: number
  alt: string
  href: string
  desktop: ImageProps['src']
  mobile: ImageProps['src']
}

const slides: Slide[] = [
  {
    id: 1,
    alt: 'Nouvelle collection disponible',
    href: '/category/tous-les-produits',
    desktop: olayBanner,
    mobile: mobileOlay,
  },
  {
    id: 2,
    alt: 'Livraison rapide à Abidjan',
    href: '/category/tous-les-produits',
    desktop: ADClilicalsBanner,
    mobile: mobileAD,
  },
  {
    id: 3,
    alt: 'Paiement à la livraison',
    href: '/category/tous-les-produits',
    desktop: AmericansBanner,
    mobile: mobileAmericans,
  },
  {
    id: 4,
    alt: 'Découvrez nos produits OGX',
    href: '/category/tous-les-produits',
    desktop: BannerOgx,
    mobile: mobileOGX,
  },
]

function SlideImage({ slide, priority }: { slide: Slide; priority: boolean }) {
  const common = { alt: slide.alt, fill: true, sizes: '100vw', priority }

  const { props: desktop } = getImageProps({ ...common, src: slide.desktop })
  const { props: mobile } = getImageProps({ ...common, src: slide.mobile })

  return (
    <picture>
      <source media='(min-width: 768px)' srcSet={desktop.srcSet} />
      {/* L'<img> de secours porte les props de l'image mobile */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...mobile}
        alt={slide.alt}
        className='object-contain object-top'
        draggable={false}
      />
    </picture>
  )
}

export function HeroSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  )

  return (
    <div className='w-full overflow-hidden select-none'>
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        className='w-full'
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <Link
                href={slide.href}
                className='relative block w-full aspect-[4/5] md:aspect-[16/6]'
              >
                <SlideImage slide={slide} priority={index === 0} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
