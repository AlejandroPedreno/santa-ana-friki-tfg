import { useContext, useEffect, useState } from 'react'
import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import { AuthContext } from '../../../context/AuthContext.jsx'
import { iniciarSesion } from '../../../services/auth/authApi.js'
import './Login.css'

function Login() {
  const { signIn, isAuthenticated } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      window.location.assign('/')
    }
  }, [isAuthenticated])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const response = await iniciarSesion({ email, password })
      signIn(response)
      window.location.assign('/')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se ha podido iniciar sesión.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />

      <main className="auth-page" aria-label="Inicio de sesion">
        <section className="auth-card">
          <h1>Iniciar sesión</h1>
          <br />

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-form__field" htmlFor="login-email">
              Correo electrónico
              <input id="login-email" name="email" type="email" required placeholder="tuemail@dominio.com" />
            </label>

            <label className="auth-form__field" htmlFor="login-password">
              Contraseña
              <input id="login-password" name="password" type="password" required placeholder="Escribe tu contraseña" />
            </label>

            {errorMessage && <p className="auth-form__error">{errorMessage}</p>}

            <button type="submit" className="auth-form__submit" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar a mi cuenta'}
            </button>
          </form>

          <p className="auth-card__helper">
            ¿Aún no tienes cuenta?
            <a href="/register"> Registrarse</a>
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Login