import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  slug: string
  imageUrl: string
  quantity: number
  category?: string
}

interface CartState {
  items: CartItem[]
  // Modification du type : On accepte que la quantité soit passée ou non à l'appel
  addItem: (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // ─── AJOUTER AU PANIER AVEC QUANTITÉ DYNAMIQUE ───
      addItem: (product) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === product.id)

        // On récupère la quantité demandée (par défaut 1 si non spécifiée, ex: depuis la grille)
        const quantityToAdd = product.quantity ?? 1

        if (existingItem) {
          // 🚀 On cumule l'ancienne quantité présente avec la nouvelle quantité demandée
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantityToAdd }
                : item,
            ),
          })
        } else {
          // 🚀 On ajoute le nouvel élément avec son volume de départ choisi
          set({
            items: [...currentItems, { ...product, quantity: quantityToAdd }],
          })
        }
      },

      // RETIRER UN PRODUIT COMPLÈTEMENT
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },

      // MODIFIER LA QUANTITÉ EN DIRECT (Depuis la page Panier ou le tiroir CartSheet)
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        })
      },

      // VIDER LE PANIER (Après commande réussie ou paiement CinetPay validé)
      clearCart: () => set({ items: [] }),

      // CALCULER LE PRIX TOTAL GLOBAL (FCFA / XOF)
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        )
      },

      // CALCULER LE NOMBRE TOTAL D'ARTICLES (Pour l'indicateur linéaire de votre Navbar)
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'americans-beauty-cart', // Clé locale dans le localStorage de l'utilisateur
    },
  ),
)
