import { useEffect } from 'react'
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
import { Toaster } from 'react-hot-toast'
import { initGA, trackPageView } from './lib/analytics'

function App() {
  // Inicializa Google Analytics cuando la aplicación se carga
  useEffect(() => {
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      initGA()
      // Rastrea la primera vista de página
      trackPageView(window.location.pathname + window.location.search)
    }
  }, [])

  // NOTA: Si en el futuro añades un router (como react-router-dom),
  // necesitarás un efecto adicional para rastrear las vistas de página en cada cambio de ruta.

  return (
    <CartProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: '#333', color: '#fff' },
          success: { style: { background: '#10b981' } },
          error: { style: { background: '#ef4444' } },
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
    </CartProvider>
  )
}

export default App