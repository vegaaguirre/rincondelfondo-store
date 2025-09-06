import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Heart, Send, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function CustomSection() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    requestDescription: '',
    preferredColors: '',
    budgetRange: '',
    eventDate: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.functions.invoke('custom-request', {
        body: formData
      })

      if (error) throw error

      setSubmitted(true)
      toast.success('¡Solicitud enviada con éxito!')
      
      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        requestDescription: '',
        preferredColors: '',
        budgetRange: '',
        eventDate: ''
      })
    } catch (error: any) {
      toast.error(error.message || 'Error al enviar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="custom" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-8"
          >
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              ¡Solicitud Enviada con Éxito!
            </h3>
            <p className="text-green-700 mb-6">
              Gracias por tu interés en nuestras creaciones personalizadas. 
              Nos pondremos en contacto contigo en las próximas 24 horas para 
              discutir los detalles de tu proyecto.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
            >
              Enviar Otra Solicitud
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="custom" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ¿Quieres algo{' '}
            <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              personalizado?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Creamos diseños únicos según tus preferencias. Cada proyecto personalizado 
            es una nueva oportunidad de crear algo verdaderamente especial para ti.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">¿Qué podemos personalizar?</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Palette className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Colores y Combinaciones</h4>
                    <p className="text-gray-600 text-sm">
                      Elige los colores perfectos que combinen con tu decoración o evento especial.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Tamaños y Formas</h4>
                    <p className="text-gray-600 text-sm">
                      Desde arreglos íntimos hasta composiciones grandes para eventos especiales.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Send className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Ocasiones Especiales</h4>
                    <p className="text-gray-600 text-sm">
                      Bodas, cumpleaños, aniversarios, graduaciones y cualquier momento especial.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-2xl p-8">
              <h4 className="text-xl font-bold mb-4">Proceso de Personalización</h4>
              <ul className="space-y-3 text-pink-100">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Envías tu solicitud con detalles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Te contactamos en 24 horas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Diseñamos tu propuesta personalizada</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Creamos tu pieza única</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Solicitar Presupuesto</h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Tu número de teléfono"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción del proyecto *
                  </label>
                  <textarea
                    name="requestDescription"
                    value={formData.requestDescription}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Describe detalladamente lo que necesitas: tipo de flores, ocasión, estilo, etc."
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Colores preferidos
                    </label>
                    <input
                      type="text"
                      name="preferredColors"
                      value={formData.preferredColors}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="Ej: Rosa, blanco, dorado"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Presupuesto aproximado
                    </label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona un rango</option>
                      <option value="$20-50">$20 - $50 USD</option>
                      <option value="$50-100">$50 - $100 USD</option>
                      <option value="$100-200">$100 - $200 USD</option>
                      <option value="$200+">$200+ USD</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha del evento (opcional)
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-500 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  <Send className="h-5 w-5" />
                  <span>{loading ? 'Enviando...' : 'Solicitar Presupuesto'}</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}