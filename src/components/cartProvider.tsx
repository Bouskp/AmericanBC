'use client'

import * as React from 'react'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    // Cette ligne s'exécute uniquement une fois arrivé dans le navigateur
    setIsHydrated(true)
  }, [])

  // Pendant le rendu serveur sur Vercel, on rend l'arbre invisible ou neutre
  // pour éviter les décalages de DOM avec le client
  if (!isHydrated) {
    return <div className='opacity-0'>{children}</div>
  }

  return <>{children}</>
}
