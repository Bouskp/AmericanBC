'use client'

import { usePathname } from 'next/navigation'
import { WooCommerceProductCategory } from '../../types/woocommerce'
import Link from 'next/link'

interface Props {
  categories: WooCommerceProductCategory[]
}

export function SubNavbar({ categories }: Props) {
  const pathname = usePathname()
  return (
    <div className='w-full border-t bg-muted/40 container'>
      <div className='container mx-auto px-4'>
        <nav
          className='flex items-center gap-6 h-12 overflow-x-auto scrollbar-none whitespace-nowrap'
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {categories.map((category) => {
            const isActive = pathname === `/category/${category.slug}`
            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`text-lg  font-serif transition-colors hover:text-primary relative flex items-center h-full ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground'
                }`}
              >
                {category.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
