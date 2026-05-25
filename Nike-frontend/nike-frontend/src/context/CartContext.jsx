import { createContext, useState, useContext } from 'react'

// Skapa context
const CartContext = createContext()

// Provider - omsluter hela appen
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Lägg till produkt i korgen
  const addToCart = (product) => {
    setCartItems(prev => {
      // Kolla om produkten redan finns i korgen
      const exists = prev.find(item => item._id === product._id)
      if (exists) {
        // Öka kvantiteten om den redan finns
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      // Lägg till ny produkt med quantity 1
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Ta bort produkt från korgen
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId))
  }

  // Ändra kvantitet
  const updateQuantity = (productId, amount) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId
          ? { ...item, quantity: item.quantity + amount }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  // Räkna totalpris
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  // Räkna antal varor i korgen
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity, 0
  )

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalPrice,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook för att använda context
export function useCart() {
  return useContext(CartContext)
}