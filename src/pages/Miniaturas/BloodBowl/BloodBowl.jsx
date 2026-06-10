import { useContext } from 'react'
import bloodBowlBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function BloodBowl() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Blood Bowl"
			bannerImage={bloodBowlBanner}
			bannerAlt="Banner de Blood Bowl"
			bannerAriaLabel="Banner Blood Bowl"
			onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="blood-bowl-sort-select"
			sortAriaLabel="Ordenar productos Blood Bowl"
			productsAriaLabel="Productos Blood Bowl"
			pageClassName="card-game-page"
		/>
	)
}

export default BloodBowl