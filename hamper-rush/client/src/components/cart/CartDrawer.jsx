import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function CartDrawer({ open, onClose }) {
  const { items, total, dispatch } = useCart()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cream-200">
              <div>
                <h2 className="font-display text-xl text-gray-800">Your Cart</h2>
                <p className="font-sans text-xs text-mink mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-cream-100 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🎁</div>
                  <p className="font-display text-gray-600 text-lg mb-2">Your cart is empty</p>
                  <p className="font-sans text-sm text-mink mb-6">Discover our luxury hamper collections</p>
                  <button onClick={onClose} className="btn-primary">
                    <Link to="/shop">Shop Now</Link>
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 pb-4 border-b border-cream-100"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
                      <img
                        src={item.images?.[0] || '/placeholder.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm text-gray-800 line-clamp-2">{item.name}</h4>
                      {item.customization?.name && (
                        <p className="font-sans text-xs text-mink mt-0.5">For: {item.customization.name}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 border border-cream-300 rounded-full px-2 py-1">
                          <button
                            onClick={() => {
                              if (item.quantity <= 1) dispatch({ type: 'REMOVE_ITEM', payload: item._id })
                              else dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item._id, quantity: item.quantity - 1 } })
                            }}
                            className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gold"
                          >−</button>
                          <span className="font-sans text-xs w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item._id, quantity: item.quantity + 1 } })}
                            className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gold"
                          >+</button>
                        </div>
                        <span className="font-sans font-medium text-gold text-sm">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item._id })}
                      className="text-gray-300 hover:text-red-400 transition-colors self-start mt-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-cream-200 bg-pearl">
                <div className="flex justify-between mb-4">
                  <span className="font-sans text-gray-600">Subtotal</span>
                  <span className="font-display text-gold text-lg">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <p className="font-sans text-xs text-mink mb-4">Shipping calculated at checkout</p>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="btn-primary w-full text-center block"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={onClose}
                  className="w-full text-center font-sans text-sm text-gray-500 hover:text-gold mt-3 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
