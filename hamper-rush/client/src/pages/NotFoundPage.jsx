import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-blush flex items-center justify-center">
      <div className="section-padding text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-accent text-gold text-9xl mb-4">404</div>
          <h1 className="font-display text-4xl text-gray-800 mb-4">Page Not Found</h1>
          <p className="font-body text-gray-500 text-lg mb-10">
            Looks like this page went on a gifting trip and forgot to come back!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <Link to="/shop" className="btn-outline">Browse Hampers</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
