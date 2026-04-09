import { useEffect, useRef, useState, useContext, useMemo } from 'react'
import './Header.css'
import searchIcon from '../../resources/images/icons/search.svg'
import cartIcon from '../../resources/images/icons/shopping-cart.svg'
import profileIcon from '../../resources/images/icons/account.svg'
import { CartContext } from '../../context/CartContext.jsx'

function Header() {
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [isCardGamesOpen, setIsCardGamesOpen] = useState(false)
	const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
	const searchInputRef = useRef(null)
	const cardGamesRef = useRef(null)
	const accountMenuRef = useRef(null)
	const { getTotalItems } = useContext(CartContext)
	const cartCount = useMemo(() => getTotalItems(), [getTotalItems])
	const hasActiveSession = Boolean(
		localStorage.getItem('santa-ana-friki-session') ||
		localStorage.getItem('authToken') ||
		localStorage.getItem('token')
	)

	useEffect(() => {
		if (isSearchOpen) {
			searchInputRef.current?.focus()
		}
	}, [isSearchOpen])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!cardGamesRef.current?.contains(event.target)) {
				setIsCardGamesOpen(false)
			}

			if (!accountMenuRef.current?.contains(event.target)) {
				setIsAccountMenuOpen(false)
			}
		}

		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				setIsCardGamesOpen(false)
				setIsAccountMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [])

	return (
		<header className="site-header">
			<div className="site-header__inner">
				<a className="site-header__brand" href="/">
					<img
						className="site-header__logo"
						src="/logo/santa-ana-friki.png"
						alt="Logo de Santa Ana Friki"
					/>
				</a>

				<nav aria-label="Principal" className="site-header__nav">
					<div className="site-header__dropdown" ref={cardGamesRef}>
						<button
							type="button"
							className="site-header__dropdown-toggle"
							aria-haspopup="true"
							aria-expanded={isCardGamesOpen}
							onClick={() => setIsCardGamesOpen((prev) => !prev)}
						>
							Juegos de cartas
						</button>

						<div
							className={`site-header__dropdown-menu ${isCardGamesOpen ? 'is-open' : ''}`}
							role="menu"
							aria-label="Juegos de cartas"
							aria-hidden={!isCardGamesOpen}
						>
							<a href="#" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Dragon Ball: Fusion World</a>
							<a href="#" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Lorcana</a>
							<a href="#" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Magic: The Gathering</a>
							<a href="#" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Naruto Mythos</a>
							<a href="/juegos-de-cartas/one-piece-tcg" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>One Piece TCG</a>
							<a href="/juegos-de-cartas/riftbound" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Riftbound</a>
							<a href="#" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Yu-Gi-Oh!</a>
						</div>
					</div>
					<a href="#">Miniaturas</a>
					<a href="#">Figuras de colección</a>
					<a href="#">Accesorios</a>
					<a href="/eventos">Eventos</a>
				</nav>

				<div className="site-header__actions">
					<div className="site-header__search">
						<input
							ref={searchInputRef}
							className={`site-header__search-input ${isSearchOpen ? 'is-open' : ''}`}
							type="text"
							placeholder="Buscar..."
						/>
						<button
							aria-label="Buscar"
							className="site-header__icon-btn"
							type="button"
							onClick={() => setIsSearchOpen((prev) => !prev)}
						>
							<img alt="Buscar" src={searchIcon} />
						</button>
					</div>

					<a href="/carrito" aria-label="Carrito de compras" className="site-header__cart-btn">
						<img alt="Carrito" src={cartIcon} />
						{cartCount > 0 && (
							<span className="site-header__cart-badge">{cartCount}</span>
						)}
					</a>
					<div className="site-header__account" ref={accountMenuRef}>
						<button
							aria-label="Perfil"
							className="site-header__icon-btn"
							type="button"
							aria-haspopup="true"
							aria-expanded={isAccountMenuOpen}
							onClick={() => setIsAccountMenuOpen((prev) => !prev)}
						>
							<img alt="Perfil" src={profileIcon} />
						</button>

						{!hasActiveSession && (
							<div
								className={`site-header__account-menu ${isAccountMenuOpen ? 'is-open' : ''}`}
								role="menu"
								aria-label="Opciones de cuenta"
								aria-hidden={!isAccountMenuOpen}
							>
								<a href="/login" role="menuitem" onClick={() => setIsAccountMenuOpen(false)}>
									Iniciar sesión
								</a>
								<a href="/register" role="menuitem" onClick={() => setIsAccountMenuOpen(false)}>
									Registrarse
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
