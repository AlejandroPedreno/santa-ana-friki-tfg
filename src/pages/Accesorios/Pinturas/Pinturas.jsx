import { useContext } from 'react'
import accesoriosBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Pinturas() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Pinturas"
			bannerImage={accesoriosBanner}
			bannerAlt="Banner de Pinturas"
			bannerAriaLabel="Banner Pinturas"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="pinturas-sort-select"
			sortAriaLabel="Ordenar productos Pinturas"
			productsAriaLabel="Productos Pinturas"
			pageClassName="card-game-page"
		/>
	)
}

export default Pinturas
