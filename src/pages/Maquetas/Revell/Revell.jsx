import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import revellBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Revell() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 1901, image: productoPrueba, name: 'Revell Model Kit - BMW M4 GT3', price: '32.99EUR', releaseOrder: 4 },
		{ id: 1902, image: productoPrueba, name: 'Revell Model Kit - Airbus A320', price: '29.99EUR', releaseOrder: 3 },
		{ id: 1903, image: productoPrueba, name: 'Revell Model Kit - Titanic', price: '39.99EUR', releaseOrder: 8 },
		{ id: 1904, image: productoPrueba, name: 'Revell Model Kit - USS Missouri', price: '44.99EUR', releaseOrder: 7 },
		{ id: 1905, image: productoPrueba, name: 'Revell Model Kit - Glue & Tools', price: '7.99EUR', releaseOrder: 2 },
		{ id: 1906, image: productoPrueba, name: 'Revell Model Kit - Paint Set', price: '11.99EUR', releaseOrder: 6 },
		{ id: 1907, image: productoPrueba, name: 'Revell Model Kit - Display Base', price: '8.99EUR', releaseOrder: 5 },
		{ id: 1908, image: productoPrueba, name: 'Revell Model Kit - Tool Pack', price: '13.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Revell"
			bannerImage={revellBanner}
			bannerAlt="Banner de Revell"
			bannerAriaLabel="Banner Revell"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="revell-sort-select"
			sortAriaLabel="Ordenar productos Revell"
			productsAriaLabel="Productos Revell"
			pageClassName="card-game-page"
		/>
	)
}

export default Revell