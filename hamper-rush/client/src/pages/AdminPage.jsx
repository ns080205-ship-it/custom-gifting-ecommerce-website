import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PRODUCTS, TESTIMONIALS } from '../utils/mockData'

const MOCK_ORDERS = [
  { _id: 'HR001', customer: 'Priya Sharma', total: 4998, status: 'confirmed', date: '2024-12-15', items: 2, method: 'online' },
  { _id: 'HR002', customer: 'Meghna Kulkarni', total: 17495, status: 'dispatched', date: '2024-12-14', items: 5, method: 'cod' },
  { _id: 'HR003', customer: 'Ankita Desai', total: 3499, status: 'pending', date: '2024-12-14', items: 1, method: 'online' },
  { _id: 'HR004', customer: 'Rohini Joshi', total: 2799, status: 'delivered', date: '2024-12-13', items: 1, method: 'online' },
  { _id: 'HR005', customer: 'Sneha Patil', total: 8997, status: 'confirmed', date: '2024-12-13', items: 3, method: 'cod' },
]

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  dispatched: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

function Stat({ title, value, icon, color }) {
  return (
    <div className={`${color} rounded-2xl p-6`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-sans text-sm opacity-70 mb-1">{title}</p>
          <p className="font-display text-3xl">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [creds, setCreds] = useState({ email: '', password: '' })
  const [activeTab, setActiveTab] = useState('dashboard')
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [products, setProducts] = useState(PRODUCTS)
  const [showAddProduct, setShowAddProduct] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (creds.email === 'admin@hamperrush.in' && creds.password === 'admin123') {
      setIsLoggedIn(true)
      localStorage.setItem('admin_token', 'demo_token')
    } else {
      alert('Invalid credentials\nDemo: admin@hamperrush.in / admin123')
    }
  }

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o))
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-blush flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-luxury p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <span className="font-accent text-gold text-4xl block">Hamper Rush</span>
            <p className="font-sans text-sm text-mink mt-1 tracking-widest">ADMIN PANEL</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">Email</label>
              <input type="email" required placeholder="admin@hamperrush.in"
                value={creds.email} onChange={e => setCreds(p => ({ ...p, email: e.target.value }))}
                className="input-luxury" />
            </div>
            <div>
              <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">Password</label>
              <input type="password" required placeholder="••••••••"
                value={creds.password} onChange={e => setCreds(p => ({ ...p, password: e.target.value }))}
                className="input-luxury" />
            </div>
            <button type="submit" className="btn-primary w-full mt-2">Sign In</button>
          </form>
          <p className="font-sans text-xs text-center text-mink mt-6">Demo: admin@hamperrush.in / admin123</p>
        </motion.div>
      </div>
    )
  }

  const TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'products', label: 'Products', icon: '🎁' },
    { id: 'testimonials', label: 'Testimonials', icon: '⭐' },
  ]

  return (
    <div className="min-h-screen bg-pearl flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
        <div className="p-6 border-b border-gray-800">
          <span className="font-accent text-gold text-3xl block">Hamper Rush</span>
          <p className="font-sans text-xs text-gray-500 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans transition-all ${activeTab === tab.id ? 'bg-gold text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => { setIsLoggedIn(false); localStorage.removeItem('admin_token') }}
            className="w-full text-gray-400 hover:text-white text-sm font-sans py-2 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="font-display text-3xl text-gray-800 mb-8">Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Stat title="Total Orders" value="127" icon="📦" color="bg-blue-50 text-blue-800" />
                <Stat title="Revenue" value="₹2.8L" icon="💰" color="bg-gold-pale text-yellow-800" />
                <Stat title="Products" value={products.length.toString()} icon="🎁" color="bg-rose-light text-rose-700" />
                <Stat title="Happy Customers" value="2000+" icon="😊" color="bg-green-50 text-green-800" />
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h2 className="font-display text-xl text-gray-800 mb-6">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-cream-200 text-left">
                        {['Order ID', 'Customer', 'Items', 'Total', 'Method', 'Status', 'Date'].map(h => (
                          <th key={h} className="pb-3 font-sans text-xs text-mink uppercase tracking-wide pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100">
                      {orders.map(order => (
                        <tr key={order._id}>
                          <td className="py-3 pr-4 font-sans font-medium text-gold">#{order._id}</td>
                          <td className="py-3 pr-4 font-sans text-gray-700">{order.customer}</td>
                          <td className="py-3 pr-4 font-sans text-gray-500">{order.items}</td>
                          <td className="py-3 pr-4 font-display text-gray-800">₹{order.total.toLocaleString('en-IN')}</td>
                          <td className="py-3 pr-4 font-sans text-gray-500 capitalize">{order.method}</td>
                          <td className="py-3 pr-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-sans font-medium capitalize ${STATUS_COLORS[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 font-sans text-mink text-xs">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div>
              <h1 className="font-display text-3xl text-gray-800 mb-8">Manage Orders</h1>
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-cream-50">
                      <tr>
                        {['Order', 'Customer', 'Total', 'Payment', 'Status', 'Actions'].map(h => (
                          <th key={h} className="px-6 py-4 text-left font-sans text-xs text-mink uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100">
                      {orders.map(order => (
                        <tr key={order._id} className="hover:bg-cream-50">
                          <td className="px-6 py-4 font-sans font-bold text-gold">#{order._id}</td>
                          <td className="px-6 py-4 font-sans text-gray-700">{order.customer}</td>
                          <td className="px-6 py-4 font-display text-gray-800">₹{order.total.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4 font-sans text-gray-500 capitalize">{order.method}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={order.status}
                              onChange={e => updateOrderStatus(order._id, e.target.value)}
                              className="text-xs border border-cream-300 rounded-lg px-2 py-1 focus:outline-none focus:border-gold"
                            >
                              {['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'].map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h1 className="font-display text-3xl text-gray-800">Products</h1>
                <button onClick={() => setShowAddProduct(!showAddProduct)} className="btn-primary text-sm">
                  + Add Product
                </button>
              </div>

              {showAddProduct && (
                <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
                  <h3 className="font-display text-xl text-gray-800 mb-4">Add New Product</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Product Name', placeholder: 'e.g. Pink Bliss Hamper' },
                      { label: 'Category', placeholder: 'bridesmaid, wedding...' },
                      { label: 'Price (₹)', placeholder: '2499' },
                      { label: 'Original Price (₹)', placeholder: '3200' },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="font-sans text-xs text-gray-600 font-medium mb-1 block">{f.label}</label>
                        <input placeholder={f.placeholder} className="input-luxury" />
                      </div>
                    ))}
                    <div className="col-span-2">
                      <label className="font-sans text-xs text-gray-600 font-medium mb-1 block">Description</label>
                      <textarea rows={3} className="input-luxury resize-none" />
                    </div>
                    <div className="col-span-2 flex gap-3">
                      <button className="btn-primary">Save Product</button>
                      <button onClick={() => setShowAddProduct(false)} className="btn-outline">Cancel</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-cream-50">
                    <tr>
                      {['Product', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-4 text-left font-sans text-xs text-mink uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100">
                    {products.map(product => (
                      <tr key={product._id} className="hover:bg-cream-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-cream-100">
                              <img src={product.images?.[0]} alt="" className="w-full h-full object-cover" />
                            </div>
                            <span className="font-sans text-gray-700">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-sans text-gray-500 capitalize">{product.category}</td>
                        <td className="px-6 py-4 font-display text-gold">₹{product.price?.toLocaleString('en-IN')}</td>
                        <td className="px-6 py-4 font-sans text-gray-600">{product.stock}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                            <button className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Testimonials */}
          {activeTab === 'testimonials' && (
            <div>
              <h1 className="font-display text-3xl text-gray-800 mb-8">Manage Testimonials</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TESTIMONIALS.map(t => (
                  <div key={t._id} className="bg-white rounded-2xl shadow-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex">{[...Array(t.rating)].map((_, i) => <span key={i} className="text-gold text-sm">★</span>)}</div>
                      <button className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
                    </div>
                    <p className="font-body text-gray-600 text-sm mb-4">"{t.text}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gold-light rounded-full flex items-center justify-center text-gold font-bold text-sm">{t.avatar}</div>
                      <div>
                        <p className="font-display text-sm text-gray-800">{t.name}</p>
                        <p className="font-sans text-xs text-mink">{t.occasion} · {t.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
