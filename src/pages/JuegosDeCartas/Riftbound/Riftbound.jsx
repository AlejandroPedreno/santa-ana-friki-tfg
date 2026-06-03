import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import riftboundBanner from '../../../resources/images/home/slider-home/slider-riftbound.webp'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Riftbound() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{
			id: 201,
			image: productoPrueba,
			name: 'Booster Pack Riftbound Set 1 - Español',
			price: '4.99EUR',
			releaseOrder: 1,
		},
		{
			id: 202,
			image: productoPrueba,
			name: 'Starter Deck Riftbound - Español',
			price: '12.99EUR',
			releaseOrder: 2,
		},
		{
			id: 203,
			image: productoPrueba,
			name: 'Display Booster 24 Sobres - Riftbound',
			price: '89.99EUR',
			releaseOrder: 8,
		},
		{
			id: 204,
			image: productoPrueba,
			name: 'Playset Cartas Legendarias - Riftbound',
			price: '54.99EUR',
			releaseOrder: 7,
		},
		{
			id: 205,
			image: productoPrueba,
			name: 'Protectores Cartas Riftbound - Pack 100',
			price: '8.99EUR',
			releaseOrder: 3,
		},
		{
			id: 206,
			image: productoPrueba,
			name: 'Tapete de Juego Riftbound - Diseño Oficial',
			price: '19.99EUR',
			releaseOrder: 5,
		},
		{
			id: 207,
			image: productoPrueba,
			name: 'Caja de Almacenamiento Riftbound - Roja',
			price: '24.99EUR',
			releaseOrder: 6,
		},
		{
			id: 208,
			image: productoPrueba,
			name: 'Dados Premium Riftbound - Set',
			price: '9.99EUR',
			releaseOrder: 4,
		},
	]

	return (
		<CardGamePage
			title="Riftbound"
			bannerImage={riftboundBanner}
			bannerAlt="Banner de Riftbound"
			bannerAriaLabel="Banner Riftbound"
			bannerAside={
				<a
					href="https://www.cardmarket.com/es/Riftbound/Users/SantaAnaFriki/Offers/Singles"
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
			sortSelectId="riftbound-sort-select"
			sortAriaLabel="Ordenar productos Riftbound"
			productsAriaLabel="Productos Riftbound"
			pageClassName="riftbound-page"
		/>
	)
}

export default Riftbound
