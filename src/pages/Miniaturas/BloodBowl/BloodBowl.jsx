import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import bloodBowlBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function BloodBowl() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 1201, image: productoPrueba, name: 'Blood Bowl Starter Set', price: '109.99EUR', releaseOrder: 4 },
		{ id: 1202, image: productoPrueba, name: 'Blood Bowl Orc Team', price: '49.99EUR', releaseOrder: 3 },
		{ id: 1203, image: productoPrueba, name: 'Blood Bowl Human Team', price: '49.99EUR', releaseOrder: 8 },
		{ id: 1204, image: productoPrueba, name: 'Blood Bowl Dice Set', price: '14.99EUR', releaseOrder: 7 },
		{ id: 1205, image: productoPrueba, name: 'Blood Bowl Pitch', price: '39.99EUR', releaseOrder: 2 },
		{ id: 1206, image: productoPrueba, name: 'Blood Bowl Dugout Set', price: '19.99EUR', releaseOrder: 6 },
		{ id: 1207, image: productoPrueba, name: 'Blood Bowl Coach Pack', price: '24.99EUR', releaseOrder: 5 },
		{ id: 1208, image: productoPrueba, name: 'Blood Bowl Rulebook', price: '18.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Blood Bowl"
			bannerImage={bloodBowlBanner}
			bannerAlt="Banner de Blood Bowl"
			bannerAriaLabel="Banner Blood Bowl"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="blood-bowl-sort-select"
			sortAriaLabel="Ordenar productos Blood Bowl"
			productsAriaLabel="Productos Blood Bowl"
			pageClassName="card-game-page"
		/>
	)
}

export default BloodBowl