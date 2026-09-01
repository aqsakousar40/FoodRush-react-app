import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { showToast } from './ToastContainer.jsx'

export default function OrderSummary({ showPromo = true, buttonText, onButtonClick, buttonDisabled }) {
  const {
    subtotal,
    discountAmount,
    discount,
    deliveryFee,
    tax,
    total,
    applyPromo,
    promoCode,
  } = useCart()
  const [code, setCode] = useState('')

  function handleApplyPromo() {
    const success = applyPromo(code)
    if (success) {
      showToast('Promo code applied! 10% off')
    } else {
      showToast('Invalid promo code', 'error')
    }
  }

  return (
    <div className="order-summary card">
      <h3>Order Summary</h3>

      {showPromo && (
        <div className="promo-row">
          <input
            type="text"
            placeholder="Promo code (try FOODRUSH10)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="btn btn-outline" onClick={handleApplyPromo}>
            Apply
          </button>
        </div>
      )}

      <div className="summary-line">
        <span>Subtotal</span>
        <span>Rs. {subtotal.toLocaleString()}</span>
      </div>
      <div className="summary-line">
        <span>Delivery Fee</span>
        <span>Rs. {deliveryFee.toLocaleString()}</span>
      </div>
      {discount > 0 && (
        <div className="summary-line discount-line">
          <span>Discount ({promoCode})</span>
          <span>- Rs. {discountAmount.toLocaleString()}</span>
        </div>
      )}
      <div className="summary-line">
        <span>Tax (5%)</span>
        <span>Rs. {tax.toFixed(0)}</span>
      </div>

      <div className="summary-total">
        <span>Grand Total</span>
        <span>Rs. {total.toFixed(0)}</span>
      </div>

      {buttonText && (
        <button
          className="btn btn-primary summary-btn"
          onClick={onButtonClick}
          disabled={buttonDisabled}
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}