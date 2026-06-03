import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import middleEarthBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function MiddleEarthStrategyBattleGame() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 1301, image: productoPrueba, name: 'Middle-earth Strategy Battle Game Starter Set', price: '119.99EUR', releaseOrder: 4 },
		{ id: 1302, image: productoPrueba, name: 'Rohan Warriors Pack', price: '44.99EUR', releaseOrder: 3 },
		{ id: 1303, image: productoPrueba, name: 'Mordor Orcs Pack', price: '44.99EUR', releaseOrder: 8 },
		{ id: 1304, image: productoPrueba, name: 'The Fellowship of the Ring Pack', price: '54.99EUR', releaseOrder: 7 },
		{ id: 1305, image: productoPrueba, name: 'Middle-earth Dice Set', price: '14.99EUR', releaseOrder: 2 },
		{ id: 1306, image: productoPrueba, name: 'Gaming Mat Middle-earth', price: '24.99EUR', releaseOrder: 6 },
		{ id: 1307, image: productoPrueba, name: 'Terrain Pack Middle-earth', price: '29.99EUR', releaseOrder: 5 },
		{ id: 1308, image: productoPrueba, name: 'Rulebook Middle-earth', price: '22.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Middle-earth strategy battle game"
			bannerImage={middleEarthBanner}
			bannerAlt="Banner de Middle-earth strategy battle game"
			bannerAriaLabel="Banner Middle-earth strategy battle game"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="middle-earth-sort-select"
			sortAriaLabel="Ordenar productos Middle-earth strategy battle game"
			productsAriaLabel="Productos Middle-earth strategy battle game"
			pageClassName="card-game-page"
		/>
	)
}

export default MiddleEarthStrategyBattleGame