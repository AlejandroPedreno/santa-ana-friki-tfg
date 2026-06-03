import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import maquetasBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function AcademyHobbyModelKits() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 1501, image: productoPrueba, name: 'Academy Hobby Model Kit - F-14 Tomcat', price: '34.99EUR', releaseOrder: 4 },
		{ id: 1502, image: productoPrueba, name: 'Academy Hobby Model Kit - P-51 Mustang', price: '29.99EUR', releaseOrder: 3 },
		{ id: 1503, image: productoPrueba, name: 'Academy Hobby Model Kit - Tiger I', price: '39.99EUR', releaseOrder: 8 },
		{ id: 1504, image: productoPrueba, name: 'Academy Hobby Model Kit - USS Enterprise', price: '44.99EUR', releaseOrder: 7 },
		{ id: 1505, image: productoPrueba, name: 'Academy Hobby Model Kit - Paint Set', price: '14.99EUR', releaseOrder: 2 },
		{ id: 1506, image: productoPrueba, name: 'Academy Hobby Model Kit - Glue & Tools', price: '12.99EUR', releaseOrder: 6 },
		{ id: 1507, image: productoPrueba, name: 'Academy Hobby Model Kit - Display Base', price: '9.99EUR', releaseOrder: 5 },
		{ id: 1508, image: productoPrueba, name: 'Academy Hobby Model Kit - Tool Pack', price: '19.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Academy Hobby Model Kits"
			bannerImage={maquetasBanner}
			bannerAlt="Banner de Academy Hobby Model Kits"
			bannerAriaLabel="Banner Academy Hobby Model Kits"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="academy-hobby-model-kits-sort-select"
			sortAriaLabel="Ordenar productos Academy Hobby Model Kits"
			productsAriaLabel="Productos Academy Hobby Model Kits"
			pageClassName="card-game-page"
		/>
	)
}

export default AcademyHobbyModelKits