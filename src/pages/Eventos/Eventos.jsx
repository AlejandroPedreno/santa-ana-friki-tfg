import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import calendarioImage from '../../resources/images/calendario-marzo-26.jpeg'
import './Eventos.css'

function Eventos() {
  return (
    <>
      <Header />

      <main className="eventos-page">
        <section className="eventos-page__card" aria-label="Calendario de eventos">
          <h1>EVENTOS</h1>
          <br/>

          <div className="eventos-page__container">
            <img
              className="eventos-page__image"
              src={calendarioImage}
              alt="Calendario de eventos marzo 2026"
            />
          </div>

          <div className="eventos-page__info">
            <p>
              ¿Te apasionan los TCGs o tienes curiosidad por empezar? ¡Este es tu sitio!
            </p>

            <p>
              Aquí no solo vendemos cartas, construimos una comunidad. Un espacio donde cada jugador, desde quien abre su primer sobre hasta quien compite al más alto nivel, tiene su lugar.
            </p>

            <p>
              <strong>¿Quieres aprender?</strong> Te enseñamos desde cero, sin prisas y con buen ambiente.<br />
              <strong>¿Quieres competir?</strong> Organizamos torneos donde poner a prueba tu estrategia, mejorar y demostrar de lo que eres capaz.
            </p>

            <p>
              Ven a jugar, a intercambiar, a descubrir nuevas barajas y a conocer gente que comparte tu misma pasión.
            </p>

            <p className="eventos-page__cta">
              Tu próxima partida empieza aquí.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Eventos
