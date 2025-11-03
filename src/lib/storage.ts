import { supabase } from './supabase'

export const uploadProductImage = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file)

  if (error) {
    throw new Error(`Error al subir la imagen: ${error.message}`)
  }

  const { data: publicUrlData } = supabase.storage
    .from('product-images')
    .getPublicUrl(data.path)

  if (!publicUrlData) {
    throw new Error('No se pudo obtener la URL pública de la imagen.')
  }

  return publicUrlData.publicUrl
}
