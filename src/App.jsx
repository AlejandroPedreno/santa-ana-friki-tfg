import { useEffect, useState } from 'react'

//Estilos
import './App.css'
import topImage from './resources/images/top-image.png'

//Componentes
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

//Context
import { CartProvider } from './context/CartContext.jsx'

//Páginas
import Home from './pages/Home/Home.jsx'
import OnePieceTCG from './pages/JuegosDeCartas/OnePieceTCG/OnePieceTCG.jsx'
import Riftbound from './pages/JuegosDeCartas/Riftbound/Riftbound.jsx'
import QuienesSomos from './pages/Información/QuienesSomos/QuienesSomos.jsx'
import EnviosYDevoluciones from './pages/Información/EnviosYDevoluciones/EnviosYDevoluciones.jsx'
import PoliticaDePrivacidadYCookies from './pages/Información/PoliticaDePrivacidadYCookies/PoliticaDePrivacidadYCookies.jsx'
import TerminosYCondiciones from './pages/Información/TerminosYCondiciones/TerminosYCondiciones.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Login from './pages/Auth/Login/Login.jsx'
import Register from './pages/Auth/Register/Register.jsx'
import Eventos from './pages/Eventos/Eventos.jsx'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 220)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const isOnePieceRoute = path === '/juegos-de-cartas/one-piece-tcg'
  const isRiftboundRoute = path === '/juegos-de-cartas/riftbound'
  const isQuienesSomosRoute = path === '/informacion/quienes-somos'
  const isEnviosRoute = path === '/informacion/envios-y-devoluciones'
  const isPoliticaRoute = path === '/informacion/politica-de-privacidad-y-cookies'
  const isTerminosRoute = path === '/informacion/terminos-y-condiciones'
  const isCartRoute = path === '/carrito'
  const isLoginRoute = path === '/login'
  const isRegisterRoute = path === '/register'
  const isEventosRoute = path === '/eventos'

  return (
    <CartProvider>
      <>
        {isOnePieceRoute ? (
          <OnePieceTCG />
        ) : isRiftboundRoute ? (
          <Riftbound />
        ) : isQuienesSomosRoute ? (
          <QuienesSomos />
        ) : isEnviosRoute ? (
          <EnviosYDevoluciones />
        ) : isPoliticaRoute ? (
          <PoliticaDePrivacidadYCookies />
        ) : isTerminosRoute ? (
          <TerminosYCondiciones />
        ) : isCartRoute ? (
          <Cart />
        ) : isLoginRoute ? (
          <Login />
        ) : isRegisterRoute ? (
          <Register />
        ) : isEventosRoute ? (
          <Eventos />
        ) : (
          <>
            <Header />
            <Home />
            <Footer />
          </>
        )}
        <button
          type="button"
          className={`scroll-top-button ${showScrollTop ? 'is-visible' : ''}`}
          aria-label="Subir al inicio"
          onClick={scrollToTop}
        >
          <img src={topImage} alt="Subir" />
        </button>
      </>
    </CartProvider>
  )
}

export default App
