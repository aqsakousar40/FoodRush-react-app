import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { categories } from '../../data/products.js'
import { showToast } from '../../components/ToastContainer.jsx'
import {
  subscribeToProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../firebase/productsService.js'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState({ name: '', category: 'burgers', price: '', image: '', description: '' })

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  function openAddModal() {
    setEditingProduct(null)
    setForm({ name: '', category: 'burgers', price: '', image: '', description: '' })
    setModalOpen(true)
  }

  function openEditModal(product) {
    setEditingProduct(product)
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
    })
    setModalOpen(true)
  }

  async function handleDelete(id) {
    try {
      await deleteProduct(id)
      showToast('Product deleted')
    } catch (err) {
      showToast('Failed to delete product')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          ...form,
          price: Number(form.price),
        })
        showToast('Product updated')
      } else {
        await addProduct({
          ...form,
          price: Number(form.price),
          rating: 0,
          reviews: 0,
          popular: false,
          vegetarian: false,
          spicy: false,
          createdAt: new Date().toISOString(),
        })
        showToast('Product added')
      }
      setModalOpen(false)
    } catch (err) {
      showToast('Something went wrong, please try again')
    }
  }

  // Ye ek dafa ka button hai — purane 24 dummy products ko Firestore mein bhej dega
// Ye ek dafa ka button hai — purane 24 dummy products ko Firestore mein bhej dega
async function handleSeedProducts() {
  if (products.length > 0) {
    showToast('Products already exist, seeding skipped')
    return
  }
  try {
    for (const product of sampleProducts) {
      const { id, ...rest } = product // Firestore apna khud ka id banata hai
      await addProduct(rest)
    }
    showToast('Sample menu imported!')
  } catch (err) {
    showToast('Failed to import sample products')
  }
}

  if (loading) {
    return <p style={{ padding: '2rem' }}>Loading products...</p>
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-subtitle">Manage your menu items — add, edit, or remove dishes.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary" onClick={openAddModal}>
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      <div className="admin-table-wrap card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td><img src={p.image} alt={p.name} className="admin-table-img" /></td>
                <td>{p.name}</td>
                <td className="admin-table-category">{p.category}</td>
                <td>Rs. {p.price.toLocaleString()}</td>
                <td>
                  <div className="admin-table-actions">
                    <button className="icon-btn" onClick={() => openEditModal(p)} aria-label="Edit">
                      <Pencil size={16} />
                    </button>
                    <button className="icon-btn admin-delete-btn" onClick={() => handleDelete(p.id)} aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
              <button className="icon-btn" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="field">
                <label>Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Price (Rs.)</label>
                <input
                  type="number"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Image URL</label>
                <input
                  type="text"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Description</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}