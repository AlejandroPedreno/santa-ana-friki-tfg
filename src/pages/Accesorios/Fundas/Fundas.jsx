import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import accesoriosBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Fundas() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 2201, image: productoPrueba, name: 'Fundas Protectoras - Pack 100', price: '6.99EUR', releaseOrder: 4 },
		{ id: 2202, image: productoPrueba, name: 'Fundas Premium - Transparentes', price: '8.49EUR', releaseOrder: 3 },
		{ id: 2203, image: productoPrueba, name: 'Fundas Matte - Negro', price: '9.49EUR', releaseOrder: 8 },
		{ id: 2204, image: productoPrueba, name: 'Fundas Matte - Azul', price: '9.49EUR', releaseOrder: 7 },
		{ id: 2205, image: productoPrueba, name: 'Fundas Mini - Pack 50', price: '3.99EUR', releaseOrder: 2 },
		{ id: 2206, image: productoPrueba, name: 'Fundas Oversize - Pack 50', price: '4.99EUR', releaseOrder: 6 },
		{ id: 2207, image: productoPrueba, name: 'Fundas Katanas - Pack 100', price: '7.49EUR', releaseOrder: 5 },
		{ id: 2208, image: productoPrueba, name: 'Fundas Deluxe - Pack 100', price: '11.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Fundas"
			bannerImage={accesoriosBanner}
			bannerAlt="Banner de Fundas"
			bannerAriaLabel="Banner Fundas"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="fundas-sort-select"
			sortAriaLabel="Ordenar productos Fundas"
			productsAriaLabel="Productos Fundas"
			pageClassName="card-game-page"
		/>
	)
}

export default Fundas