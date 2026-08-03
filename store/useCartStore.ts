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
  addItem: (product: Omit<CartItem, 'quantity'>) => void
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

      // AJOUTER AU PANIER
      addItem: (product) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === product.id)

        if (existingItem) {
          // Si le produit existe déjà, on augmente sa quantité de 1
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          })
        } else {
          // Sinon, on l'ajoute comme un nouvel élément avec une quantité de 1
          set({ items: [...currentItems, { ...product, quantity: 1 }] })
        }
      },

      // RETIRER UN PRODUIT COMPLÈTEMENT
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },

      // MODIFIER LA QUANTITÉ (PLUS / MOINS)
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

      // VIDER LE PANIER (Après commande réussie)
      clearCart: () => set({ items: [] }),

      // CALCULER LE PRIX TOTAL GLOBAL
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        )
      },

      // CALCULER LE NOMBRE TOTAL D'ARTICLES (Pour le badge de la Navbar)
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'americans-beauty-cart', // Clé de stockage unique dans le localStorage
    },
  ),
)
