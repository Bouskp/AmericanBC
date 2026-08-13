'use client'

import * as React from 'react'
import Image from 'next/image'

export default function ProductGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [activeImage, setActiveImage] = React.useState(images[0])

  return (
    <div className='space-y-4'>
      {/* Image Principale de la fiche */}
      <div className='relative aspect-square w-full rounded-2xl overflow-hidden border border-muted/50'>
        <Image
          src={activeImage}
          alt={name}
          fill
          sizes='(max-w-md) 100vw, 50vw'
          className='object-contain object-center'
          priority // Améliore le score LCP (Largest Contentful Paint) du SEO
        />
      </div>

      {/* Liste des miniatures (si le produit possède plusieurs photos) */}
      {images.length > 1 && (
        <div className='flex gap-3 overflow-x-auto pb-1'>
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              className={`relative h-20 w-20 rounded-lg overflow-hidden border bg-muted shrink-0 transition-all ${
                activeImage === img
                  ? 'border-primary ring-2 ring-primary/10'
                  : 'border-transparent opacity-70'
              }`}
            >
              <Image
                src={img}
                alt={`${name} - miniature ${index}`}
                fill
                className='object-contain'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
