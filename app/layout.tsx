import './styles/global.css'
import { Playfair_Display, Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { NavbarComponent } from '@/components/MobileNavbar'
import Footer from '@/components/footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='fr' className={`${playfair.variable} ${inter.variable}`}>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      <body className='antialiased'>
        <NavbarComponent />
        <main className='container'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
