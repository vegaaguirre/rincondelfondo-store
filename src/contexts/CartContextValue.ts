import { createContext } from 'react'
import { CartItem } from '@/lib/types'

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export interface CartContextType {
  state: CartState
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)
