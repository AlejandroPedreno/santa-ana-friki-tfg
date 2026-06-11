import { useContext, useEffect, useState } from 'react'
import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import { AuthContext } from '../../../context/AuthContext.jsx'
import { registrarUsuario } from '../../../services/auth/authApi.js'
import './Register.css'

function Register() {
  const { signIn, isAuthenticated } = useContext(AuthContext)
  const [passwordError, setPasswordError] = useState('')
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
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const password = String(formData.get('password') ?? '')
    const confirmPassword = String(formData.get('confirmPassword') ?? '')

    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden')
      return
    }

    setPasswordError('')
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const response = await registrarUsuario({ name, email, phone, password })
      signIn(response)
      window.location.assign('/')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se ha podido completar el registro.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />

      <main className="auth-page" aria-label="Registro de usuario">
        <section className="auth-card">

          <h1>Registrarse</h1>
          <br />

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-form__field" htmlFor="register-name">
              Nombre completo
              <input id="register-name" name="name" type="text" required placeholder="Tu nombre" />
            </label>

            <label className="auth-form__field" htmlFor="register-email">
              Correo electrónico
              <input id="register-email" name="email" type="email" required placeholder="tuemail@dominio.com" />
            </label>

            <label className="auth-form__field" htmlFor="register-phone">
              Teléfono
              <input id="register-phone" name="phone" type="tel" required placeholder="+34 666 123 456" />
            </label>

            <label className="auth-form__field" htmlFor="register-password">
              Contraseña
              <input
                id="register-password"
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="Mínimo 8 caracteres"
                onChange={() => setPasswordError('')}
              />
            </label>

            <label className="auth-form__field" htmlFor="register-confirm-password">
              Confirmar contraseña
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                placeholder="Repite tu contraseña"
                className={passwordError ? 'auth-form__input-error' : ''}
                onChange={() => setPasswordError('')}
              />
            </label>

            {passwordError && <p className="auth-form__error">{passwordError}</p>}

            {errorMessage && <p className="auth-form__error">{errorMessage}</p>}

            <label className="auth-form__checkbox">
              <input
                id="register-policies"
                name="policies"
                type="checkbox"
                required
              />
              <span>Acepto la <a href="/informacion/politica-de-privacidad-y-cookies" target="_blank" rel="noopener noreferrer">Política de privacidad y cookies</a></span>
            </label>

            <button type="submit" className="auth-form__submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="auth-card__helper">
            ¿Ya tienes cuenta?
            <a href="/login"> Iniciar sesión</a>
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Register