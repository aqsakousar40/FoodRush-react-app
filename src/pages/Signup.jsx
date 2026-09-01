import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { updateProfile } from 'firebase/auth'
import { slideUp } from '../utils/animations.js'
import { showToast } from '../components/ToastContainer.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}
    if (!name.trim()) newErrors.name = 'Name is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    if (!password.trim()) newErrors.password = 'Password is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setLoading(true)
      const userCredential = await signup(email, password)
      // Firebase account mein naam bhi save kar do
      await updateProfile(userCredential.user, { displayName: name })

      showToast(`Account created! Welcome to FoodRush`)
      navigate('/')
    } catch (err) {
      let message = 'Something went wrong. Please try again.'
      if (err.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Try logging in.'
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.'
      } else if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.'
      }
      setErrors({ form: message })
      showToast(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container section auth-page">
      <div className="auth-wrap">
        <div className="auth-logo">
          <span className="logo-mark">F</span>
          <span className="auth-logo-text">FoodRush</span>
        </div>

        <motion.div
          className="auth-card card"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <div className="section-heading" style={{ textAlign: 'center' }}>
            <span className="eyebrow">Join FoodRush</span>
            <h1>Create your account</h1>
            <p>Sign up to start ordering fresh, delicious meals today.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {errors.form && <span className="error" style={{ display: 'block', marginBottom: '10px' }}>{errors.form}</span>}

            <div className="field">
              <label htmlFor="name">Full Name</label>
              <div className="input-with-icon">
                <User size={18} />
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? 'invalid' : ''}
                />
              </div>
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="field">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'invalid' : ''}
                />
              </div>
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <Lock size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'invalid' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}