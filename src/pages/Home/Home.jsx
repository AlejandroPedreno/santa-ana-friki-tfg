import { useEffect, useState, useContext } from 'react'
import './Home.css'
import sliderWarhammer from '../../resources/images/home/slider-home/slider-warhammer.jpg'
import sliderOnePiece from '../../resources/images/home/slider-home/slider-one-piece-tcg.png'
import sliderRiftbound from '../../resources/images/home/slider-home/slider-riftbound.webp'
import novedadesImage from '../../resources/images/home/Novedades.png'
import Product from '../../components/Product/Product.jsx'
import productoPrueba from '../../resources/images/home/producto-prueba.webp'
import { CartContext } from '../../context/CartContext.jsx'

function Home() {
  const { addToCart } = useContext(CartContext)
  const slides = [
    {
      src: sliderWarhammer,
      alt: 'Miniaturas de Warhammer en mesa de juego',
    },
    {
      src: sliderOnePiece,
      alt: 'Cartas de One Piece TCG en exposición',
      href: '/juegos-de-cartas/one-piece-tcg',
    },
    {
      src: sliderRiftbound,
      alt: 'Cartas de Riftbound en exposición',
      href: '/juegos-de-cartas/riftbound',
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  const products = [
    {
      id: 1,
      image: productoPrueba,
      name: 'Display Pokemon Set Temporal Forces - Español',
      price: '154.99EUR',
      releaseOrder: 8,
    },
    {
      id: 2,
      image: productoPrueba,
      name: 'ETB Pokemon Set Temporal Forces - Español',
      price: '59.99EUR',
      releaseOrder: 7,
    },
    {
      id: 3,
      image: productoPrueba,
      name: 'Booster Bundle Pokemon Surging Sparks - Español',
      price: '34.99EUR',
      releaseOrder: 6,
    },
    {
      id: 4,
      image: productoPrueba,
      name: 'Caja de Entrenador Elite Heroes Ascendentes - Español',
      price: '69.99EUR',
      releaseOrder: 5,
    },
    {
      id: 5,
      image: productoPrueba,
      name: 'Pack 3 Sobres Pokemon Paldea Evolved - Español',
      price: '14.99EUR',
      releaseOrder: 4,
    },
    {
      id: 6,
      image: productoPrueba,
      name: 'Sobre Suelto Pokemon Scarlet and Violet - Español',
      price: '4.99EUR',
      releaseOrder: 3,
    },
    {
      id: 7,
      image: productoPrueba,
      name: 'Portamazos Premium Pokemon - Rojo',
      price: '11.99EUR',
      releaseOrder: 2,
    },
    {
      id: 8,
      image: productoPrueba,
      name: 'Fundas Protectoras Pokemon Pack 100 - Negro',
      price: '7.99EUR',
      releaseOrder: 1,
    }
  ]

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearTimeout(timerId)
  }, [currentSlide, slides.length])

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="home-page">
      <section className="home-slider" aria-label="Pasarela principal">
        <button
          type="button"
          className="home-slider__arrow home-slider__arrow--left"
          aria-label="Imagen anterior"
          onClick={goToPrev}
        >
          &#8249;
        </button>

        <div
          className="home-slider__track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.src} className="home-slider__slide">
              {slide.href ? (
                <a className="home-slider__slide-link" href={slide.href} aria-label="Ver One Piece TCG">
                  <img
                    className="home-slider__image"
                    src={slide.src}
                    alt={slide.alt}
                  />
                </a>
              ) : (
                <img
                  className="home-slider__image"
                  src={slide.src}
                  alt={slide.alt}
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="home-slider__arrow home-slider__arrow--right"
          aria-label="Imagen siguiente"
          onClick={goToNext}
        >
          &#8250;
        </button>
      </section>

      <section className="home-novedades" aria-label="Novedades">
        <img className="home-novedades__image" src={novedadesImage} alt="Novedades" />
      </section>

      <section className="home-products" aria-label="Productos destacados">
        {products.map((product) => (
          <Product
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </section>
    </div>
  )
}

export default Home