import { useContext } from 'react'
import miniaturasBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function StarWarsLegion() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Star Wars - Legion"
			bannerImage={miniaturasBanner}
			bannerAlt="Banner de Star Wars Legion"
			bannerAriaLabel="Banner Star Wars Legion"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="star-wars-legion-sort-select"
			sortAriaLabel="Ordenar productos Star Wars Legion"
			productsAriaLabel="Productos Star Wars Legion"
			pageClassName="card-game-page"
		/>
	)
}

export default StarWarsLegion
