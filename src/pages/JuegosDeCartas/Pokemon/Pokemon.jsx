import { useContext } from 'react'
import pokemonBanner from '../../../resources/images/home/slider-home/slider-riftbound.jpg'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Pokemon() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Pokemon TCG"
			bannerImage={pokemonBanner}
			bannerAlt="Banner de Pokemon TCG"
			bannerAriaLabel="Banner Pokemon TCG"
			bannerAside={
				<a
					href="https://www.cardmarket.com/es/Pokemon/Users/SantaAnaFriki/Offers/Singles"
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
			sortSelectId="pokemon-sort-select"
			sortAriaLabel="Ordenar productos Pokemon"
			productsAriaLabel="Productos Pokemon TCG"
			pageClassName="pokemon-page"
		/>
	)
}

export default Pokemon