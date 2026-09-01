import { Link, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, ArrowLeft } from 'lucide-react'

const adminLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
]

export default function AdminLayout() {
  const location = useLocation()

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <span className="logo-mark">F</span>
          <span>FoodRush Admin</span>
        </div>

        <nav className="admin-nav">
          {adminLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`admin-nav-link ${isActive ? 'active' : ''}`}
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <Link to="/" className="admin-back-link">
          <ArrowLeft size={16} /> Back to Website
        </Link>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}