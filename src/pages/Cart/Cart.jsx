import { useContext } from 'react'
import './Cart.css'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import { CartContext } from '../../context/CartContext.jsx'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useContext(CartContext)
  const freeShippingThreshold = 100
  const shippingCost = 6.95
  const subtotal = getTotalPrice()
  const shipping = subtotal < freeShippingThreshold ? shippingCost : 0
  const totalPrice = subtotal + shipping
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  const amountRemainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0)
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100)
  const hasFreeShipping = amountRemainingForFreeShipping === 0

  // Si no hay productos en el carrito, se muestra la pantalla vacía y se evita renderizar el resto.
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="cart-page">
          <div className="cart-page__card">
            <h1>Tu Carrito</h1>
            <div className="cart-page__empty">
              <p>Tu carrito está vacío</p>
              <a href="/" className="cart-page__continue-button">
                Continuar Comprando
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="cart-page">
        <div className="cart-page__card">
          <div className="cart-page__head">
            <h1>Tu Carrito</h1>
            <p>{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} listos para comprar</p>
          </div>

          <div className="cart-page__layout">
            <section className="cart-page__items-section" aria-label="Productos del carrito">
              <div className="cart-page__items-header">
                <span>Productos</span>
                <span>Resumen por producto</span>
              </div>

              <div className="cart-page__items">
                {cartItems.map((item) => (
                  <article key={item.id} className="cart-page__item">
                    <img className="cart-page__item-image" src={item.image} alt={item.name} />

                    <div className="cart-page__item-info">
                      <h3 className="cart-page__item-name">{item.name}</h3>
                      <p className="cart-page__item-price">Precio unitario: {item.price}</p>
                    </div>

                    <div className="cart-page__item-quantity" aria-label="Controles de cantidad">
                      <button
                        type="button"
                        className="cart-page__quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="cart-page__quantity-value">{item.quantity}</span>
                      <button
                        type="button"
                        className="cart-page__quantity-btn"
                        disabled={item.quantity >= Number(item.stock ?? item.quantity)}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-page__item-total">
                      <p className="cart-page__item-total-label">Subtotal</p>
                      <p className="cart-page__item-subtotal">
                        {/* El subtotal se calcula a partir del precio normalizado y la cantidad del artículo. */}
                        {(parseFloat(item.price.replace(/EUR|€/g, '').trim()) * item.quantity).toFixed(2)}€
                      </p>
                      {/* Se muestra el stock disponible real para limitar la cantidad comprable. */}
                      <p className="cart-page__item-stock">Stock disponible: {Number(item.stock ?? item.quantity)}</p>
                    </div>

                    <button
                      type="button"
                      className="cart-page__remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Eliminar del carrito"
                    >
                      ✕
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <aside className="cart-page__summary">
              <div className="cart-page__shipping-progress" role="status" aria-live="polite">
                <p className="cart-page__shipping-text">
                  {hasFreeShipping
                    ? (
                      <>
                        Ya tienes <strong>envío gratuito</strong> en este pedido.
                      </>
                    )
                    : (
                      <>
                        Te faltan <strong>{amountRemainingForFreeShipping.toFixed(2)}€</strong> para obtener <strong>envío gratuito</strong>.
                      </>
                    )}
                </p>
                <div className="cart-page__shipping-track" aria-hidden="true">
                  <span
                    className="cart-page__shipping-fill"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
                <div className="cart-page__shipping-values" aria-hidden="true">
                  <span>0€</span>
                  <span>{freeShippingThreshold}€</span>
                </div>
              </div>

              <div className="cart-page__total">
                <div className="cart-page__total-row">
                  <span>Subtotal:</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="cart-page__total-row">
                  <span>Envío:</span>
                  <span>{shipping > 0 ? `${shipping.toFixed(2)}€` : 'Gratis'}</span>
                </div>
                <h2 className="cart-page__total-final">Total:</h2>
                <p className="cart-page__total-price">{totalPrice.toFixed(2)}€</p>
              </div>

              <div className="cart-page__actions">
                <button
                  type="button"
                  className="cart-page__checkout-btn"
                  onClick={() => {
                    localStorage.setItem(
                      'checkoutData',
                      JSON.stringify({ totalPrice, subtotal, shipping, cartItems })
                    )
                    window.location.href = '/checkout'
                  }}
                >
                  Proceder al Pago
                </button>
                <button
                  type="button"
                  className="cart-page__continue-btn"
                  onClick={() => (window.location.href = '/')}
                >
                  Continuar Comprando
                </button>
                <button
                  type="button"
                  className="cart-page__clear-btn"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Cart
