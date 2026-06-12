import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

const AUTH_STORAGE_KEY = 'santa-ana-friki-auth'

const loadAuthFromStorage = () => {
  // Recupera la sesión guardada y evita romper la app si el localStorage está vacío o da error.
  try {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)

    if (!storedAuth) {
      return { user: null, token: null }
    }

    const parsedAuth = JSON.parse(storedAuth)
    if (!parsedAuth || typeof parsedAuth !== 'object') {
      return { user: null, token: null }
    }

    return {
      user: parsedAuth.user ?? null,
      token: parsedAuth.token ?? null,
    }
  } catch {
    return { user: null, token: null }
  }
}

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  signIn: () => {},
  signOut: () => {},
})

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(loadAuthFromStorage)

  useEffect(() => {
    // La sesión se persiste solo cuando existe token; si no, se limpia el almacenamiento.
    if (authState.token) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState))
      return
    }

    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [authState])

  useEffect(() => {
    // Sincroniza el login entre pestañas cuando cambia el localStorage.
    const handleStorage = (event) => {
      if (event.key === AUTH_STORAGE_KEY) {
        setAuthState(loadAuthFromStorage())
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const signIn = useCallback((session) => {
    // Guarda en contexto la sesión devuelta por el backend.
    setAuthState({
      user: session?.user ?? null,
      token: session?.token ?? null,
    })
  }, [])

  const signOut = useCallback(() => {
    // Limpia sesión y token al cerrar sesión.
    setAuthState({ user: null, token: null })
  }, [])

  const value = useMemo(() => ({
    // Derivados útiles para que el resto de la app no repita comprobaciones.
    user: authState.user,
    token: authState.token,
    isAuthenticated: Boolean(authState.token),
    isAdmin: authState.user?.role === 'admin',
    signIn,
    signOut,
  }), [authState.user, authState.token, signIn, signOut])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}