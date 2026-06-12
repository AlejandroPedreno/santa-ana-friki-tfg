import { useEffect, useState, useContext } from 'react'
import { obtenerProductosCatalogo } from '../../services/catalogo/catalogoApi'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Product from '../../components/Product/Product.jsx'
import { CartContext } from '../../context/CartContext.jsx'
import './SearchResults.css'

function SearchResults() {
  const { addToCart } = useContext(CartContext)
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [termino, setTermino] = useState('')

  useEffect(() => {
    // Obtener el término de búsqueda de la URL
    const params = new URLSearchParams(window.location.search)
    const busqueda = params.get('q') || ''
    setTermino(busqueda)

    if (!busqueda.trim()) {
      setProductos([])
      return
    }

    let isCancelled = false
    setCargando(true)
    setError('')

    obtenerProductosCatalogo({ search: busqueda, limit: 200 })
      .then((rows) => {
        if (isCancelled) return

        const productosNormalizados = rows.map((row) => {
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
            name: row.name,
            image: imagenNormalizada,
            price: `${Number(row.price || 0).toFixed(2)}EUR`,
            releaseOrder: Number(row.release_order || row.releaseOrder || 0),
            stock: stockActual,
            inStock: stockActual > 0,
            onAddToCart: () => {
              if (stockActual <= 0) {
                return
              }

              addToCart({
                id: row.id,
                image: imagenNormalizada,
                name: row.name,
                price: `${Number(row.price || 0).toFixed(2)}EUR`,
                releaseOrder: Number(row.release_order || row.releaseOrder || 0),
                stock: stockActual,
                inStock: true,
              })

              setProductos((prevProductos) =>
                prevProductos.map((producto) =>
                  producto.id === row.id
                    ? {
                      ...producto,
                      stock: Math.max(Number(producto.stock ?? 0) - 1, 0),
                      inStock: Math.max(Number(producto.stock ?? 0) - 1, 0) > 0,
                    }
                    : producto
                )
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
