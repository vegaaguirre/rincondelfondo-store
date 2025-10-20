import Header from '../components/Header'
import Hero from '../components/Hero'
import ProductsSection from '../components/ProductsSection'
import AboutSection from '../components/AboutSection'
import TestimonialsSection from '../components/TestimonialsSection'
import CustomSection from '../components/CustomSection'
import FAQSection from '../components/FAQSection'
import NewsletterSection from '../components/NewsletterSection'
import Footer from '../components/Footer'
import CartSidebar from '../components/CartSidebar'

export default function HomePage() {
  return (
    <>
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
    </>
  )
}
