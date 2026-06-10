import { useContext } from 'react'
import middleEarthBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function MiddleEarthStrategyBattleGame() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Middle-earth strategy battle game"
			bannerImage={middleEarthBanner}
			bannerAlt="Banner de Middle-earth strategy battle game"
			bannerAriaLabel="Banner Middle-earth strategy battle game"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="middle-earth-sort-select"
			sortAriaLabel="Ordenar productos Middle-earth strategy battle game"
			productsAriaLabel="Productos Middle-earth strategy battle game"
			pageClassName="card-game-page"
		/>
	)
}

export default MiddleEarthStrategyBattleGame
