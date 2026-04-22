import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../utils/mockData'
import ProductCard from '../components/ui/ProductCard'
import { openWhatsAppDirect } from '../utils/whatsapp'
import toast from 'react-hot-toast'

const THEMES = ['Blush Pink', 'Rose Gold', 'White & Gold', 'Lavender', 'Sage Green', 'Classic Cream']

export default function ProductPage() {
  const { id } = useParams()
  const product = PRODUCTS.find(p => p._id === id) || PRODUCTS[0]
  const { dispatch } = useCart()

  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [customization, setCustomization] = useState({ name: '', note: '', theme: '', deliveryNotes: '' })
  const [showCustomForm, setShowCustomForm] = useState(false)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const related = PRODUCTS.filter(p => p.category === product.category && p._id !== product._id).slice(0, 3)

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity, customization } })
    toast.success('Added to cart! 🎁', {
      style: { background: '#faf5ec', color: '#4a3728', border: '1px solid #d4a853' }
    })
  }

  const handleWhatsApp = () => {
    const msg = `Hi Hamper Rush! 🎁\n\nI'm interested in:\n*${product.name}*\nPrice: ₹${product.price.toLocaleString('en-IN')}\nQty: ${quantity}\n${customization.name ? `Custom Name: ${customization.name}` : ''}\n${customization.theme ? `Theme: ${customization.theme}` : ''}\n${customization.note ? `Note: ${customization.note}` : ''}\n\nPlease help me place this order!`
    openWhatsAppDirect(msg)
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="section-padding max-w-screen-xl mx-auto">
        <nav className="flex items-center gap-2 font-sans text-sm text-mink mb-8">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold">Shop</Link>
          <span>/</span>
          <span className="text-gray-600">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Images */}
          <div>
            <motion.div key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="aspect-square rounded-3xl overflow-hidden bg-cream-100 mb-4">
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-gold' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex gap-2 flex-wrap mb-4">
              {product.tags?.includes('bestseller') && <span className="badge-gold">⭐ Bestseller</span>}
              {product.customizable && <span className="bg-green-50 text-green-700 text-xs font-sans font-medium px-3 py-1 rounded-full">✓ Customizable</span>}
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-gray-800 leading-tight mb-3">{product.name}</h1>

            {product.rating && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="font-sans text-sm text-mink">{product.rating} ({product.reviews} reviews)</span>
              </div>
            )}

            <div className="flex items-end gap-3 mb-6">
              <span className="font-display text-gold text-4xl">₹{product.price?.toLocaleString('en-IN')}</span>
              {product.originalPrice && <span className="font-sans text-xl text-gray-400 line-through mb-1">₹{product.originalPrice?.toLocaleString('en-IN')}</span>}
              {discount && <span className="bg-green-100 text-green-700 text-sm font-sans font-medium px-3 py-1 rounded-full mb-1">Save {discount}%</span>}
            </div>

            <p className="font-body text-gray-600 text-base leading-relaxed mb-6">{product.description}</p>

            {product.includes && (
              <div className="bg-cream-50 rounded-2xl p-5 mb-6">
                <h4 className="font-display text-gray-800 mb-3">What's Included</h4>
                <ul className="space-y-2">
                  {product.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 font-sans text-sm text-gray-600">
                      <span className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center gap-2 font-sans text-sm text-green-700 bg-green-50 px-4 py-3 rounded-xl mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              Delivery in <strong className="ml-1">{product.deliveryDays}</strong>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-sm text-gray-600 font-medium">Quantity:</span>
              <div className="flex items-center border border-cream-300 rounded-full overflow-hidden">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-cream-100 transition-colors font-sans text-lg">−</button>
                <span className="px-4 font-sans font-medium">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 hover:bg-cream-100 transition-colors font-sans text-lg">+</button>
              </div>
            </div>

            {product.customizable && (
              <div className="mb-6">
                <button onClick={() => setShowCustomForm(!showCustomForm)}
                  className="w-full flex items-center justify-between p-4 bg-gold-pale rounded-xl border border-gold/30 hover:border-gold transition-colors">
                  <span className="font-display text-gray-800">✍️ Add Personalization Details</span>
                  <span className={`text-gold transition-transform ${showCustomForm ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <AnimatePresence>
                  {showCustomForm && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="pt-4 space-y-4 border border-gold/20 border-t-0 rounded-b-xl p-4 bg-gold-pale/30">
                        <div>
                          <label className="font-sans text-xs text-gray-600 font-medium mb-1 block tracking-wide uppercase">Custom Name</label>
                          <input type="text" placeholder="Recipient's name..."
                            value={customization.name} onChange={e => setCustomization(p => ({ ...p, name: e.target.value }))}
                            className="input-luxury" />
                        </div>
                        <div>
                          <label className="font-sans text-xs text-gray-600 font-medium mb-2 block tracking-wide uppercase">Color Theme</label>
                          <div className="flex flex-wrap gap-2">
                            {THEMES.map(theme => (
                              <button key={theme} onClick={() => setCustomization(p => ({ ...p, theme }))}
                                className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all ${customization.theme === theme ? 'bg-gold text-white' : 'bg-white text-gray-600 border border-cream-300 hover:border-gold'}`}>
                                {theme}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="font-sans text-xs text-gray-600 font-medium mb-1 block tracking-wide uppercase">Personal Message</label>
                          <textarea placeholder="Write a heartfelt note..." rows={3}
                            value={customization.note} onChange={e => setCustomization(p => ({ ...p, note: e.target.value }))}
                            className="input-luxury resize-none" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleAddToCart} className="btn-primary flex-1">Add to Cart</button>
              <Link to="/checkout" onClick={handleAddToCart} className="btn-outline flex-1 text-center">Buy Now</Link>
            </div>
            <button onClick={handleWhatsApp}
              className="w-full mt-3 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-sans font-medium text-sm transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Order on WhatsApp
            </button>

            <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-cream-200">
              {[{ icon: '🔒', text: 'Secure Payment' }, { icon: '🚚', text: 'Pan India Delivery' }, { icon: '↩️', text: 'Easy Returns' }].map(b => (
                <div key={b.text} className="text-center">
                  <div className="text-xl mb-1">{b.icon}</div>
                  <div className="font-sans text-xs text-mink">{b.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h3 className="font-display text-2xl text-gray-800 mb-8 text-center">You May Also Love</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
