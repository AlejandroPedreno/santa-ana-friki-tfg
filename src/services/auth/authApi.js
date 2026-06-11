const URL_BASE_API = import.meta.env.VITE_API_BASE_URL || '/api/index.php'

async function peticionAuth(endpoint, metodo, datos = {}) {
  const url = new URL(URL_BASE_API, window.location.origin)
  url.searchParams.set('endpoint', endpoint)

  const respuesta = await fetch(url.toString(), {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
    },
    body: metodo === 'GET' ? undefined : JSON.stringify(datos),
  })

  const payload = await respuesta.json().catch(() => null)

  if (!respuesta.ok) {
    throw new Error(payload?.error || payload?.message || `La petición ha fallado con estado ${respuesta.status}`)
  }

  return payload
}

export function registrarUsuario(datos) {
  return peticionAuth('register', 'POST', datos)
}

export function iniciarSesion(datos) {
  return peticionAuth('login', 'POST', datos)
}