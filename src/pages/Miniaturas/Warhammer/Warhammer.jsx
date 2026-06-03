import { useContext, useMemo, useState } from 'react'
import productoPrueba from '../../../resources/images/home/producto-prueba.webp'
import warhammerBanner from '../../../resources/images/home/slider-home/slider-warhammer.jpg'
import { CartContext } from '../../../context/CartContext.jsx'
import CardGamePage from '../../../components/CardGamePage/CardGamePage.jsx'

function Warhammer() {
	const { addToCart } = useContext(CartContext)
	const [selectedCategory, setSelectedCategory] = useState('all')

	const categories = [
		{ value: 'all', label: 'Todas' },
		{ value: 'the horus heresy', label: 'THE HORUS HERESY' },
		{ value: 'warhammer 40.000 - kill team', label: 'Warhammer 40.000 - KILL TEAM' },
		{ value: 'warhammer 40000', label: 'WARHAMMER 40000' },
		{ value: 'warhammer age of sigmar', label: 'WARHAMMER AGE OF SIGMAR' },
		{ value: 'warhammer dados', label: 'WARHAMMER DADOS' },
		{ value: 'warhammer necromunda', label: 'WARHAMMER NECROMUNDA' },
		{ value: 'warhammer underworlds', label: 'WARHAMMER UNDERWORLDS' },
		{ value: 'warhammer warcry', label: 'WARHAMMER WARCRY' },
		{ value: 'warhammer quest', label: 'WARHAMMER QUEST' },
	]

	const products = [
		{ id: 1001, image: productoPrueba, name: 'THE HORUS HERESY - Age of Darkness Starter Set', price: '129.99EUR', releaseOrder: 4, category: 'the horus heresy' },
		{ id: 1002, image: productoPrueba, name: 'Warhammer 40.000 - KILL TEAM Starter Set', price: '129.99EUR', releaseOrder: 3, category: 'warhammer 40.000 - kill team' },
		{ id: 1003, image: productoPrueba, name: 'WARHAMMER 40000 - Leviathan Box', price: '44.99EUR', releaseOrder: 8, category: 'warhammer 40000' },
		{ id: 1004, image: productoPrueba, name: 'WARHAMMER AGE OF SIGMAR - Starter Set', price: '29.99EUR', releaseOrder: 7, category: 'warhammer age of sigmar' },
		{ id: 1005, image: productoPrueba, name: 'WARHAMMER DADOS - Dice Set', price: '12.99EUR', releaseOrder: 2, category: 'warhammer dados' },
		{ id: 1006, image: productoPrueba, name: 'WARHAMMER NECROMUNDA - Underhive Gang', price: '24.99EUR', releaseOrder: 6, category: 'warhammer necromunda' },
		{ id: 1007, image: productoPrueba, name: 'WARHAMMER UNDERWORLDS - Starter Set', price: '34.99EUR', releaseOrder: 5, category: 'warhammer underworlds' },
		{ id: 1008, image: productoPrueba, name: 'WARHAMMER WARCRY - Ruins of the Mortal Realms', price: '16.99EUR', releaseOrder: 1, category: 'warhammer warcry' },
		{ id: 1009, image: productoPrueba, name: 'WARHAMMER QUEST - Cursed City', price: '59.99EUR', releaseOrder: 9, category: 'warhammer quest' },
	]

	const visibleProducts = useMemo(() => {
		if (selectedCategory === 'all') {
			return products
		}

		return products.filter((product) => product.category === selectedCategory)
	}, [products, selectedCategory])

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
			products={visibleProducts.map((product) => ({
				...product,
				onAddToCart: () => addToCart(product),
			}))}
			initialSortBy="launch-desc"
			sortSelectId="warhammer-sort-select"
			sortAriaLabel="Ordenar productos Warhammer"
			productsAriaLabel="Productos Warhammer"
			pageClassName="card-game-page"
		/>
	)
}

export default Warhammer