import Image from 'next/image'
import React from 'react'

export default function AboutPage() {
  return (
    <div className='bg-white text-slate-800 font-sans antialiased'>
      {/* 1. HERO SECTION : L'ancrage local à Abidjan */}
      <section className='relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden'>
        <div className='max-w-5xl mx-auto px-6 text-center'>
          <span className='text-xs uppercase text-brand-red font-bold tracking-widest block mb-4 font-serif'>
            American's Beauty Center
          </span>
          <h1 className='text-4xl md:text-6xl font-serif text-slate-900 font-normal leading-tight max-w-4xl mx-auto'>
            L'expertise dermatologique américaine <br />
            <span className='italic font-light text-brand-red'>
              au cœur d'Abidjan
            </span>
          </h1>
          <p className='mt-6 text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed'>
            American Beauty Center est une enseigne spécialisée basée à Abidjan,
            dédiée à la valorisation et à la commercialisation de produits
            cosmétiques de grandes marques américaines. Pensée pour répondre aux
            besoins spécifiques de sa clientèle en matière de soins de la peau,
            la boutique se positionne comme une référence incontournable pour
            des routines beauté expertes et ciblées.
          </p>
        </div>
      </section>

      {/* 2. BARRE DE RÉASSURANCE & VALEURS PHARES */}
      <section className='border-y border-slate-100 bg-slate-50/50 py-10'>
        <div className='max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
          <div>
            <h4 className='font-serif text-2xl md:text-3xl text-brand-red font-bold'>
              100%
            </h4>
            <p className='text-xs uppercase tracking-wider text-slate-500 mt-1'>
              Marques US Authentiques
            </p>
          </div>
          <div>
            <h4 className='font-serif text-2xl md:text-3xl text-brand-red font-bold'>
              Sur-mesure
            </h4>
            <p className='text-xs uppercase tracking-wider text-slate-500 mt-1'>
              Accompagnement Conseil
            </p>
          </div>
          <div>
            <h4 className='font-serif text-2xl md:text-3xl text-brand-red font-bold'>
              Actifs
            </h4>
            <p className='text-xs uppercase tracking-wider text-slate-500 mt-1'>
              Formules Haute Performance
            </p>
          </div>
          <div>
            <h4 className='font-serif text-2xl md:text-3xl text-brand-red font-bold'>
              Boutique
            </h4>
            <p className='text-xs uppercase tracking-wider text-slate-500 mt-1'>
              Disponible en ligne.
            </p>
          </div>
        </div>
      </section>

      {/* 3. NOTRE MISSION : Solutions ciblées et routines expertes */}
      <section className='py-16 md:py-24 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center'>
        <div className='space-y-6'>
          <h2 className='text-3xl font-serif text-slate-900 font-semibold tracking-tight md:text-2xl md:text-center'>
            Des réponses précises aux besoins de votre peau
          </h2>
          <p className='text-slate-600 leading-relaxed'>
            Parce que chaque peau est unique, nous refusons les solutions
            génériques. Notre enseigne se spécialise dans la sélection de soins
            corporels et cosmétiques importés directement des États-Unis,
            réputés pour leur rigueur scientifique et leur efficacité
            dermatologique.
          </p>
          <p className='text-slate-600 leading-relaxed'>
            Nous avons conçu notre offre pour traiter avec précision les
            problématiques cutanées majeures telles que{' '}
            <strong className='text-slate-900 font-medium'>
              l'hyperpigmentation
            </strong>
            , <strong className='text-slate-900 font-medium'>l'acné</strong>,{' '}
            <strong className='text-slate-900 font-medium'>
              les signes de l'âge
            </strong>{' '}
            ou encore le besoin d'une{' '}
            <strong className='text-slate-900 font-medium'>
              hydratation intense
            </strong>
            .
          </p>
        </div>

        {/* Mosaïque visuelle cosmétique */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-4'>
            <Image
              src='https://unsplash.com'
              alt='Soins dermatologiques américains'
              className='rounded-lg w-full aspect-[3/4] object-cover shadow-sm'
            />
            <Image
              src='https://unsplash.com'
              alt='Texture sérum actif'
              className='rounded-lg w-full aspect-square object-cover shadow-sm'
            />
          </div>
          <div className='space-y-4 pt-8'>
            <Image
              src='https://unsplash.com'
              alt='Gamme cosmétique de marque'
              className='rounded-lg w-full aspect-square object-cover shadow-sm'
            />
            <Image
              src='https://unsplash.com'
              alt='Consultation routine beauté'
              className='rounded-lg w-full aspect-[3/4] object-cover shadow-sm'
            />
          </div>
        </div>
      </section>

      {/* 4. NOTRE PILIER : L'Approche Conseil Personnalisée */}
      <section className='bg-slate-50 py-16 md:py-24 border-t border-slate-100'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='grid md:grid-cols-3 gap-8'>
            {/* Pilier 1 */}
            <div className='bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-4'>
              <div className='text-brand-red font-serif text-2xl font-bold'>
                🔬 Ingrédients Actifs
              </div>
              <h3 className='font-serif text-lg text-center text-slate-900 font-medium'>
                Une sélection scientifique
              </h3>
              <p className='text-sm text-slate-600 leading-relaxed'>
                Rétinol, Vitamine C, Acide Salicylique ou Niacinamide : nous
                maîtrisons la science des composants pour vous guider vers les
                formulations les plus adaptées.
              </p>
            </div>

            {/* Pilier 2 */}
            <div className='bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-4'>
              <div className='text-brand-red font-serif text-2xl font-bold md:text-xl md:text-center'>
                ✨ Conseils sur-mesure
              </div>
              <h3 className='font-serif text-lg text-slate-900 font-medium md:text-xl md:text-center'>
                Votre routine pas à pas
              </h3>
              <p className='text-sm text-slate-600 leading-relaxed'>
                Repartir avec un produit ne suffit pas. Nos conseillères
                construisent avec vous une véritable routine du matin et du soir
                pour maximiser vos résultats visibles.
              </p>
            </div>

            {/* Pilier 3 */}
            <div className='bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-4'>
              <div className='text-brand-red font-serif text-2xl font-bold'>
                🤝 Communauté Active
              </div>
              <h3 className='font-serif text-lg text-slate-900 font-medium'>
                Proches de vous au quotidien
              </h3>
              <p className='text-sm text-slate-600 leading-relaxed'>
                Du lundi au samedi, nous animons nos réseaux sociaux et notre
                service de social selling pour vous présenter nos nouveautés,
                décrypter les tendances et répondre à vos questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION (Redirection boutique / Contact WhatsApp de vente) */}
      <section className='py-24 text-center max-w-4xl mx-auto px-6'>
        <h2 className='text-3xl md:text-4xl font-serif text-slate-900'>
          Envie d'un diagnostic ou de découvrir nos nouveautés ?
        </h2>
        <p className='mt-4 text-slate-600 max-w-xl mx-auto'>
          Suivez nos conseils quotidiens en ligne, découvrez nos offres
          promotionnelles ou passez nous voir directement en boutique à Abidjan.
        </p>
        <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center'>
          <button className='bg-brand-red text-white font-medium px-8 py-4 rounded-full hover:bg-slate-900 transition-colors shadow-md tracking-wide text-sm'>
            Découvrir le catalogue de soins
          </button>
          <button className='bg-white text-slate-900 border border-slate-200 font-medium px-8 py-4 rounded-full hover:bg-slate-50 transition-colors shadow-sm tracking-wide text-sm'>
            Contacter un conseiller expert
          </button>
        </div>
      </section>
    </div>
  )
}
