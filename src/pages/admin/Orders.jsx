import { useEffect, useState } from 'react'
import { Eye, X } from 'lucide-react'
import { subscribeToOrders, updateOrderStatus } from '../../firebase/ordersService.js'
import { showToast } from '../../components/ToastContainer.jsx'

const statusColors = {
  Delivered: 'admin-status-green',
  Preparing: 'admin-status-gold',
  Pending: 'admin-status-coral',
  Cancelled: 'admin-status-gray',
}

const statusOptions = ['Pending', 'Preparing', 'Delivered', 'Cancelled']

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    const unsubscribe = subscribeToOrders((data) => {
      setOrders(data)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  async function handleStatusChange(id, newStatus) {
    try {
      await updateOrderStatus(id, newStatus)
      showToast('Order status updated')
    } catch (err) {
      showToast('Failed to update status')
    }
  }

  function formatDate(timestamp) {
    if (!timestamp) return '—'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  if (loading) {
    return <p style={{ padding: '2rem' }}>Loading orders...</p>
  }

  return (
    <div>
      <h1 className="admin-page-title">Orders</h1>
      <p className="admin-page-subtitle">View and track all customer orders.</p>

      <div className="admin-table-wrap card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="admin-order-id">{order.orderNumber || order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.itemsCount}</td>
                  <td>Rs. {Math.round(order.total).toLocaleString()}</td>
                  <td>
                    <select
                      className={`admin-status-badge ${statusColors[order.status]}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{ cursor: 'pointer', border: 'none' }}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <button
                      className="icon-btn"
                      aria-label="View order"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="admin-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="admin-modal card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Order {selectedOrder.orderNumber}</h3>
              <button className="icon-btn" onClick={() => setSelectedOrder(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '0 1rem 1rem' }}>
              <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
              <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
              <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Delivery:</strong> {selectedOrder.deliveryMethod} ({selectedOrder.estimatedTime})</p>
              <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>

              <h4 style={{ marginTop: '1rem' }}>Items</h4>
              <ul>
                {selectedOrder.items?.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity} — Rs. {item.price * item.quantity}
                    {item.size && item.size !== 'regular' ? ` (${item.size})` : ''}
                  </li>
                ))}
              </ul>

              <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                Total: Rs. {Math.round(selectedOrder.total).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}