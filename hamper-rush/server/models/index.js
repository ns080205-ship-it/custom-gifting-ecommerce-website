const mongoose = require('mongoose')

// ─── Product ────────────────────────────────────────────────────────────────
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['bridesmaid', 'wedding', 'corporate', 'birthday', 'baby-shower', 'festive', 'personalized', 'return-gifts'],
  },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number },
  images: [{ type: String }],
  description: { type: String, required: true },
  includes: [{ type: String }],
  deliveryDays: { type: String, default: '5-7 working days' },
  customizable: { type: Boolean, default: true },
  stock: { type: Number, default: 100 },
  rating: { type: Number, default: 4.8, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  tags: [{ type: String }],
  minQty: { type: Number, default: 1 },
  active: { type: Boolean, default: true },
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

// ─── Order ────────────────────────────────────────────────────────────────
const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  quantity: Number,
  images: [String],
  customization: {
    name: String,
    theme: String,
    note: String,
    deliveryNotes: String,
    products: [String],
  },
})

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  customer: {
    name: { type: String, required: true },
    email: String,
    phone: { type: String, required: true },
  },
  address: {
    line1: { type: String, required: true },
    city: String,
    state: String,
    pincode: String,
  },
  items: [orderItemSchema],
  subtotal: Number,
  shipping: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['online', 'cod'], default: 'online' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  razorpayPaymentId: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'dispatched', 'delivered', 'cancelled'],
    default: 'pending',
  },
  notes: String,
}, { timestamps: true })

orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = `HR${Date.now().toString().slice(-6)}`
  }
  next()
})

const Order = mongoose.model('Order', orderSchema)

// ─── Testimonial ──────────────────────────────────────────────────────────
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  occasion: String,
  avatar: String,
  approved: { type: Boolean, default: false },
}, { timestamps: true })

const Testimonial = mongoose.model('Testimonial', testimonialSchema)

// ─── Gallery ──────────────────────────────────────────────────────────────
const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: String,
  category: String,
  active: { type: Boolean, default: true },
}, { timestamps: true })

const Gallery = mongoose.model('Gallery', gallerySchema)

// ─── Contact ──────────────────────────────────────────────────────────────
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  message: { type: String, required: true },
  type: { type: String, enum: ['general', 'bulk', 'support'], default: 'general' },
  company: String,
  quantity: String,
  budget: String,
  read: { type: Boolean, default: false },
}, { timestamps: true })

const Contact = mongoose.model('Contact', contactSchema)

// ─── Admin User ───────────────────────────────────────────────────────────
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: 'Admin' },
}, { timestamps: true })

const Admin = mongoose.model('Admin', adminSchema)

module.exports = { Product, Order, Testimonial, Gallery, Contact, Admin }
