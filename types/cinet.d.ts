export interface CinetPayPaymentPayload {
  apikey: string // Votre clé API CinetPay
  site_id: string // L'identifiant de votre site
  transaction_id: string // ID unique de transaction généré par votre système
  amount: number // Montant de la transaction (doit être un entier >= 100 selon la devise)
  currency: 'XOF' | 'XAF' | 'CDF' | 'GNF' | 'USD' // Devises acceptées
  description: string // Motif ou description de l'achat
  channels: 'ALL' | 'MOBILE_MONEY' | 'CREDIT_CARD' | 'WALLET' // Canaux autorisés
  notify_url: string // URL du Webhook de votre backend (IPN)
  return_url?: string // URL de redirection après succès (Optionnel)
  cancel_url?: string // URL de redirection après annulation (Optionnel)

  // Informations obligatoires ou recommandées sur le client
  customer_id?: string
  customer_name: string // Nom complet du client
  customer_surname: string // Prénom du client
  customer_email: string // Email valide
  customer_phone_number: string // Numéro au format international (ex: +2250700000000)
  customer_address?: string
  customer_city?: string
  customer_country?: string // Code ISO du pays (ex: CI, SN, CM)
  customer_state?: string
  customer_zip_code?: string

  // Données personnalisées facultatives (Metadata)
  metadata?: string // Doit être une chaîne de caractères (souvent un JSON stringifié)
  alternative_currency?: string
}

export interface CinetPaySeamlessOptions {
  paymentToken: string // Reçu depuis votre backend après l'initialisation API
  debug?: boolean // Active les logs en mode développement
}

export interface CinetPayApiResponse {
  code: string // Code statut HTTP ou applicatif (ex: "201")
  message: string // Message de statut (ex: "CREATED")
  description: string // Description textuelle du résultat
  api_response_id: string // ID de suivi de la requête CinetPay
  data: {
    payment_token: string // Le jeton à passer au Frontend
    payment_url: string // L'URL brute de la page de paiement CinetPay
  }
}

export interface CinetPayWebhookPayload {
  cpm_site_id: string // ID de votre site marchand
  cpm_trans_id: string // Votre transaction_id initial
  cpm_trans_date: string // Date au format AAAAMMJJHHMMSS
  cpm_amount: string // Montant traité (attention, renvoyé sous forme de string)
  cpm_currency: string // Devise utilisée
  cpm_custom: string // Champ de métadonnées personnalisé transmis à l'initialisation
  cpm_designation: string // Description de la transaction
  state: 'ACCEPTED' | 'REFUSED' | 'PENDING' // Statut final du paiement
  cel_phone_num?: string // Numéro ayant effectué le paiement
  cpm_payment_date?: string // Date de paiement effectif
  cpm_result?: string // Code résultat de l'opérateur
  cpm_trans_status?: string // Statut détaillé
  cpm_error_message?: string // Message en cas d'erreur
  signature: string // Jeton de sécurité pour vérifier l'authenticité de la requête
}
