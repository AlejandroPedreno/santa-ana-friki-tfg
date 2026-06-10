import { useContext } from 'react'
import blokeesBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Blokees() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Blokees"
			bannerImage={blokeesBanner}
			bannerAlt="Banner de Blokees"
			bannerAriaLabel="Banner Blokees"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="blokees-sort-select"
			sortAriaLabel="Ordenar productos Blokees"
			productsAriaLabel="Productos Blokees"
			pageClassName="card-game-page"
		/>
	)
}

export default Blokees
