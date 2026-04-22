const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const { Product, Order, Testimonial, Gallery, Contact, Admin } = require('../models')
const { protect } = require('../middleware/auth')

const router = express.Router()

// ─── Multer setup ──────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpg|jpeg|png|gif|webp/
    if (allowed.test(path.extname(file.originalname).toLowerCase())) cb(null, true)
    else cb(new Error('Only images allowed'))
  },
})

// ─── Auth ──────────────────────────────────────────────────────────────────
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body
  const admin = await Admin.findOne({ email })
  if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' })
  const match = await bcrypt.compare(password, admin.password)
  if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' })
  const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ success: true, token, admin: { email: admin.email, name: admin.name } })
})

// ─── Products ──────────────────────────────────────────────────────────────
router.get('/products', async (req, res) => {
  const { category, sort, search } = req.query
  let query = { active: true }
  if (category) query.category = category
  if (search) query.name = { $regex: search, $options: 'i' }
  let sortObj = {}
  if (sort === 'price-low') sortObj.price = 1
  else if (sort === 'price-high') sortObj.price = -1
  else if (sort === 'rating') sortObj.rating = -1
  else sortObj.createdAt = -1
  const products = await Product.find(query).sort(sortObj)
  res.json({ success: true, products })
})

router.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' })
  res.json({ success: true, product })
})

router.post('/products', protect, async (req, res) => {
  const product = await Product.create(req.body)
  res.status(201).json({ success: true, product })
})

router.put('/products/:id', protect, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' })
  res.json({ success: true, product })
})

router.delete('/products/:id', protect, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { active: false })
  res.json({ success: true, message: 'Product removed' })
})

// ─── Orders ────────────────────────────────────────────────────────────────
router.post('/orders', async (req, res) => {
  const { customer, address, items, subtotal, shipping, total, paymentMethod, razorpayPaymentId, notes } = req.body
  const order = await Order.create({
    customer, address, items, subtotal, shipping, total, paymentMethod,
    razorpayPaymentId,
    paymentStatus: razorpayPaymentId ? 'paid' : 'pending',
    notes,
  })
  res.status(201).json({ success: true, order })
})

router.get('/orders', protect, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 })
  res.json({ success: true, orders })
})

router.get('/orders/:id', protect, async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.id })
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' })
  res.json({ success: true, order })
})

router.put('/orders/:id/status', protect, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' })
  res.json({ success: true, order })
})

// ─── Testimonials ──────────────────────────────────────────────────────────
router.get('/testimonials', async (req, res) => {
  const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 })
  res.json({ success: true, testimonials })
})

router.post('/testimonials', async (req, res) => {
  const t = await Testimonial.create(req.body)
  res.status(201).json({ success: true, testimonial: t })
})

router.put('/testimonials/:id/approve', protect, async (req, res) => {
  const t = await Testimonial.findByIdAndUpdate(req.params.id, { approved: true }, { new: true })
  res.json({ success: true, testimonial: t })
})

router.delete('/testimonials/:id', protect, async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id)
  res.json({ success: true, message: 'Testimonial deleted' })
})

// ─── Gallery ───────────────────────────────────────────────────────────────
router.get('/gallery', async (req, res) => {
  const gallery = await Gallery.find({ active: true }).sort({ createdAt: -1 })
  res.json({ success: true, gallery })
})

router.post('/gallery', protect, upload.single('image'), async (req, res) => {
  const url = `/uploads/${req.file.filename}`
  const item = await Gallery.create({ url, caption: req.body.caption, category: req.body.category })
  res.status(201).json({ success: true, item })
})

router.delete('/gallery/:id', protect, async (req, res) => {
  await Gallery.findByIdAndUpdate(req.params.id, { active: false })
  res.json({ success: true })
})

// ─── Contact ───────────────────────────────────────────────────────────────
router.post('/contact', async (req, res) => {
  const inquiry = await Contact.create(req.body)
  res.status(201).json({ success: true, inquiry })
})

router.get('/contact', protect, async (req, res) => {
  const inquiries = await Contact.find().sort({ createdAt: -1 })
  res.json({ success: true, inquiries })
})

// ─── Upload ────────────────────────────────────────────────────────────────
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })
  res.json({ success: true, url: `/uploads/${req.file.filename}` })
})

module.exports = router
