import { useState, useEffect, useCallback } from 'react'
import { productsAPI, testimonialsAPI, galleryAPI } from '../utils/api'
import { PRODUCTS, TESTIMONIALS } from '../utils/mockData'

/**
 * useProducts — fetches products from API, falls back to mock data in dev
 */
export function useProducts(params = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const res = await productsAPI.getAll(params)
      setProducts(res.data.products)
    } catch {
      // Fall back to mock data when API not available
      setProducts(PRODUCTS)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(params)])

  useEffect(() => { fetch() }, [fetch])

  return { products, loading, error, refetch: fetch }
}

/**
 * useProduct — fetches single product by id
 */
export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const get = async () => {
      try {
        const res = await productsAPI.getOne(id)
        setProduct(res.data.product)
      } catch {
        setProduct(PRODUCTS.find(p => p._id === id) || null)
      } finally {
        setLoading(false)
      }
    }
    get()
  }, [id])

  return { product, loading }
}

/**
 * useTestimonials — fetches testimonials, falls back to mock
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const get = async () => {
      try {
        const res = await testimonialsAPI.getAll()
        setTestimonials(res.data.testimonials)
      } catch {
        setTestimonials(TESTIMONIALS)
      } finally {
        setLoading(false)
      }
    }
    get()
  }, [])

  return { testimonials, loading }
}

/**
 * useGallery — fetches gallery images
 */
export function useGallery() {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const get = async () => {
      try {
        const res = await galleryAPI.getAll()
        setGallery(res.data.gallery)
      } catch {
        setGallery([])
      } finally {
        setLoading(false)
      }
    }
    get()
  }, [])

  return { gallery, loading }
}

/**
 * useLocalStorage — persisted state
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`useLocalStorage error for key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
