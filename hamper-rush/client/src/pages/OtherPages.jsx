// ═══════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { WHATSAPP_LINK } from '../utils/whatsapp'

export function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Banner */}
      <div className="bg-gradient-blush py-20 section-padding text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="font-accent text-gold text-4xl block mb-2">Our Story</span>
          <h1 className="font-display text-5xl text-gray-800">About Hamper Rush</h1>
        </motion.div>
      </div>

      <div className="section-padding max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="section-subtitle block mb-3">Born from love</span>
            <h2 className="section-title mb-6">More Than Just a Hamper</h2>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-6">
              Hamper Rush was born in Nagpur with a simple belief — that every gift should feel personal, premium, and truly unforgettable. We started as a small studio crafting bridesmaid hampers and grew into Nagpur's most trusted luxury gifting brand.
            </p>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-8">
              Every hamper we create is hand-assembled by our team with meticulous care. We source only premium ingredients and products, and we believe the packaging is just as important as what's inside.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[['2000+', 'Happy Customers'], ['500+', 'Weddings Served'], ['4.9★', 'Avg Rating']].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="font-display text-3xl text-gold">{num}</div>
                  <div className="font-sans text-xs text-mink mt-1">{label}</div>
                </div>
              ))}
            </div>
            <Link to="/shop" className="btn-primary">Explore Our Hampers</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80',
              'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500&q=80',
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
              'https://images.unsplash.com/photo-1513201099705-a9746072f3c3?w=500&q=80',
            ].map((src, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden ${i === 0 ? 'row-span-2' : ''}`} style={{ height: i === 0 ? '320px' : '150px' }}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Our Values</h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🤲', title: 'Made With Love', desc: 'Each hamper is hand-assembled by our team with genuine care and attention.' },
            { icon: '✨', title: 'Premium Quality', desc: 'We only select the finest products that meet our strict quality standards.' },
            { icon: '💛', title: 'Personal Touch', desc: 'Personalization isn\'t optional at Hamper Rush — it\'s our default.' },
          ].map(v => (
            <div key={v.title} className="text-center bg-white rounded-2xl p-8 shadow-card">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-display text-xl text-gray-800 mb-3">{v.title}</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════
// GALLERY PAGE
// ═══════════════════════════════════════
export function GalleryPage() {
  const photos = [
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80',
    'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    'https://images.unsplash.com/photo-1513201099705-a9746072f3c3?w=600&q=80',
    'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80',
    'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&q=80',
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80',
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80',
    'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80',
  ]

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="bg-gradient-blush py-16 section-padding text-center mb-12">
        <span className="font-accent text-gold text-3xl block mb-2">Our Work</span>
        <h1 className="font-display text-4xl md:text-5xl text-gray-800">Gallery</h1>
        <p className="font-body text-gray-500 mt-3">A glimpse of the love we pour into every hamper.</p>
      </div>
      <div className="section-padding max-w-screen-xl mx-auto">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
            >
              <img src={src} alt={`Hamper ${i + 1}`} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Follow us on Instagram
          </a>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════
// TESTIMONIALS PAGE
// ═══════════════════════════════════════
import { TESTIMONIALS } from '../utils/mockData'

export function TestimonialsPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-blush">
      <div className="py-16 section-padding text-center mb-12">
        <span className="font-accent text-gold text-3xl block mb-2">Love Notes</span>
        <h1 className="font-display text-4xl md:text-5xl text-gray-800">What Our Customers Say</h1>
        <div className="gold-divider mt-4" />
      </div>
      <div className="section-padding max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS.slice(0, 2)].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="bg-white rounded-2xl p-7 shadow-card"
            >
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, j) => <span key={j} className="text-gold">★</span>)}
              </div>
              <p className="font-body text-gray-600 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3 border-t border-cream-100 pt-4">
                <div className="w-11 h-11 bg-gold-light rounded-full flex items-center justify-center font-display text-gold font-bold">{t.avatar}</div>
                <div>
                  <p className="font-display text-gray-800">{t.name}</p>
                  <p className="font-sans text-xs text-mink">{t.occasion} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════
// FAQ PAGE
// ═══════════════════════════════════════
import { useState } from 'react'
import { FAQS } from '../utils/mockData'

export function FAQPage() {
  const [open, setOpen] = useState(null)

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="bg-gradient-blush py-16 section-padding text-center mb-12">
        <span className="font-accent text-gold text-3xl block mb-2">Got Questions?</span>
        <h1 className="font-display text-4xl md:text-5xl text-gray-800">Frequently Asked Questions</h1>
      </div>
      <div className="section-padding max-w-2xl mx-auto space-y-4">
        {FAQS.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="border border-cream-300 rounded-2xl overflow-hidden bg-white"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-start gap-4 p-6 text-left hover:bg-cream-50 transition-colors"
            >
              <span className="font-display text-gray-800 text-lg">{faq.q}</span>
              <span className={`text-gold text-xl transition-transform duration-300 flex-shrink-0 ${open === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            {open === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-6 pb-6">
                <p className="font-body text-gray-600 leading-relaxed border-t border-cream-100 pt-4">{faq.a}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
        <div className="text-center pt-8">
          <p className="font-body text-gray-500 mb-4">Still have questions?</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">Chat with us on WhatsApp</a>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════
export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await new Promise(r => setTimeout(r, 800))
    setSent(true)
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="bg-gradient-blush py-16 section-padding text-center mb-12">
        <span className="font-accent text-gold text-3xl block mb-2">Say Hello</span>
        <h1 className="font-display text-4xl md:text-5xl text-gray-800">Contact Us</h1>
      </div>
      <div className="section-padding max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Info */}
        <div>
          <h2 className="section-title mb-6">We'd love to hear from you</h2>
          <p className="font-body text-gray-500 text-lg leading-relaxed mb-10">
            Whether you have a question about custom orders, need help planning a corporate gifting campaign, or just want to say hi — reach out!
          </p>
          <div className="space-y-6">
            {[
              { icon: '📍', title: 'Location', detail: 'Nagpur, Maharashtra, India' },
              { icon: '📞', title: 'Call / WhatsApp', detail: '+91 73850 00000' },
              { icon: '✉️', title: 'Email', detail: 'hello@hamperrush.in' },
              { icon: '🕐', title: 'Working Hours', detail: 'Mon–Sat, 10am – 7pm' },
            ].map(c => (
              <div key={c.title} className="flex items-start gap-4">
                <div className="w-11 h-11 bg-gold-pale rounded-xl flex items-center justify-center text-xl flex-shrink-0">{c.icon}</div>
                <div>
                  <p className="font-display text-gray-800">{c.title}</p>
                  <p className="font-sans text-sm text-mink">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-sans font-medium text-sm transition-colors w-fit mt-8">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us Now
          </a>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-card p-8">
          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">💌</div>
              <h3 className="font-display text-2xl text-gray-800 mb-3">Message Received!</h3>
              <p className="font-body text-gray-500">We'll get back to you within 24 hours. Or chat with us on WhatsApp for a faster response!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-display text-2xl text-gray-800 mb-6">Send a Message</h3>
              {[
                { name: 'name', label: 'Your Name *', type: 'text', placeholder: 'Priya Sharma' },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com' },
                { name: 'phone', label: 'Phone Number *', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
              ].map(field => (
                <div key={field.name}>
                  <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">{field.label}</label>
                  <input type={field.type} required={field.label.includes('*')} placeholder={field.placeholder}
                    value={form[field.name]} onChange={e => setForm(p => ({ ...p, [field.name]: e.target.value }))}
                    className="input-luxury" />
                </div>
              ))}
              <div>
                <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">Message *</label>
                <textarea rows={4} required placeholder="Tell us about your gifting needs..."
                  value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="input-luxury resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════
// BULK ORDERS PAGE
// ═══════════════════════════════════════
export function BulkOrdersPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', quantity: '', occasion: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await new Promise(r => setTimeout(r, 800))
    const msg = `Hi Hamper Rush! I'm interested in a Bulk/Corporate Order:\n\n*Company:* ${form.company}\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Quantity:* ${form.quantity}\n*Occasion:* ${form.occasion}\n*Budget per piece:* ${form.budget}\n*Details:* ${form.message}`
    openWhatsAppDirect(msg)
    setSent(true)
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="bg-gray-900 text-white py-20 section-padding text-center mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        <div className="relative">
          <span className="font-accent text-gold text-4xl block mb-2">For Teams & Events</span>
          <h1 className="font-display text-5xl text-white mb-4">Bulk Corporate Orders</h1>
          <p className="font-body text-gray-300 text-lg max-w-xl mx-auto">Premium branded hampers for your clients, team, and events. Starting from just 20 pieces.</p>
        </div>
      </div>

      <div className="section-padding max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="section-title mb-6">Why Corporates Choose Us</h2>
            <div className="space-y-6 mb-10">
              {[
                { icon: '🏷️', title: 'Custom Branding', desc: 'Your logo on packaging, ribbons, and cards. We make your brand shine.' },
                { icon: '📦', title: 'Bulk Discounts', desc: 'Special pricing for 20+ pieces. Better rates as quantity increases.' },
                { icon: '⚡', title: 'On-time Delivery', desc: 'Dedicated account manager and guaranteed delivery timelines.' },
                { icon: '🎯', title: 'Fully Customized', desc: 'Mix and match products, choose themes, add personalized messages.' },
                { icon: '📊', title: 'Easy Invoicing', desc: 'GST invoices, digital payments, and complete order tracking.' },
              ].map(item => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-gold-pale rounded-xl flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-display text-gray-800 text-lg">{item.title}</h4>
                    <p className="font-sans text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-blush rounded-2xl p-6">
              <h3 className="font-display text-xl text-gray-800 mb-4">Pricing Guide</h3>
              {[['20–49 pieces', '5% off'], ['50–99 pieces', '10% off'], ['100–249 pieces', '18% off'], ['250+ pieces', 'Custom quote']].map(([range, discount]) => (
                <div key={range} className="flex justify-between py-2 border-b border-cream-200 last:border-0">
                  <span className="font-sans text-sm text-gray-600">{range}</span>
                  <span className="font-sans text-sm font-medium text-gold">{discount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-card p-8">
            {sent ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🎁</div>
                <h3 className="font-display text-2xl text-gray-800 mb-3">Inquiry Received!</h3>
                <p className="font-body text-gray-500">Our team will contact you within 2 business hours with a custom quote. You'll also receive a WhatsApp message shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-2xl text-gray-800 mb-6">Request a Quote</h3>
                {[
                  { name: 'name', label: 'Contact Name *', placeholder: 'Your name' },
                  { name: 'company', label: 'Company Name *', placeholder: 'Your company' },
                  { name: 'email', label: 'Work Email *', placeholder: 'you@company.com' },
                  { name: 'phone', label: 'Phone *', placeholder: '+91 XXXXX XXXXX' },
                  { name: 'quantity', label: 'Quantity Required *', placeholder: 'e.g. 50 pieces' },
                  { name: 'occasion', label: 'Occasion / Purpose', placeholder: 'e.g. Diwali Gifting, Client Appreciation' },
                  { name: 'budget', label: 'Budget Per Piece', placeholder: 'e.g. ₹1000–2000' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">{field.label}</label>
                    <input required={field.label.includes('*')} placeholder={field.placeholder}
                      value={form[field.name]} onChange={e => setForm(p => ({ ...p, [field.name]: e.target.value }))}
                      className="input-luxury" />
                  </div>
                ))}
                <div>
                  <label className="font-sans text-xs text-gray-600 font-medium mb-1 block uppercase tracking-wide">Additional Requirements</label>
                  <textarea rows={3} placeholder="Any special requirements, branding details..."
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="input-luxury resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full">Request Bulk Quote</button>
                <p className="font-sans text-xs text-mink text-center">We'll respond within 2 business hours via WhatsApp & Email</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
