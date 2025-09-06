import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Testimonial } from '@/lib/types'

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTestimonials(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getFeaturedTestimonials = () => {
    return testimonials.filter(testimonial => testimonial.is_featured)
  }

  return {
    testimonials,
    loading,
    error,
    fetchTestimonials,
    getFeaturedTestimonials
  }
}