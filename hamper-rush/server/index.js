require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const connectDB = require('./config/db')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://hamperrush.in' : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ─── Static files ─────────────────────────────────────────────────────────
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
app.use('/uploads', express.static(uploadsDir))

// ─── Routes ───────────────────────────────────────────────────────────────
app.use('/api', routes)

// ─── Health ───────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: '🎁 Hamper Rush API is live!', timestamp: new Date() })
})

// ─── Error handler ────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({ success: false, message: err.message || 'Internal Server Error' })
})

// ─── Start ────────────────────────────────────────────────────────────────
const start = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`\n🚀 Hamper Rush Server running on port ${PORT}`)
    console.log(`📡 API: http://localhost:${PORT}/api`)
    console.log(`💾 DB:  ${process.env.MONGODB_URI}\n`)
  })
  await seedAdmin()
}

// ─── Seed admin ───────────────────────────────────────────────────────────
const seedAdmin = async () => {
  try {
    const { Admin } = require('./models')
    const bcrypt = require('bcryptjs')
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL })
    if (!existing) {
      const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)
      await Admin.create({ email: process.env.ADMIN_EMAIL || 'admin@hamperrush.in', password: hashed, name: 'Hamper Rush Admin' })
      console.log('✅ Admin user seeded')
    }
  } catch (e) {
    console.log('Admin seed skipped:', e.message)
  }
}

start().catch(console.error)
