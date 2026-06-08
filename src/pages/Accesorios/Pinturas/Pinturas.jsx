import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import accesoriosBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Pinturas() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 2101, image: productoPrueba, name: 'Pinturas Acrílicas - Set Básico', price: '17.99EUR', releaseOrder: 4 },
		{ id: 2102, image: productoPrueba, name: 'Pintura Base - Rojo Escarlata', price: '3.49EUR', releaseOrder: 3 },
		{ id: 2103, image: productoPrueba, name: 'Pintura Base - Azul Real', price: '3.49EUR', releaseOrder: 8 },
		{ id: 2104, image: productoPrueba, name: 'Pintura Base - Negro Mate', price: '3.49EUR', releaseOrder: 7 },
		{ id: 2105, image: productoPrueba, name: 'Pintura Base - Blanco Puro', price: '3.49EUR', releaseOrder: 2 },
		{ id: 2106, image: productoPrueba, name: 'Barniz Satinado', price: '4.99EUR', releaseOrder: 6 },
		{ id: 2107, image: productoPrueba, name: 'Imprimación Gris', price: '6.99EUR', releaseOrder: 5 },
		{ id: 2108, image: productoPrueba, name: 'Pincel de Detalle Premium', price: '7.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Pinturas"
			bannerImage={accesoriosBanner}
			bannerAlt="Banner de Pinturas"
			bannerAriaLabel="Banner Pinturas"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="pinturas-sort-select"
			sortAriaLabel="Ordenar productos Pinturas"
			productsAriaLabel="Productos Pinturas"
			pageClassName="card-game-page"
		/>
	)
}

export default Pinturas