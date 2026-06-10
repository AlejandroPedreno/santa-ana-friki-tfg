import { useEffect, useMemo, useState } from 'react'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import Product from '../Product/Product.jsx'
import { obtenerProductosCatalogo } from '../../services/catalogo/catalogoApi'
import './CardGamePage.css'

const defaultSortOptions = [
	{ value: 'launch-desc', label: 'Lanzamiento: mas reciente' },
	{ value: 'launch-asc', label: 'Lanzamiento: mas antiguo' },
	{ value: 'price-asc', label: 'Precio: menor a mayor' },
	{ value: 'price-desc', label: 'Precio: mayor a menor' },
]

const slugSeccionPorTitulo = {
	'Dragon Ball: Fusion World': 'dragon-ball-fusion-world',
	'Lorcana': 'lorcana',
	'Magic: The Gathering': 'magic-the-gathering',
	'Naruto Mythos': 'naruto-mythos',
	'Pokemon TCG': 'pokemon',
	'One Piece TCG': 'one-piece-tcg',
	'Riftbound': 'riftbound',
	'Yu-Gi-Oh!': 'yu-gi-oh',
	'Star Wars - Legion': 'star-wars-legion',
	'Warhammer': 'warhammer',
	'Escenografía': 'escenografia',
	'Blood Bowl': 'blood-bowl',
	'Middle-earth strategy battle game': 'middle-earth-strategy-battle-game',
	'MARVEL CRISIS PROTOCOL': 'marvel-crisis-protocol',
	'Figuras de colección': 'figuras-de-coleccion',
	'Academy Hobby Model Kits': 'academy-hobby-model-kits',
	'Blokees': 'blokees',
	'Diy Miniature': 'diy-miniature',
	'Italeri': 'italeri',
	'Revell': 'revell',
	'Pinturas': 'pinturas',
	'Fundas': 'fundas',
	'Tapetes': 'tapetes',
	'Deckbox': 'deckbox',
}

function CardGamePage({
	title,
	bannerImage,
	bannerAlt,
	bannerAriaLabel,
	bannerAside = null,
	topContent = null,
	toolbarLeftContent = null,
	products = [],
	productsFromDb = false,
	sectionSlug = '',
	subcategorySlug = '',
	onAddToCartProduct = null,
	initialSortBy = 'launch-desc',
	sortSelectId,
	sortAriaLabel,
	productsAriaLabel,
	pageClassName = '',
	sortOptions = defaultSortOptions,
}) {
	const [orden, setOrden] = useState(initialSortBy)
	const [productosRemotos, setProductosRemotos] = useState([])
	const [cargando, setCargando] = useState(false)
	const [errorCarga, setErrorCarga] = useState('')
	const slugSeccionResuelto = sectionSlug || slugSeccionPorTitulo[title] || ''
	const usarBbdd = productsFromDb || slugSeccionResuelto !== ''

	useEffect(() => {
		if (!usarBbdd || !slugSeccionResuelto) {
			return
		}

		let isCancelled = false
		setCargando(true)
		setErrorCarga('')

			obtenerProductosCatalogo({
			section: slugSeccionResuelto,
			subcategory: subcategorySlug || undefined,
			limit: 200,
		})
			.then((rows) => {
				if (isCancelled) return

				const productosNormalizados = rows.map((row) => {
					const rutaImagen = String(row.image_path || row.image || '')
					const imagenNormalizada = rutaImagen.startsWith('http')
						? rutaImagen
						: rutaImagen.startsWith('/')
							? rutaImagen
							: `/${rutaImagen}`

					return {
						id: row.id,
						name: row.name,
						image: imagenNormalizada,
						price: `${Number(row.price || 0).toFixed(2)}EUR`,
						releaseOrder: Number(row.release_order || row.releaseOrder || 0),
						inStock: Boolean(row.in_stock ?? row.inStock ?? true),
						onAddToCart: () => onAddToCartProduct?.({
							id: row.id,
							image: imagenNormalizada,
							name: row.name,
							price: `${Number(row.price || 0).toFixed(2)}EUR`,
							releaseOrder: Number(row.release_order || row.releaseOrder || 0),
							inStock: Boolean(row.in_stock ?? row.inStock ?? true),
						}),
					}
				})

				setProductosRemotos(productosNormalizados)
			})
			.catch((error) => {
				if (isCancelled) return
				setErrorCarga(error?.message || 'No se pudieron cargar los productos')
				setProductosRemotos([])
			})
			.finally(() => {
				if (!isCancelled) {
					setCargando(false)
				}
			})

		return () => {
			isCancelled = true
		}
	}, [onAddToCartProduct, slugSeccionResuelto, subcategorySlug, usarBbdd])

	const productosFuente = usarBbdd ? productosRemotos : products

	const sortedProducts = useMemo(() => {
		const parsePrice = (value) => Number.parseFloat(String(value).replace(/€|EUR/g, '').trim())

		return [...productosFuente].sort((a, b) => {
			if (orden === 'price-asc') {
				return parsePrice(a.price) - parsePrice(b.price)
			}

			if (orden === 'price-desc') {
				return parsePrice(b.price) - parsePrice(a.price)
			}

			if (orden === 'launch-asc') {
				return a.releaseOrder - b.releaseOrder
			}

			return b.releaseOrder - a.releaseOrder
		})
	}, [orden, productosFuente])

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
							value={orden}
							onChange={(event) => setOrden(event.target.value)}
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
					{cargando ? <p>Cargando productos...</p> : null}
					{errorCarga ? <p>No se pudieron cargar productos desde la base de datos: {errorCarga}</p> : null}
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