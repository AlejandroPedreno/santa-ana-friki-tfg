import { useContext } from 'react'
import accesoriosBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Tapetes() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Tapetes"
			bannerImage={accesoriosBanner}
			bannerAlt="Banner de Tapetes"
			bannerAriaLabel="Banner Tapetes"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="tapetes-sort-select"
			sortAriaLabel="Ordenar productos Tapetes"
			productsAriaLabel="Productos Tapetes"
			pageClassName="card-game-page"
		/>
	)
}

export default Tapetes
