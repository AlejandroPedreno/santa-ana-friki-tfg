import { useContext } from 'react'
import lorcanaBanner from '../../../resources/images/home/slider-home/slider-one-piece-tcg.png'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Lorcana() {
	const { addToCart } = useContext(CartContext)

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
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="lorcana-sort-select"
			sortAriaLabel="Ordenar productos Lorcana"
			productsAriaLabel="Productos Lorcana"
			pageClassName="card-game-page"
		/>
	)
}

export default Lorcana
