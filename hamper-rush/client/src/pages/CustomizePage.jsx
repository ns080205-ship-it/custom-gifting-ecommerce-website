import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { openWhatsAppDirect } from '../utils/whatsapp'
import toast from 'react-hot-toast'

const STEPS = ['Choose Occasion', 'Pick Products', 'Personalize', 'Review & Order']

const OCCASIONS = [
  { id: 'bridesmaid', label: 'Bridesmaid', emoji: '💐', price: 2499 },
  { id: 'wedding', label: 'Wedding', emoji: '💍', price: 899 },
  { id: 'birthday', label: 'Birthday', emoji: '🎂', price: 1899 },
  { id: 'corporate', label: 'Corporate', emoji: '🏢', price: 3499 },
  { id: 'baby-shower', label: 'Baby Shower', emoji: '👶', price: 2799 },
  { id: 'festive', label: 'Festive', emoji: '✨', price: 1499 },
]

const PRODUCT_OPTIONS = {
  bridesmaid: ['Silk Scrunchies', 'Rose Quartz Roller', 'Scented Candle', 'Chocolate Box', 'Bath Salts', 'Custom Keychain', 'Perfume', 'Face Mask Set'],
  birthday: ['Personalized Mug', 'Artisan Chocolates', 'Bath & Body Set', 'Scented Candle', 'Photo Frame', 'Customized Cushion', 'Journal', 'Flowers'],
  corporate: ['Premium Dry Fruits', 'Branded Notepad', 'Artisanal Tea Set', 'USB Hub', 'Eco Water Bottle', 'Pen Set', 'Chocolates', 'Desk Organizer'],
  wedding: ['Dry Fruits', 'Decorative Box', 'Satin Ribbon', 'Wax Seal', 'Candles', 'Incense Set'],
  'baby-shower': ['Organic Baby Skincare', 'Muslin Wraps', 'Custom Onesie', 'Baby Book', 'Mommy Self-care Kit', 'Soft Toy'],
  festive: ['Assorted Mithai', 'Dry Fruits', 'Diyas', 'Incense', 'Chocolates', 'Scented Candle'],
}

const THEMES = ['Blush Pink', 'Rose Gold', 'White & Gold', 'Lavender Purple', 'Sage Green', 'Classic Cream', 'Midnight Black', 'Sky Blue']

export default function CustomizePage() {
  const [step, setStep] = useState(0)
  const [occasion, setOccasion] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [customization, setCustomization] = useState({ name: '', theme: '', note: '', quantity: 1, phone: '' })
  const { dispatch } = useCart()

  const toggleProduct = (prod) => {
    setSelectedProducts(prev =>
      prev.includes(prod) ? prev.filter(p => p !== prod) : [...prev, prod]
    )
  }

  const basePrice = occasion ? OCCASIONS.find(o => o.id === occasion)?.price || 0 : 0
  const totalPrice = basePrice + selectedProducts.length * 150

  const handleAddToCart = () => {
    const occasionData = OCCASIONS.find(o => o.id === occasion)
    const product = {
      _id: `custom-${Date.now()}`,
      name: `Custom ${occasionData?.label} Hamper`,
      price: totalPrice,
      category: occasion,
      images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80'],
      customization: { ...customization, products: selectedProducts },
    }
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity: customization.quantity } })
    toast.success('Custom hamper added to cart! 🎁', {
      style: { background: '#faf5ec', color: '#4a3728', border: '1px solid #d4a853' }
    })
  }

  const handleWhatsApp = () => {
    const occasionData = OCCASIONS.find(o => o.id === occasion)
    const msg = `Hi Hamper Rush! 🎁 I'd like to create a custom hamper:\n\n*Occasion:* ${occasionData?.label}\n*Products:* ${selectedProducts.join(', ')}\n*Theme:* ${customization.theme}\n*Name:* ${customization.name}\n*Quantity:* ${customization.quantity}\n*Note:* ${customization.note}\n*Estimated Total:* ₹${totalPrice.toLocaleString('en-IN')}\n\nPlease help me finalize this order!`
    openWhatsAppDirect(msg)
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-blush">
      <div className="section-padding max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-accent text-gold text-4xl block mb-2">Make it yours</span>
          <h1 className="font-display text-4xl md:text-5xl text-gray-800">Build Your Own Hamper</h1>
          <p className="font-body text-gray-500 mt-3">Every detail, personalised just for you.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-cream-300 z-0" />
          <div className="absolute top-4 left-0 h-0.5 bg-gold z-0 transition-all duration-500" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
          {STEPS.map((s, i) => (
            <div key={s} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm font-bold transition-all ${i <= step ? 'bg-gold text-white' : 'bg-white border-2 border-cream-300 text-mink'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`font-sans text-xs hidden md:block ${i <= step ? 'text-gold' : 'text-mink'}`}>{s}</span>
            </div>
          ))}
        </div>

        {/* Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-card p-8"
        >
          {/* Step 0: Occasion */}
          {step === 0 && (
            <div>
              <h2 className="font-display text-2xl text-gray-800 mb-6">What's the Occasion?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {OCCASIONS.map(occ => (
                  <button
                    key={occ.id}
                    onClick={() => setOccasion(occ.id)}
                    className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${occasion === occ.id ? 'border-gold bg-gold-pale' : 'border-cream-200 hover:border-gold/50'}`}
                  >
                    <span className="text-4xl">{occ.emoji}</span>
                    <span className="font-display text-gray-800 text-sm">{occ.label}</span>
                    <span className="font-sans text-xs text-mink">from ₹{occ.price.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Products */}
          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl text-gray-800 mb-2">Pick Your Products</h2>
              <p className="font-sans text-sm text-mink mb-6">Each additional item adds ₹150. Select as many as you like.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(PRODUCT_OPTIONS[occasion] || []).map(prod => (
                  <button
                    key={prod}
                    onClick={() => toggleProduct(prod)}
                    className={`p-3 rounded-xl text-sm font-sans border-2 transition-all ${selectedProducts.includes(prod) ? 'border-gold bg-gold-pale text-gold' : 'border-cream-200 text-gray-600 hover:border-gold/50'}`}
                  >
                    {selectedProducts.includes(prod) && '✓ '}{prod}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center p-4 bg-cream-50 rounded-xl">
                <span className="font-sans text-sm text-gray-600">Selected: {selectedProducts.length} items</span>
                <span className="font-display text-gold text-xl">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          {/* Step 2: Personalize */}
          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl text-gray-800 mb-6">Personalize Your Hamper</h2>
              <div className="space-y-5">
                <div>
                  <label className="font-sans text-xs text-gray-600 font-medium mb-1 block tracking-wide uppercase">Recipient Name *</label>
                  <input type="text" placeholder="Enter name to print on hamper"
                    value={customization.name} onChange={e => setCustomization(p => ({ ...p, name: e.target.value }))}
                    className="input-luxury" />
                </div>
                <div>
                  <label className="font-sans text-xs text-gray-600 font-medium mb-2 block tracking-wide uppercase">Color Theme</label>
                  <div className="flex flex-wrap gap-2">
                    {THEMES.map(theme => (
                      <button key={theme} onClick={() => setCustomization(p => ({ ...p, theme }))}
                        className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all ${customization.theme === theme ? 'bg-gold text-white' : 'bg-cream-50 text-gray-600 border border-cream-300 hover:border-gold'}`}>
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-sans text-xs text-gray-600 font-medium mb-1 block tracking-wide uppercase">Personal Message / Card Note</label>
                  <textarea placeholder="Write a heartfelt message for the gift card..." rows={4}
                    value={customization.note} onChange={e => setCustomization(p => ({ ...p, note: e.target.value }))}
                    className="input-luxury resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-xs text-gray-600 font-medium mb-1 block tracking-wide uppercase">Quantity</label>
                    <input type="number" min={1} value={customization.quantity}
                      onChange={e => setCustomization(p => ({ ...p, quantity: parseInt(e.target.value) || 1 }))}
                      className="input-luxury" />
                  </div>
                  <div>
                    <label className="font-sans text-xs text-gray-600 font-medium mb-1 block tracking-wide uppercase">Your Phone</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX"
                      value={customization.phone} onChange={e => setCustomization(p => ({ ...p, phone: e.target.value }))}
                      className="input-luxury" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl text-gray-800 mb-6">Your Custom Hamper Summary</h2>
              <div className="space-y-4">
                {[
                  { label: 'Occasion', value: OCCASIONS.find(o => o.id === occasion)?.label },
                  { label: 'Products', value: selectedProducts.join(', ') || 'None selected' },
                  { label: 'Theme', value: customization.theme || 'Not selected' },
                  { label: 'Name', value: customization.name || 'Not provided' },
                  { label: 'Message', value: customization.note || 'None' },
                  { label: 'Quantity', value: customization.quantity },
                ].map(item => (
                  <div key={item.label} className="flex justify-between py-3 border-b border-cream-100">
                    <span className="font-sans text-sm text-mink">{item.label}</span>
                    <span className="font-sans text-sm text-gray-700 text-right max-w-xs">{item.value}</span>
                  </div>
                ))}
                <div className="flex justify-between py-3">
                  <span className="font-display text-gray-800 text-lg">Estimated Total</span>
                  <span className="font-display text-gold text-2xl">₹{(totalPrice * customization.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <p className="font-sans text-xs text-mink mt-4 bg-cream-50 p-4 rounded-xl">
                * Final price may vary based on product availability and customization complexity. Our team will confirm the exact price on WhatsApp.
              </p>
              <div className="flex flex-col gap-3 mt-6">
                <button onClick={handleAddToCart} className="btn-primary w-full">Add to Cart & Checkout</button>
                <button onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-sans font-medium text-sm transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Confirm Order on WhatsApp
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        {step < 3 && (
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="btn-outline disabled:opacity-30 disabled:cursor-not-allowed">
              ← Back
            </button>
            <button
              onClick={() => {
                if (step === 0 && !occasion) { toast.error('Please select an occasion'); return }
                setStep(s => Math.min(3, s + 1))
              }}
              className="btn-primary"
            >
              {step === 2 ? 'Review Order →' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
