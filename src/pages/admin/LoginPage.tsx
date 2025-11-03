import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '@/lib/auth'
import toast from 'react-hot-toast'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { FaSun } from 'react-icons/fa'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signIn(email, password)
      toast.success('¡Bienvenido!')
      navigate('/admin/dashboard')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FBF9F6]">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left-side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">
            <FaSun className="inline-block mr-2 text-pink-400" />
            Flores de Fomi
          </span>
          <span className="font-light text-gray-400 mb-8">
            Bienvenida de Nuevo, por favor ingresa tus datos
          </span>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-10 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#D1A3B0] focus:border-[#D1A3B0]"
                placeholder="Correo Electrónico"
              />
            </div>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-10 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#D1A3B0] focus:border-[#D1A3B0]"
                placeholder="Contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-lg font-semibold text-white bg-[#D1A3B0] rounded-md shadow-lg hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D1A3B0] disabled:opacity-50"
            >
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
        {/* Right-side */}
        <div className="relative">
          <img
            src="/assets/flowers.jpg"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  )
}
