import { useContext, useMemo, useState } from 'react'
import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import Product from '../../../components/Product/Product.jsx'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import riftboundBanner from '../../../resources/images/home/slider-home/slider-riftbound.webp'
import { CartContext } from '../../../context/CartContext.jsx'
import './Riftbound.css'

function Riftbound() {
	const { addToCart } = useContext(CartContext)
	const [sortBy, setSortBy] = useState('launch-desc')

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

	const sortedProducts = useMemo(() => {
		const parsePrice = (value) => parseFloat(value.replace('EUR', '').trim())

		const ordered = [...products].sort((a, b) => {
			if (sortBy === 'price-asc') {
				return parsePrice(a.price) - parsePrice(b.price)
			}

			if (sortBy === 'price-desc') {
				return parsePrice(b.price) - parsePrice(a.price)
			}

			if (sortBy === 'launch-asc') {
				return a.releaseOrder - b.releaseOrder
			}

			return b.releaseOrder - a.releaseOrder
		})

		return ordered
	}, [products, sortBy])

	return (
		<>
			<Header />

			<main className="riftbound-page">
				<section className="riftbound-page__banner" aria-label="Banner Riftbound">
					<img
						className="riftbound-page__banner-image"
						src={riftboundBanner}
						alt="Banner de Riftbound"
					/>
				</section>

				<section className="riftbound-page__toolbar" aria-label="Ordenar productos Riftbound">
					<label className="riftbound-page__toolbar-label" htmlFor="riftbound-sort-select">
						Ordenar por
					</label>
					<select
						id="riftbound-sort-select"
						className="riftbound-page__toolbar-select"
						value={sortBy}
						onChange={(event) => setSortBy(event.target.value)}
					>
						<option value="launch-desc">Lanzamiento: más reciente</option>
						<option value="launch-asc">Lanzamiento: más antiguo</option>
						<option value="price-asc">Precio: menor a mayor</option>
						<option value="price-desc">Precio: mayor a menor</option>
					</select>
				</section>

				<section className="riftbound-page__products" aria-label="Productos Riftbound">
					{sortedProducts.map((product) => (
						<Product
							key={product.id}
							image={product.image}
							name={product.name}
							price={product.price}
							onAddToCart={() => addToCart(product)}
						/>
					))}
				</section>
			</main>

			<Footer />
		</>
	)
}

export default Riftbound
