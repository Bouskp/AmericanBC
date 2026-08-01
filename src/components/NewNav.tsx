'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import logo from '../images/logo.png'
import { Button } from '@/components/ui/button'
import { CartSheet } from '@/components/CartSheet'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { mainLinks } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

function Logo() {
  return (
    <Link
      href='/'
      className='flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 group transition-transform active:scale-95'
    >
      {/* ─── L'IMAGE (LOGO PNG) : Toujours visible, centrée au-dessus du texte sur mobile ─── */}
      <div className='relative h-12 w-12 md:h-16 md:w-16 shrink-0 transition-transform group-hover:rotate-6'>
        <Image
          src={logo}
          alt='Logo AMERICAN’S BEAUTY CENTER'
          fill
          sizes='(max-width: 768px) 48px, 64px'
          priority
          className='object-contain rounded-full'
        />
      </div>

      {/* ─── LE NOM DE LA MARQUE : En dessous sur mobile, à droite sur PC ─── */}
      <span className='text-brand-red tracking-tighter uppercase leading-none text-center text-sm md:text-3xl lg:text-4xl font-bold font-serif'>
        AMERICAN’S BEAUTY CENTER
      </span>
    </Link>
  )
}

export function Navbar({ categories }: { categories: any[] }) {
  const pathname = usePathname()

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white'>
      {/* ─── NIVEAU 1 : LOGO & NOM GÉANT (CENTRE) ─── */}
      <div className='border-b bg-background'>
        <div className='container relative flex h-24 items-center justify-center px-4 mx-auto'>
          <Logo />
        </div>
      </div>

      {/* ─── NIVEAU 2 : ONGLETS PRINCIPAUX & ACTIONS ─── */}
      <div className='border-b bg-white'>
        <div className='container flex h-14 items-center justify-between px-4 mx-auto'>
          {/* Menu Mobile Trigger */}
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left'>
                <SheetHeader>
                  <SheetTitle className='text-sm text-brand-red uppercase text-center font-bold tracking-widest mt-6 font-serif'>
                    American's Beauty Center
                  </SheetTitle>
                </SheetHeader>
                <nav className='flex flex-col gap-4 mt-8'>
                  {mainLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className='text-lg font-bold border-b pb-2 text-center'
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Onglets Desktop */}
          <div className='hidden md:flex flex-1 justify-center'>
            <NavigationMenu>
              <NavigationMenuList>
                {mainLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild active={pathname === link.href}>
                      <Link
                        href={link.href}
                        className={`${navigationMenuTriggerStyle()} uppercase text-[px] font-extrabold tracking-widest font-sans`}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions Droite */}
          <div className='flex items-center gap-2'>
            <CartSheet />
          </div>
        </div>
      </div>

      {/* ─── NIVEAU 3 : CATÉGORIES (HORIZONTAL SCROLL) ─── */}
      <div className='bg-zinc-50 dark:bg-zinc-900/50'>
        <div className='container mx-auto px-4'>
          <nav className='flex items-center gap-8 h-12 overflow-x-auto no-scrollbar whitespace-nowrap justify-start md:justify-center'>
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className={`text-[px] uppercase font-black tracking-widest hover:text-primary transition-colors font-serif ${
                  pathname === cat.href
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
