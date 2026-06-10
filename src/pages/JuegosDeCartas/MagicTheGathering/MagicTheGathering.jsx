import { useContext } from 'react'
import magicBanner from '../../../resources/images/home/slider-home/slider-riftbound.webp'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function MagicTheGathering() {
	const { addToCart } = useContext(CartContext)

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
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="magic-sort-select"
			sortAriaLabel="Ordenar productos Magic The Gathering"
			productsAriaLabel="Productos Magic The Gathering"
			pageClassName="card-game-page"
		/>
	)
}

export default MagicTheGathering
