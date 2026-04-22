import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '../utils/mockData'
import ProductCard from '../components/ui/ProductCard'

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('default')
  const [search, setSearch] = useState('')
  const activeCategory = searchParams.get('category') || 'all'

  const filtered = useMemo(() => {
    let arr = [...PRODUCTS]
    if (activeCategory !== 'all') arr = arr.filter(p => p.category === activeCategory)
    if (search) arr = arr.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if (sortBy === 'price-low') arr.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') arr.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') arr.sort((a, b) => b.rating - a.rating)
    return arr
  }, [activeCategory, search, sortBy])

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-blush py-16 section-padding text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="font-accent text-gold text-3xl block mb-2">Our Collection</span>
          <h1 className="font-display text-4xl md:text-5xl text-gray-800">Shop All Hampers</h1>
          <p className="font-body text-gray-500 mt-3 max-w-md mx-auto">Every hamper is made with love and packed with premium quality products.</p>
        </motion.div>
      </div>

      <div className="section-padding max-w-screen-xl mx-auto">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              placeholder="Search hampers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-luxury pl-10 w-64"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="input-luxury w-auto"
          >
            <option value="default">Sort: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          <button
            onClick={() => setSearchParams({})}
            className={`px-5 py-2 rounded-full text-sm font-sans transition-all ${activeCategory === 'all' ? 'bg-gold text-white' : 'bg-white text-gray-600 border border-cream-300 hover:border-gold'}`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ category: cat.id })}
              className={`px-5 py-2 rounded-full text-sm font-sans transition-all ${activeCategory === cat.id ? 'bg-gold text-white' : 'bg-white text-gray-600 border border-cream-300 hover:border-gold'}`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="font-sans text-sm text-mink mb-6">{filtered.length} products found</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎁</div>
            <p className="font-display text-gray-600 text-xl">No products found</p>
            <p className="font-sans text-mink mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
