import { useMemo, useState } from 'react'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import Product from '../Product/Product.jsx'
import './CardGamePage.css'

const defaultSortOptions = [
	{ value: 'launch-desc', label: 'Lanzamiento: mas reciente' },
	{ value: 'launch-asc', label: 'Lanzamiento: mas antiguo' },
	{ value: 'price-asc', label: 'Precio: menor a mayor' },
	{ value: 'price-desc', label: 'Precio: mayor a menor' },
]

function CardGamePage({
	title,
	bannerImage,
	bannerAlt,
	bannerAriaLabel,
	bannerAside = null,
	topContent = null,
	toolbarLeftContent = null,
	products,
	initialSortBy = 'launch-desc',
	sortSelectId,
	sortAriaLabel,
	productsAriaLabel,
	pageClassName = '',
	sortOptions = defaultSortOptions,
}) {
	const [sortBy, setSortBy] = useState(initialSortBy)

	const sortedProducts = useMemo(() => {
		const parsePrice = (value) => Number.parseFloat(String(value).replace(/€|EUR/g, '').trim())

		return [...products].sort((a, b) => {
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
	}, [products, sortBy])

	return (
		<>
			<Header />

			<main className={`card-game-page ${pageClassName}`.trim()}>
				<section className="card-game-page__banner-container" aria-label={bannerAriaLabel}>
					<div className="card-game-page__banner">
						<img className="card-game-page__banner-image" src={bannerImage} alt={bannerAlt} />
					</div>
					{bannerAside}
				</section>

				{topContent}

				<section className="card-game-page__toolbar" aria-label={sortAriaLabel}>
					<div className="card-game-page__toolbar-left">{toolbarLeftContent}</div>
					<div className="card-game-page__toolbar-right">
						<label className="card-game-page__toolbar-label" htmlFor={sortSelectId}>
							Ordenar por
						</label>
					<select
						id={sortSelectId}
						className="card-game-page__toolbar-select"
						value={sortBy}
						onChange={(event) => setSortBy(event.target.value)}
					>
						{sortOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					</div>
				</section>

				<section className="card-game-page__products" aria-label={productsAriaLabel}>
					{sortedProducts.map((product) => (
						<Product
							key={product.id}
							image={product.image}
							name={product.name}
							price={product.price}
							onAddToCart={product.onAddToCart}
							inStock={product.inStock !== false}
						/>
					))}
				</section>
			</main>

			<Footer />
		</>
	)
}

export default CardGamePage