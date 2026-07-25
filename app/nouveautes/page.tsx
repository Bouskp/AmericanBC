import { notFound } from 'next/navigation'
import { Sparkles, ArrowDownAZ } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'

// Récupération de vos derniers produits depuis WooCommerce (REST ou GraphQL)
async function getNewArrivals() {
  try {
    // En production : fetch vers https://votre-site-wordpress.com
    // avec un tri 'orderby: { field: DATE, order: DESC }'
    const mockProducts = [
      {
        id: '1',
        name: 'Montre Quartz Classic Black',
        price: '25000',
        slug: 'montre-quartz',
        isNew: true,
        image:
          'https://api.americansbeautycenter.com/wp-content/uploads/2026/07/banner.png',
      },
      {
        id: '2',
        name: 'Chaussures Sport Run',
        price: '45000',
        slug: 'chaussures-sport-run',
        isNew: true,
        image:
          'https://api.americansbeautycenter.com/wp-content/uploads/2026/07/banner.png',
      },
      {
        id: '3',
        name: 'Sac à Dos Cuir Urban',
        price: '35000',
        slug: 'sac-a-dos-cuir',
        isNew: true,
        image:
          'https://api.americansbeautycenter.com/wp-content/uploads/2026/07/banner.png',
      },
    ]

    return mockProducts
  } catch (error) {
    console.error('Erreur de récupération des nouveautés :', error)
    return []
  }
}

export default async function NewArrivalsPage() {
  const newProducts = await getNewArrivals()

  return (
    <div className='container mx-auto px-4 py-8 md:py-12 max-w-6xl'>
      {/* ─── EN-TÊTE DE LA PAGE ─── */}
      <div className='border-b pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4'>
        <div className='space-y-2'>
          {/* Petit badge textuel brillant */}
          <span className='inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary px-2.5 py-1 rounded-full'>
            <Sparkles className='h-3 w-3 animate-pulse' />
            Derniers Arrivages
          </span>
          <h1 className='text-2xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50'>
            Les Nouveautés
          </h1>
          <p className='text-sm text-muted-foreground'>
            Découvrez nos articles les plus récents, mis en ligne cette semaine
            et disponibles immédiatement.
          </p>
        </div>

        {/* Petit indicateur de volume */}
        <div className='flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border'>
          <ArrowDownAZ className='h-3.5 w-3.5' />
          <span>Trier automatiquement par date</span>
        </div>
      </div>

      {/* ─── GRILLE DES NOUVEAUTÉS ─── */}
      {newProducts.length === 0 ? (
        <div className='text-center py-16 border border-dashed rounded-2xl bg-muted/10'>
          <p className='text-muted-foreground text-sm'>
            Aucune nouveauté n'a été ajoutée récemment.
          </p>
        </div>
      ) : (
        /* 
          La grille utilise notre disposition standard de 2 colonnes sur mobile 
          pour vos 15 articles afin d'optimiser l'espace d'achat.
        */
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              slug={product.slug}
              onSale={false} // Les nouveautés sont généralement au prix fort au début
              image={product.image}
            />
          ))}
        </div>
      )}
    </div>
  )
}
