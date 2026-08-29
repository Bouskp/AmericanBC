import type {
  WooCommerceProduct,
  WooCommerceProductCategory,
  WooCommerceProductTag,
  WooCommerceProductImage,
} from './woocommerce'
import queryString from 'query-string'

const baseUrl = process.env.WOOCOMMERCE_API_URL
const CACHE_TTL = 3600
const configured = Boolean(baseUrl)

if (!configured) {
  console.warn(
    "WooCommerce API URL n'est pas configurée. Veuillez définir WOOCOMMERCE_API_URL dans vos variables d'environnement.",
  )
}

class WooCommerceError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
  ) {
    super(message)
    this.name = 'WooCommerceError'
  }
}

// Pagination types
export interface PaginationHeaders {
  totalPages: number
  total: number
}

export interface WooCommerceResponse<T> {
  data: T
  pagination: PaginationHeaders
}

async function fetchWooCommerce<T>(
  endpoint: string,
  queryParams: Record<string, any> = {},
  tags: string[] = ['woocommerce'],
): Promise<T> {
  if (!baseUrl) {
    throw new Error("WooCommerce API URL n'est pas configurée.")
  }

  const url = `${baseUrl}${endpoint}?${queryParams ? queryString.stringify(queryParams) : ''}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      // Ajoutez ici les en-têtes d'authentification si nécessaire, par exemple :
      Authorization: `Basic ${btoa(`${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`)}`,
    },
    next: { tags, revalidate: CACHE_TTL },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new WooCommerceError(
      errorData.message ||
        'Erreur lors de la récupération des données WooCommerce.',
      response.status,
      errorData.code || 'woocommerce_error',
    )
  }

  return response.json()
}

async function gracefulFetch<T>(
  endpoint: string,
  fallbackValue: T,
  queryParams: Record<string, any> = {},
  tags: string[],
): Promise<T> {
  if (!configured) {
    console.warn(
      "WooCommerce API URL n'est pas configurée. Retour de la valeur de secours.",
    )
    return fallbackValue
  }

  try {
    return await fetchWooCommerce<T>(endpoint, queryParams, tags)
  } catch (error) {
    console.warn(
      `Erreur lors de la récupération des données WooCommerce pour ${endpoint}. Retour de la valeur de secours. Détails de l'erreur:`,
      error,
    )
    console.log(error)
    return fallbackValue
  }
}

async function woocommercePaginatedFetch<T>(
  endpoint: string,
  queryParams: Record<string, any> = {},
  tags: string[] = ['woocommerce'],
): Promise<WooCommerceResponse<T[]>> {
  const url = `${baseUrl}${endpoint}?${queryParams ? queryString.stringify(queryParams) : ''}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      // Ajoutez ici les en-têtes d'authentification si nécessaire, par exemple :
      Authorization: `Basic ${btoa(`${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`)}`,
    },
    next: { tags, revalidate: CACHE_TTL },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new WooCommerceError(
      errorData.message ||
        'Erreur lors de la récupération des données WooCommerce.',
      response.status,
      errorData.code || 'woocommerce_error',
    )
  }

  return {
    data: await response.json(),
    pagination: {
      totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '0', 10),
      total: parseInt(response.headers.get('X-WP-Total') || '0', 10),
    },
  }
}

async function gracefulPaginatedFetch<T>(
  endpoint: string,
  queryParams: Record<string, any> = {},
  tags: string[] = ['woocommerce'],
): Promise<WooCommerceResponse<T[]>> {
  const emptyResponse: WooCommerceResponse<T[]> = {
    data: [],
    pagination: { totalPages: 0, total: 0 },
  }
  if (!configured) {
    console.warn(
      "WooCommerce API URL n'est pas configurée. Retour de la valeur de secours.",
    )
    return emptyResponse
  }

  try {
    return await woocommercePaginatedFetch<T>(endpoint, queryParams, tags)
  } catch (error) {
    console.warn(
      `Erreur lors de la récupération des données WooCommerce pour ${endpoint}. Retour de la valeur de secours. Détails de l'erreur:`,
      error,
    )
    return emptyResponse
  }
}

export async function getProductsPagined(
  page: number = 1,
  perPage: number = 10,
): Promise<WooCommerceResponse<WooCommerceProduct[]>> {
  const queryParams: Record<string, any> = {
    _embed: true,
    page,
    per_page: perPage,
  }

  const cacheTags = ['woocommerce', 'products', `products_page_${page}`]

  return await gracefulPaginatedFetch<WooCommerceProduct>(
    '/wp-json/wc/v3/products',
    queryParams,
    cacheTags,
  )
}

export async function getRecentProducts(): Promise<WooCommerceProduct[]> {
  const queryParams: Record<string, any> = {
    _embed: true,
    orderby: 'date',
    order: 'desc',
    per_page: 20,
  }

  return await gracefulFetch<WooCommerceProduct[]>(
    '/wp-json/wc/v3/products',
    [],
    queryParams,
    ['woocommerce', 'products', 'recent_products'],
  )
}

export async function getProductById(
  productId: number,
): Promise<WooCommerceProduct | null> {
  const queryParams: Record<string, any> = {
    _embed: true,
  }

  return await fetchWooCommerce<WooCommerceProduct>(
    `/wp-json/wc/v3/products/${productId}`,
    ['woocommerce', 'products', `product_${productId}`],
  )
}

export async function productBySlug(
  slug: string,
): Promise<WooCommerceProduct | undefined> {
  const products = await gracefulFetch<WooCommerceProduct[]>(
    '/wp-json/wc/v3/products',
    [],
    { slug, _embed: true },
    ['woocommerce', 'products', `product_slug_${slug}`],
  )

  return products[0]
}

export async function getAllCategories(): Promise<
  WooCommerceProductCategory[]
> {
  return await gracefulFetch<WooCommerceProductCategory[]>(
    '/wp-json/wc/v3/products/categories',
    [],
    { per_page: 100 },
    ['woocommerce', 'categories'],
  )
}

export async function getAllTags(): Promise<WooCommerceProductTag[]> {
  return await gracefulFetch<WooCommerceProductTag[]>(
    '/wp-json/wc/v3/products/tags',
    [],
    { per_page: 100 },
    ['woocommerce', 'tags'],
  )
}

export async function getCategoryBySlug(
  slug: string,
): Promise<WooCommerceProductCategory | undefined> {
  const categories = await gracefulFetch<WooCommerceProductCategory[]>(
    '/wp-json/wc/v3/products/categories',
    [],
    { slug, per_page: 100 },
    ['woocommerce', 'categories', `category_slug_${slug}`],
  )
  return categories[0]
}

export async function getTagBySlug(
  slug: string,
): Promise<WooCommerceProductTag | undefined> {
  const tags = await gracefulFetch<WooCommerceProductTag[]>(
    '/wp-json/wc/v3/products/tags',
    [],
    { slug, per_page: 100 },
    ['woocommerce', 'tags', `tag_slug_${slug}`],
  )
  return tags[0]
}

export async function getProductsByCategorySlug(
  slug: string,
): Promise<WooCommerceProduct[]> {
  const category = await getCategoryBySlug(slug)
  if (!category) {
    console.warn(`Catégorie avec le slug "${slug}" non trouvée.`)
    return []
  }
  return await gracefulFetch<WooCommerceProduct[]>(
    '/wp-json/wc/v3/products',
    [],
    { category: category.id, _embed: true },
    ['woocommerce', 'products', `category_${category.id}`],
  )
}

export async function getProductsByTagSlug(
  slug: string,
): Promise<WooCommerceProduct[]> {
  const tag = await getTagBySlug(slug)
  if (!tag) {
    console.warn(`Tag avec le slug "${slug}" non trouvé.`)
    return []
  }
  return await gracefulFetch<WooCommerceProduct[]>(
    '/wp-json/wc/v3/products',
    [],
    { tag: tag.id, _embed: true },
    ['woocommerce', 'products', `tag_${tag.id}`],
  )
}

export async function getProductsByCategoryId(
  categoryId: number,
): Promise<WooCommerceProduct[]> {
  return await gracefulFetch<WooCommerceProduct[]>(
    '/wp-json/wc/v3/products',
    [],
    { category: categoryId, _embed: true },
    ['woocommerce', 'products', `category_${categoryId}`],
  )
}

export async function getProductsByTagId(
  tagId: number,
): Promise<WooCommerceProduct[]> {
  return await gracefulFetch<WooCommerceProduct[]>(
    '/wp-json/wc/v3/products',
    [],
    { tag: tagId, _embed: true },
    ['woocommerce', 'products', `tag_${tagId}`],
  )
}

export async function getProductImages(
  productId: number,
): Promise<WooCommerceProductImage[]> {
  return await fetchWooCommerce<WooCommerceProductImage[]>(
    `/wp-json/wp/v2/media/${productId}`,
    ['woocommerce', 'products', `product_${productId}`, 'images'],
  )
}

export async function getProductByCategoryPagination(
  categoryId: number,
  page: number = 1,
  perPage: number = 10,
  sort: SortParams = {},
): Promise<WooCommerceResponse<WooCommerceProduct[]>> {
  return await woocommercePaginatedFetch<WooCommerceProduct>(
    '/wp-json/wc/v3/products',
    { category: categoryId, _embed: true, page, per_page: perPage, ...sort },
    ['woocommerce', 'products', `category_${categoryId}`, `page_${page}`],
  )
}

export async function getProductByTagPagination(
  tagId: number,
  page: number = 1,
  perPage: number = 10,
): Promise<WooCommerceResponse<WooCommerceProduct[]>> {
  return await woocommercePaginatedFetch<WooCommerceProduct>(
    '/wp-json/wc/v3/products',
    { tag: tagId, _embed: true, page, per_page: perPage },
    ['woocommerce', 'products', `tag_${tagId}`, `page_${page}`],
  )
}

// Fonctions pour récupérer tous les slugs (utiles pour la génération statique)

export async function getAllProductsSlug(): Promise<{ slug: string }[]> {
  const allSlugs: { slug: string }[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    try {
      const response = await woocommercePaginatedFetch<WooCommerceProduct>(
        '/wp-json/wc/v3/products',
        { per_page: 100, page, _fields: 'slug,modified' },
      )

      if (!Array.isArray(response.data)) {
        console.error('getAllProductsSlug: réponse inattendue', response)
        break
      }

      allSlugs.push(...response.data.map((product) => ({ slug: product.slug })))

      const totalPages = response.pagination?.totalPages ?? 1
      hasMore = page < totalPages
      page++
    } catch (error) {
      console.error('getAllProductsSlug: erreur fetch page', page, error)
      break
    }
  }

  return allSlugs
}

export async function getAllCategoriesSlug(): Promise<{ slug: string }[]> {
  const allSlugs: { slug: string }[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const response = await woocommercePaginatedFetch<{ slug: string }>(
      '/wp-json/wc/v3/products/categories',
      { per_page: 100, page, _fields: 'slug,modified' },
    )

    if (!Array.isArray(response.data)) {
      throw new Error(
        `getAllCategoriesSlug: réponse inattendue à la page ${page}: ${JSON.stringify(response)}`,
      )
    }

    allSlugs.push(...response.data.map((category) => ({ slug: category.slug })))

    const totalPages = response.pagination?.totalPages ?? 1
    hasMore = page < totalPages
    page++
  }

  return allSlugs
}

// `getProductsBy...` — utilise `include` (paramètre standard WooCommerce
// REST) pour récupérer plusieurs produits par leurs IDs en un seul appel.

export async function getRelatedProducts(
  productIds: number[],
): Promise<WooCommerceProduct[]> {
  if (!productIds.length) {
    return []
  }

  return await gracefulFetch<WooCommerceProduct[]>(
    '/wp-json/wc/v3/products',
    [],
    { include: productIds.join(','), _embed: true },
    ['woocommerce', 'products', `related_${productIds.join('_')}`],
  )
}

export async function getBrandAttribute(): Promise<{
  id: number
  slug: string
} | null> {
  const attributes = await gracefulFetch<{ id: number; slug: string }[]>(
    '/wp-json/wc/v3/products/attributes',
    [],
    {},
    ['woocommerce', 'attributes'],
  )
  return attributes.find((attr) => attr.slug === 'pa_brand') ?? null
}

export async function getBrandTerms(
  attributeId: number,
): Promise<WooCommerceProductTag[]> {
  return await gracefulFetch<WooCommerceProductTag[]>(
    `/wp-json/wc/v3/products/attributes/${attributeId}/terms`,
    [],
    { per_page: 100 },
    ['woocommerce', 'brands', `attribute_${attributeId}`],
  )
}

export async function getAllBrands(): Promise<WooCommerceProductCategory[]> {
  return await gracefulFetch<WooCommerceProductCategory[]>(
    '/wp-json/wc/v3/products/brands',
    [],
    { per_page: 100 },
    ['woocommerce', 'brands'],
  )
}

export async function getBrandBySlug(
  slug: string,
): Promise<WooCommerceProductCategory | undefined> {
  const brands = await gracefulFetch<WooCommerceProductCategory[]>(
    '/wp-json/wc/v3/products/brands',
    [],
    { slug, per_page: 100 },
    ['woocommerce', 'brands', `brand_slug_${slug}`],
  )
  return brands[0]
}

export async function getBrandById(
  brandId: number,
): Promise<WooCommerceProductCategory | undefined> {
  return await gracefulFetch<WooCommerceProductCategory | undefined>(
    `/wp-json/wc/v3/products/brands/${brandId}`,
    undefined,
    {},
    ['woocommerce', 'brands', `brand_${brandId}`],
  )
}

interface SortParams {
  orderby?: string
  order?: 'asc' | 'desc'
}

export async function getPaginatedProducts(
  page: number = 1,
  perPage: number = 10,
  sort: SortParams = {},
): Promise<WooCommerceResponse<WooCommerceProduct[]>> {
  return await woocommercePaginatedFetch<WooCommerceProduct>(
    '/wp-json/wc/v3/products',
    { _embed: true, page, per_page: perPage, ...sort },
    ['woocommerce', 'products', `products_page_${page}`],
  )
}

export async function getProductByBrandPagination(
  brandId: number,
  page: number = 1,
  perPage: number = 10,
  sort: SortParams = {},
): Promise<WooCommerceResponse<WooCommerceProduct[]>> {
  return await woocommercePaginatedFetch<WooCommerceProduct>(
    '/wp-json/wc/v3/products',
    { brand: brandId, _embed: true, page, per_page: perPage, ...sort },
    ['woocommerce', 'products', `brand_${brandId}`, `page_${page}`],
  )
}

export async function getNewsProducts(
  page: number = 1,
  perPage: number = 10,
): Promise<WooCommerceResponse<WooCommerceProduct[]>> {
  return await woocommercePaginatedFetch<WooCommerceProduct>(
    '/wp-json/wc/v3/products',
    {
      _embed: true,
      page,
      per_page: perPage,
      orderby: 'date',
      order: 'desc',
    },
    ['woocommerce', 'products', 'news', `page_${page}`],
  )
}
