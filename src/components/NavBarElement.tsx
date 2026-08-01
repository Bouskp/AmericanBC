import { getAllCategories } from '../../types/wooCommerceApi'
import { Navbar } from './NewNav'

export default async function NavbarElement() {
  const response = await getAllCategories()
  const categories = response.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    href: `/category/${category.slug}`,
  }))

  return <Navbar categories={categories} />
}
