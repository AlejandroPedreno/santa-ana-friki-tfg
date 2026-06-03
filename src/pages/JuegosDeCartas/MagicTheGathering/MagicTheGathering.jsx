import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import magicBanner from '../../../resources/images/home/slider-home/slider-riftbound.webp'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function MagicTheGathering() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 601, image: productoPrueba, name: 'Starter Deck Magic - Esper Control', price: '19.99EUR', releaseOrder: 4 },
		{ id: 602, image: productoPrueba, name: 'Starter Deck Magic - Red Aggro', price: '19.99EUR', releaseOrder: 3 },
		{ id: 603, image: productoPrueba, name: 'Booster Magic - Set 1', price: '5.49EUR', releaseOrder: 8 },
		{ id: 604, image: productoPrueba, name: 'Display Magic - 36 Sobres', price: '129.99EUR', releaseOrder: 7 },
		{ id: 605, image: productoPrueba, name: 'Protectores Magic - Pack 100', price: '9.49EUR', releaseOrder: 2 },
		{ id: 606, image: productoPrueba, name: 'Playmat Magic - Diseño Oficial', price: '24.99EUR', releaseOrder: 6 },
		{ id: 607, image: productoPrueba, name: 'Deckbox Magic - Premium', price: '12.99EUR', releaseOrder: 5 },
		{ id: 608, image: productoPrueba, name: 'Fundas Magic - Pack 100', price: '6.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Magic: The Gathering"
			bannerImage={magicBanner}
			bannerAlt="Banner de Magic The Gathering"
			bannerAriaLabel="Banner Magic The Gathering"
			bannerAside={
				<a
					href="https://www.cardmarket.com/es/Magic/Users/SantaAnaFriki/Offers/Singles"
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
			sortSelectId="magic-sort-select"
			sortAriaLabel="Ordenar productos Magic The Gathering"
			productsAriaLabel="Productos Magic The Gathering"
			pageClassName="card-game-page"
		/>
	)
}

export default MagicTheGathering