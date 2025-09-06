import { motion } from 'framer-motion'
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Flower2 } from 'lucide-react'

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' }
]

const quickLinks = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Productos', href: '#products' },
  { name: 'Nuestra Historia', href: '#about' },
  { name: 'Testimonios', href: '#testimonials' },
  { name: 'Personalización', href: '#custom' }
]

const supportLinks = [
  { name: 'Preguntas Frecuentes', href: '#faq' },
  { name: 'Contacto', href: '#contact' },
  { name: 'Envíos y Devoluciones', href: '#' },
  { name: 'Términos de Servicio', href: '#' },
  { name: 'Política de Privacidad', href: '#' }
]

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href === '#') return
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-2 rounded-full">
                <Flower2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">El Rincón del Fondo</h3>
                <p className="text-sm text-gray-400">TuFloreríaCreativa</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Creando belleza eterna con flores artesanales de fomi. 
              Cada pieza es única, hecha a mano con amor y dedicación 
              para llevar alegría a tus espacios especiales.
            </p>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Soporte</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Email</p>
                  <a 
                    href="mailto:info@rincondelfondo.com" 
                    className="text-white hover:text-pink-400 transition-colors"
                  >
                    info@rincondelfondo.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Teléfono</p>
                  <a 
                    href="tel:+52-55-1234-5678" 
                    className="text-white hover:text-pink-400 transition-colors"
                  >
                    +52 55 1234 5678
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Ubicación</p>
                  <p className="text-white">México</p>
                  <p className="text-sm text-gray-400">Envíos a toda la República</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>© 2025 El Rincón del Fondo - TuFloreríaCreativa.</span>
              <span>Todos los derechos reservados.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-300">
              <span>Hecho con</span>
              <Heart className="h-4 w-4 text-pink-400" />
              <span>por MiniMax Agent</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}