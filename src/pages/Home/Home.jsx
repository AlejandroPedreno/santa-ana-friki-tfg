import { useEffect, useState, useContext } from 'react'
import './Home.css'
import sliderWarhammer from '../../resources/images/home/slider-home/slider-warhammer.jpg'
import sliderOnePiece from '../../resources/images/home/slider-home/slider-one-piece-tcg.png'
import sliderRiftbound from '../../resources/images/home/slider-home/slider-riftbound.webp'
import novedadesImage from '../../resources/images/home/Novedades.png'
import Product from '../../components/Product/Product.jsx'
import { obtenerProductosCatalogo } from '../../services/catalogo/catalogoApi'
import productoPrueba from '../../resources/images/home/producto-prueba.webp'
import { CartContext } from '../../context/CartContext.jsx'

function Home() {
  const { addToCart } = useContext(CartContext)
  const slides = [
    {
      src: sliderWarhammer,
      alt: 'Miniaturas de Warhammer en mesa de juego',
      href: '/miniaturas/warhammer',
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

  const [productosNovedades, setProductosNovedades] = useState([])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearTimeout(timerId)
  }, [currentSlide, slides.length])

  useEffect(() => {
    let cancelled = false

    obtenerProductosCatalogo({ section: 'one-piece-tcg', limit: 8 })
      .then((rows) => {
        if (cancelled) return

        const normalized = rows.map((row) => {
          const rutaImagen = String(row.image_path || row.image || '')
          const imagenNormalizada = rutaImagen.startsWith('http')
            ? rutaImagen
            : rutaImagen.startsWith('/')
              ? rutaImagen
              : `/${rutaImagen}`
          const stockInicial = Number(row.stock ?? row.in_stock ?? row.inStock ?? 0)
          const stockActual = Number.isFinite(stockInicial) ? stockInicial : 0

          return {
            id: row.id,
            image: imagenNormalizada,
            name: row.name,
            price: `${Number(row.price || 0).toFixed(2)}EUR`,
            stock: stockActual,
            inStock: stockActual > 0,
          }
        })

        setProductosNovedades(normalized)
      })
      .catch(() => setProductosNovedades([]))

    return () => { cancelled = true }
  }, [])

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
        {productosNovedades.length > 0 ? (
          productosNovedades.map((product) => (
            <Product
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              stock={product.stock}
              inStock={product.inStock}
              onAddToCart={() => addToCart({ id: product.id, image: product.image, name: product.name, price: product.price, stock: product.stock })}
            />
          ))
        ) : (
          <p style={{ padding: 20 }}>No hay novedades disponibles.</p>
        )}
      </section>
    </div>
  )
}

export default Home