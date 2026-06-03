import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import dragonBallBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function DragonBallFusionWorld() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 401, image: productoPrueba, name: 'Starter Deck Dragon Ball Fusion World - Goku', price: '12.99EUR', releaseOrder: 4 },
		{ id: 402, image: productoPrueba, name: 'Starter Deck Dragon Ball Fusion World - Vegeta', price: '12.99EUR', releaseOrder: 3 },
		{ id: 403, image: productoPrueba, name: 'Booster Pack Dragon Ball Fusion World - Set 1', price: '4.99EUR', releaseOrder: 8 },
		{ id: 404, image: productoPrueba, name: 'Display Dragon Ball Fusion World - 24 Sobres', price: '89.99EUR', releaseOrder: 7 },
		{ id: 405, image: productoPrueba, name: 'Protectores Dragon Ball Fusion World - Pack 100', price: '8.99EUR', releaseOrder: 2 },
		{ id: 406, image: productoPrueba, name: 'Tapete Dragon Ball Fusion World - Oficial', price: '19.99EUR', releaseOrder: 6 },
		{ id: 407, image: productoPrueba, name: 'Caja de Almacenamiento Dragon Ball Fusion World', price: '24.99EUR', releaseOrder: 5 },
		{ id: 408, image: productoPrueba, name: 'Fundas Premium Dragon Ball Fusion World', price: '7.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Dragon Ball: Fusion World"
			bannerImage={dragonBallBanner}
			bannerAlt="Banner de Dragon Ball Fusion World"
			bannerAriaLabel="Banner Dragon Ball Fusion World"
			bannerAside={
				<a
					href="https://www.cardmarket.com/es/DragonBallSuper/Users/SantaAnaFriki/Offers/Singles"
					target="_blank"
					rel="noopener noreferrer"
					className="one-piece-page__banner-link"
					aria-label="Cartas sueltas - Ir a CardMarket"
				>
					<img className="one-piece-page__banner-cartas-sueltas" src={cartasSueltas} alt="Cartas sueltas" />
				</a>
			}
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="dragon-ball-sort-select"
			sortAriaLabel="Ordenar productos Dragon Ball Fusion World"
			productsAriaLabel="Productos Dragon Ball Fusion World"
			pageClassName="card-game-page"
		/>
	)
}

export default DragonBallFusionWorld