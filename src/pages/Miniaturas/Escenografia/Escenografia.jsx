import { useContext } from 'react'
import escenografiaBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Escenografia() {
	const { addToCart } = useContext(CartContext)

	return (
		<CardGamePage
			title="EscenografÃ­a"
			bannerImage={escenografiaBanner}
			bannerAlt="Banner de EscenografÃ­a"
			bannerAriaLabel="Banner EscenografÃ­a"
		onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="escenografia-sort-select"
			sortAriaLabel="Ordenar productos EscenografÃ­a"
			productsAriaLabel="Productos EscenografÃ­a"
			pageClassName="card-game-page"
		/>
	)
}

export default Escenografia
