import { motion } from 'framer-motion'
import { Truck, Leaf, MousePointerClick, ShieldCheck } from 'lucide-react'
import { staggerContainer } from '../utils/animations.js'
import FeatureCard from './FeatureCard.jsx'

const features = [
  { icon: Truck, title: 'Fast Delivery', text: 'Hot and fresh food delivered quickly, right to your doorstep.' },
  { icon: Leaf, title: 'Fresh Ingredients', text: 'Quality ingredients, sourced daily and prepared with care.' },
  { icon: MousePointerClick, title: 'Easy Ordering', text: 'Order your favorite meals in just a few simple clicks.' },
  { icon: ShieldCheck, title: 'Secure Payment', text: 'Safe, encrypted and convenient checkout every time.' },
]

export default function FeaturesSection() {
  return (
    <section className="section features-section">
      <div className="container">
        <motion.div
          className="features-grid"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} text={f.text} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}