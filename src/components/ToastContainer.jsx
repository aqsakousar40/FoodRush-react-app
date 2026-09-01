import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Toast from './Toast.jsx'

let idCounter = 0

// Kisi bhi file se import karke: showToast('Item added to cart')
export function showToast(message, type = 'success') {
  window.dispatchEvent(
    new CustomEvent('foodrush-toast', { detail: { message, type } })
  )
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    function handleToast(e) {
      const id = idCounter++
      const { message, type } = e.detail
      setToasts((prev) => [...prev, { id, message, type }])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    }

    window.addEventListener('foodrush-toast', handleToast)
    return () => window.removeEventListener('foodrush-toast', handleToast)
  }, [])

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </AnimatePresence>
    </div>
  )
}