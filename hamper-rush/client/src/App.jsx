import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingWhatsApp from './components/layout/FloatingWhatsApp'
import MobileStickyBar from './components/layout/MobileStickyBar'

import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CustomizePage from './pages/CustomizePage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'
import {
  AboutPage,
  GalleryPage,
  FAQPage,
  TestimonialsPage,
  ContactPage,
  BulkOrdersPage,
} from './pages/OtherPages'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* Admin — no layout */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Public routes with layout */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/shop" element={<Layout><ShopPage /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductPage /></Layout>} />
          <Route path="/customize" element={<Layout><CustomizePage /></Layout>} />
          <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
          <Route path="/order-success" element={<Layout><OrderSuccessPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
          <Route path="/testimonials" element={<Layout><TestimonialsPage /></Layout>} />
          <Route path="/faq" element={<Layout><FAQPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/bulk-orders" element={<Layout><BulkOrdersPage /></Layout>} />
          <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
