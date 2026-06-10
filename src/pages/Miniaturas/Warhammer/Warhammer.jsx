import { useContext, useEffect, useState } from 'react'
import warhammerBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'
import { obtenerSubcategoriasMiniaturas } from '../../../services/catalogo/miniaturas'

function Warhammer() {
	const { addToCart } = useContext(CartContext)
	const [selectedCategory, setSelectedCategory] = useState('all')
	const [categories, setCategories] = useState([{ value: 'all', label: 'Todas' }])

	useEffect(() => {
		obtenerSubcategoriasMiniaturas('warhammer')
			.then((subcategorias) => {
				const categoriasDB = subcategorias.map((subcategory) => ({
					value: subcategory.slug,
					label: subcategory.name,
				}))

				setCategories([{ value: 'all', label: 'Todas' }, ...categoriasDB])
			})
			.catch(() => {
				setCategories([{ value: 'all', label: 'Todas' }])
			})
	}, [])

	return (
		<CardGamePage
			title="Warhammer"
			bannerImage={warhammerBanner}
			bannerAlt="Banner de Warhammer"
			bannerAriaLabel="Banner Warhammer"
			toolbarLeftContent={
				<>
					<label className="card-game-page__toolbar-label" htmlFor="warhammer-category-select">
						Buscar por categoría:
					</label>
					<select
						id="warhammer-category-select"
						className="card-game-page__category-select"
						value={selectedCategory}
						onChange={(event) => setSelectedCategory(event.target.value)}
					>
						{categories.map((category) => (
							<option key={category.value} value={category.value}>
								{category.label}
							</option>
						))}
					</select>
				</>
			}
			sectionSlug="warhammer"
			productsFromDb
			subcategorySlug={selectedCategory === 'all' ? '' : selectedCategory}
			onAddToCartProduct={addToCart}
			initialSortBy="launch-desc"
			sortSelectId="warhammer-sort-select"
			sortAriaLabel="Ordenar productos Warhammer"
			productsAriaLabel="Productos Warhammer"
			pageClassName="card-game-page"
		/>
	)
}

export default Warhammer