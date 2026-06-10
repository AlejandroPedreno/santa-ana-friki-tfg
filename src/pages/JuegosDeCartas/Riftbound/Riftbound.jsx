import { useContext } from 'react'
import riftboundBanner from '../../../resources/images/home/slider-home/slider-riftbound.webp'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Riftbound() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Riftbound"
			bannerImage={riftboundBanner}
			bannerAlt="Banner de Riftbound"
			bannerAriaLabel="Banner Riftbound"
			bannerAside={
				<a
					href="https://www.cardmarket.com/es/Riftbound/Users/SantaAnaFriki/Offers/Singles"
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
			sortSelectId="riftbound-sort-select"
			sortAriaLabel="Ordenar productos Riftbound"
			productsAriaLabel="Productos Riftbound"
			pageClassName="riftbound-page"
		/>
	)
}

export default Riftbound
