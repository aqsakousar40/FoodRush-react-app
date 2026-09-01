import { useEffect, useState } from 'react'
import { Package, ShoppingBag, DollarSign, Users } from 'lucide-react'
import { subscribeToProducts } from '../../firebase/productsService.js'
import { subscribeToOrders } from '../../firebase/ordersService.js'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubProducts = subscribeToProducts((data) => {
      setProducts(data)
      setLoading(false)
    })
    const unsubOrders = subscribeToOrders((data) => {
      setOrders(data)
    })
    return () => {
      unsubProducts()
      unsubOrders()
    }
  }, [])

  // Total revenue — sab orders ke totals jama karo
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)

  // Unique customers — customerEmail ke basis pe alag alag count karo
  const uniqueCustomers = new Set(orders.map((o) => o.customerEmail)).size

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'coral',
    },
    {
      label: 'Total Orders',
      value: orders.length,
      icon: ShoppingBag,
      color: 'gold',
    },
    {
      label: 'Total Revenue',
      value: `Rs. ${Math.round(totalRevenue).toLocaleString()}`,
      icon: DollarSign,
      color: 'green',
    },
    {
      label: 'Total Customers',
      value: uniqueCustomers,
      icon: Users,
      color: 'coral',
    },
  ]

  if (loading) {
    return <p style={{ padding: '2rem' }}>Loading dashboard...</p>
  }

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-subtitle">Welcome back! Here's what's happening with FoodRush today.</p>

      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-stat-card card">
            <div className={`admin-stat-icon admin-stat-icon-${stat.color}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <span className="admin-stat-value">{stat.value}</span>
              <span className="admin-stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}