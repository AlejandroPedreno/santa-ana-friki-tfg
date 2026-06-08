import { useEffect, useRef, useState, useContext, useMemo } from 'react'
import './Header.css'
import searchIcon from '../../resources/images/icons/search.svg'
import cartIcon from '../../resources/images/icons/shopping-cart.svg'
import profileIcon from '../../resources/images/icons/account.svg'
import { CartContext } from '../../context/CartContext.jsx'

function Header() {
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [isCardGamesOpen, setIsCardGamesOpen] = useState(false)
	const [isMiniaturesOpen, setIsMiniaturesOpen] = useState(false)
	const [isMaquetasOpen, setIsMaquetasOpen] = useState(false)
	const [isAccesoriosOpen, setIsAccesoriosOpen] = useState(false)
	const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
	const searchInputRef = useRef(null)
	const cardGamesRef = useRef(null)
	const miniaturesRef = useRef(null)
	const maquetasRef = useRef(null)
	const accesoriosRef = useRef(null)
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

			if (!miniaturesRef.current?.contains(event.target)) {
				setIsMiniaturesOpen(false)
			}

			if (!maquetasRef.current?.contains(event.target)) {
				setIsMaquetasOpen(false)
			}

			if (!accesoriosRef.current?.contains(event.target)) {
				setIsAccesoriosOpen(false)
			}

			if (!accountMenuRef.current?.contains(event.target)) {
				setIsAccountMenuOpen(false)
			}
		}

		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				setIsCardGamesOpen(false)
				setIsMiniaturesOpen(false)
				setIsMaquetasOpen(false)
				setIsAccesoriosOpen(false)
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
							onClick={() => {
								setIsCardGamesOpen((prev) => !prev)
								setIsMiniaturesOpen(false)
							}}
						>
							Juegos de cartas
						</button>

						<div
							className={`site-header__dropdown-menu ${isCardGamesOpen ? 'is-open' : ''}`}
							role="menu"
							aria-label="Juegos de cartas"
							aria-hidden={!isCardGamesOpen}
						>
							<a href="/juegos-de-cartas/dragon-ball-fusion-world" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Dragon Ball: Fusion World</a>
							<a href="/juegos-de-cartas/lorcana" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Lorcana</a>
							<a href="/juegos-de-cartas/magic-the-gathering" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Magic: The Gathering</a>
							<a href="/juegos-de-cartas/naruto-mythos" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Naruto Mythos</a>
							<a href="/juegos-de-cartas/pokemon" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Pokemon</a>
							<a href="/juegos-de-cartas/one-piece-tcg" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>One Piece TCG</a>
							<a href="/juegos-de-cartas/riftbound" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Riftbound</a>
							<a href="/juegos-de-cartas/yu-gi-oh" role="menuitem" onClick={() => setIsCardGamesOpen(false)}>Yu-Gi-Oh!</a>
						</div>
					</div>
					<div className="site-header__dropdown" ref={miniaturesRef}>
						<button
							type="button"
							className="site-header__dropdown-toggle"
							aria-haspopup="true"
							aria-expanded={isMiniaturesOpen}
							onClick={() => {
								setIsMiniaturesOpen((prev) => !prev)
								setIsCardGamesOpen(false)
								setIsMaquetasOpen(false)
							}}
						>
							Miniaturas
						</button>

						<div
							className={`site-header__dropdown-menu ${isMiniaturesOpen ? 'is-open' : ''}`}
							role="menu"
							aria-label="Miniaturas"
							aria-hidden={!isMiniaturesOpen}
						>
							<a href="/miniaturas/star-wars-legion" role="menuitem" onClick={() => setIsMiniaturesOpen(false)}>Star Wars - Legion</a>
							<a href="/miniaturas/warhammer" role="menuitem" onClick={() => setIsMiniaturesOpen(false)}>Warhammer</a>
							<a href="/miniaturas/escenografia" role="menuitem" onClick={() => setIsMiniaturesOpen(false)}>Escenografía</a>
							<a href="/miniaturas/blood-bowl" role="menuitem" onClick={() => setIsMiniaturesOpen(false)}>Blood Bowl</a>
							<a href="/miniaturas/middle-earth-strategy-battle-game" role="menuitem" onClick={() => setIsMiniaturesOpen(false)}>Middle-earth strategy battle game</a>
							<a href="/miniaturas/marvel-crisis-protocol" role="menuitem" onClick={() => setIsMiniaturesOpen(false)}>Marvel Crisis Protocol</a>

						</div>
					</div>
					<div className="site-header__dropdown" ref={maquetasRef}>
						<button
							type="button"
							className="site-header__dropdown-toggle"
							aria-haspopup="true"
							aria-expanded={isMaquetasOpen}
							onClick={() => {
								setIsMaquetasOpen((prev) => !prev)
								setIsCardGamesOpen(false)
								setIsMiniaturesOpen(false)
							}}
						>
							Maquetas
						</button>

						<div
							className={`site-header__dropdown-menu ${isMaquetasOpen ? 'is-open' : ''}`}
							role="menu"
							aria-label="Maquetas"
							aria-hidden={!isMaquetasOpen}
						>
							<a href="/maquetas/academy-hobby-model-kits" role="menuitem" onClick={() => setIsMaquetasOpen(false)}>Academy Hobby Model Kits</a>
							<a href="/maquetas/blokees" role="menuitem" onClick={() => setIsMaquetasOpen(false)}>Blokees</a>
							<a href="/maquetas/diy-miniature" role="menuitem" onClick={() => setIsMaquetasOpen(false)}>Diy Miniature</a>
							<a href="/maquetas/italeri" role="menuitem" onClick={() => setIsMaquetasOpen(false)}>Italeri</a>
							<a href="/maquetas/revell" role="menuitem" onClick={() => setIsMaquetasOpen(false)}>Revell</a>
						</div>
					</div>
					<div className="site-header__dropdown" ref={accesoriosRef}>
						<button
							type="button"
							className="site-header__dropdown-toggle"
							aria-haspopup="true"
							aria-expanded={isAccesoriosOpen}
							onClick={() => {
								setIsAccesoriosOpen((prev) => !prev)
								setIsCardGamesOpen(false)
								setIsMiniaturesOpen(false)
								setIsMaquetasOpen(false)
							}}
						>
							Accesorios
						</button>

						<div
							className={`site-header__dropdown-menu ${isAccesoriosOpen ? 'is-open' : ''}`}
							role="menu"
							aria-label="Accesorios"
							aria-hidden={!isAccesoriosOpen}
						>
							<a href="/accesorios/pinturas" role="menuitem" onClick={() => setIsAccesoriosOpen(false)}>Pinturas</a>
							<a href="/accesorios/fundas" role="menuitem" onClick={() => setIsAccesoriosOpen(false)}>Fundas</a>
							<a href="/accesorios/tapetes" role="menuitem" onClick={() => setIsAccesoriosOpen(false)}>Tapetes</a>
							<a href="/accesorios/deckbox" role="menuitem" onClick={() => setIsAccesoriosOpen(false)}>Deckbox</a>
						</div>
					</div>
					<a href="/miniaturas/figuras-de-coleccion">Figuras de colección</a>
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
