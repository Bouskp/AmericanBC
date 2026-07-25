'use client'

import * as React from 'react'
import { Phone, Mail, MapPin, MessageSquare, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function ContactPage() {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  // Message pré-rempli pour l'assistance WhatsApp direct
  const whatsappMessage = encodeURIComponent(
    'Bonjour, je vous contacte depuis la boutique concernant une commande.',
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulation d'envoi du formulaire (en prod, lié à une API route ou service email)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)
    setSuccess(true)

    // Réinitialisation du formulaire en production si nécessaire
  }

  return (
    <div className='container mx-auto px-4 py-8 md:py-16 max-w-5xl'>
      {/* EN-TÊTE DE PAGE */}
      <div className='text-center max-w-xl mx-auto mb-12 space-y-2'>
        <h1 className='text-3xl md:text-5xl font-black tracking-tight '>
          Contactez-nous
        </h1>
        <p className='text-base text-muted-foreground leading-relaxed'>
          Une question sur l'un de nos produits ou sur votre livraison ? Notre
          équipe commerciale est à votre entière disposition.
        </p>
      </div>

      {/* DISPOSITION ASYMÉTRIQUE EN 2 COLONNES */}
      <div className='grid grid-cols-1 md:grid-cols-5 gap-8 items-start'>
        {/* COLONNE GAUCHE : COORDONNÉES ET WHATSAPP (Prend 2 colonnes sur 5) */}
        <div className='md:col-span-2 space-y-4'>
          {/* Bloc d'action rapide WhatsApp (Prioritaire en Afrique Francophone) */}
          <Card className='border-emerald-600/20 bg-emerald-50/30 dark:bg-emerald-950/10 shadow-sm'>
            <CardHeader className='p-5 pb-2'>
              <CardTitle className='text-emerald-700 dark:text-emerald-400 flex items-center gap-2 text-base font-bold'>
                <MessageSquare className='h-5 w-5' />
                Assistance WhatsApp
              </CardTitle>
              <CardDescription className='text-emerald-600/80 dark:text-emerald-500/80 text-sm'>
                Le moyen le plus rapide pour obtenir une réponse ou valider une
                commande.
              </CardDescription>
            </CardHeader>
            <CardContent className='p-5 pt-2'>
              <Button
                asChild
                className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold'
                size='sm'
              >
                <a
                  href={`https://wa.me{whatsappMessage}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Discuter avec un conseiller
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Coordonnées classiques */}
          <Card className='border-muted/60 shadow-sm'>
            <CardContent className='p-6 space-y-5'>
              <div className='flex items-start gap-3.5 text-sm'>
                <MapPin className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                <div>
                  <h4 className='font-bold text-zinc-900 dark:text-zinc'>
                    Notre Showroom
                  </h4>
                  <p className='text-zinc-500 text-xs mt-0.5'>
                    Cocody, Abidjan, Côte d'Ivoire
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3.5 text-sm border-t pt-4'>
                <Phone className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                <div>
                  <h4 className='font-bold'>Téléphone</h4>
                  <a
                    href='tel:+2250700000000'
                    className='text-zinc-500 text-xs hover:text-primary transition-colors block mt-0.5'
                  >
                    +225 07 00 00 00 00
                  </a>
                </div>
              </div>

              <div className='flex items-start gap-3.5 text-sm border-t pt-4'>
                <Mail className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                <div>
                  <h4 className='font-bold'>Email</h4>
                  <a
                    href='mailto:contact@votreboutique.com'
                    className='text-zinc-500 text-xs hover:text-primary transition-colors block mt-0.5'
                  >
                    contact@votreboutique.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLONNE DROITE : FORMULAIRE DE MESSAGE COMPLÈT (Prend 3 colonnes sur 5) */}
        <div className='md:col-span-3'>
          <Card className='border-muted/60 shadow-sm'>
            <CardHeader>
              <CardTitle className='text-lg font-bold'>
                Envoyer un message
              </CardTitle>
              <CardDescription>
                Remplissez ce formulaire et notre équipe vous répondra par
                e-mail sous 24h.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className='p-4 text-sm text-center text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl'>
                  <h4 className='font-bold text-base mb-1'>Message envoyé !</h4>
                  <p className='text-sm'>
                    Merci pour votre intérêt, nous revenons vers vous très
                    rapidement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='space-y-1.5'>
                      <label className='text-xs font-semibold text-zinc-500'>
                        Votre Nom complet
                      </label>
                      <Input
                        type='text'
                        placeholder='Ex: Jean Kouassi'
                        required
                        disabled={loading}
                        className='h-10'
                      />
                    </div>
                    <div className='space-y-1.5'>
                      <label className='text-xs font-semibold text-zinc-500'>
                        Numéro de téléphone
                      </label>
                      <Input
                        type='tel'
                        placeholder='Ex: 0700000000'
                        required
                        disabled={loading}
                        className='h-10'
                      />
                    </div>
                  </div>

                  <div className='space-y-1.5'>
                    <label className='text-xs font-semibold text-zinc-500'>
                      Adresse Email
                    </label>
                    <Input
                      type='email'
                      placeholder='nom@exemple.com'
                      required
                      disabled={loading}
                      className='h-10'
                    />
                  </div>

                  <div className='space-y-1.5'>
                    <label className='text-xs font-semibold text-zinc-500'>
                      Votre Message
                    </label>
                    <Textarea
                      placeholder='Comment pouvons-nous vous aider ?'
                      rows={5}
                      required
                      disabled={loading}
                      className='resize-none'
                    />
                  </div>

                  <Button
                    type='submit'
                    className='w-full h-10 font-bold gap-2'
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className='h-4 w-4 animate-spin' />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className='h-4 w-4' />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
