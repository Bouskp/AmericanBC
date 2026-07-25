export interface WooCommerceProduct {
  id: number
  name: string
  price: string
  description: string
  permalink: string
  type: string
  sku: string
  price: string
  slug: string
  date_modified_gmt: Date
  featured: boolean
  images: WooCommerceProductImage[]
  categories: WooCommerceProductCategory[]
  tags: WooCommerceProductTag[]
}

interface WooCommerceTaxonomy {
  id: number
  name: string
  slug: string
  type: 'category' | 'tag'
}

export interface WooCommerceProductImage {
  id: number
  src: string
  name: string
  alt: string
  date_modified_gmt: Date
}

export interface WooCommerceProductCategory extends WooCommerceTaxonomy {
  type: 'category'
}

export interface WooCommerceProductTag extends WooCommerceTaxonomy {
  type: 'tag'
}

type OrderStatus =
  | 'pending'
  | 'processing'
  | 'on-hold'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'failed'

export interface WooCommerceOrder {
  id: number
  status: OrderStatus
  total: string
  date_created_gmt: Date
  line_items: WooCommerceOrderLineItem[]
  payment_method: string
  date_paid_gmt: Date | null
  date_completed_gmt: Date | null
}

export interface WooCommerceOrderLineItem {
  id: number
  name: string
  product_id: number
  quantity: number
  total: string
}

export interface WooCommerceCustomer {
  id: number
  email: string
  first_name: string
  last_name: string
  date_created_gmt: Date
  date_modified_gmt: Date
}

export interface WooCommerceCart {
  items: WooCommerceCartItem[]
  total: string
  addItem: (productId: number, quantity?: number) => void
  removeItem: (cartItemId: number) => void
  updateItem: (cartItemId: number, quantity: number) => void
  clearCart: () => void
}
