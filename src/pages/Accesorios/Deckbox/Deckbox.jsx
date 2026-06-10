import { useContext } from 'react'
import accesoriosBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Deckbox() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Deckbox"
			bannerImage={accesoriosBanner}
			bannerAlt="Banner de Deckbox"
			bannerAriaLabel="Banner Deckbox"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="deckbox-sort-select"
			sortAriaLabel="Ordenar productos Deckbox"
			productsAriaLabel="Productos Deckbox"
			pageClassName="card-game-page"
		/>
	)
}

export default Deckbox
