import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import italeriBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Italeri() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 1801, image: productoPrueba, name: 'Italeri Model Kit - Spitfire Mk.V', price: '27.99EUR', releaseOrder: 4 },
		{ id: 1802, image: productoPrueba, name: 'Italeri Model Kit - M4 Sherman', price: '29.99EUR', releaseOrder: 3 },
		{ id: 1803, image: productoPrueba, name: 'Italeri Model Kit - F-16 Fighting Falcon', price: '34.99EUR', releaseOrder: 8 },
		{ id: 1804, image: productoPrueba, name: 'Italeri Model Kit - Ducati 1199 Panigale', price: '24.99EUR', releaseOrder: 7 },
		{ id: 1805, image: productoPrueba, name: 'Italeri Model Kit - Glue Pack', price: '6.99EUR', releaseOrder: 2 },
		{ id: 1806, image: productoPrueba, name: 'Italeri Model Kit - Paint Pack', price: '12.99EUR', releaseOrder: 6 },
		{ id: 1807, image: productoPrueba, name: 'Italeri Model Kit - Display Stand', price: '8.99EUR', releaseOrder: 5 },
		{ id: 1808, image: productoPrueba, name: 'Italeri Model Kit - Tool Pack', price: '14.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Italeri"
			bannerImage={italeriBanner}
			bannerAlt="Banner de Italeri"
			bannerAriaLabel="Banner Italeri"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="italeri-sort-select"
			sortAriaLabel="Ordenar productos Italeri"
			productsAriaLabel="Productos Italeri"
			pageClassName="card-game-page"
		/>
	)
}

export default Italeri