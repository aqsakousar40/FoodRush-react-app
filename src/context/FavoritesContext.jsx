// src/context/FavoritesContext.jsx
//
// SIMPLE EXPLANATION FOR BEGINNERS:
// Yeh context sirf ek kaam karta hai: heart icon click hone par
// product ki "id" ko ek list mein save/remove karta hai.
// Yeh list bhi localStorage mein save hoti hai, isliye favorites
// browser band karne ke baad bhi yaad rehte hain.

import { createContext, useContext, useEffect, useState } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('foodrush_favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('foodrush_favorites', JSON.stringify(favorites))
  }, [favorites])

  function addFavorite(productId) {
    setFavorites((prev) =>
      prev.includes(productId) ? prev : [...prev, productId]
    )
  }

  function removeFavorite(productId) {
    setFavorites((prev) => prev.filter((id) => id !== productId))
  }

  function toggleFavorite(productId) {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  function isFavorite(productId) {
    return favorites.includes(productId)
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
