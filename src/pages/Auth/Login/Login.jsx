import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import './Login.css'

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Inicio de sesion en desarrollo')
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

            <button type="submit" className="auth-form__submit">Entrar a mi cuenta</button>
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