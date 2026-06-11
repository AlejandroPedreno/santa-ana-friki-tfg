const URL_BASE_API = import.meta.env.VITE_API_BASE_URL || '/api/index.php'

async function peticionCatalogo(endpoint, parametros = {}) {
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

  return respuesta.json()
}

export async function obtenerProductosCatalogo(parametros = {}) {
  const respuesta = await peticionCatalogo('products', parametros)
  return Array.isArray(respuesta) ? respuesta : (respuesta.data || [])
}

export async function obtenerSeccionesCatalogo() {
  const respuesta = await peticionCatalogo('sections')
  return Array.isArray(respuesta) ? respuesta : (respuesta.data || [])
}

export async function obtenerSubcategoriasCatalogo(parametros = {}) {
  const respuesta = await peticionCatalogo('subcategories', parametros)
  return Array.isArray(respuesta) ? respuesta : (respuesta.data || [])
}
