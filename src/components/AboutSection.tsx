import { motion } from 'framer-motion'
import { Heart, Palette, Award, Users } from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestra Historia: Pasión por las <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">Flores Artesanales</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conoce la pasión y dedicación detrás de cada creación artesanal
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Artesana trabajando en flores de fomi"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                TuFloreríaCreativa - Una Pasión Convertida en Arte
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                En <strong>El Rincón del Fondo</strong>, cada flor cuenta una historia de amor por el arte manual 
                y la naturaleza. Nuestra marca <strong>TuFloreríaCreativa</strong> nació del deseo de crear 
                belleza que perdure en el tiempo, sin marchitarse jamás.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Utilizamos exclusivamente <strong>fomi de la más alta calidad</strong> y pigmentos resistentes 
                que mantienen su vibrante color por años. Cada pieza es elaborada a mano con técnicas 
                artesanales perfeccionadas a través del tiempo.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white p-6 rounded-2xl shadow-lg">
              <h4 className="text-lg font-semibold mb-2 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Nuestra Misión
              </h4>
              <p className="text-pink-100">
                Llevar alegría y belleza a los espacios con creaciones únicas que nunca se marchitan, 
                creando recuerdos eternos para nuestros clientes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Hecho a Mano con Amor</h3>
            <p className="text-gray-600">
              Cada pieza es única y elaborada cuidadosamente. Nuestras artesanas ponen 
              su corazón en cada creación, garantizando la máxima calidad y belleza.
            </p>
          </div>
          
          <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Materiales de Calidad</h3>
            <p className="text-gray-600">
              Utilizamos fomi premium que mantiene su color y forma por siempre. 
              Nuestros pigmentos resistentes aseguran que la belleza perdure.
            </p>
          </div>
          
          <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalización</h3>
            <p className="text-gray-600">
              Creamos diseños únicos según tus preferencias. Cada proyecto personalizado 
              es una nueva oportunidad de crear algo verdaderamente especial.
            </p>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Clientes Felices</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Flores Creadas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Diseños Únicos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">5+</div>
              <div className="text-gray-600 font-medium">Años de Experiencia</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}