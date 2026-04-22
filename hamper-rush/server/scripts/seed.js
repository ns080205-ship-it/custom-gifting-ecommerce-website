/**
 * HAMPER RUSH — Database Seeder
 * Run: node server/scripts/seed.js
 * Seeds admin user + sample products into MongoDB
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Product, Admin, Testimonial, Gallery } = require('../models')

const PRODUCTS = [
  {
    name: 'Pink Bliss Bridesmaid Hamper',
    category: 'bridesmaid',
    price: 2499,
    originalPrice: 3200,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80',
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80',
    ],
    description: 'A luxurious curated hamper designed for your beloved bridesmaids. Includes premium skincare, scented candles, personalised accessories and more — all wrapped in our signature blush pink packaging.',
    includes: ['Personalised silk scrunchies', 'Rose quartz roller', 'Scented soy candle', 'Premium chocolate box', 'Custom card'],
    deliveryDays: '5-7 working days',
    customizable: true,
    stock: 50,
    rating: 4.9,
    reviews: 124,
    tags: ['bestseller', 'trending'],
  },
  {
    name: 'Golden Wedding Favour Box',
    category: 'wedding',
    price: 899,
    originalPrice: 1200,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],
    description: 'Elegant wedding favour boxes crafted for your guests. Minimum order 50 pieces. Each box is individually assembled and tied with a satin ribbon.',
    includes: ['Premium dry fruits', 'Personalized name card', 'Satin ribbon', 'Wax seal'],
    deliveryDays: '7-10 working days',
    customizable: true,
    stock: 200,
    rating: 4.8,
    reviews: 89,
    tags: ['bestseller'],
    minQty: 50,
  },
  {
    name: 'Luxury Corporate Gift Set',
    category: 'corporate',
    price: 3499,
    originalPrice: 4200,
    images: ['https://images.unsplash.com/photo-1513201099705-a9746072f3c3?w=600&q=80'],
    description: 'Impress your clients and team with our premium corporate hamper. Logo branding available. Bulk discounts for 20+ pieces.',
    includes: ['Premium dry fruit assortment', 'Branded desk accessories', 'Artisanal teas', 'Company logo packaging', 'Custom message card'],
    deliveryDays: '5-7 working days',
    customizable: true,
    stock: 30,
    rating: 4.7,
    reviews: 56,
    tags: ['new'],
  },
  {
    name: 'Rose Garden Birthday Hamper',
    category: 'birthday',
    price: 1899,
    originalPrice: 2400,
    images: ['https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80'],
    description: 'Make someone\'s birthday unforgettable with this gorgeous hamper filled with treats and luxuries.',
    includes: ['Personalized mug', 'Artisan chocolates', 'Bath & body set', 'Scented candle', 'Birthday card'],
    deliveryDays: '3-5 working days',
    customizable: true,
    stock: 40,
    rating: 4.9,
    reviews: 201,
    tags: ['bestseller', 'trending'],
  },
  {
    name: 'Precious Baby Shower Hamper',
    category: 'baby-shower',
    price: 2799,
    originalPrice: 3500,
    images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80'],
    description: 'Celebrate the arrival of a precious new life with our thoughtfully curated baby shower hamper.',
    includes: ['Organic baby skincare set', 'Soft muslin wraps', 'Customized onesie', 'Baby keepsake book', 'Mommy self-care kit'],
    deliveryDays: '4-6 working days',
    customizable: true,
    stock: 25,
    rating: 4.8,
    reviews: 67,
    tags: ['new'],
  },
  {
    name: 'Diwali Premium Gift Box',
    category: 'festive',
    price: 1499,
    originalPrice: 1900,
    images: ['https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&q=80'],
    description: 'Share the joy of Diwali with our premium festive gift box. Perfect for friends, family and colleagues.',
    includes: ['Assorted mithai', 'Dry fruits in decorative box', 'Diyas & candles', 'Incense set', 'Custom greeting'],
    deliveryDays: '3-5 working days',
    customizable: true,
    stock: 100,
    rating: 4.6,
    reviews: 312,
    tags: ['seasonal', 'trending'],
  },
  {
    name: 'Bespoke Return Gift Set',
    category: 'return-gifts',
    price: 599,
    originalPrice: 799,
    images: ['https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80'],
    description: 'Beautiful return gifts for weddings, poojas and celebrations. Minimum order 25 pieces.',
    includes: ['Customized pouch', 'Dry fruits', 'Incense & diya set', 'Thank you card'],
    deliveryDays: '5-7 working days',
    customizable: true,
    stock: 300,
    rating: 4.7,
    reviews: 145,
    tags: ['bestseller'],
    minQty: 25,
  },
  {
    name: 'Personalised Name Gift Box',
    category: 'personalized',
    price: 1299,
    originalPrice: 1600,
    images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80'],
    description: 'A completely personalised gift box where the recipient\'s name is the star. Perfect for any occasion.',
    includes: ['Name-printed box lid', 'Personalised note card', 'Curated treats', 'Scented candle', 'Keepsake item'],
    deliveryDays: '4-6 working days',
    customizable: true,
    stock: 60,
    rating: 4.9,
    reviews: 98,
    tags: ['trending', 'new'],
  },
]

const TESTIMONIALS_SEED = [
  {
    name: 'Priya Sharma',
    location: 'Nagpur',
    rating: 5,
    text: 'Ordered bridesmaid hampers for my wedding and they were absolutely stunning! Every single guest asked where I got them from. The packaging is so luxurious and everything inside was premium quality.',
    occasion: 'Wedding',
    avatar: 'P',
    approved: true,
  },
  {
    name: 'Meghna Kulkarni',
    location: 'Pune',
    rating: 5,
    text: 'The corporate gift boxes we ordered for our Diwali gifting were a massive hit with our clients! The branding was perfect and delivery was on time. Will definitely reorder.',
    occasion: 'Corporate Gifting',
    avatar: 'M',
    approved: true,
  },
  {
    name: 'Ankita Desai',
    location: 'Mumbai',
    rating: 5,
    text: 'I ordered a birthday hamper for my best friend and she was in tears when she opened it! The personalised message card and the quality of products was exceptional.',
    occasion: 'Birthday',
    avatar: 'A',
    approved: true,
  },
  {
    name: 'Rohini Joshi',
    location: 'Nagpur',
    rating: 5,
    text: 'Beautiful baby shower hamper for my sister. She loved everything in it. The wrapping was so elegant and the delivery was faster than expected. Highly recommend!',
    occasion: 'Baby Shower',
    avatar: 'R',
    approved: true,
  },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing
    await Promise.all([
      Product.deleteMany({}),
      Admin.deleteMany({}),
      Testimonial.deleteMany({}),
    ])
    console.log('🗑  Cleared existing data')

    // Seed admin
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)
    await Admin.create({
      email: process.env.ADMIN_EMAIL || 'admin@hamperrush.in',
      password: hashed,
      name: 'Hamper Rush Admin',
    })
    console.log('👤 Admin seeded — Email:', process.env.ADMIN_EMAIL || 'admin@hamperrush.in')

    // Seed products
    const products = await Product.insertMany(PRODUCTS)
    console.log(`🎁 ${products.length} products seeded`)

    // Seed testimonials
    const testimonials = await Testimonial.insertMany(TESTIMONIALS_SEED)
    console.log(`⭐ ${testimonials.length} testimonials seeded`)

    console.log('\n✅ Database seeded successfully!\n')
    console.log('Admin Login:')
    console.log('  Email:    ', process.env.ADMIN_EMAIL || 'admin@hamperrush.in')
    console.log('  Password: ', process.env.ADMIN_PASSWORD || 'admin123')
    console.log('\nVisit /admin to log in.\n')

    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding failed:', err.message)
    process.exit(1)
  }
}

seed()
