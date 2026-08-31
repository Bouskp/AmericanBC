import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  RefreshCw,
  Check,
} from 'lucide-react'
import { FacebookIcon, InstagramIcon, TikTokIcon } from './Icons'
import Logo from '../images/logoBng.png'
import Image from 'next/image'
Image

export default function Footer() {
  return (
    <footer className='w-full'>
      {/* ─── ZONE 1 : BLOC DE RÉASSURANCE CLIENT (TRÈS IMPORTANT) ─── */}
      <div className='border-zinc-800 bg-black py-8'>
        <div className='container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left'>
          <div className='flex flex-col md:flex-row items-center gap-3'>
            <Check className='h-8 w-8 text-white' />
            <div>
              <h4 className='font-semibold text-white text-sm'>
                Produits de Qualité
              </h4>
              <p className='text-xs text-white'>
                En provenance des Etats-Unis et d'Europe
              </p>
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center gap-3'>
            <Truck className='h-8 w-8 text-white' />
            <div>
              <h4 className='font-semibold text-white text-sm'>
                Livraison Rapide
              </h4>
              <p className='text-xs text-white'>
                À Abidjan et à l'intérieur du pays
              </p>
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center gap-3'>
            <ShieldCheck className='h-8 w-8 text-white' />
            <div>
              <h4 className='text-white text-sm'>Paiement Sécurisé & COD</h4>
              <p className='text-xs text-white'>
                Via Mobile Money ou Cash à la livraison
              </p>
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center gap-3 sm:col-span-2 md:col-span-1 justify-center md:justify-start'>
            <RefreshCw className='h-8 w-8 text-white' />
            <div>
              <h4 className='font-semibold text-white text-sm'>
                Service Client 7j/7
              </h4>
              <p className='text-xs text-white'>
                Une équipe à votre écoute par WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── ZONE 2 : LES LIENS ET INFORMATIONS ─── */}
      <div className='container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
        {/* Colonne 1 : À Propos / Identité */}
        <div className='space-y-4'>
          <Link
            href='/'
            className='font-bold text-xl text-black tracking-tight'
          >
            <Image
              src={Logo}
              width={100}
              height={100}
              alt='logo de la boutique'
            />
          </Link>
          <p className='text-sm text-black leading-relaxed'>
            Accédez à des produits de qualité en provenance des Etats-unis
          </p>
        </div>

        {/* Colonne 2 : Liens de navigation */}
        <div className='space-y-3'>
          <h3 className='font-bold text-sm text-black uppercase tracking-wider'>
            La Boutique
          </h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link href='/boutique' className='transition-colors'>
                Tous les produits
              </Link>
            </li>
            <li>
              <Link href='/nouveautes' className='transition-colors'>
                Nouveautés
              </Link>
            </li>
            <li>
              <Link href='/promotions' className='transition-colors'>
                Promotions
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Liens d'assistance légale */}
        <div className='space-y-3'>
          <h3 className='font-bold text-sm text-black uppercase tracking-wider'>
            Assistance
          </h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link href='/mon-compte' className='transition-colors'>
                Mon Compte
              </Link>
            </li>
            <li>
              <Link href='/suivi-commande' className='transition-colors'>
                Suivi de commande
              </Link>
            </li>
            <li>
              <Link href='/conditions-generales' className='transition-colors'>
                Conditions de Livraison
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 4 : Contact Direct */}
        <div className='space-y-3'>
          <h3 className='font-bold text-sm text-black uppercase tracking-wider'>
            Contactez-nous
          </h3>
          <ul className='space-y-2 text-sm text-black'>
            <li className='flex items-center gap-2'>
              <Mail className='h-4 w-4 text-primary shrink-0' />
              <a
                href='mailto:americansbeautycenter@gmail.com'
                className='text-black transition-colors'
              >
                americansbeautycenter@gmail.com
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <Phone className='h-4 w-4 text-primary shrink-0' />
              <div className='flex flex-col'>
                <a
                  href='tel:+2250707879292'
                  className='text-black transition-colors'
                >
                  +225 07 07 87 92 92
                </a>
                <a
                  href='tel:+2250706353917'
                  className='text-black transition-colors'
                >
                  +225 07 06 35 39 17
                </a>
              </div>
            </li>
            <li className='flex items-start gap-2'>
              <MapPin className='h-4 w-4 text-primary shrink-0 mt-0.5' />
              <a
                href='https://www.google.com/maps/place/?q=place_id:ChIJExxA4GvtwQ8R4XIpeIkR-K4'
                target='_blank'
                rel='noopener noreferrer'
                className='text-black transition-colors'
              >
                Rte d'Abatta, Abidjan, Côte d'Ivoire
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ─── ZONE 3 : BAS DE PAGE (COPYRIGHT & RÉSEAUX) ─── */}
      <div className='border-t border-zinc-800 bg-zinc-950 py-6'>
        <div className='container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500'>
          <p>
            © {new Date().getFullYear()} American Beauty Cennter. Tous droits
            réservés.
          </p>

          {/* Réseaux sociaux */}
          <div className='flex items-center gap-4'>
            <Link
              href='https://www.facebook.com/americanbeautycenterofficiel'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-white transition-colors'
              aria-label='Facebook'
            >
              <FacebookIcon className='size-7 size-7' />
            </Link>
            <Link
              href='https://www.instagram.com/americanbeautycenter_/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-white transition-colors'
              aria-label='Instagram'
            >
              <InstagramIcon className='size-7' />
            </Link>
            <Link
              href='https://www.tiktok.com/@american_beauty_center'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-white transition-colors'
              aria-label='tiktok'
            >
              <TikTokIcon className='size-7' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
