import { useEffect, useState } from 'react'
import { obtenerProductosCatalogo } from './services/catalogo/catalogoApi'

//Estilos
import './App.css'
import topImage from './resources/images/top-image.png'

//Componentes
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

//Context
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

//Páginas
import Home from './pages/Home/Home.jsx'
import DragonBallFusionWorld from './pages/JuegosDeCartas/DragonBallFusionWorld/DragonBallFusionWorld.jsx'
import Lorcana from './pages/JuegosDeCartas/Lorcana/Lorcana.jsx'
import MagicTheGathering from './pages/JuegosDeCartas/MagicTheGathering/MagicTheGathering.jsx'
import NarutoMythos from './pages/JuegosDeCartas/NarutoMythos/NarutoMythos.jsx'
import Pokemon from './pages/JuegosDeCartas/Pokemon/Pokemon.jsx'
import OnePieceTCG from './pages/JuegosDeCartas/OnePieceTCG/OnePieceTCG.jsx'
import Riftbound from './pages/JuegosDeCartas/Riftbound/Riftbound.jsx'
import YuGiOh from './pages/JuegosDeCartas/YuGiOh/YuGiOh.jsx'
import StarWarsLegion from './pages/Miniaturas/StarWarsLegion/StarWarsLegion.jsx'
import Warhammer from './pages/Miniaturas/Warhammer/Warhammer.jsx'
import Escenografia from './pages/Miniaturas/Escenografia/Escenografia.jsx'
import BloodBowl from './pages/Miniaturas/BloodBowl/BloodBowl.jsx'
import MiddleEarthStrategyBattleGame from './pages/Miniaturas/MiddleEarthStrategyBattleGame/MiddleEarthStrategyBattleGame.jsx'
import MarvelCrisisProtocol from './pages/Miniaturas/MarvelCrisisProtocol/MarvelCrisisProtocol.jsx'
import FigurasDeColeccion from './pages/Miniaturas/FigurasDeColeccion/FigurasDeColeccion.jsx'
import AcademyHobbyModelKits from './pages/Maquetas/AcademyHobbyModelKits/AcademyHobbyModelKits.jsx'
import Blokees from './pages/Maquetas/Blokees/Blokees.jsx'
import DiyMiniature from './pages/Maquetas/DiyMiniature/DiyMiniature.jsx'
import Italeri from './pages/Maquetas/Italeri/Italeri.jsx'
import Revell from './pages/Maquetas/Revell/Revell.jsx'
import Pinturas from './pages/Accesorios/Pinturas/Pinturas.jsx'
import Fundas from './pages/Accesorios/Fundas/Fundas.jsx'
import Tapetes from './pages/Accesorios/Tapetes/Tapetes.jsx'
import Deckbox from './pages/Accesorios/Deckbox/Deckbox.jsx'
import QuienesSomos from './pages/Información/QuienesSomos/QuienesSomos.jsx'
import AtencionAlCliente from './pages/Información/AtencionAlCliente/AtencionAlCliente.jsx'
import EnviosYDevoluciones from './pages/Información/EnviosYDevoluciones/EnviosYDevoluciones.jsx'
import PoliticaDePrivacidadYCookies from './pages/Información/PoliticaDePrivacidadYCookies/PoliticaDePrivacidadYCookies.jsx'
import TerminosYCondiciones from './pages/Información/TerminosYCondiciones/TerminosYCondiciones.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Checkout from './pages/Checkout/CheckoutModal.jsx'
import Login from './pages/Auth/Login/Login.jsx'
import Register from './pages/Auth/Register/Register.jsx'
import Eventos from './pages/Eventos/Eventos.jsx'
import ProductsAdmin from './pages/Admin/ProductsAdmin/ProductsAdmin.jsx'
import SearchResults from './pages/SearchResults/SearchResults.jsx'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Estado visible en la barra superior para comprobar si el backend responde.
  const [estadoApi, setEstadoApi] = useState('Comprobando conexión con la base de datos...')

  // Al cargar la aplicación, se hace una petición ligera para verificar que la API está viva.
  useEffect(() => {
    obtenerProductosCatalogo({ limit: 200 })
      .then((productos) => {
        setEstadoApi(`✅ Conectado al Backend. Se han recibido ${productos.length} productos.`)
      })
      .catch((error) => {
        console.error('❌ ERROR al conectar con la API:', error)
        setEstadoApi('❌ Error de conexión con el Backend. Comprueba que XAMPP está encendido.')
      })
  }, []);

  // Muestra el botón de volver arriba cuando el usuario baja la página.
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

  // Se resuelve la ruta actual para decidir qué página renderizar sin usar un router externo.
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const isDragonBallRoute = path === '/juegos-de-cartas/dragon-ball-fusion-world'
  const isLorcanaRoute = path === '/juegos-de-cartas/lorcana'
  const isMagicRoute = path === '/juegos-de-cartas/magic-the-gathering'
  const isNarutoRoute = path === '/juegos-de-cartas/naruto-mythos'
  const isPokemonRoute = path === '/juegos-de-cartas/pokemon'
  const isOnePieceRoute = path === '/juegos-de-cartas/one-piece-tcg'
  const isRiftboundRoute = path === '/juegos-de-cartas/riftbound'
  const isYuGiOhRoute = path === '/juegos-de-cartas/yu-gi-oh'
  const isStarWarsLegionRoute = path === '/miniaturas/star-wars-legion'
  const isWarhammerRoute = path === '/miniaturas/warhammer'
  const isEscenografiaRoute = path === '/miniaturas/escenografia'
  const isBloodBowlRoute = path === '/miniaturas/blood-bowl'
  const isMiddleEarthStrategyBattleGameRoute = path === '/miniaturas/middle-earth-strategy-battle-game'
  const isMarvelCrisisProtocolRoute = path === '/miniaturas/marvel-crisis-protocol'
  const isFigurasDeColeccionRoute = path === '/miniaturas/figuras-de-coleccion'
  const isAcademyHobbyModelKitsRoute = path === '/maquetas/academy-hobby-model-kits'
  const isBlokeesRoute = path === '/maquetas/blokees'
  const isDiyMiniatureRoute = path === '/maquetas/diy-miniature'
  const isItaleriRoute = path === '/maquetas/italeri'
  const isRevellRoute = path === '/maquetas/revell'
  const isPinturasRoute = path === '/accesorios/pinturas'
  const isFundasRoute = path === '/accesorios/fundas'
  const isTapetesRoute = path === '/accesorios/tapetes'
  const isDeckboxRoute = path === '/accesorios/deckbox'
  const isQuienesSomosRoute = path === '/informacion/quienes-somos'
  const isAtencionAlClienteRoute = path === '/informacion/atencion-al-cliente'
  const isEnviosRoute = path === '/informacion/envios-y-devoluciones'
  const isPoliticaRoute = path === '/informacion/politica-de-privacidad-y-cookies'
  const isTerminosRoute = path === '/informacion/terminos-y-condiciones'
  const isCartRoute = path === '/carrito'
  const isCheckoutRoute = path === '/checkout'
  const isLoginRoute = path === '/login'
  const isRegisterRoute = path === '/register'
  const isAdminProductsRoute = path === '/admin/productos'
  const isEventosRoute = path === '/eventos'
  const isSearchRoute = path === '/buscar'

  return (
    <AuthProvider>
      <CartProvider>
        <>
          {/* Banner de diagnóstico para ver rápidamente si la API responde. */}
        <div style={{ backgroundColor: '#222', color: '#fff', textAlign: 'center', padding: '12px', position: 'sticky', top: 0, zIndex: 9999 }}>
          <strong>Estado de tu API PHP:</strong> {estadoApi} <br/>
          <small style={{ color: '#aaa' }}>(Pulsa F12, ve a la pestaña "Consola" y despliega el Array para ver los datos de MySQL)</small>
        </div>


        {isDragonBallRoute ? (
          <DragonBallFusionWorld />
        ) : isLorcanaRoute ? (
          <Lorcana />
        ) : isMagicRoute ? (
          <MagicTheGathering />
        ) : isNarutoRoute ? (
          <NarutoMythos />
        ) : isPokemonRoute ? (
          <Pokemon />
        ) : isOnePieceRoute ? (
          <OnePieceTCG />
        ) : isRiftboundRoute ? (
          <Riftbound />
        ) : isYuGiOhRoute ? (
          <YuGiOh />
        ) : isStarWarsLegionRoute ? (
          <StarWarsLegion />
        ) : isWarhammerRoute ? (
          <Warhammer />
        ) : isEscenografiaRoute ? (
          <Escenografia />
        ) : isBloodBowlRoute ? (
          <BloodBowl />
        ) : isMiddleEarthStrategyBattleGameRoute ? (
          <MiddleEarthStrategyBattleGame />
        ) : isMarvelCrisisProtocolRoute ? (
          <MarvelCrisisProtocol />
        ) : isFigurasDeColeccionRoute ? (
          <FigurasDeColeccion />
        ) : isAcademyHobbyModelKitsRoute ? (
          <AcademyHobbyModelKits />
        ) : isBlokeesRoute ? (
          <Blokees />
        ) : isDiyMiniatureRoute ? (
          <DiyMiniature />
        ) : isItaleriRoute ? (
          <Italeri />
        ) : isRevellRoute ? (
          <Revell />
        ) : isPinturasRoute ? (
          <Pinturas />
        ) : isFundasRoute ? (
          <Fundas />
        ) : isTapetesRoute ? (
          <Tapetes />
        ) : isDeckboxRoute ? (
          <Deckbox />
        ) : isQuienesSomosRoute ? (
          <QuienesSomos />
        ) : isAtencionAlClienteRoute ? (
          <AtencionAlCliente />
        ) : isEnviosRoute ? (
          <EnviosYDevoluciones />
        ) : isPoliticaRoute ? (
          <PoliticaDePrivacidadYCookies />
        ) : isTerminosRoute ? (
          <TerminosYCondiciones />
        ) : isCartRoute ? (
          <Cart />
        ) : isCheckoutRoute ? (
          <Checkout />
        ) : isLoginRoute ? (
          <Login />
        ) : isRegisterRoute ? (
          <Register />
        ) : isAdminProductsRoute ? (
          <ProductsAdmin />
        ) : isEventosRoute ? (
          <Eventos />
        ) : isSearchRoute ? (
          <SearchResults />
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
    </AuthProvider>
  )
}

export default App