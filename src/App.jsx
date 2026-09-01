import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import ToastContainer from './components/ToastContainer.jsx'
import PageTransition from './components/PageTransition.jsx'

import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Favorites from './pages/Favorites.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Products from './pages/admin/Products.jsx'
import Orders from './pages/admin/Orders.jsx'

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <ToastContainer />

     <main>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
          <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
          <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
          <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
          <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/order-success" element={<PageTransition><OrderSuccess /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
          <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="products" element={<Products />} />
  <Route path="orders" element={<Orders />} />
</Route>

        </Routes>
      </AnimatePresence>
    </main>

      {!isAdminRoute && <Footer />}
    </>
  )
}