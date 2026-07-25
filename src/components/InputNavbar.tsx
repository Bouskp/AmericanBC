'use client'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'

export function InputNavbar() {
  return (
    <ButtonGroup className='mx-auto w-lg'>
      <Input placeholder='Recherchez un produit, une marque...' />
      <Button variant='outline' aria-label='Search'>
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
