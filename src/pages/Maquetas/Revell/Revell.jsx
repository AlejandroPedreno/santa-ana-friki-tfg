import { useContext } from 'react'
import revellBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Revell() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Revell"
			bannerImage={revellBanner}
			bannerAlt="Banner de Revell"
			bannerAriaLabel="Banner Revell"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="revell-sort-select"
			sortAriaLabel="Ordenar productos Revell"
			productsAriaLabel="Productos Revell"
			pageClassName="card-game-page"
		/>
	)
}

export default Revell
