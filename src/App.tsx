import { useEffect } from 'react'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductsSection from './components/ProductsSection'
import AboutSection from './components/AboutSection'
import { Toaster } from 'react-hot-toast'
import { initGA, trackPageView } from './lib/analytics'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import AddProductPage from './pages/admin/AddProductPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  // Inicializa Google Analytics cuando la aplicación se carga
  useEffect(() => {
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      initGA()
      // Rastrea la primera vista de página
      trackPageView(window.location.pathname + window.location.search)
    }
  }, [])

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
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute>
                <AddProductPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App