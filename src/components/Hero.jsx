import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { staggerContainer, slideRight, slideLeft } from '../utils/animations.js'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="blob hero-blob-1" />
      <div className="blob hero-blob-2" />

      <div className="container hero-inner">
        <motion.div
          className="hero-content"
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="eyebrow" variants={slideRight}>
            Fresh Food. Fast Delivery.
          </motion.span>

          <motion.h1 className="hero-title" variants={slideRight}>
            Your Favorite Food,<br /> Delivered Fast.
          </motion.h1>

          <motion.p className="hero-subtitle" variants={slideRight}>
            Discover delicious meals prepared fresh and delivered straight to
            your doorstep — hot, fast, and always on time.
          </motion.p>

          <motion.div className="hero-buttons" variants={slideRight}>
            <Link to="/menu" className="btn btn-primary">
              Order Now <ArrowRight size={18} />
            </Link>
            <Link to="/menu" className="btn btn-outline">
              Explore Menu
            </Link>
          </motion.div>

          <motion.div className="hero-stats" variants={slideRight}>
            <div>
              <strong>15k+</strong>
              <span>Happy Customers</span>
            </div>
            <div>
              <strong>4.9★</strong>
              <span>Average Rating</span>
            </div>
            <div>
              <strong>25 min</strong>
              <span>Avg. Delivery</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-art"
          variants={slideLeft}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-art-stage">
            <motion.img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80"
              alt="Smash burger floating"
              className="floating-food food-burger"
              animate={{ y: [0, -18, 0], rotate: [-4, 2, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1628840042765-356cda07504e?w=380&q=80"
              alt="Pizza floating"
              className="floating-food food-pizza"
              animate={{ y: [0, 16, 0], rotate: [5, -3, 5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              whileHover={{ scale: 1.06 }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=280&q=80"
              alt="Fries floating"
              className="floating-food food-fries"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              whileHover={{ scale: 1.06 }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=260&q=80"
              alt="Drink floating"
              className="floating-food food-drink"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              whileHover={{ scale: 1.06 }}
            />
            <div className="hero-badge glass">
              <span className="hero-badge-dot" />
              Order arriving in 25 min
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}