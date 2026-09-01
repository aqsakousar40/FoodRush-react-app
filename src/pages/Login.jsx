import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { slideUp } from '../utils/animations.js'
import { showToast } from '../components/ToastContainer.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}
    if (!email.trim()) newErrors.email = 'Email is required'
    if (!password.trim()) newErrors.password = 'Password is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setLoading(true)
      await login(email, password)
      showToast(`Welcome back!`)
      navigate('/')
    } catch (err) {
      let message = 'Something went wrong. Please try again.'
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        message = 'Incorrect email or password.'
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.'
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
            <span className="eyebrow">Welcome Back</span>
            <h1>Login to your account</h1>
            <p>Enter your details to continue ordering your favorite meals.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {errors.form && <span className="error" style={{ display: 'block', marginBottom: '10px' }}>{errors.form}</span>}

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
                  placeholder="Enter your password"
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

            <div className="login-row">
              <label className="filter-checkbox">
                <input type="checkbox" defaultChecked />
                Remember me
              </label>
              <Link to="/" className="login-forgot">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'} <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-footer-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}