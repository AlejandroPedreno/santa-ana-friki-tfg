import { useEffect, useState, useContext } from 'react'
import { obtenerProductosCatalogo } from '../../services/catalogo/catalogoApi'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Product from '../../components/Product/Product.jsx'
import { CartContext } from '../../context/CartContext.jsx'
import { normalizarProductoCatalogo } from '../../utils/catalogo.js'
import './SearchResults.css'

function SearchResults() {
  const { addToCart } = useContext(CartContext)
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [termino, setTermino] = useState('')

  useEffect(() => {
    // Lee el término de búsqueda desde la URL para poder compartir resultados.
    const params = new URLSearchParams(window.location.search)
    const busqueda = params.get('q') || ''
    setTermino(busqueda)

    if (!busqueda.trim()) {
      setProductos([])
      return
    }

    let isCancelled = false
    // Mientras hay búsqueda, se consulta el catálogo y se normaliza la respuesta.
    setCargando(true)
    setError('')

    obtenerProductosCatalogo({ search: busqueda, limit: 200 })
      .then((rows) => {
        if (isCancelled) return

        const productosNormalizados = rows.map((row) => {
          const productoBase = normalizarProductoCatalogo(row)

          return {
            ...productoBase,
            onAddToCart: () => {
              // Si no queda stock, no se añade el producto al carrito.
              if (productoBase.stock <= 0) {
                return
              }

              addToCart(productoBase)

              setProductos((prevProductos) =>
                prevProductos.map((producto) => {
                  if (producto.id !== row.id) {
                    return producto
                  }

                  const stockRestante = Math.max(Number(producto.stock ?? 0) - 1, 0)

                  return {
                    ...producto,
                    stock: stockRestante,
                    inStock: stockRestante > 0,
                  }
                })
              )
            },
          }
        })

        setProductos(productosNormalizados)
      })
      .catch((err) => {
        if (isCancelled) return
        setError(err?.message || 'Error al cargar los productos')
        setProductos([])
      })
      .finally(() => {
        if (!isCancelled) {
          setCargando(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [addToCart])

  return (
    <>
      <Header />

      <main className="search-results-page">
        <section className="search-results__header">
          <h1 className="search-results__title">
            Resultados de búsqueda{termino && <span className="search-results__term">: "{termino}"</span>}
          </h1>
        </section>

        {cargando && (
          <section className="search-results__loading">
            <p>Cargando resultados...</p>
          </section>
        )}

        {error && (
          <section className="search-results__error">
            <p>{error}</p>
          </section>
        )}

        {!cargando && !error && productos.length === 0 && termino && (
          <section className="search-results__empty">
            <p>No se encontraron productos para "{termino}"</p>
          </section>
        )}

        {!cargando && !error && productos.length > 0 && (
          <section className="search-results__grid" aria-label="Productos encontrados">
            {productos.map((product) => (
              <Product
                key={product.id}
                {...product}
              />
            ))}
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}

export default SearchResults
