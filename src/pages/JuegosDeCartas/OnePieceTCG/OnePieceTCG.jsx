import { useContext } from 'react'
import st28 from '../../../resources/images/prueba/st28.png'
import st27 from '../../../resources/images/prueba/st27.png'
import st25 from '../../../resources/images/prueba/st25.png'
import st21 from '../../../resources/images/prueba/st21.png'
import st20 from '../../../resources/images/prueba/st20.png'
import st19 from '../../../resources/images/prueba/st19.png'
import st15 from '../../../resources/images/prueba/st15.png'
import st08 from '../../../resources/images/prueba/st08.png'
import onePieceBanner from '../../../resources/images/home/slider-home/slider-one-piece-tcg.png'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function OnePieceTCG() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{
			id: 101,
			image: st28,
			name: 'One Piece Card Game: Starter Deck GREEN YELLOW YAMATO ST-28 (Ingles)',
			price: '14.95€',
			releaseOrder: 1,
		},
		{
			id: 102,
			image: st27,
			name: 'One Piece Card Game: Starter Deck BLACK MARSHALL.D.TEACH ST-27 (Inglés)',
			price: '14.95€',
			releaseOrder: 2,
		},
		{
			id: 103,
			image: st25,
			name: 'One Piece Card Game: Starter Deck BLUE BUGGY ST-25 (Inglés)',
			price: '14.95€',
			releaseOrder: 8,
			inStock: false,
		},
		{
			id: 104,
			image: st21,
			name: 'One Piece Card Game: Starter Deck Ex GEAR 5 ST-21 (Inglés)',
			price: '34.95€',
			releaseOrder: 7,
		},
		{
			id: 105,
			image: st20,
			name: 'One Piece Card Game: Starter Deck YELLOW KATAKURI ST-20 (Inglés)',
			price: '14.95€',
			releaseOrder: 3,
		},
		{
			id: 106,
			image: st19,
			name: 'One Piece Card Game: Starter Deck BLACK SMOKER ST-19 (Inglés)',
			price: '14.95€',
			releaseOrder: 5,
		},
		{
			id: 107,
			image: st15,
			name: 'One Piece Card Game: Starter Deck RED WHITEBEARD ST-15 (Inglés)',
			price: '14.95€',
			releaseOrder: 6,
		},
		{
			id: 108,
			image: st08,
			name: 'One Piece Card Game: Starter Deck MONKEY.D.LUFFY ST-08 (Inglés)',
			price: '14.95€',
			releaseOrder: 4,
		},
	]

	return (
		<CardGamePage
			title="One Piece TCG"
			bannerImage={onePieceBanner}
			bannerAlt="Banner de One Piece TCG"
			bannerAriaLabel="Banner One Piece TCG"
			bannerAside={
				<a
					href="https://www.cardmarket.com/es/OnePiece/Users/SantaAnaFriki/Offers/Singles"
					target="_blank"
					rel="noopener noreferrer"
					className="one-piece-page__banner-link"
					aria-label="Cartas sueltas - Ir a CardMarket"
				>
					<img
						className="one-piece-page__banner-cartas-sueltas"
						src={cartasSueltas}
						alt="Cartas sueltas"
					/>
				</a>
			}
			products={products.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="one-piece-sort-select"
			sortAriaLabel="Ordenar productos One Piece"
			productsAriaLabel="Productos One Piece TCG"
			pageClassName="one-piece-page"
		/>
	)
}

export default OnePieceTCG
