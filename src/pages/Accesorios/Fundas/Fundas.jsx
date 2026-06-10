import { useContext } from 'react'
import accesoriosBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Fundas() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Fundas"
			bannerImage={accesoriosBanner}
			bannerAlt="Banner de Fundas"
			bannerAriaLabel="Banner Fundas"
			onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="fundas-sort-select"
			sortAriaLabel="Ordenar productos Fundas"
			productsAriaLabel="Productos Fundas"
			pageClassName="card-game-page"
		/>
	)
}

export default Fundas
