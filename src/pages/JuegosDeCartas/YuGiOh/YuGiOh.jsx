import { useContext } from 'react'
import ygoBanner from '../../../resources/images/home/slider-home/slider-one-piece-tcg.png'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function YuGiOh() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Yu-Gi-Oh!"
			bannerImage={ygoBanner}
			bannerAlt="Banner de Yu-Gi-Oh!"
			bannerAriaLabel="Banner Yu-Gi-Oh!"
			bannerAside={
				<a
					href="https://www.cardmarket.com/es/YuGiOh/Users/SantaAnaFriki/Offers/Singles"
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
			sortSelectId="yu-gi-oh-sort-select"
			sortAriaLabel="Ordenar productos Yu-Gi-Oh!"
			productsAriaLabel="Productos Yu-Gi-Oh!"
			pageClassName="card-game-page"
		/>
	)
}

export default YuGiOh
