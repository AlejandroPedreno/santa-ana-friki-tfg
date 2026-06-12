const URL_BASE_API = import.meta.env.VITE_API_BASE_URL || '/api/index.php'

async function peticionAdmin(endpoint, metodo, token, datos = {}, parametros = {}) {
  const url = new URL(URL_BASE_API, window.location.origin)
  url.searchParams.set('endpoint', endpoint)

  Object.entries(parametros).forEach(([clave, valor]) => {
    if (valor !== undefined && valor !== null && valor !== '') {
      url.searchParams.set(clave, String(valor))
    }
  })

  const isFormData = datos instanceof FormData
  const requestMethod = metodo === 'PUT' && isFormData ? 'POST' : metodo

  if (metodo === 'PUT' && isFormData) {
    datos.append('_method', 'PUT')
  }

  const requestInit = {
    method: requestMethod,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: requestMethod === 'GET' ? undefined : (isFormData ? datos : JSON.stringify(datos)),
  }

  if (!isFormData && requestMethod !== 'GET') {
    requestInit.headers['Content-Type'] = 'application/json'
  }

  const respuesta = await fetch(url.toString(), requestInit)

  const payload = await respuesta.json().catch(() => null)

  if (!respuesta.ok) {
    throw new Error(payload?.error || payload?.message || `La petición ha fallado con estado ${respuesta.status}`)
  }

  return payload
}

export function obtenerProductosAdmin(token) {
  return peticionAdmin('admin-products', 'GET', token)
}

export function crearProductoAdmin(token, datos) {
  return peticionAdmin('admin-products', 'POST', token, datos)
}

export function actualizarProductoAdmin(token, datos) {
  return peticionAdmin('admin-products', 'PUT', token, datos)
}

export function eliminarProductoAdmin(token, productId) {
  return peticionAdmin('admin-products', 'DELETE', token, {}, { id: productId })
}