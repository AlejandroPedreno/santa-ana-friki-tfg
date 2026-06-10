import { useContext } from 'react'
import diyMiniatureBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function DiyMiniature() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Diy Miniature"
			bannerImage={diyMiniatureBanner}
			bannerAlt="Banner de Diy Miniature"
			bannerAriaLabel="Banner Diy Miniature"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="diy-miniature-sort-select"
			sortAriaLabel="Ordenar productos Diy Miniature"
			productsAriaLabel="Productos Diy Miniature"
			pageClassName="card-game-page"
		/>
	)
}

export default DiyMiniature
