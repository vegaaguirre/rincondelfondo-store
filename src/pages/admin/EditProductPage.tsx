import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateProduct } from '@/lib/products'
import { uploadProductImage } from '@/lib/storage'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [imageUrls, setImageUrls] = useState<string[]>(['', ''])
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null])
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([
    null,
    null,
  ])
  const [category, setCategory] = useState('')
  const [stockQuantity, setStockQuantity] = useState(0)
  const [isFeatured, setIsFeatured] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [isBestseller, setIsBestseller] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        toast.error('ID de producto no válido')
        navigate('/admin/dashboard')
        return
      }

      try {
        const { data: product, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .maybeSingle()

        if (error) throw error

        if (!product) {
          toast.error('Producto no encontrado')
          navigate('/admin/dashboard')
          return
        }

        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setImageUrls(product.image_urls || ['', ''])
        setImagePreviews(product.image_urls || [null, null])
        setCategory(product.category)
        setStockQuantity(product.stock_quantity)
        setIsFeatured(product.is_featured)
        setIsNew(product.is_new)
        setIsBestseller(product.is_bestseller)
      } catch (error: any) {
        toast.error('Error al cargar el producto')
        navigate('/admin/dashboard')
      } finally {
        setLoadingProduct(false)
      }
    }

    loadProduct()
  }, [id, navigate])

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const newImageFiles = [...imageFiles]
      newImageFiles[index] = file
      setImageFiles(newImageFiles)

      const newImagePreviews = [...imagePreviews]
      newImagePreviews[index] = URL.createObjectURL(file)
      setImagePreviews(newImagePreviews)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!id) return

    setLoading(true)
    try {
      toast.loading('Subiendo imágenes...')
      const finalImageUrls = await Promise.all(
        imageFiles.map(async (file, index) => {
          if (file) {
            return await uploadProductImage(file)
          }
          return imageUrls[index]
        }),
      )
      toast.dismiss()

      toast.loading('Actualizando producto...')
      await updateProduct(id, {
        name,
        description,
        price,
        image_urls: finalImageUrls,
        category,
        stock_quantity: stockQuantity,
        is_featured: isFeatured,
        is_new: isNew,
        is_bestseller: isBestseller,
      })
      toast.dismiss()

      toast.success('¡Producto actualizado!')
      navigate('/admin/dashboard')
    } catch (error: any) {
      toast.dismiss()
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando producto...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Editar Producto</h1>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-4 py-2 text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow"
        >
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                rows={4}
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Imagen del Producto 1
              </label>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, 0)}
                className="w-full mt-1"
                accept="image/*"
              />
              {imagePreviews[0] && (
                <div className="mt-2">
                  <img
                    src={imagePreviews[0]}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Imagen del Producto 2
              </label>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, 1)}
                className="w-full mt-1"
                accept="image/*"
              />
              {imagePreviews[1] && (
                <div className="mt-2">
                  <img
                    src={imagePreviews[1]}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categoría
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-gray-300 text-pink-600 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Destacado</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="rounded border-gray-300 text-pink-600 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Nuevo</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isBestseller}
                  onChange={(e) => setIsBestseller(e.target.checked)}
                  className="rounded border-gray-300 text-pink-600 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Más Vendido</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-lg font-semibold text-white bg-pink-600 rounded-md shadow-lg hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Actualizando...' : 'Actualizar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
