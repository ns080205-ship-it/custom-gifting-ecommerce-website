import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { WHATSAPP_LINK } from '../../utils/whatsapp'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-rose-blush to-champagne py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="font-accent text-gold text-3xl block mb-2">Stay in the loop</span>
          <p className="font-body text-gray-700 mb-6">Get exclusive offers, new collection launches & gifting inspiration.</p>
          <form className="flex gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 input-luxury text-sm"
            />
            <button type="submit" className="btn-primary whitespace-nowrap text-xs px-6">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <span className="font-accent text-gold text-4xl block mb-2">Hamper Rush</span>
          <p className="font-sans text-xs tracking-[0.2em] text-gray-500 uppercase mb-4">Luxury Gifting — Nagpur</p>
          <p className="font-body text-gray-400 text-sm leading-relaxed">
            Crafting luxury personalised hampers with love for your most cherished moments. From weddings to birthdays, we make gifting unforgettable.
          </p>
          <div className="flex gap-4 mt-6">
            {['instagram', 'facebook', 'youtube'].map(social => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-gray-500"
                aria-label={social}
              >
                {social === 'instagram' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                )}
                {social === 'facebook' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )}
                {social === 'youtube' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-white text-lg mb-6">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { to: '/shop', label: 'Shop All' },
              { to: '/customize', label: 'Build Your Hamper' },
              { to: '/bulk-orders', label: 'Bulk Corporate Orders' },
              { to: '/gallery', label: 'Gallery' },
              { to: '/about', label: 'About Us' },
              { to: '/testimonials', label: 'Testimonials' },
              { to: '/faq', label: 'FAQs' },
            ].map(link => (
              <li key={link.to}>
                <Link to={link.to} className="font-sans text-sm text-gray-400 hover:text-gold transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-display text-white text-lg mb-6">Collections</h4>
          <ul className="space-y-3">
            {[
              'Bridesmaid Hampers', 'Wedding Hampers', 'Corporate Gifts',
              'Birthday Hampers', 'Baby Shower', 'Festive Gifts', 'Return Gifts'
            ].map(cat => (
              <li key={cat}>
                <Link to={`/shop?category=${cat.toLowerCase().replace(/ /g, '-')}`} className="font-sans text-sm text-gray-400 hover:text-gold transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-white text-lg mb-6">Get In Touch</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-gold mt-0.5">📍</span>
              <p className="font-sans text-sm text-gray-400">Nagpur, Maharashtra, India</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gold mt-0.5">📞</span>
              <a href="tel:+917385000000" className="font-sans text-sm text-gray-400 hover:text-gold">+91 73850 00000</a>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gold mt-0.5">✉️</span>
              <a href="mailto:hello@hamperrush.in" className="font-sans text-sm text-gray-400 hover:text-gold">hello@hamperrush.in</a>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-sans mt-4 hover:bg-green-700 transition-colors w-fit"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600 font-sans">
          <p>© {currentYear} Hamper Rush. All rights reserved. Made with 💛 in Nagpur.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold">Terms & Conditions</Link>
            <Link to="/refund" className="hover:text-gold">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
