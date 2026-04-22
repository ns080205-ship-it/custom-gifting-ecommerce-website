import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { generateWhatsAppOrderMessage, openWhatsApp } from '../utils/whatsapp'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const { items, total, dispatch } = useCart()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('online')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: 'Maharashtra', pincode: ''
  })

  const shipping = total > 2000 ? 0 : 99
  const grandTotal = total + shipping

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    if (items.length === 0) { toast.error('Your cart is empty'); return }
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    // Simulate order creation
    await new Promise(r => setTimeout(r, 1200))

    const orderId = `HR${Date.now().toString().slice(-6)}`

    if (paymentMethod === 'cod') {
      // Open WhatsApp with order summary
      const orderData = {
        orderId,
        customerName: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        pincode: form.pincode,
        items,
        total: grandTotal,
        paymentMethod: 'cod',
        customization: items[0]?.customization,
      }
      const msg = generateWhatsAppOrderMessage(orderData)
      dispatch({ type: 'CLEAR_CART' })
      navigate(`/order-success?orderId=${orderId}&method=cod`)
      setTimeout(() => openWhatsApp(msg), 800)
    } else {
      // Razorpay flow
      if (!window.Razorpay) {
        toast.error('Payment gateway loading... please try again')
        setLoading(false)
        return
      }
      const options = {
        key: 'rzp_test_YOUR_KEY_HERE',
        amount: grandTotal * 100,
        currency: 'INR',
        name: 'Hamper Rush',
        description: 'Luxury Hamper Order',
        image: '/logo.png',
        handler: function(response) {
          const orderData = {
            orderId,
            customerName: form.name,
            phone: form.phone,
            address: form.address,
            city: form.city,
            pincode: form.pincode,
            items,
            total: grandTotal,
            paymentMethod: 'online',
          }
          const msg = generateWhatsAppOrderMessage(orderData)
          dispatch({ type: 'CLEAR_CART' })
          navigate(`/order-success?orderId=${orderId}&method=online&payment_id=${response.razorpay_payment_id}`)
          setTimeout(() => openWhatsApp(msg), 800)
        },
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#d4a853' },
        modal: { ondismiss: () => setLoading(false) },
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    }

    setLoading(false)
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-display text-3xl text-gray-800 mb-3">Your cart is empty</h2>
        <p className="font-sans text-mink mb-8">Add some beautiful hampers to get started!</p>
        <a href="/shop" className="btn-primary">Browse Hampers</a>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-pearl">
      <div className="section-padding max-w-screen-xl mx-auto">
        <h1 className="font-display text-4xl text-gray-800 mb-10">Checkout</h1>
        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left — Form */}
            <div className="lg:col-span-3 space-y-8">
              {/* Delivery Details */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-display text-xl text-gray-800 mb-6">Delivery Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">Full Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className="input-luxury" />
                  </div>
                  <div>
                    <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">Phone *</label>
                    <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="input-luxury" />
                  </div>
                  <div>
                    <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className="input-luxury" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">Address *</label>
                    <textarea name="address" required rows={2} value={form.address} onChange={handleChange} placeholder="Street, Apartment, Building..." className="input-luxury resize-none" />
                  </div>
                  <div>
                    <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">City *</label>
                    <input name="city" required value={form.city} onChange={handleChange} placeholder="Nagpur" className="input-luxury" />
                  </div>
                  <div>
                    <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">Pincode *</label>
                    <input name="pincode" required value={form.pincode} onChange={handleChange} placeholder="440001" className="input-luxury" />
                  </div>
                  <div>
                    <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">State</label>
                    <input name="state" value={form.state} onChange={handleChange} className="input-luxury" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-display text-xl text-gray-800 mb-6">Payment Method</h2>
                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-gold bg-gold-pale' : 'border-cream-200 hover:border-gold/40'}`}>
                    <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="accent-gold" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-gray-800">Pay Online</span>
                        <span className="badge-gold text-xs">Recommended</span>
                      </div>
                      <p className="font-sans text-xs text-mink mt-1">UPI, Debit/Credit Card, Net Banking via Razorpay</p>
                    </div>
                    <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-8 h-8 object-contain" />
                  </label>

                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-gold bg-gold-pale' : 'border-cream-200 hover:border-gold/40'}`}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-gold" />
                    <div className="flex-1">
                      <div className="font-display text-gray-800">COD / WhatsApp Inquiry</div>
                      <p className="font-sans text-xs text-mink mt-1">We'll confirm your order on WhatsApp and arrange payment</p>
                    </div>
                    <span className="text-2xl">💬</span>
                  </label>
                </div>

                {paymentMethod === 'online' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                    <p className="font-sans text-xs text-blue-600">🔒 100% secure payment powered by Razorpay. Your card details are never stored.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right — Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-card p-6 sticky top-28">
                <h2 className="font-display text-xl text-gray-800 mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item._id} className="flex gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
                        <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-display text-sm text-gray-800 leading-tight">{item.name}</p>
                        {item.customization?.name && (
                          <p className="font-sans text-xs text-mink">For: {item.customization.name}</p>
                        )}
                        <p className="font-sans text-xs text-mink">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-sans text-sm text-gold font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-cream-200 pt-4 space-y-3">
                  <div className="flex justify-between font-sans text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="font-sans text-xs text-green-600">🎉 You qualify for free shipping!</p>
                  )}
                  <div className="flex justify-between font-display text-lg text-gray-800 border-t border-cream-200 pt-3">
                    <span>Total</span>
                    <span className="text-gold">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="btn-primary w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <><span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Processing...</>
                  ) : paymentMethod === 'cod' ? (
                    '💬 Place Order via WhatsApp'
                  ) : (
                    '🔒 Pay Securely'
                  )}
                </motion.button>

                {/* Assurance */}
                <div className="flex justify-center gap-6 mt-5 pt-5 border-t border-cream-100">
                  {['🔒 Secure', '🚚 Fast Ship', '💯 Quality'].map(t => (
                    <span key={t} className="font-sans text-xs text-mink">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
