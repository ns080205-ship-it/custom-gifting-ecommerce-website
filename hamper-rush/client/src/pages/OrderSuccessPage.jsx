import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { openWhatsAppDirect } from '../utils/whatsapp'

export default function OrderSuccessPage() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId')
  const method = params.get('method')
  const paymentId = params.get('payment_id')

  useEffect(() => {
    // Confetti-like animation trigger could go here
  }, [])

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-blush flex items-center justify-center">
      <div className="section-padding max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="bg-white rounded-3xl shadow-luxury p-10 text-center"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-5xl">🎁</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <span className="font-accent text-gold text-3xl block mb-2">Thank You!</span>
            <h1 className="font-display text-3xl text-gray-800 mb-3">Order Placed Successfully</h1>
            <p className="font-sans text-sm text-mink mb-6">
              {method === 'cod'
                ? "Your inquiry has been received. Our team will reach out on WhatsApp to confirm your order."
                : "Your payment was successful! We're preparing your hamper with love."}
            </p>

            {orderId && (
              <div className="bg-cream-50 rounded-2xl p-5 mb-8">
                <p className="font-sans text-xs text-mink mb-1">Order Reference</p>
                <p className="font-display text-gold text-2xl">#{orderId}</p>
                {paymentId && <p className="font-sans text-xs text-mink mt-1">Payment ID: {paymentId}</p>}
              </div>
            )}

            <div className="space-y-4 mb-8">
              {[
                { icon: '📱', text: 'We\'ll message you on WhatsApp within 2 hours' },
                { icon: '🎀', text: 'Your hamper will be carefully packed with love' },
                { icon: '🚚', text: 'Tracking details shared once dispatched' },
              ].map(step => (
                <div key={step.text} className="flex items-center gap-3 text-left">
                  <span className="text-xl flex-shrink-0">{step.icon}</span>
                  <span className="font-sans text-sm text-gray-600">{step.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => openWhatsAppDirect(`Hi! I just placed order #${orderId} on Hamper Rush. Can you confirm the status?`)}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-sans font-medium text-sm transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat with us on WhatsApp
              </button>
              <Link to="/shop" className="btn-outline w-full text-center">Continue Shopping</Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
