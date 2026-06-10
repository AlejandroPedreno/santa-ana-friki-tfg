import { useContext } from 'react'
import narutoBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function NarutoMythos() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Naruto Mythos"
			bannerImage={narutoBanner}
			bannerAlt="Banner de Naruto Mythos"
			bannerAriaLabel="Banner Naruto Mythos"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="naruto-sort-select"
			sortAriaLabel="Ordenar productos Naruto Mythos"
			productsAriaLabel="Productos Naruto Mythos"
			pageClassName="card-game-page"
		/>
	)
}

export default NarutoMythos
