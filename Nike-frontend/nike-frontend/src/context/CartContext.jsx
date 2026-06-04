import { createContext, useState, useContext, useEffect } from 'react'

//CONTEXT ÄR ETT SÄTT ATT DELA DATA MELLAN KOMPONENTERNA UTAN ATT BEHÖVA SKICKA DEN SOM PROPS GENOM VARJE NIVÅ

// Skapar en tom "behållare" för varukorgsdata.
// Skapa context
const CartContext = createContext()

// CartProvider är den komponent som omsluter hela appen i main.jsx.
// Allt som ligger inuti den får tillgång till varukorgen.
// Provider - omsluter hela appen
export function CartProvider({ children }) {

  // Hämta från localStorage när appen startar
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  // Spara till localStorage när cartItems ändras
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Lägg till produkt i korgen
  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item._id === product._id)
      if (exists) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
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

// Töm varukorgen  ← lägg till här
const clearCart = () => {
  setCartItems([])
  localStorage.removeItem('cart')
}

  // Räkna totalpris
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  // Räkna antal varor i korgen
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity, 0
  )

  // / Här "delar ut" vi all data och alla funktioner till resten av appen.
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalPrice,
      cartCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook för att använda context
export function useCart() {
  return useContext(CartContext)
}