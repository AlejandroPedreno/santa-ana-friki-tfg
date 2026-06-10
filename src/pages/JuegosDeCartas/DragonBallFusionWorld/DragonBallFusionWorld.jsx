import { useContext } from 'react'
import dragonBallBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function DragonBallFusionWorld() {
	const { addToCart } = useContext(CartContext)

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
			onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="dragon-ball-sort-select"
			sortAriaLabel="Ordenar productos Dragon Ball Fusion World"
			productsAriaLabel="Productos Dragon Ball Fusion World"
			pageClassName="card-game-page"
		/>
	)
}

export default DragonBallFusionWorld