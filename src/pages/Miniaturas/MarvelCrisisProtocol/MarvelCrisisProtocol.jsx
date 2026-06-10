import { useContext } from 'react'
import marvelCrisisProtocolBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function MarvelCrisisProtocol() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="MARVEL CRISIS PROTOCOL"
			bannerImage={marvelCrisisProtocolBanner}
			bannerAlt="Banner de Marvel Crisis Protocol"
			bannerAriaLabel="Banner Marvel Crisis Protocol"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="marvel-crisis-protocol-sort-select"
			sortAriaLabel="Ordenar productos Marvel Crisis Protocol"
			productsAriaLabel="Productos Marvel Crisis Protocol"
			pageClassName="card-game-page"
		/>
	)
}

export default MarvelCrisisProtocol
