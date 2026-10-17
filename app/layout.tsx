import './styles/global.css'
import { Noto_Sans, Inter, Pinyon_Script } from 'next/font/google'
import Footer from '@/components/footer'
import NavbarElement from '@/components/NavBarElement'
import { CartProvider } from '@/components/cartProvider'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import WhatsAppButton from '@/components/WhatsAppButton'

const notoSans = Noto_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter',
})

const pinyonScript = Pinyon_Script({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-pinyon-script',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americansbeautycenter.com',
  ),
  title: {
    default: 'AmericansBeautyCenter',
    template: '%s | AmericansBeautyCenter',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='fr'
      className={`${pinyonScript.variable} ${notoSans.variable} ${inter.variable}`}
    >
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      <body className='antialiased'>
        <CartProvider>
          <NavbarElement />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        <WhatsAppButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
