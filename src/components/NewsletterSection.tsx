import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email }
      })

      if (error) throw error

      setSubscribed(true)
      toast.success('¡Suscripción exitosa!')
      setEmail('')
    } catch (error: any) {
      toast.error(error.message || 'Error al suscribirse')
    } finally {
      setLoading(false)
    }
  }

  if (subscribed) {
    return (
      <section className="py-20 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <CheckCircle className="h-16 w-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">
              ¡Bienvenido a nuestra comunidad!
            </h3>
            <p className="text-pink-100 text-lg mb-8">
              Gracias por suscribirte. Pronto recibirás noticias exclusivas, 
              ofertas especiales y tips sobre el cuidado de flores artesanales.
            </p>
            <button
              onClick={() => setSubscribed(false)}
              className="bg-white text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              Suscribir Otro Email
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-white"
        >
          <Mail className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Únete a Nuestra Comunidad
          </h2>
          <p className="text-pink-100 text-lg mb-8 max-w-3xl mx-auto">
            Recibe noticias exclusivas, ofertas especiales, nuevos diseños y tips 
            para mantener tus flores artesanales siempre hermosas. 
            <strong>¡Sin spam, solo contenido de valor!</strong>
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 min-w-max"
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
            >
              <Send className="h-5 w-5" />
              <span>{loading ? 'Suscribiendo...' : 'Suscribirse'}</span>
            </motion.button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <p className="text-pink-100 text-sm">
            Al suscribirte, aceptas recibir emails de TuFloreríaCreativa. 
            Puedes cancelar tu suscripción en cualquier momento.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">Ofertas Exclusivas</h4>
            <p className="text-pink-100 text-sm">
              Acceso anticipado a descuentos y promociones especiales
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">Nuevos Diseños</h4>
            <p className="text-pink-100 text-sm">
              Sé el primero en conocer nuestras nuevas creaciones
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">Tips y Consejos</h4>
            <p className="text-pink-100 text-sm">
              Consejos de cuidado y decoración con flores artesanales
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}