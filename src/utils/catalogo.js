export const normalizarRutaImagen = (rutaImagen) => {
  const ruta = String(rutaImagen ?? '')

  // Si la ruta ya es absoluta o externa, se deja tal cual.
  if (ruta.startsWith('http') || ruta.startsWith('/')) {
    return ruta
  }

  // Si viene relativa, se fuerza a una ruta válida dentro de la app.
  return ruta ? `/${ruta}` : ''
}

export const normalizarStock = (...valores) => {
  // Toma el primer valor útil y lo convierte en número para evitar nulos o textos vacíos.
  const valorEncontrado = valores.find((valor) => valor !== undefined && valor !== null && valor !== '') ?? 0
  const stock = Number(valorEncontrado)

  return Number.isFinite(stock) ? stock : 0
}

// Formatea el precio con el símbolo de euro para mostrarlo en la interfaz.
export const formatearPrecioEUR = (valor) => `${Number(valor ?? 0).toFixed(2)}€`

export const parsearPrecioEUR = (valor) => {
  // Admite precios con o sin símbolo para no romper totales al leer datos antiguos.
  const precio = parseFloat(String(valor ?? '').replace(/EUR|€/g, '').trim())
  return Number.isFinite(precio) ? precio : 0
}

export const normalizarProductoCatalogo = (row) => {
  // Centraliza la forma en que la app lee los productos que vienen del backend.
  const stock = normalizarStock(row.stock)

  return {
    id: row.id,
    name: row.name,
    image: normalizarRutaImagen(row.image_path || row.image || ''),
    price: formatearPrecioEUR(row.price),
    releaseOrder: Number(row.release_order || row.releaseOrder || 0),
    stock,
    inStock: stock > 0,
  }
}