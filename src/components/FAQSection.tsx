import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: '¿De qué material están hechas las flores?',
    answer: 'Nuestras flores están elaboradas con fomi de la más alta calidad, utilizando pigmentos resistentes que mantienen su color vibrante por años. El fomi es un material duradero, flexible y completamente seguro.'
  },
  {
    question: '¿Cuánto tiempo duran las flores artesanales?',
    answer: 'A diferencia de las flores naturales, nuestras creaciones de fomi duran para siempre. No se marchitan, no necesitan agua y mantienen su belleza intacta indefinidamente con el cuidado adecuado.'
  },
  {
    question: '¿Cómo debo cuidar mis flores de fomi?',
    answer: 'El cuidado es muy sencillo: simplemente limpia con un paño suave y seco para quitar el polvo. Evita la exposición directa al sol por periodos prolongados y manténlas en lugares secos. No necesitan agua ni ningún cuidado especial.'
  },
  {
    question: '¿Puedo personalizar el color y diseño?',
    answer: 'Por supuesto. Ofrecemos un servicio completo de personalización donde puedes elegir colores, tamaños, tipos de flores y arreglos según tus preferencias. Contacta con nosotros para discutir tu proyecto personalizado.'
  },
  {
    question: '¿Cuál es el tiempo de entrega?',
    answer: 'Para productos en stock, el tiempo de entrega es de 3-5 días hábiles. Para proyectos personalizados, el tiempo varía entre 7-14 días dependiendo de la complejidad del diseño. Te informaremos el tiempo exacto al confirmar tu pedido.'
  },
  {
    question: '¿Hacen envíos a toda la República Mexicana?',
    answer: 'Sí, realizamos envíos a todo México. Nuestros principales mercados son Ciudad de México, Guadalajara y Monterrey, pero llegamos a cualquier parte del país. Los costos de envío se calculan según la ubicación y el tamaño del pedido.'
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito y débito a través de nuestra plataforma segura de pagos en línea. Todos los pagos son procesados de forma segura y encriptada para proteger tu información.'
  },
  {
    question: '¿Ofrecen garantía en sus productos?',
    answer: 'Sí, ofrecemos garantía de satisfacción. Si no estás completamente satisfecho con tu compra, contáctanos dentro de los primeros 7 días y encontraremos una solución que funcione para ti.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-pink-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Preguntas Frecuentes sobre Nuestras{' '}
              <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                Flores Artesanales
              </span>
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestras flores artesanales, 
            procesos y servicios.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-pink-50 transition-colors duration-200 focus:outline-none focus:bg-pink-50"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-gray-600 mb-6">
              Estamos aquí para ayudarte. Contáctanos directamente y resolveremos 
              cualquier duda que tengas sobre nuestros productos y servicios.
            </p>
            <button
              onClick={() => {
                const element = document.querySelector('#contact')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-gradient-to-r from-pink-600 to-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Contactar Soporte
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}