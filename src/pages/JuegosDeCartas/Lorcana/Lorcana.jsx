import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import lorcanaBanner from '../../../resources/images/home/slider-home/slider-one-piece-tcg.png'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Lorcana() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 501, image: productoPrueba, name: 'Starter Deck Lorcana - Amber & Amethyst', price: '16.99EUR', releaseOrder: 4 },
		{ id: 502, image: productoPrueba, name: 'Starter Deck Lorcana - Ruby & Sapphire', price: '16.99EUR', releaseOrder: 3 },
		{ id: 503, image: productoPrueba, name: 'Booster Pack Lorcana - Set 1', price: '5.99EUR', releaseOrder: 8 },
		{ id: 504, image: productoPrueba, name: 'Display Lorcana - 24 Sobres', price: '99.99EUR', releaseOrder: 7 },
		{ id: 505, image: productoPrueba, name: 'Protectores Lorcana - Pack 100', price: '8.49EUR', releaseOrder: 2 },
		{ id: 506, image: productoPrueba, name: 'Tapete Lorcana - Diseño Oficial', price: '21.99EUR', releaseOrder: 6 },
		{ id: 507, image: productoPrueba, name: 'Album Lorcana - Collector', price: '14.99EUR', releaseOrder: 5 },
		{ id: 508, image: productoPrueba, name: 'Fundas Premium Lorcana', price: '7.49EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Lorcana"
			bannerImage={lorcanaBanner}
			bannerAlt="Banner de Lorcana"
			bannerAriaLabel="Banner Lorcana"
			bannerAside={
				<a
					href="https://www.cardmarket.com/es/Lorcana/Users/SantaAnaFriki/Offers/Singles"
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
			sortSelectId="lorcana-sort-select"
			sortAriaLabel="Ordenar productos Lorcana"
			productsAriaLabel="Productos Lorcana"
			pageClassName="card-game-page"
		/>
	)
}

export default Lorcana