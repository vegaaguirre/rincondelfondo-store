import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '@/lib/products'
import { uploadProductImage } from '@/lib/storage'
import toast from 'react-hot-toast'

export default function AddProductPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
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
  const navigate = useNavigate()

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
    if (imageFiles.some((file) => file === null)) {
      toast.error('Por favor, selecciona ambas imágenes.')
      return
    }

    setLoading(true)
    try {
      toast.loading('Subiendo imágenes...')
      const imageUrls = await Promise.all(
        imageFiles.map((file) => uploadProductImage(file!)),
      )
      toast.dismiss()

      toast.loading('Añadiendo producto...')
      await addProduct({
        name,
        description,
        price,
        image_urls: imageUrls,
        category,
        stock_quantity: stockQuantity,
        is_featured: isFeatured,
        is_new: isNew,
        is_bestseller: isBestseller,
      })
      toast.dismiss()

      toast.success('¡Producto añadido!')
      navigate('/admin/dashboard')
    } catch (error: any) {
      toast.dismiss()
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Añadir Producto</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow"
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
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm"
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
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm"
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
                className="w-full mt-1 border border-gray-300 rounded-md shadow-sm"
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
                className="w-full mt-1 border border-gray-300 rounded-md shadow-sm"
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
              required
            />
            {imagePreviews[0] && (
              <img
                src={imagePreviews[0]}
                alt="Vista previa 1"
                className="mt-4 w-32 h-32 object-cover"
              />
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
              required
            />
            {imagePreviews[1] && (
              <img
                src={imagePreviews[1]}
                alt="Vista previa 2"
                className="mt-4 w-32 h-32 object-cover"
              />
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
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded"
              />
              <span className="ml-2">Destacado</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="rounded"
              />
              <span className="ml-2">Nuevo</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isBestseller}
                onChange={(e) => setIsBestseller(e.target.checked)}
                className="rounded"
              />
              <span className="ml-2">Más Vendido</span>
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-lg font-semibold text-white bg-pink-600 rounded-md shadow-lg"
          >
            {loading ? 'Añadiendo...' : 'Añadir Producto'}
          </button>
        </div>
      </form>
    </div>
  )
}
