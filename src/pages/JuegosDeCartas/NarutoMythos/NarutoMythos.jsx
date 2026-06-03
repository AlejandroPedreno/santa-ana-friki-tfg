import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import narutoBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function NarutoMythos() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 701, image: productoPrueba, name: 'Starter Deck Naruto Mythos - Naruto', price: '18.99EUR', releaseOrder: 4 },
		{ id: 702, image: productoPrueba, name: 'Starter Deck Naruto Mythos - Sasuke', price: '18.99EUR', releaseOrder: 3 },
		{ id: 703, image: productoPrueba, name: 'Booster Naruto Mythos - Set 1', price: '4.99EUR', releaseOrder: 8 },
		{ id: 704, image: productoPrueba, name: 'Display Naruto Mythos - 24 Sobres', price: '94.99EUR', releaseOrder: 7 },
		{ id: 705, image: productoPrueba, name: 'Protectores Naruto Mythos - Pack 100', price: '8.49EUR', releaseOrder: 2 },
		{ id: 706, image: productoPrueba, name: 'Tapete Naruto Mythos - Oficial', price: '22.99EUR', releaseOrder: 6 },
		{ id: 707, image: productoPrueba, name: 'Deckbox Naruto Mythos - Kurama', price: '13.99EUR', releaseOrder: 5 },
		{ id: 708, image: productoPrueba, name: 'Fundas Naruto Mythos - Pack 100', price: '6.49EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Naruto Mythos"
			bannerImage={narutoBanner}
			bannerAlt="Banner de Naruto Mythos"
			bannerAriaLabel="Banner Naruto Mythos"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="naruto-sort-select"
			sortAriaLabel="Ordenar productos Naruto Mythos"
			productsAriaLabel="Productos Naruto Mythos"
			pageClassName="card-game-page"
		/>
	)
}

export default NarutoMythos