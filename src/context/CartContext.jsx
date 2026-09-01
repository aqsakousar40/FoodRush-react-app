// src/context/CartContext.jsx
//
// SIMPLE EXPLANATION FOR BEGINNERS:
// Yeh file cart ka "dimaag" hai. Jab bhi koi product "Add to Cart" karta hai,
// yahan se data save hota hai localStorage mein (browser ki memory) taake
// page refresh hone par bhi cart khali na ho.
//
// Har page (Cart, Menu, Navbar) is context ko "useCart()" bol kar use karega.

import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

const DELIVERY_FEE = 150
const TAX_RATE = 0.05 // 5%

export function CartProvider({ children }) {
  // Step 1: Start by reading cart from localStorage (agar pehle se saved hai)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('foodrush_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  // Step 2: Jab bhi cartItems change ho, localStorage mein save karo
  useEffect(() => {
    localStorage.setItem('foodrush_cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Ek unique "key" banate hain har cart item ke liye
  // (kyunke same product different size/extras ke sath alag item hai)
  const makeKey = (id, size, extras) =>
    `${id}-${size}-${(extras || []).sort().join(',')}`

  // Cart mein item add karna
  function addToCart(product, options = {}) {
    const { size = 'regular', extras = [], quantity = 1, unitPrice } = options
    const key = makeKey(product.id, size, extras)

    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key)
      if (existing) {
        // Agar already cart mein hai, to sirf quantity badhao
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      // Naya item cart mein add karo
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          image: product.image,
          size,
          extras,
          quantity,
          unitPrice: unitPrice ?? product.price,
        },
      ]
    })
  }

  function removeFromCart(key) {
    setCartItems((prev) => prev.filter((item) => item.key !== key))
  }

  function increaseQuantity(key) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  function decreaseQuantity(key) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function clearCart() {
    setCartItems([])
    setDiscount(0)
    setPromoCode('')
  }

  function applyPromo(code) {
    // Simple demo promo code
    if (code.trim().toUpperCase() === 'FOODRUSH10') {
      setDiscount(0.1) // 10% off
      setPromoCode(code)
      return true
    }
    setDiscount(0)
    return false
  }

  // Total items count (cart icon badge ke liye)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Price calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  )
  const discountAmount = subtotal * discount
  const deliveryFee = cartItems.length > 0 ? DELIVERY_FEE : 0
  const tax = (subtotal - discountAmount) * TAX_RATE
  const total = subtotal - discountAmount + deliveryFee + tax

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    applyPromo,
    promoCode,
    discount,
    totalItems,
    subtotal,
    discountAmount,
    deliveryFee,
    tax,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Custom hook — isse har component mein "useCart()" likh kar cart use kar sakte hain
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}