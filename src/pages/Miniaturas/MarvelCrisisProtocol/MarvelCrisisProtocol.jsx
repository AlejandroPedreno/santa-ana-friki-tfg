import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import marvelCrisisProtocolBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function MarvelCrisisProtocol() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 1401, image: productoPrueba, name: 'Marvel Crisis Protocol Core Set', price: '149.99EUR', releaseOrder: 4 },
		{ id: 1402, image: productoPrueba, name: 'Marvel Crisis Protocol Spider-Man & Ghost-Spider', price: '49.99EUR', releaseOrder: 3 },
		{ id: 1403, image: productoPrueba, name: 'Marvel Crisis Protocol Doctor Strange & Wong', price: '49.99EUR', releaseOrder: 8 },
		{ id: 1404, image: productoPrueba, name: 'Marvel Crisis Protocol Modular Terrain', price: '39.99EUR', releaseOrder: 7 },
		{ id: 1405, image: productoPrueba, name: 'Marvel Crisis Protocol Dice Set', price: '14.99EUR', releaseOrder: 2 },
		{ id: 1406, image: productoPrueba, name: 'Marvel Crisis Protocol Tokens Pack', price: '19.99EUR', releaseOrder: 6 },
		{ id: 1407, image: productoPrueba, name: 'Marvel Crisis Protocol Battle Pack', price: '24.99EUR', releaseOrder: 5 },
		{ id: 1408, image: productoPrueba, name: 'Marvel Crisis Protocol Rulebook', price: '12.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="MARVEL CRISIS PROTOCOL"
			bannerImage={marvelCrisisProtocolBanner}
			bannerAlt="Banner de Marvel Crisis Protocol"
			bannerAriaLabel="Banner Marvel Crisis Protocol"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="marvel-crisis-protocol-sort-select"
			sortAriaLabel="Ordenar productos Marvel Crisis Protocol"
			productsAriaLabel="Productos Marvel Crisis Protocol"
			pageClassName="card-game-page"
		/>
	)
}

export default MarvelCrisisProtocol