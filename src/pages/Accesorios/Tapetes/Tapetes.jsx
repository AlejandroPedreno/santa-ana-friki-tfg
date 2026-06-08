import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import accesoriosBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Tapetes() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 2301, image: productoPrueba, name: 'Tapete de Neopreno - Negro', price: '19.99EUR', releaseOrder: 4 },
		{ id: 2302, image: productoPrueba, name: 'Tapete de Juego - Azul', price: '19.99EUR', releaseOrder: 3 },
		{ id: 2303, image: productoPrueba, name: 'Tapete de Juego - Gris', price: '19.99EUR', releaseOrder: 8 },
		{ id: 2304, image: productoPrueba, name: 'Tapete Premium - 60x35', price: '24.99EUR', releaseOrder: 7 },
		{ id: 2305, image: productoPrueba, name: 'Tapete Premium - 80x35', price: '27.99EUR', releaseOrder: 2 },
		{ id: 2306, image: productoPrueba, name: 'Tapete Antideslizante - Verde', price: '21.99EUR', releaseOrder: 6 },
		{ id: 2307, image: productoPrueba, name: 'Tapete Enrollable - Marrón', price: '17.99EUR', releaseOrder: 5 },
		{ id: 2308, image: productoPrueba, name: 'Tapete Deluxe - Ilustrado', price: '29.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Tapetes"
			bannerImage={accesoriosBanner}
			bannerAlt="Banner de Tapetes"
			bannerAriaLabel="Banner Tapetes"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="tapetes-sort-select"
			sortAriaLabel="Ordenar productos Tapetes"
			productsAriaLabel="Productos Tapetes"
			pageClassName="card-game-page"
		/>
	)
}

export default Tapetes