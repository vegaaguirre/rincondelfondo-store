import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Product } from '@/lib/types'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    console.log('Fetching products...')
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (error) throw error
      return data
    } catch (err: any) {
      console.error('Error fetching product:', err.message)
      return null
    }
  }

  const getFeaturedProducts = () => {
    return products.filter(product => product.is_featured)
  }

  const getNewProducts = () => {
    return products.filter(product => product.is_new)
  }

  const getBestsellerProducts = () => {
    return products.filter(product => product.is_bestseller)
  }

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category)
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    getFeaturedProducts,
    getNewProducts,
    getBestsellerProducts,
    getProductsByCategory
  }
}