// src/context/ThemeContext.jsx
//
// SIMPLE EXPLANATION FOR BEGINNERS:
// Yeh context bas ek "switch" hai — light mode ya dark mode.
// Jab theme change hoti hai, hum <html> tag par data-theme="dark"
// ya data-theme="light" laga dete hain. Humari CSS (index.css) mein
// pehle se [data-theme='dark'] ke rules likhe hain, wo automatically
// apply ho jate hain.

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('foodrush_theme')
    if (saved) return saved
    // Agar user ka system dark mode mein hai, to default dark rakho
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('foodrush_theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const value = { theme, toggleTheme, isDark: theme === 'dark' }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
