import { motion } from 'framer-motion'
import { slideUp, slideRight, slideLeft } from '../utils/animations.js'

export default function About() {
  return (
    <div id="about">
      <section className="section about-hero">
        <div className="container">
          <motion.div
            className="section-heading"
            style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="eyebrow">Our Story</span>
            <h1>Made with passion, delivered with care.</h1>
            <p>
              FoodRush started with a simple idea — everyone deserves a great meal,
              without the wait. Today we partner with the best kitchens in town to
              bring fresh, delicious food straight to your door.
            </p>
          </motion.div>

          <motion.img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1100&q=80"
            alt="Chefs preparing fresh food"
            className="about-hero-image"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          />
        </div>
      </section>

      <section className="section">
        <div className="container about-split">
          <motion.img
            src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80"
            alt="Fresh produce"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          />
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <span className="eyebrow">Fresh Ingredients</span>
            <h2>Quality you can taste in every bite.</h2>
            <p className="details-desc">
              We work directly with local farms and trusted suppliers to make sure
              every dish is made with ingredients that are fresh, never frozen, and
              always full of flavor.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}