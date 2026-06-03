import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import escenografiaBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Escenografia() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 1101, image: productoPrueba, name: 'Ruined Buildings Set', price: '59.99EUR', releaseOrder: 4 },
		{ id: 1102, image: productoPrueba, name: 'Industrial Terrain Pack', price: '49.99EUR', releaseOrder: 3 },
		{ id: 1103, image: productoPrueba, name: 'Fantasy Ruins Set', price: '44.99EUR', releaseOrder: 8 },
		{ id: 1104, image: productoPrueba, name: 'Sci-fi Scatter Terrain', price: '24.99EUR', releaseOrder: 7 },
		{ id: 1105, image: productoPrueba, name: 'Woodland Terrain Pack', price: '39.99EUR', releaseOrder: 2 },
		{ id: 1106, image: productoPrueba, name: 'Roads and Barricades Set', price: '19.99EUR', releaseOrder: 6 },
		{ id: 1107, image: productoPrueba, name: 'Objective Markers Pack', price: '14.99EUR', releaseOrder: 5 },
		{ id: 1108, image: productoPrueba, name: 'Ruins Bases Pack', price: '9.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Escenografía"
			bannerImage={escenografiaBanner}
			bannerAlt="Banner de Escenografía"
			bannerAriaLabel="Banner Escenografía"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="escenografia-sort-select"
			sortAriaLabel="Ordenar productos Escenografía"
			productsAriaLabel="Productos Escenografía"
			pageClassName="card-game-page"
		/>
	)
}

export default Escenografia