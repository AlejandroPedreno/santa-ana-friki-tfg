import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import quienesSomosImage from '../../../resources/images/santa-ana-friki-ruben-luffy.jpg'
import './QuienesSomos.css'

function QuienesSomos() {
    return (
        <>
            <Header />

            <main className="quienes-somos-page">
                <section className="quienes-somos-page__card" aria-label="Quiénes somos">
                    <h1>Quiénes somos</h1>
                    <br />
                    <div className="quienes-somos-page__layout">
                        <div className="quienes-somos-page__content">
                            <p>
                                Somos mucho más que una tienda: somos el punto de encuentro para los apasionados del mundo friki.
                                Especializados en juegos de miniaturas, juegos de cartas, figuras de colección, cómics y merchandising,
                                ofrecemos una experiencia única para coleccionistas y jugadores.
                            </p>

                            <p>
                                Desde Cartagena, llevamos desde 2019 compartiendo nuestra pasión con clientes de toda España,
                                disponiendo de las últimas novedades y los productos más deseados del mercado.
                            </p>

                            <p>
                                Nos mantenemos en constante evolución, actualizando nuestra web y redes sociales con nuevos lanzamientos,
                                ofertas exclusivas y contenido pensado para nuestra comunidad. Además, nos encanta sorprenderos con
                                sorteos, premios y eventos que hacen que formar parte de esta comunidad sea aún más emocionante.
                            </p>

                            <p>
                                Si te apasiona este mundo tanto como a nosotros, este es tu sitio.
                            </p>
                        </div>

                        <img
                            className="quienes-somos-page__image"
                            src={quienesSomosImage}
                            alt="Ruben y Luffy en Santa Ana Friki"
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default QuienesSomos
