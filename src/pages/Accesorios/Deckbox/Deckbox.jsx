import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import accesoriosBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Deckbox() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 2401, image: productoPrueba, name: 'Deckbox Compacta - Roja', price: '9.99EUR', releaseOrder: 4 },
		{ id: 2402, image: productoPrueba, name: 'Deckbox Compacta - Negra', price: '9.99EUR', releaseOrder: 3 },
		{ id: 2403, image: productoPrueba, name: 'Deckbox Premium - Azul', price: '14.99EUR', releaseOrder: 8 },
		{ id: 2404, image: productoPrueba, name: 'Deckbox Premium - Verde', price: '14.99EUR', releaseOrder: 7 },
		{ id: 2405, image: productoPrueba, name: 'Deckbox XL - Doble Mazo', price: '16.99EUR', releaseOrder: 2 },
		{ id: 2406, image: productoPrueba, name: 'Deckbox Transparente', price: '11.99EUR', releaseOrder: 6 },
		{ id: 2407, image: productoPrueba, name: 'Deckbox Apilable', price: '12.99EUR', releaseOrder: 5 },
		{ id: 2408, image: productoPrueba, name: 'Deckbox Deluxe - Imantada', price: '18.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Deckbox"
			bannerImage={accesoriosBanner}
			bannerAlt="Banner de Deckbox"
			bannerAriaLabel="Banner Deckbox"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="deckbox-sort-select"
			sortAriaLabel="Ordenar productos Deckbox"
			productsAriaLabel="Productos Deckbox"
			pageClassName="card-game-page"
		/>
	)
}

export default Deckbox