import { createContext, useState, useCallback, useEffect } from 'react'

export const CartContext = createContext()

const CART_STORAGE_KEY = 'santa-ana-friki-cart'

const loadCartFromStorage = () => {
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
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product) => {
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
    setCartItems([])
  }, [])

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('EUR', '').trim())
      return total + price * item.quantity
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
