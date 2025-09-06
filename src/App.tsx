import React from 'react'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductsSection from './components/ProductsSection'
import AboutSection from './components/AboutSection'
import TestimonialsSection from './components/TestimonialsSection'
import CustomSection from './components/CustomSection'
import FAQSection from './components/FAQSection'
import NewsletterSection from './components/NewsletterSection'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import './App.css'

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
        
        <Header />
        <main>
          <Hero />
          <ProductsSection />
          <AboutSection />
          <TestimonialsSection />
          <CustomSection />
          <FAQSection />
          <NewsletterSection />
        </main>
        <Footer />
        <CartSidebar />
      </div>
    </CartProvider>
  )
}

export default App