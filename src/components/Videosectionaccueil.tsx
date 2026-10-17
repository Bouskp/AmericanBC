// components/sections/VideoSectionTiktokFacebook.tsx
'use client'

import { useState } from 'react'
import { Play, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type Plateforme = 'tiktok' | 'facebook'
type Filtre = 'tous' | Plateforme

interface VideoItem {
  /**
   * tiktok   → ID numérique de la vidéo (ex: '7312345678901234567')
   *            visible dans l'URL tiktok.com/@compte/video/XXXXXXXX
   * facebook → URL complète de la vidéo ou du reel (doit être publique)
   */
  id: string
  plateforme: Plateforme
  titre: string
  description?: string
  duree?: string
  categorie: string
  /** Miniature (chemin dans /public ou URL). Sans elle, un fond neutre s'affiche. */
  miniature?: string
  /** Force le format vertical (reels). TikTok est vertical par défaut. */
  vertical?: boolean
}

const CHANNELS: { plateforme: Plateforme; label: string; url: string }[] = [
  {
    plateforme: 'tiktok',
    label: 'TikTok',
    url: 'https://www.tiktok.com/@american_beauty_center',
  },
]

const PLATFORM_LABELS: Record<Plateforme, string> = {
  tiktok: 'TikTok',
  facebook: 'Facebook',
}

// ✏️ Modifiez les titres, catégories et descriptions à votre goût.
// Ajoutez un champ `miniature` (ex: '/images/miniatures/reel-1.jpg') pour afficher une image.
const VIDEOS: VideoItem[] = [
  {
    id: 'https://www.facebook.com/reel/1424913319170462',
    plateforme: 'facebook',
    titre: 'Reel American Beauty Center n°1',
    categorie: 'Reel',
    vertical: true,
  },
  {
    id: '7678772531242863893',
    plateforme: 'tiktok',
    titre: 'TikTok American Beauty Center n°1',
    categorie: 'Vidéo',
  },
  {
    id: 'https://www.facebook.com/reel/1660765992429684',
    plateforme: 'facebook',
    titre: 'Reel American Beauty Center n°2',
    categorie: 'Reel',
    vertical: true,
  },
  {
    id: '7687283137935625492',
    plateforme: 'tiktok',
    titre: 'TikTok American Beauty Center n°2',
    categorie: 'Vidéo',
  },
  {
    id: 'https://www.facebook.com/reel/2326986288065387',
    plateforme: 'facebook',
    titre: 'Reel American Beauty Center n°3',
    categorie: 'Reel',
    vertical: true,
  },
  {
    id: '7678730876733230356',
    plateforme: 'tiktok',
    titre: 'TikTok American Beauty Center n°3',
    categorie: 'Vidéo',
  },
  {
    id: '7684316736149146900',
    plateforme: 'tiktok',
    titre: 'TikTok American Beauty Center n°4',
    categorie: 'Vidéo',
  },
  {
    id: '7690662711948053781',
    plateforme: 'tiktok',
    titre: 'TikTok American Beauty Center n°5',
    categorie: 'Vidéo',
  },
  {
    id: '7689492838563745045',
    plateforme: 'tiktok',
    titre: 'TikTok American Beauty Center n°6',
    categorie: 'Vidéo',
  },
]

function isVertical(video: VideoItem) {
  return video.vertical ?? video.plateforme === 'tiktok'
}

function getEmbedUrl(video: VideoItem) {
  if (video.plateforme === 'tiktok') {
    return `https://www.tiktok.com/embed/v2/${video.id}`
  }
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    video.id,
  )}&show_text=false&t=0`
}

const videoKey = (v: VideoItem) => `${v.plateforme}-${v.id}`

interface VideoSectionProps {
  videos?: VideoItem[]
}

export default function VideoSectionTiktokFacebook({
  videos = VIDEOS,
}: VideoSectionProps) {
  const [filtre, setFiltre] = useState<Filtre>('tous')
  const [videoActive, setVideoActive] = useState<VideoItem | undefined>(
    videos[0],
  )

  if (!videoActive) return null

  const plateformesPresentes = Array.from(
    new Set(videos.map((v) => v.plateforme)),
  )
  const filtres: Filtre[] = ['tous', ...plateformesPresentes]

  const videosFiltrees =
    filtre === 'tous' ? videos : videos.filter((v) => v.plateforme === filtre)

  const changerFiltre = (f: Filtre) => {
    setFiltre(f)
    const premiere =
      f === 'tous' ? videos[0] : videos.find((v) => v.plateforme === f)
    if (premiere) setVideoActive(premiere)
  }

  const vertical = isVertical(videoActive)

  return (
    <section className='w-full bg-brand-black text-white py-14 md:py-20 my-12 border-t-2 border-brand-red antialiased'>
      <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8'>
        {/* ─── Grille principale ─── */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 items-start'>
          {/* LECTEUR PRINCIPAL (7/12) */}
          <div className='order-2 lg:order-1 lg:col-span-7 space-y-6'>
            <div
              className={`relative bg-black border border-white/10 overflow-hidden ${
                vertical
                  ? 'h-[580px] sm:h-[640px]'
                  : 'aspect-[4/3] sm:aspect-video'
              }`}
            >
              <iframe
                key={videoKey(videoActive)}
                src={getEmbedUrl(videoActive)}
                title={videoActive.titre}
                allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
                allowFullScreen
                className={`absolute inset-y-0 h-full border-0 ${
                  vertical
                    ? 'left-1/2 -translate-x-1/2 w-full max-w-[340px]'
                    : 'inset-x-0 w-full'
                }`}
              />
            </div>

            <div className='space-y-3 text-left'>
              <span className='block font-sans text-[10px] uppercase tracking-[0.14em] text-brand-gold font-medium'>
                {PLATFORM_LABELS[videoActive.plateforme]} ·{' '}
                {videoActive.categorie}
              </span>

              {videoActive.description && (
                <p className='font-sans text-sm font-light leading-relaxed text-white/60 max-w-prose'>
                  {videoActive.description}
                </p>
              )}
            </div>
          </div>

          {/* LISTE DES VIDÉOS (5/12) */}
          <div className='order-1 lg:order-2 lg:col-span-5 flex flex-col'>
            <div className='flex items-center justify-between gap-4 mb-4'>
              <h4 className='font-sans text-xs font-bold uppercase tracking-[0.14em] text-white text-left'>
                Vidéos Récentes
              </h4>

              {filtres.length > 2 && (
                <div className='flex items-center gap-4' role='tablist'>
                  {filtres.map((f) => (
                    <button
                      key={f}
                      type='button'
                      role='tab'
                      aria-selected={filtre === f}
                      onClick={() => changerFiltre(f)}
                      className={`font-sans text-[10px] uppercase tracking-[0.14em] pb-1 border-b transition-colors ${
                        filtre === f
                          ? 'text-white border-brand-red'
                          : 'text-white/40 border-transparent hover:text-white/80'
                      }`}
                    >
                      {f === 'tous' ? 'Tout' : PLATFORM_LABELS[f]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className='
                flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain pb-2 -mx-4 px-4
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                lg:flex-col lg:gap-0 lg:overflow-x-visible lg:snap-none lg:mx-0 lg:px-0 lg:pb-0
                lg:divide-y lg:divide-white/10 lg:max-h-[460px] lg:overflow-y-auto lg:pr-2
              '
            >
              {videosFiltrees.map((vid) => {
                const isActive = videoKey(videoActive) === videoKey(vid)

                return (
                  <button
                    key={videoKey(vid)}
                    type='button'
                    onClick={() => setVideoActive(vid)}
                    aria-pressed={isActive}
                    className={`
                      shrink-0 w-[260px] sm:w-[300px] lg:w-full snap-start
                      text-left py-4 flex gap-4 items-center group transition-colors duration-300
                      border-l-2 pl-3
                      ${
                        isActive
                          ? 'border-brand-red bg-white/5'
                          : 'border-transparent hover:bg-white/5'
                      }
                    `}
                  >
                    <div className='relative w-24 aspect-video bg-abc-charcoal shrink-0 border border-white/10 overflow-hidden'>
                      {vid.miniature ? (
                        <Image
                          src={vid.miniature}
                          alt=''
                          fill
                          unoptimized
                          className={`object-cover transition-opacity duration-300 ${
                            isActive
                              ? 'opacity-90'
                              : 'opacity-50 group-hover:opacity-80'
                          }`}
                        />
                      ) : (
                        <span className='absolute inset-0 flex items-end p-1.5 font-sans text-[9px] uppercase tracking-[0.14em] text-white/30'>
                          {PLATFORM_LABELS[vid.plateforme]}
                        </span>
                      )}

                      <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                        <Play
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isActive
                              ? 'text-brand-red scale-110'
                              : 'text-white group-hover:scale-110'
                          }`}
                          fill='currentColor'
                        />
                      </div>

                      {vid.duree && (
                        <span className='absolute bottom-1 right-1 bg-black/80 px-1 font-sans text-[9px] font-medium text-white/80'>
                          {vid.duree}
                        </span>
                      )}
                    </div>

                    <div className='flex-1 min-w-0 space-y-1'>
                      <span className='block font-sans text-[9px] uppercase tracking-[0.14em] text-white/40'>
                        {PLATFORM_LABELS[vid.plateforme]} · {vid.categorie}
                      </span>
                      <h5
                        className={`font-serif text-xs md:text-sm font-light leading-snug tracking-wide line-clamp-2 transition-colors ${
                          isActive
                            ? 'text-white'
                            : 'text-white/70 group-hover:text-white'
                        }`}
                      >
                        {vid.titre}
                      </h5>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
