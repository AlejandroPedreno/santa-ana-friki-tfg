import { useContext } from 'react'
import maquetasBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function AcademyHobbyModelKits() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="Academy Hobby Model Kits"
			bannerImage={maquetasBanner}
			bannerAlt="Banner de Academy Hobby Model Kits"
			bannerAriaLabel="Banner Academy Hobby Model Kits"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="academy-hobby-model-kits-sort-select"
			sortAriaLabel="Ordenar productos Academy Hobby Model Kits"
			productsAriaLabel="Productos Academy Hobby Model Kits"
			pageClassName="card-game-page"
		/>
	)
}

export default AcademyHobbyModelKits
