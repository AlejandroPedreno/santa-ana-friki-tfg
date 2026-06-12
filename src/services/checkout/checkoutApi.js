const URL_BASE_API = import.meta.env.VITE_API_BASE_URL || '/api/index.php'

export async function procesarCheckout(datos) {
  const url = new URL(URL_BASE_API, window.location.origin)
  url.searchParams.set('endpoint', 'checkout')

  const respuesta = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })

  const payload = await respuesta.json().catch(() => null)

  if (!respuesta.ok) {
    throw new Error(payload?.message || payload?.error || `La petición ha fallado con estado ${respuesta.status}`)
  }

  return payload
}