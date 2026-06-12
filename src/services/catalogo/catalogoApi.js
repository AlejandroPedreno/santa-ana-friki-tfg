const URL_BASE_API = import.meta.env.VITE_API_BASE_URL || '/api/index.php'

async function peticionCatalogo(endpoint, parametros = {}) {
  // Construye la URL final de catálogo con el endpoint y los filtros que se pidan.
  const url = new URL(URL_BASE_API, window.location.origin)
  url.searchParams.set('endpoint', endpoint)

  Object.entries(parametros).forEach(([clave, valor]) => {
    if (valor !== undefined && valor !== null && valor !== '') {
      url.searchParams.set(clave, String(valor))
    }
  })

  const respuesta = await fetch(url.toString())
  if (!respuesta.ok) {
    throw new Error(`La petición ha fallado con estado ${respuesta.status}`)
  }

  // El backend devuelve siempre JSON, por eso se parsea directamente.
  return respuesta.json()
}

export async function obtenerProductosCatalogo(parametros = {}) {
  // Devuelve la lista de productos normal del catálogo.
  const respuesta = await peticionCatalogo('products', parametros)
  return Array.isArray(respuesta) ? respuesta : (respuesta.data || [])
}

export async function obtenerSeccionesCatalogo() {
  // Carga las secciones principales para poblar menús y filtros.
  const respuesta = await peticionCatalogo('sections')
  return Array.isArray(respuesta) ? respuesta : (respuesta.data || [])
}

export async function obtenerSubcategoriasCatalogo(parametros = {}) {
  // Carga las subcategorías asociadas a una sección concreta.
  const respuesta = await peticionCatalogo('subcategories', parametros)
  return Array.isArray(respuesta) ? respuesta : (respuesta.data || [])
}
