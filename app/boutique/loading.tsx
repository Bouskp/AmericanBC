export default function Loading() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        <aside className='md:col-span-1 space-y-6'>
          <FilterSkeleton title='Catégorie' count={5} />
          <FilterSkeleton title='Marque' count={5} />
        </aside>
        <main className='md:col-span-3'>
          <div className='h-4 w-24 bg-muted rounded animate-pulse mb-4' />
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-6'>
            {Array.from({ length: 9 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

function FilterSkeleton({ title, count }: { title: string; count: number }) {
  return (
    <div>
      <h3 className='font-medium mb-2'>{title}</h3>
      <div className='space-y-2'>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className='h-4 w-3/4 bg-muted rounded animate-pulse' />
        ))}
      </div>
    </div>
  )
}

function ProductCardSkeleton() {
  return (
    <div>
      <div className='aspect-square rounded-lg bg-muted animate-pulse' />
      <div className='h-4 w-full bg-muted rounded animate-pulse mt-2' />
      <div className='h-3 w-1/2 bg-muted rounded animate-pulse mt-1' />
    </div>
  )
}
