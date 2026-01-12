import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

export default function Hero() {
  const scrollToProducts = () => {
    const element = document.querySelector('#products')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToCustom = () => {
    const element = document.querySelector('#custom')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-rose-200/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-pink-500" />
            <span className="text-pink-600 font-medium tracking-wide uppercase text-sm">TuFloreríaCreativa</span>
            <Sparkles className="h-6 w-6 text-pink-500" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">
              El Rincón del Fondo
            </span>
          </h1>
          
          <h2 className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Flores artesanales de <strong>fomi de alta calidad</strong> que nunca se marchitan. 
            Cada pieza es única, hecha a mano con amor y dedicación para llevar belleza 
            eterna a tus espacios más especiales.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              onClick={scrollToProducts}
              className="bg-gradient-to-r from-pink-600 to-rose-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Ver Colección</span>
              <Heart className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              onClick={scrollToCustom}
              className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Personalizar
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-100">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hecho a Mano con Amor</h3>
            <p className="text-gray-600 text-sm">Cada pieza es única y elaborada cuidadosamente por nuestros artesanos.</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-100">
            <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Materiales Premium</h3>
            <p className="text-gray-600 text-sm">Fomi de la más alta calidad que mantiene su color y forma por siempre.</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-100">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalización</h3>
            <p className="text-gray-600 text-sm">Creamos diseños únicos según tus preferencias y necesidades.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-pink-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block"
      >
        <img
          src="public/RicondelFondo.png"
          alt="Flores artesanales de fomi"
          className="w-96 h-96 object-cover rounded-full shadow-2xl border-8 border-white/50"
        />
      </motion.div>
    </section>
  )
}