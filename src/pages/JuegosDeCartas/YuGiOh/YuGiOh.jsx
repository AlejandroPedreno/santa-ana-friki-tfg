import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import ygoBanner from '../../../resources/images/home/slider-home/slider-one-piece-tcg.png'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function YuGiOh() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{ id: 801, image: productoPrueba, name: 'Starter Deck Yu-Gi-Oh! - Dark Magician', price: '14.99EUR', releaseOrder: 4 },
		{ id: 802, image: productoPrueba, name: 'Starter Deck Yu-Gi-Oh! - Blue-Eyes', price: '14.99EUR', releaseOrder: 3 },
		{ id: 803, image: productoPrueba, name: 'Booster Yu-Gi-Oh! - Set 1', price: '4.49EUR', releaseOrder: 8 },
		{ id: 804, image: productoPrueba, name: 'Display Yu-Gi-Oh! - 24 Sobres', price: '84.99EUR', releaseOrder: 7 },
		{ id: 805, image: productoPrueba, name: 'Protectores Yu-Gi-Oh! - Pack 100', price: '8.99EUR', releaseOrder: 2 },
		{ id: 806, image: productoPrueba, name: 'Playmat Yu-Gi-Oh! - Oficial', price: '21.99EUR', releaseOrder: 6 },
		{ id: 807, image: productoPrueba, name: 'Deckbox Yu-Gi-Oh! - Red', price: '12.49EUR', releaseOrder: 5 },
		{ id: 808, image: productoPrueba, name: 'Fundas Yu-Gi-Oh! - Pack 100', price: '6.99EUR', releaseOrder: 1 },
	]

	return (
		<CardGamePage
			title="Yu-Gi-Oh!"
			bannerImage={ygoBanner}
			bannerAlt="Banner de Yu-Gi-Oh!"
			bannerAriaLabel="Banner Yu-Gi-Oh!"
			bannerAside={
				<a
					href="https://www.cardmarket.com/es/YuGiOh/Users/SantaAnaFriki/Offers/Singles"
					target="_blank"
					rel="noopener noreferrer"
					className="one-piece-page__banner-link"
					aria-label="Cartas sueltas - Ir a CardMarket"
				>
					<img className="one-piece-page__banner-cartas-sueltas" src={cartasSueltas} alt="Cartas sueltas" />
				</a>
			}
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="yu-gi-oh-sort-select"
			sortAriaLabel="Ordenar productos Yu-Gi-Oh!"
			productsAriaLabel="Productos Yu-Gi-Oh!"
			pageClassName="card-game-page"
		/>
	)
}

export default YuGiOh