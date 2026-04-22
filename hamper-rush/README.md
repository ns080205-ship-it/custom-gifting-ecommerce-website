# 🎁 Hamper Rush — Luxury Gifting eCommerce Platform

**A full-stack premium gifting/hamper eCommerce website built for Nagpur, India.**

---

## ✨ Features

- **Premium UI** — Playfair Display + Cormorant Garamond typography, blush pink/gold palette, Framer Motion animations
- **Hybrid Ordering Flow** — Online payment (Razorpay) + COD inquiry + WhatsApp auto-redirect
- **Full Customization** — 4-step hamper builder with name, theme, note, product selection
- **WhatsApp Integration** — Floating button, auto order message, product inquiry, COD confirmation
- **14 Pages** — Home, Shop, Product, Customize, Cart, Checkout, Order Success, About, Gallery, Testimonials, FAQ, Contact, Bulk Orders, Admin
- **Admin Dashboard** — Login, manage products/orders/testimonials/gallery
- **Mobile-first** — Sticky cart, floating WhatsApp, responsive on all devices
- **REST API** — Node.js + Express + MongoDB backend

---

## 🗂 Project Structure

```
hamper-rush/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/       # Navbar, Footer, FloatingWhatsApp
│   │   │   ├── ui/           # ProductCard
│   │   │   └── cart/         # CartDrawer
│   │   ├── context/          # CartContext
│   │   ├── pages/            # All 14 pages
│   │   └── utils/            # API, WhatsApp, mock data
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── config/               # DB connection
│   ├── models/               # MongoDB schemas
│   ├── middleware/            # JWT auth
│   ├── routes/               # All API routes
│   └── index.js              # Entry point
│
└── package.json              # Root (concurrently)
```

---

## 🚀 Quick Setup

### 1. Clone & Install

```bash
git clone <your-repo>
cd hamper-rush
npm run install:all
```

### 2. Configure Environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hamper-rush
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_RAZORPAY_SECRET
ADMIN_EMAIL=admin@hamperrush.in
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

### 3. Set Up MongoDB

Install and start MongoDB locally, or use [MongoDB Atlas](https://cloud.mongodb.com) (free):
```bash
# Local MongoDB
brew services start mongodb-community  # macOS
# OR use MongoDB Atlas URI in .env
```

### 4. Configure WhatsApp Number

Open `client/src/utils/whatsapp.js` and replace:
```js
const WHATSAPP_NUMBER = '917385000000' // Your actual number with country code
```

### 5. Configure Razorpay

1. Sign up at [razorpay.com](https://razorpay.com)
2. Get test API keys from Dashboard → Settings → API Keys
3. Add to `server/.env`
4. Add to `client/src/pages/CheckoutPage.jsx` (replace `rzp_test_YOUR_KEY_HERE`)
5. Add Razorpay script to `client/index.html`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### 6. Run Development

```bash
# From root directory
npm run dev

# This runs both simultaneously:
# Frontend: http://localhost:5173
# Backend:  http://localhost:5000
```

---

## 🔑 Admin Access

- URL: `http://localhost:5173/admin`
- Email: `admin@hamperrush.in`
- Password: `admin123`

**Change these in production!**

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | — | Get all products |
| GET | `/api/products/:id` | — | Get single product |
| POST | `/api/products` | ✅ | Create product |
| PUT | `/api/products/:id` | ✅ | Update product |
| DELETE | `/api/products/:id` | ✅ | Delete product |

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | — | Create order |
| GET | `/api/orders` | ✅ | Get all orders |
| GET | `/api/orders/:id` | ✅ | Get order by ID |
| PUT | `/api/orders/:id/status` | ✅ | Update status |

### Testimonials
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/testimonials` | — | Get approved |
| POST | `/api/testimonials` | — | Submit (pending) |
| PUT | `/api/testimonials/:id/approve` | ✅ | Approve |
| DELETE | `/api/testimonials/:id` | ✅ | Delete |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/gallery` | Gallery management |
| POST | `/api/contact` | Contact inquiry |
| POST | `/api/upload` | Upload image |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary font | Playfair Display |
| Body font | Cormorant Garamond |
| Sans font | DM Sans |
| Accent font | Great Vibes |
| Gold | `#d4a853` |
| Blush | `#fde8e8` |
| Cream | `#fdfbf7` |
| Rose Deep | `#e8a0a0` |

---

## 📦 WhatsApp Auto-Message Format

When an order is placed, the customer is automatically redirected to WhatsApp with:

```
🎁 New Order — Hamper Rush

🔖 Order ID: #HR001234
👤 Customer: Priya Sharma
📞 Phone: +91 98765 43210
📍 Address: 42, MG Road, Nagpur — 440001

🛍️ Items:
• Pink Bliss Bridesmaid Hamper x2 — ₹4,998

💰 Total: ₹4,998
💳 Payment: Online Payment

📝 Customization:
• Name: Ankita
• Theme: Blush Pink
• Note: Happy Wedding!

Please confirm my order. Thank you! 🙏
```

---

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/DigitalOcean)
```bash
cd server
# Set environment variables in your hosting provider
# Start with: node index.js
```

### Environment Variables for Production
- Change `JWT_SECRET` to a strong random string
- Use MongoDB Atlas URI
- Switch to Razorpay live keys
- Update CORS origin to your domain

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Routing | React Router v6 |
| State | Context API + useReducer |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT |
| Payments | Razorpay |
| Notifications | react-hot-toast |
| File Upload | Multer |

---

## 📞 Support

Built for **Hamper Rush** — Nagpur, India  
Made with 💛 for luxury gifting experiences

For customization or technical support, feel free to reach out.
