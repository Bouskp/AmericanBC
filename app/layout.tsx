import './styles/global.css'
import { Playfair_Display, Inter } from 'next/font/google'
import Footer from '@/components/footer'
import NavbarElement from '@/components/NavBarElement'
import { CartProvider } from '@/components/cartProvider'

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
        <CartProvider>
          <NavbarElement />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
