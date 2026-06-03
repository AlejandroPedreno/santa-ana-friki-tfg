import { useContext, useMemo, useState } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import figurasDeColeccionBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function FigurasDeColeccion() {
  const { addToCart } = useContext(CartContext)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { value: 'all', label: 'Todas' },
    { value: 'bandai', label: 'Bandai' },
    { value: 'banpresto', label: 'Banpresto' },
    { value: 'good-smile-company', label: 'Good Smile Company' },
    { value: 'hasbro', label: 'Hasbro' },
    { value: 'megahouse', label: 'MegaHouse' },
    { value: 'qposket', label: 'Qposket' },
    { value: 'taito', label: 'Taito' },
    { value: 'figuras-premium', label: 'Figuras Premium' },
    { value: 'joy-toy', label: 'Joy Toy' },
  ]

  const products = [
    { id: 1501, image: productoPrueba, name: 'Bandai - Pack premium 01', price: '24.99EUR', releaseOrder: 4, category: 'bandai' },
    { id: 1502, image: productoPrueba, name: 'Banpresto - Edición limitada 02', price: '34.99EUR', releaseOrder: 3, category: 'banpresto' },
    { id: 1503, image: productoPrueba, name: 'Good Smile Company - Nendoroid 03', price: '19.99EUR', releaseOrder: 8, category: 'good-smile-company' },
    { id: 1504, image: productoPrueba, name: 'Hasbro - Figura articulada 04', price: '29.99EUR', releaseOrder: 7, category: 'hasbro' },
    { id: 1505, image: productoPrueba, name: 'MegaHouse - Diorama mini 05', price: '39.99EUR', releaseOrder: 2, category: 'megahouse' },
    { id: 1506, image: productoPrueba, name: 'Qposket - Busto coleccionable 06', price: '44.99EUR', releaseOrder: 6, category: 'qposket' },
    { id: 1507, image: productoPrueba, name: 'Taito - Pack exposición 07', price: '27.99EUR', releaseOrder: 5, category: 'taito' },
    { id: 1508, image: productoPrueba, name: 'Figuras Premium - Serie especial 08', price: '14.99EUR', releaseOrder: 1, category: 'figuras-premium' },
    { id: 1509, image: productoPrueba, name: 'Joy Toy - Especial 09', price: '21.99EUR', releaseOrder: 9, category: 'joy-toy' },
  ]

  const visibleProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products
    }

    return products.filter((product) => product.category === selectedCategory)
  }, [products, selectedCategory])

  return (
    <CardGamePage
      title="Figuras de colección"
      bannerImage={figurasDeColeccionBanner}
      bannerAlt="Banner de Figuras de colección"
      bannerAriaLabel="Banner Figuras de colección"
      toolbarLeftContent={
        <>
          <label className="card-game-page__toolbar-label" htmlFor="figuras-de-coleccion-category-select">
            Buscar por categoría:
          </label>
          <select
            id="figuras-de-coleccion-category-select"
            className="card-game-page__category-select"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </>
      }
      products={visibleProducts.map((product) => ({
        ...product,
        onAddToCart: () => addToCart(product),
      }))}
      initialSortBy="launch-desc"
      sortSelectId="figuras-de-coleccion-sort-select"
      sortAriaLabel="Ordenar productos Figuras de colección"
      productsAriaLabel="Productos Figuras de colección"
      pageClassName="card-game-page"
    />
  )
}

export default FigurasDeColeccion
