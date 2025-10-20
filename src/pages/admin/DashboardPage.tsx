import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProducts } from '@/hooks/useProducts'
import { signOut, getUser } from '@/lib/auth'
import { Product } from '@/lib/types'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const { products, loading, error, fetchProducts } = useProducts()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getUser()
      if (!currentUser) {
        navigate('/admin/login')
      } else {
        setUser(currentUser)
        fetchProducts()
      }
    }
    checkUser()
  }, [navigate, fetchProducts])

  const handleSignOut = async () => {
    await signOut()
    toast.success('¡Hasta pronto!')
    navigate('/admin/login')
  }

  if (loading || !user) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Panel de Administración
        </h1>
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/add-product"
            className="px-4 py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700"
          >
            Añadir Producto
          </Link>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product: Product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.image_url}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock_quantity > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock_quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
