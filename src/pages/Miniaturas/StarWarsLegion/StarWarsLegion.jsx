import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import miniaturasBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function StarWarsLegion() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 901, image: productoPrueba, name: 'Starter Set Star Wars - Legion Clone Troopers', price: '89.99EUR', releaseOrder: 4 },
		{ id: 902, image: productoPrueba, name: 'Starter Set Star Wars - Legion Imperial Troopers', price: '89.99EUR', releaseOrder: 3 },
		{ id: 903, image: productoPrueba, name: 'Expansion Star Wars - Legion: Jedi Knights', price: '49.99EUR', releaseOrder: 8 },
		{ id: 904, image: productoPrueba, name: 'Expansion Star Wars - Legion: Sith Operatives', price: '49.99EUR', releaseOrder: 7 },
		{ id: 905, image: productoPrueba, name: 'Star Wars - Legion Dice Pack', price: '14.99EUR', releaseOrder: 2 },
		{ id: 906, image: productoPrueba, name: 'Star Wars - Legion Movement Tools', price: '19.99EUR', releaseOrder: 6 },
		{ id: 907, image: productoPrueba, name: 'Star Wars - Legion Terrain Pack', price: '24.99EUR', releaseOrder: 5 },
		{ id: 908, image: productoPrueba, name: 'Star Wars - Legion Unit Cards', price: '9.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Star Wars - Legion"
			bannerImage={miniaturasBanner}
			bannerAlt="Banner de Star Wars Legion"
			bannerAriaLabel="Banner Star Wars Legion"
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="star-wars-legion-sort-select"
			sortAriaLabel="Ordenar productos Star Wars Legion"
			productsAriaLabel="Productos Star Wars Legion"
			pageClassName="card-game-page"
		/>
	)
}

export default StarWarsLegion