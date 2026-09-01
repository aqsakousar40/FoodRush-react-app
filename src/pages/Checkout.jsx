import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Truck, Zap, Banknote, CreditCard, Wallet } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { placeOrder } from '../firebase/ordersService.js'
import OrderSummary from '../components/OrderSummary.jsx'
import { slideUp } from '../utils/animations.js'
import { showToast } from '../components/ToastContainer.jsx'

const deliveryMethods = [
  { id: 'standard', name: 'Standard Delivery', desc: '30-45 min', icon: Truck, fee: 0 },
  { id: 'express', name: 'Express Delivery', desc: '15-20 min', icon: Zap, fee: 200 },
]

const paymentMethods = [
  { id: 'cod', name: 'Cash on Delivery', icon: Banknote },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'online', name: 'Online Payment', icon: Wallet },
]

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', address: '', city: '', postalCode: '',
  })
  const [deliveryMethod, setDeliveryMethod] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)

  if (cartItems.length === 0) {
    navigate('/cart')
    return null
  }

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  function validate() {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!/^[0-9+\-\s]{7,15}$/.test(formData.phone)) newErrors.phone = 'Enter a valid phone number'
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Enter a valid email'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handlePlaceOrder() {
    if (!validate()) return

    const orderNumber = 'FR' + Math.floor(100000 + Math.random() * 900000)
    const deliveryFee = deliveryMethods.find((m) => m.id === deliveryMethod)?.fee || 0

    const orderData = {
      orderNumber,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      userId: currentUser ? currentUser.uid : null,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        size: item.size,
        extras: item.extras || [],
        price: item.unitPrice,
        quantity: item.quantity,
      })),
      itemsCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      total: total + deliveryFee,
      address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
      deliveryMethod,
      paymentMethod,
      estimatedTime: deliveryMethod === 'express' ? '15-20 min' : '30-45 min',
    }

    try {
      setPlacing(true)
      await placeOrder(orderData)
      clearCart()
      navigate('/order-success', { state: orderData })
    } catch (err) {
      showToast('Failed to place order. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="container section">
      <motion.div className="section-heading" variants={slideUp} initial="hidden" animate="visible">
        <span className="eyebrow">Almost there</span>
        <h1>Checkout</h1>
      </motion.div>

      <div className="checkout-layout">
        <div className="checkout-form">
          <div className="checkout-section card">
            <h3>Delivery Information</h3>
            <div className="form-grid">
              <div className="field">
                <label>Full Name</label>
                <input
                  className={errors.fullName ? 'invalid' : ''}
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="John Doe"
                />
                {errors.fullName && <span className="error">{errors.fullName}</span>}
              </div>
              <div className="field">
                <label>Phone Number</label>
                <input
                  className={errors.phone ? 'invalid' : ''}
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="0300 1234567"
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label>Email</label>
                <input
                  className={errors.email ? 'invalid' : ''}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label>Address</label>
                <input
                  className={errors.address ? 'invalid' : ''}
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Street address, house number"
                />
                {errors.address && <span className="error">{errors.address}</span>}
              </div>
              <div className="field">
                <label>City</label>
                <input
                  className={errors.city ? 'invalid' : ''}
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="Faisalabad"
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
              <div className="field">
                <label>Postal Code</label>
                <input
                  className={errors.postalCode ? 'invalid' : ''}
                  value={formData.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  placeholder="38000"
                />
                {errors.postalCode && <span className="error">{errors.postalCode}</span>}
              </div>
            </div>
          </div>

          <div className="checkout-section card">
            <h3>Delivery Method</h3>
            <div className="method-options">
              {deliveryMethods.map((m) => (
                <button
                  key={m.id}
                  className={`method-card ${deliveryMethod === m.id ? 'active' : ''}`}
                  onClick={() => setDeliveryMethod(m.id)}
                >
                  <m.icon size={20} />
                  <div>
                    <strong>{m.name}</strong>
                    <span>{m.desc}{m.fee > 0 ? ` · +Rs.${m.fee}` : ''}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="checkout-section card">
            <h3>Payment Method</h3>
            <div className="method-options">
              {paymentMethods.map((m) => (
                <button
                  key={m.id}
                  className={`method-card ${paymentMethod === m.id ? 'active' : ''}`}
                  onClick={() => setPaymentMethod(m.id)}
                >
                  <m.icon size={20} />
                  <strong>{m.name}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>

        <OrderSummary
          showPromo={false}
          buttonText={placing ? 'Placing Order...' : 'Place Order'}
          onButtonClick={handlePlaceOrder}
          disabled={placing}
        />
      </div>
    </div>
  )
}