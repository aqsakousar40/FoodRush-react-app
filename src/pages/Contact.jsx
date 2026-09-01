import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import { slideUp, slideRight, slideLeft } from '../utils/animations.js'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  function validate() {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Enter a valid email'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim() || formData.message.trim().length < 10)
      newErrors.message = 'Message should be at least 10 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="container section" id="contact">
      <motion.div
        className="section-heading"
        style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className="eyebrow">Get in Touch</span>
        <h1>We'd love to hear from you</h1>
        <p>Questions, feedback, or partnership ideas — send us a message.</p>
      </motion.div>

      <div className="contact-layout">
        <motion.div
          className="contact-info"
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="contact-info-item">
            <div className="feature-icon"><Phone size={20} /></div>
            <div>
              <span>Phone</span>
              <strong>+92 300 1234567</strong>
            </div>
          </div>
          <div className="contact-info-item">
            <div className="feature-icon"><Mail size={20} /></div>
            <div>
              <span>Email</span>
              <strong>hello@foodrush.com</strong>
            </div>
          </div>
          <div className="contact-info-item">
            <div className="feature-icon"><MapPin size={20} /></div>
            <div>
              <span>Address</span>
              <strong>123 Food Street, Faisalabad, Punjab</strong>
            </div>
          </div>
          <div className="contact-info-item">
            <div className="feature-icon"><Clock size={20} /></div>
            <div>
              <span>Opening Hours</span>
              <strong>Every day, 9:00 AM – 11:00 PM</strong>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="contact-form card"
          onSubmit={handleSubmit}
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {submitted && (
            <motion.div
              className="form-success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle2 size={18} />
              Thanks! Your message has been sent.
            </motion.div>
          )}

          <div className="field">
            <label>Name</label>
            <input
              className={errors.name ? 'invalid' : ''}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Your name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="field">
            <label>Email</label>
            <input
              className={errors.email ? 'invalid' : ''}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="field">
            <label>Subject</label>
            <input
              className={errors.subject ? 'invalid' : ''}
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="How can we help?"
            />
            {errors.subject && <span className="error">{errors.subject}</span>}
          </div>

          <div className="field">
            <label>Message</label>
            <textarea
              className={errors.message ? 'invalid' : ''}
              rows={5}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Write your message..."
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  )
}