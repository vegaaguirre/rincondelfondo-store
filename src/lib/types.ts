export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  is_featured: boolean
  is_new: boolean
  is_bestseller: boolean
  stock_quantity: number
  created_at: string
  updated_at: string
}

export interface CartItem {
  product_id: string
  product_name: string
  product_image_url: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  user_id?: string
  stripe_payment_intent_id?: string
  status: string
  total_amount: number
  currency: string
  customer_email?: string
  customer_name?: string
  shipping_address?: any
  billing_address?: any
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price_at_time: number
  product_name: string
  product_image_url?: string
  created_at: string
}

export interface Testimonial {
  id: string
  customer_name: string
  customer_location?: string
  testimonial_text: string
  customer_image_url?: string
  rating: number
  is_featured: boolean
  created_at: string
}

export interface CustomRequest {
  id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  request_description: string
  preferred_colors?: string
  budget_range?: string
  event_date?: string
  status: string
  admin_notes?: string
  created_at: string
  updated_at: string
}

export interface NewsletterSubscription {
  id: string
  email: string
  is_active: boolean
  subscribed_at: string
}