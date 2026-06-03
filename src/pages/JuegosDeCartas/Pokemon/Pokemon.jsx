import { useContext } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import pokemonBanner from '../../../resources/images/home/slider-home/slider-riftbound.webp'
import cartasSueltas from '../../../resources/images/cartas-sueltas.png'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Pokemon() {
	const { addToCart } = useContext(CartContext)

	const products = [
		{
			id: 301,
			image: productoPrueba,
			name: 'Display Pokemon Set Temporal Forces - Español',
			price: '154.99EUR',
			releaseOrder: 8,
		},
		{
			id: 302,
			image: productoPrueba,
			name: 'ETB Pokemon Set Temporal Forces - Español',
			price: '59.99EUR',
			releaseOrder: 7,
		},
		{
			id: 303,
			image: productoPrueba,
			name: 'Booster Bundle Pokemon Surging Sparks - Español',
			price: '34.99EUR',
			releaseOrder: 6,
		},
		{
			id: 304,
			image: productoPrueba,
			name: 'Caja de Entrenador Elite Heroes Ascendentes - Español',
			price: '69.99EUR',
			releaseOrder: 5,
		},
		{
			id: 305,
			image: productoPrueba,
			name: 'Pack 3 Sobres Pokemon Paldea Evolved - Español',
			price: '14.99EUR',
			releaseOrder: 4,
		},
		{
			id: 306,
			image: productoPrueba,
			name: 'Sobre Suelto Pokemon Scarlet and Violet - Español',
			price: '4.99EUR',
			releaseOrder: 3,
		},
		{
			id: 307,
			image: productoPrueba,
			name: 'Portamazos Premium Pokemon - Rojo',
			price: '11.99EUR',
			releaseOrder: 2,
		},
		{
			id: 308,
			image: productoPrueba,
			name: 'Fundas Protectoras Pokemon Pack 100 - Negro',
			price: '7.99EUR',
			releaseOrder: 1,
		},
	]

	return (
		<CardGamePage
			title="Pokemon TCG"
			bannerImage={pokemonBanner}
			bannerAlt="Banner de Pokemon TCG"
			bannerAriaLabel="Banner Pokemon TCG"
			bannerAside={
				<a
					href="https://www.cardmarket.com/es/Pokemon/Users/SantaAnaFriki/Offers/Singles"
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
			sortSelectId="pokemon-sort-select"
			sortAriaLabel="Ordenar productos Pokemon"
			productsAriaLabel="Productos Pokemon TCG"
			pageClassName="pokemon-page"
		/>
	)
}

export default Pokemon