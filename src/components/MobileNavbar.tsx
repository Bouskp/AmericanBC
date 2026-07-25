import Link from 'next/link'
import { Menu, ShoppingBag, User } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from './ui/button'
import Image from 'next/image'
import { getAllCategories } from '../../types/wooCommerceApi'
import { SubNavbar } from './SubNavbar'
import Logo from '../images/logo.png'
import { CartSheet } from './CartSheet'

// export function MobileNavbar({ className }: Props) {
//   return (
//     <div className={cn('', className)}>
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button variant='ghost' size='icon' aria-label='Ouvrir le menu'>
//             <Menu className='h-6 w-6' />
//           </Button>
//         </SheetTrigger>
//         <SheetContent content='left' className='w-[280px]'>
//           <SheetHeader className='text-left'>
//             <SheetTitle className='font-bold text-xl'>
//               American Beauty Center
//             </SheetTitle>
//             <SheetDescription className='sr-only'>
//               Menu de navigation pour les appareils mobiles
//             </SheetDescription>
//           </SheetHeader>
//         </SheetContent>
//       </Sheet>
//     </div>
//   )
// }

// Structure de vos liens de navigation
const menuItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Boutique', href: '/boutique' },
  { label: 'Nouveautés', href: '/nouveautes' },
  { label: 'En gros', href: '/en-gros' },
  { label: 'Contacts', href: '/contacts' },
  { label: 'Blog', href: '/blog' },
]

export const revalidate = 3600 * 24

export async function NavbarComponent() {
  const allCategories = await getAllCategories()
  return (
    <header className='w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-auto items-center px-4 mx-auto'>
        {/* SECTION GAUCHE : MENU BURGER (MOBILE) & LOGO */}
        <div className='flex items-center gap-4'>
          {/* Menu Mobile - Affiché uniquement sur petits écrans */}
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' aria-label='Ouvrir le menu'>
                  <Menu className='h-6 w-6' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-[280px]'>
                <SheetHeader className='text-left'>
                  <SheetDescription className='sr-only'>
                    Menu de navigation pour les appareils mobiles
                  </SheetDescription>
                </SheetHeader>
                <nav className='flex flex-col gap-4 mt-6'>
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className='text-xl
                      font-medium transition-colors py-2 border-muted text-center
                      '
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Logo de la marque */}
        <Link href='/' className='mr-auto flex items-center'>
          <Image
            src={Logo}
            alt='logo de ABC'
            width={100}
            height={100}
            className=''
          />
        </Link>

        {/* SECTION CENTRALE : NAVIGATION DESKTOP (Masquée sur Mobile) */}
        <div className='hidden md:flex'>
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} passHref>
                    <NavigationMenuLink className='text-lg font-serif hover:bg-brand-red/30 hover:text-white'>
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* SECTION DROITE : ACTIONS UTILISATEUR (Panier, Profil) */}
        <div className='flex items-center gap-1 ml-auto'>
          {/* Icône de compte client */}
          <Button variant='ghost' size='icon' asChild>
            <Link href='/mon-compte' aria-label='Mon compte'>
              <User className='size-7' />
            </Link>
          </Button>

          {/* Bouton Panier avec un badge d'articles */}
          <CartSheet />
        </div>
      </div>
      <SubNavbar categories={allCategories} />
    </header>
  )
}
