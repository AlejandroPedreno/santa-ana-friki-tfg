import { createContext, useState, useCallback, useEffect } from 'react'
import { parsearPrecioEUR } from '../utils/catalogo.js'

export const CartContext = createContext()

const CART_STORAGE_KEY = 'santa-ana-friki-cart'

const loadCartFromStorage = () => {
  // Lee el carrito guardado y devuelve un array vacío si no existe o está corrupto.
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (!storedCart) {
      return []
    }

    const parsedCart = JSON.parse(storedCart)
    return Array.isArray(parsedCart) ? parsedCart : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCartFromStorage)

  useEffect(() => {
    // Cada cambio del carrito se guarda en localStorage para mantener la sesión del usuario.
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product) => {
    // Si el producto ya existe en el carrito, solo incrementa la cantidad.
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      return [...prevItems, { ...product, quantity: 1, stock: Number(product.stock ?? 0) }]
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    )
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    // Si la cantidad baja a 0, el producto se elimina automáticamente.
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(quantity, Number(item.stock ?? quantity)) }
          : item
      )
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    // Vacía el carrito completo de una sola vez.
    setCartItems([])
  }, [])

  const getTotalItems = useCallback(() => {
    // Suma la cantidad total de unidades para el contador del icono del carrito.
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const getTotalPrice = useCallback(() => {
    // Calcula el importe total usando el precio normalizado de cada producto.
    return cartItems.reduce((total, item) => {
      return total + parsearPrecioEUR(item.price) * item.quantity
    }, 0)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
