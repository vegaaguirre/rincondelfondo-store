import { motion } from 'framer-motion'
import { Star, Plus, ShoppingCart, Tag } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import { Product } from '@/lib/types'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      product_id: product.id,
      product_name: product.name,
      product_image_url: product.image_url,
      price: product.price,
      quantity: 1
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Product Tags */}
        <div className="absolute top-4 left-4 space-y-2">
          {product.is_new && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Tag className="h-3 w-3" />
              <span>¡Nuevo!</span>
            </span>
          )}
          {product.is_bestseller && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>Más vendido</span>
            </span>
          )}
        </div>

        {/* Add to Cart Button - Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            onClick={handleAddToCart}
            className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Añadir al Carrito</span>
          </motion.button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-pink-600">${product.price}</span>
            <span className="text-gray-500 text-sm">MXN</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors lg:hidden"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {product.category && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function ProductsSection() {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestras Creaciones</h2>
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-96"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Error al cargar productos: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestras <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">Creaciones</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cada flor es una obra de arte única, elaborada con materiales de primera calidad 
            y técnicas artesanales perfeccionadas a lo largo de los años.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay productos disponibles en este momento.</p>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => {
              const element = document.querySelector('#custom')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="bg-gradient-to-r from-pink-600 to-rose-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Ver Todos los Productos
          </button>
        </motion.div>
      </div>
    </section>
  )
}