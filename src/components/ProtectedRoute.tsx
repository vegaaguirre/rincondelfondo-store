import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '@/lib/auth'

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getUser()
      if (!currentUser) {
        navigate('/admin/login')
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    }
    checkUser()
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  }

  return user ? children : null
}
