'use client'

import * as React from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

const LIBRARY_ID = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID!
const CDN_HOST = process.env.NEXT_PUBLIC_BUNNY_CDN_HOST!

type Video = {
  id: string
  title?: string
  bunnyId: string
  thumbnail?: string
}

const videos: Video[] = [
  {
    id: '1',
    bunnyId: '3cac2ae5-74ca-418c-98bd-5019cc2e5afc',
  },
  {
    id: '2',
    bunnyId: 'f61212b4-7a32-415c-ae75-80b8048506d1',
  },
  {
    id: '3',
    bunnyId: '8ba8a421-51aa-4ca6-a2a6-255b8523d6a5',
  },
  {
    id: '4',
    bunnyId: 'e2e6be96-f820-424e-a743-8fe8105242db',
  },
  {
    id: '5',
    bunnyId: '8f40c15a-afe5-48bd-b44d-ca5d4dab8f20',
  },
]

function getEmbedUrl(video: Video) {
  return `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${video.bunnyId}?autoplay=true&preload=true&responsive=true`
}

function getThumbnail(video: Video) {
  return video.thumbnail ?? `https://${CDN_HOST}/${video.bunnyId}/thumbnail.jpg`
}

export function HealthVideos() {
  const [active, setActive] = React.useState<Video | null>(null)
  const scrollerRef = React.useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 16 : el.clientWidth // 16 = gap-4
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <section className='container mx-auto px-4 py-12 bg-brand-red text-white rounded-lg shadow-lg'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='font-serif text-3xl md:text-4xl font-bold tracking-wide text-white'>
          VIDEOS EXPLICATIVES
        </h2>

        {/* Flèches visibles uniquement sur desktop */}
        <div className='hidden md:flex gap-2'>
          <button
            type='button'
            onClick={() => scrollByCard(-1)}
            aria-label='Précédent'
            className='h-10 w-10 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white'
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
          <button
            type='button'
            onClick={() => scrollByCard(1)}
            aria-label='Suivant'
            className='h-10 w-10 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white'
          >
            <ChevronRight className='h-5 w-5' />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className='flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      >
        {videos.map((video, index) => (
          <button
            key={video.id}
            type='button'
            onClick={() => setActive(video)}
            className='group shrink-0 snap-start basis-[75%] sm:basis-[45%] md:basis-[31%] lg:basis-[calc(25%-12px)] rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden text-left transition-shadow duration-300 hover:shadow-lg'
          >
            <div className='relative aspect-[3/4] overflow-hidden bg-muted'>
              <Image
                src={getThumbnail(video)}
                alt={video?.title ?? 'Video thumbnail'}
                fill
                unoptimized
                priority={index < 2}
                sizes='(min-width: 1024px) 25vw, (min-width: 768px) 31vw, 75vw'
                className='object-cover pointer-events-none'
                draggable={false}
              />
              <div className='absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity'>
                <div className='w-16 h-16 rounded-full bg-white/90 flex items-center justify-center'>
                  <Play
                    className='h-8 w-8 text-primary ml-1'
                    fill='currentColor'
                  />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className='max-w-sm p-0 overflow-hidden bg-black border-0'>
          <DialogTitle className='sr-only'>{active?.title}</DialogTitle>
          {active && (
            <div className='aspect-[9/16] w-full'>
              <iframe
                src={getEmbedUrl(active)}
                title={active.title}
                className='h-full w-full'
                allow='autoplay; encrypted-media; picture-in-picture'
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
