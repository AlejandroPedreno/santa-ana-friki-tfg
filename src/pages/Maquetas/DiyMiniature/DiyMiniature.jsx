import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import diyMiniatureBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function DiyMiniature() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 1701, image: productoPrueba, name: 'Diy Miniature - Fantasy Cottage', price: '18.99EUR', releaseOrder: 4 },
		{ id: 1702, image: productoPrueba, name: 'Diy Miniature - Sci-fi Hangar', price: '21.99EUR', releaseOrder: 3 },
		{ id: 1703, image: productoPrueba, name: 'Diy Miniature - Medieval House', price: '18.99EUR', releaseOrder: 8 },
		{ id: 1704, image: productoPrueba, name: 'Diy Miniature - Workshop Diorama', price: '24.99EUR', releaseOrder: 7 },
		{ id: 1705, image: productoPrueba, name: 'Diy Miniature - LED Kit', price: '9.99EUR', releaseOrder: 2 },
		{ id: 1706, image: productoPrueba, name: 'Diy Miniature - Tree Pack', price: '7.99EUR', releaseOrder: 6 },
		{ id: 1707, image: productoPrueba, name: 'Diy Miniature - Paint Bundle', price: '14.99EUR', releaseOrder: 5 },
		{ id: 1708, image: productoPrueba, name: 'Diy Miniature - Tools Pack', price: '12.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Diy Miniature"
			bannerImage={diyMiniatureBanner}
			bannerAlt="Banner de Diy Miniature"
			bannerAriaLabel="Banner Diy Miniature"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="diy-miniature-sort-select"
			sortAriaLabel="Ordenar productos Diy Miniature"
			productsAriaLabel="Productos Diy Miniature"
			pageClassName="card-game-page"
		/>
	)
}

export default DiyMiniature