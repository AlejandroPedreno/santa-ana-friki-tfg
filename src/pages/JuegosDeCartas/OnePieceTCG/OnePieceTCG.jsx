import { useContext } from 'react'
import onePieceBanner from '../../../resources/images/home/slider-home/slider-one-piece-tcg.png'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function OnePieceTCG() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="One Piece TCG"
			bannerImage={onePieceBanner}
			bannerAlt="Banner de One Piece TCG"
			bannerAriaLabel="Banner One Piece TCG"
			bannerAside={
				<a
					href="https://www.cardmarket.com/es/OnePiece/Users/SantaAnaFriki/Offers/Singles"
					target="_blank"
					rel="noopener noreferrer"
					className="one-piece-page__banner-link"
					aria-label="Cartas sueltas - Ir a CardMarket"
				>
					<img
						className="one-piece-page__banner-cartas-sueltas"
						src={cartasSueltas}
						alt="Cartas sueltas"
					/>
				</a>
			}
			onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="one-piece-sort-select"
			sortAriaLabel="Ordenar productos One Piece"
			productsAriaLabel="Productos One Piece TCG"
			pageClassName="one-piece-page"
		/>
	)
}

export default OnePieceTCG
