import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CATEGORIES, PRODUCTS, TESTIMONIALS, FAQS } from '../utils/mockData'
import ProductCard from '../components/ui/ProductCard'
import { openWhatsAppDirect, WHATSAPP_LINK } from '../utils/whatsapp'
import { useState } from 'react'

// ——— Hero ———
function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-rose-light/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-light/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-champagne/30 rounded-full blur-2xl" />

      <div className="section-padding max-w-screen-xl mx-auto w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="badge-gold inline-block mb-6">✨ Nagpur's Luxury Gifting Brand</span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-gray-800 leading-[1.1] mb-4">
                Luxury Hampers
                <br />
                <em className="text-gradient-gold not-italic">Crafted With</em>
                <br />
                <span className="font-accent text-6xl md:text-7xl lg:text-8xl text-rose-deep">Love</span>
              </h1>
              <p className="font-body text-gray-600 text-lg md:text-xl leading-relaxed mt-6 mb-10 max-w-lg">
                Personalised luxury hampers for weddings, birthdays, corporate events and every celebration that deserves something truly special.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="btn-primary">Shop Now</Link>
                <Link to="/customize" className="btn-outline">Customize Yours →</Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-cream-300">
                {[
                  { num: '2000+', label: 'Happy Customers' },
                  { num: '500+', label: 'Weddings Served' },
                  { num: '4.9★', label: 'Average Rating' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="font-display text-2xl text-gold">{stat.num}</div>
                    <div className="font-sans text-xs text-mink tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="w-80 h-96 rounded-3xl overflow-hidden shadow-2xl ml-auto">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80"
                  alt="Luxury hamper"
                  className="w-full h-full object-cover animate-float"
                />
              </div>
              <div className="absolute -left-8 top-1/4 w-56 h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80"
                  alt="Gift box"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 right-8 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
                  alt="Hamper detail"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute top-4 -left-4 bg-white rounded-2xl shadow-luxury p-4 flex items-center gap-3"
              >
                <span className="text-2xl">🎁</span>
                <div>
                  <div className="font-display text-sm text-gray-800">Custom Made</div>
                  <div className="font-sans text-xs text-mink">for every moment</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-sans text-xs text-mink tracking-wider">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  )
}

// ——— Categories ———
function Categories() {
  const featured = CATEGORIES.slice(0, 6)
  return (
    <section className="py-20 section-padding max-w-screen-xl mx-auto">
      <div className="text-center mb-14">
        <span className="section-subtitle block mb-3">Collections</span>
        <h2 className="section-title">Shop By Occasion</h2>
        <div className="gold-divider" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {featured.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={`/shop?category=${cat.id}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-card text-center"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform"
                style={{ backgroundColor: cat.color }}
              >
                {cat.emoji}
              </div>
              <span className="font-sans text-sm text-gray-700 group-hover:text-gold font-medium leading-tight">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ——— Best Sellers ———
function BestSellers() {
  const bestsellers = PRODUCTS.filter(p => p.tags?.includes('bestseller')).slice(0, 4)
  return (
    <section className="py-20 bg-pearl">
      <div className="section-padding max-w-screen-xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-subtitle block mb-3">Most Loved</span>
          <h2 className="section-title">Our Bestsellers</h2>
          <div className="gold-divider" />
          <p className="font-body text-gray-500 mt-4 max-w-md mx-auto">
            Hampers that our customers keep coming back for — and gifting to everyone they love.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((p, i) => (
            <ProductCard key={p._id} product={p} index={i} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/shop" className="btn-outline">View All Products</Link>
        </div>
      </div>
    </section>
  )
}

// ——— Why Choose Us ———
function WhyUs() {
  const reasons = [
    { icon: '🤲', title: 'Handcrafted With Love', desc: 'Every hamper is assembled by hand with meticulous care and attention to detail.' },
    { icon: '✍️', title: 'Fully Personalised', desc: 'Custom names, messages, themes and product selections — tailored just for your recipient.' },
    { icon: '📦', title: 'Premium Packaging', desc: 'Our signature packaging is as luxurious as the hamper inside — gift-ready, always.' },
    { icon: '⚡', title: 'Fast Delivery', desc: 'Pan-India delivery with real-time WhatsApp updates so you\'re never left wondering.' },
    { icon: '💬', title: 'Dedicated Support', desc: 'Our team is available on WhatsApp to help you create the perfect gift, every time.' },
  ]

  return (
    <section className="py-20 section-padding max-w-screen-xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="section-subtitle block mb-3">Why Hamper Rush?</span>
          <h2 className="section-title mb-6">The Luxury Gifting Experience You Deserve</h2>
          <p className="font-body text-gray-500 text-lg leading-relaxed mb-10">
            We believe every gift should tell a story. At Hamper Rush, we pour our hearts into creating hampers that your loved ones will never forget.
          </p>
          <div className="space-y-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gold-pale rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {r.icon}
                </div>
                <div>
                  <h4 className="font-display text-gray-800 text-lg">{r.title}</h4>
                  <p className="font-sans text-sm text-gray-500 mt-1 leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-64 rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1513201099705-a9746072f3c3?w=400&q=80" className="w-full h-full object-cover" alt="Luxury packaging" />
              </div>
              <div className="h-40 rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&q=80" className="w-full h-full object-cover" alt="Gift ribbons" />
              </div>
            </div>
            <div className="space-y-4 pt-10">
              <div className="h-40 rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80" className="w-full h-full object-cover" alt="Personalized gift" />
              </div>
              <div className="h-64 rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80" className="w-full h-full object-cover" alt="Hamper contents" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ——— Build Your Hamper CTA ———
function BuildHamper() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="section-padding max-w-screen-xl mx-auto relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-accent text-gold text-4xl block mb-4">Something truly unique</span>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
            Build Your Own<br />Dream Hamper
          </h2>
          <p className="font-body text-gray-400 text-lg max-w-xl mx-auto mb-10">
            Choose every element — the products, the theme, the packaging, the personal message. We'll bring your vision to life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/customize" className="btn-primary">Start Customizing →</Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full text-sm font-sans font-medium tracking-widest uppercase transition-all"
            >
              💬 Discuss on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ——— Testimonials ———
function Testimonials() {
  return (
    <section className="py-20 bg-gradient-blush">
      <div className="section-padding max-w-screen-xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-subtitle block mb-3">Love Notes</span>
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card"
            >
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-gold text-sm">★</span>
                ))}
              </div>
              <p className="font-body text-gray-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3 border-t border-cream-100 pt-4">
                <div className="w-10 h-10 bg-gold-light rounded-full flex items-center justify-center font-display text-gold font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-display text-gray-800 text-sm">{t.name}</p>
                  <p className="font-sans text-xs text-mink">{t.occasion} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/testimonials" className="btn-outline">Read More Reviews</Link>
        </div>
      </div>
    </section>
  )
}

// ——— FAQ Preview ———
function FAQPreview() {
  const [open, setOpen] = useState(null)
  const preview = FAQS.slice(0, 4)

  return (
    <section className="py-20 section-padding max-w-screen-xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <span className="section-subtitle block mb-3">Got Questions?</span>
          <h2 className="section-title mb-4">Frequently Asked</h2>
          <div className="w-16 h-0.5 bg-gold mb-6" />
          <p className="font-body text-gray-500 text-lg mb-8">
            Everything you need to know about our hampers, customization, delivery and more.
          </p>
          <Link to="/faq" className="btn-primary">View All FAQs</Link>
        </div>
        <div className="space-y-4">
          {preview.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-cream-300 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-start gap-4 p-5 text-left bg-white hover:bg-cream-50 transition-colors"
              >
                <span className="font-display text-gray-800 text-base">{faq.q}</span>
                <span className={`text-gold transition-transform duration-300 flex-shrink-0 mt-0.5 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="bg-cream-50 px-5 pb-5"
                >
                  <p className="font-body text-gray-600 text-sm leading-relaxed pt-4 border-t border-cream-200">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ——— Final CTA ———
function FinalCTA() {
  return (
    <section className="py-16 bg-rose-light">
      <div className="section-padding max-w-screen-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-accent text-gold text-5xl block mb-4">Ready to make someone smile?</span>
          <p className="font-body text-gray-600 text-lg mb-8">
            Let us help you create a gift they'll remember forever.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/shop" className="btn-primary">Shop Hampers</Link>
            <button
              onClick={() => openWhatsAppDirect("Hi! I'd like to order a custom hamper from Hamper Rush. Can you help me?")}
              className="btn-blush"
            >
              💬 WhatsApp Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Categories />
      <BestSellers />
      <WhyUs />
      <BuildHamper />
      <Testimonials />
      <FAQPreview />
      <FinalCTA />
    </div>
  )
}
