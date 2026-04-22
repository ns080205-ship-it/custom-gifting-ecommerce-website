import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product, index = 0 }) {
  const { dispatch } = useCart()
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch({ type: 'ADD_ITEM', payload: product })
    toast.success(`${product.name} added to cart! 🎁`, {
      style: { background: '#faf5ec', color: '#4a3728', border: '1px solid #d4a853' }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product._id}`} className="block group">
        <div className="card-luxury overflow-hidden">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.tags?.includes('bestseller') && (
                <span className="bg-gold text-white text-xs font-sans font-medium px-3 py-1 rounded-full">
                  Bestseller
                </span>
              )}
              {product.tags?.includes('new') && (
                <span className="bg-rose-blush text-gray-700 text-xs font-sans font-medium px-3 py-1 rounded-full">
                  New
                </span>
              )}
              {discount && (
                <span className="bg-green-600 text-white text-xs font-sans font-medium px-3 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-white text-gray-800 px-6 py-2 rounded-full text-sm font-sans font-medium hover:bg-gold hover:text-white transition-all shadow-lg translate-y-4 group-hover:translate-y-0 duration-300"
              >
                Add to Cart
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="font-sans text-xs text-mink tracking-wider uppercase mb-1">
              {product.category?.replace(/-/g, ' ')}
            </p>
            <h3 className="font-display text-gray-800 text-lg leading-snug group-hover:text-gold transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="font-sans text-xs text-mink">{product.rating} ({product.reviews})</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 mt-3">
              <span className="font-display text-gold text-xl">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="font-sans text-sm text-gray-400 line-through">
                  ₹{product.originalPrice?.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Delivery */}
            <p className="font-sans text-xs text-green-600 mt-2 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
              </svg>
              Delivery in {product.deliveryDays}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
