import { useContext } from 'react'
import italeriBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Italeri() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Italeri"
			bannerImage={italeriBanner}
			bannerAlt="Banner de Italeri"
			bannerAriaLabel="Banner Italeri"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="italeri-sort-select"
			sortAriaLabel="Ordenar productos Italeri"
			productsAriaLabel="Productos Italeri"
			pageClassName="card-game-page"
		/>
	)
}

export default Italeri
