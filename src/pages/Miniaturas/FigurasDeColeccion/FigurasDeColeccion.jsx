import { useContext, useEffect, useState } from 'react'
import figurasDeColeccionBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'
import { obtenerSubcategoriasFigurasColeccion } from '../../../services/catalogo/figurasColeccion'

function FigurasDeColeccion() {
  const { addToCart } = useContext(CartContext)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categories, setCategories] = useState([{ value: 'all', label: 'Todas' }])

  useEffect(() => {
    obtenerSubcategoriasFigurasColeccion('figuras-de-coleccion')
      .then((subcategorias) => {
        const categoriasDB = subcategorias.map((subcategory) => ({
          value: subcategory.slug,
          label: subcategory.name,
        }))

        setCategories([{ value: 'all', label: 'Todas' }, ...categoriasDB])
      })
      .catch(() => {
        setCategories([{ value: 'all', label: 'Todas' }])
      })
  }, [])

  return (
    <CardGamePage
      title="Figuras de colección"
      bannerImage={figurasDeColeccionBanner}
      bannerAlt="Banner de Figuras de colección"
      bannerAriaLabel="Banner Figuras de colección"
      sectionSlug="figuras-de-coleccion"
      productsFromDb
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
      subcategorySlug={selectedCategory === 'all' ? '' : selectedCategory}
      onAddToCartProduct={addToCart}
      initialSortBy="launch-desc"
      sortSelectId="figuras-de-coleccion-sort-select"
      sortAriaLabel="Ordenar productos Figuras de colección"
      productsAriaLabel="Productos Figuras de colección"
      pageClassName="card-game-page"
    />
  )
}

export default FigurasDeColeccion
