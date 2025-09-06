import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { CartItem } from '@/lib/types'
import toast from 'react-hot-toast'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { product_id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_CART_OPEN'; payload: boolean }

const initialState: CartState = {
  items: [],
  isOpen: false
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product_id === action.payload.product_id)
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product_id === action.payload.product_id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      }
      
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product_id !== action.payload)
      }
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.product_id === action.payload.product_id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      }
    
    case 'SET_CART_OPEN':
      return {
        ...state,
        isOpen: action.payload
      }
    
    default:
      return state
  }
}

interface CartContextType {
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

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        cartItems.forEach((item: CartItem) => {
          dispatch({ type: 'ADD_ITEM', payload: item })
        })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
    toast.success(`${item.product_name} añadido al carrito`)
  }

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
    toast.success('Producto eliminado del carrito')
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { product_id: productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    toast.success('Carrito vacío')
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const setCartOpen = (open: boolean) => {
    dispatch({ type: 'SET_CART_OPEN', payload: open })
  }

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      setCartOpen,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}