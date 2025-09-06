import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useTestimonials } from '@/hooks/useTestimonials'
import { Testimonial } from '@/lib/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <Quote className="h-8 w-8 text-pink-400 mr-3" />
        <div className="flex items-center space-x-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      
      <p className="text-gray-700 leading-relaxed mb-6 italic">
        "{testimonial.testimonial_text}"
      </p>
      
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center overflow-hidden mr-4">
          {testimonial.customer_image_url ? (
            <img
              src={testimonial.customer_image_url}
              alt={testimonial.customer_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-lg">
              {testimonial.customer_name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.customer_name}</h4>
          {testimonial.customer_location && (
            <p className="text-sm text-gray-600">{testimonial.customer_location}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const { testimonials, loading, error } = useTestimonials()

  if (loading) {
    return (
      <section id="testimonials" className="py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
            <div className="animate-pulse">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-64"></div>
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
      <section id="testimonials" className="py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Error al cargar testimonios: {error}</p>
        </div>
      </section>
    )
  }

  const featuredTestimonials = testimonials.filter(t => t.is_featured).slice(0, 3)
  const allTestimonials = testimonials.slice(0, 6)
  const displayTestimonials = featuredTestimonials.length >= 3 ? featuredTestimonials : allTestimonials

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros{' '}
            <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              clientes
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa. 
            Cada testimonio refleja la calidad y el amor que ponemos en cada creación.
          </p>
        </motion.div>

        {displayTestimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay testimonios disponibles en este momento.</p>
          </div>
        )}

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-yellow-400 fill-current" />
                <span className="text-3xl font-bold text-gray-900 ml-2">4.9</span>
              </div>
              <p className="text-gray-600 font-medium">Calificación Promedio</p>
              <p className="text-sm text-gray-500 mt-1">Basado en {testimonials.length} reseñas</p>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">98%</div>
              <p className="text-gray-600 font-medium">Clientes Satisfechos</p>
              <p className="text-sm text-gray-500 mt-1">Recomiendan nuestro servicio</p>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">24h</div>
              <p className="text-gray-600 font-medium">Tiempo de Respuesta</p>
              <p className="text-sm text-gray-500 mt-1">Para consultas y cotizaciones</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para ser nuestro próximo cliente satisfecho?
            </h3>
            <p className="text-pink-100 mb-6">
              Únete a cientos de clientes que ya disfrutan de la belleza eterna de nuestras flores artesanales.
            </p>
            <button
              onClick={() => {
                const element = document.querySelector('#products')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              Explorar Productos
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}