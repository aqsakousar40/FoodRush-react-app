import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ quantity, onIncrease, onDecrease, size = 'md' }) {
  return (
    <div className={`qty-selector qty-${size}`}>
      <button onClick={onDecrease} aria-label="Decrease quantity">
        <Minus size={14} />
      </button>
      <span>{quantity}</span>
      <button onClick={onIncrease} aria-label="Increase quantity">
        <Plus size={14} />
      </button>
    </div>
  )
}