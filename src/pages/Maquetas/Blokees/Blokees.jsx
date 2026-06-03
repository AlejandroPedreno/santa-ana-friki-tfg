import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import blokeesBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Blokees() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 1601, image: productoPrueba, name: 'Blokees Model - Optimus Prime', price: '24.99EUR', releaseOrder: 4 },
		{ id: 1602, image: productoPrueba, name: 'Blokees Model - Bumblebee', price: '24.99EUR', releaseOrder: 3 },
		{ id: 1603, image: productoPrueba, name: 'Blokees Model - Megatron', price: '24.99EUR', releaseOrder: 8 },
		{ id: 1604, image: productoPrueba, name: 'Blokees Model - Starscream', price: '24.99EUR', releaseOrder: 7 },
		{ id: 1605, image: productoPrueba, name: 'Blokees Model - Upgrade Kit', price: '12.99EUR', releaseOrder: 2 },
		{ id: 1606, image: productoPrueba, name: 'Blokees Model - Display Base', price: '9.99EUR', releaseOrder: 6 },
		{ id: 1607, image: productoPrueba, name: 'Blokees Model - Accessory Pack', price: '7.99EUR', releaseOrder: 5 },
		{ id: 1608, image: productoPrueba, name: 'Blokees Model - Tool Set', price: '14.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Blokees"
			bannerImage={blokeesBanner}
			bannerAlt="Banner de Blokees"
			bannerAriaLabel="Banner Blokees"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="blokees-sort-select"
			sortAriaLabel="Ordenar productos Blokees"
			productsAriaLabel="Productos Blokees"
			pageClassName="card-game-page"
		/>
	)
}

export default Blokees