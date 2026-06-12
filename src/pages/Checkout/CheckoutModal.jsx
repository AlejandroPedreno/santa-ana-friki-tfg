import { useState, useContext, useEffect } from 'react'
import './CheckoutModal.css'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import { CartContext } from '../../context/CartContext.jsx'
import paypalLogo from '../../resources/images/Paypal_logo.png'
import { procesarCheckout } from '../../services/checkout/checkoutApi.js'

function CheckoutModal() {
  const { clearCart } = useContext(CartContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [cartItems, setCartItems] = useState([])
  
  useEffect(() => {
    const data = localStorage.getItem('checkoutData')
    if (data) {
      const { totalPrice, subtotal, shipping, cartItems } = JSON.parse(data)
      setTotalPrice(totalPrice)
      setSubtotal(subtotal)
      setShipping(shipping)
      setCartItems(cartItems)
    }
  }, [])
  
  const [step, setStep] = useState('billing-data')
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    empresa: '',
    direccion1: '',
    direccion2: '',
    ciudad: '',
    codigoPostal: '',
    pais: 'Spain',
    provincia: '',
    mismasDirecciones: true,
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio'
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios'
    if (!formData.correo.trim()) newErrors.correo = 'El correo es obligatorio'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) newErrors.correo = 'Correo inválido'
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio'
    if (!formData.direccion1.trim()) newErrors.direccion1 = 'La dirección es obligatoria'
    if (!formData.ciudad.trim()) newErrors.ciudad = 'La ciudad es obligatoria'
    if (!formData.codigoPostal.trim()) newErrors.codigoPostal = 'El código postal es obligatorio'
    if (!formData.provincia) newErrors.provincia = 'Selecciona una provincia'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setStep('confirm-order')
    }
  }

  const handlePaymentMethod = async (paymentMethod) => {
    try {
      await procesarCheckout({
        paymentMethod,
        cartItems,
        totalPrice,
        subtotal,
        shipping,
        billingData: formData,
      })

      localStorage.removeItem('checkoutData')
      clearCart()

      alert(
        paymentMethod === 'paypal'
          ? 'Pedido confirmado por PayPal'
          : 'Pedido confirmado por Transferencia Bancaria'
      )

      window.location.href = '/'
    } catch (error) {
      alert(error?.message || 'No se ha podido procesar el pago.')
    }
  }

  if (step === 'payment-method') {
    return (
      <>
        <Header />
        <div className="checkout-modal">
          <div className="checkout-card">
            <div className="checkout-header">
              <h1>Paso 3: Selecciona tu método de pago</h1>
              <p>Elige cómo deseas pagar tu compra</p>
            </div>

            <div className="payment-methods">
              <button
                type="button"
                className="payment-method-card"
                onClick={() => handlePaymentMethod('paypal')}
              >
                <div className="payment-method-icon paypal-icon">
                  <img src={paypalLogo} alt="PayPal" />
                </div>
                <h3>PayPal</h3>
                <p>Pago seguro con tu cuenta de PayPal</p>
              </button>

              <button
                type="button"
                className="payment-method-card"
                onClick={() => handlePaymentMethod('transferencia')}
              >
                <div className="payment-method-icon transfer-icon">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23444'%3E%3Crect x='2' y='4' width='20' height='14' rx='1' stroke='%23444' stroke-width='2' fill='none'/%3E%3Cline x1='2' y1='8' x2='22' y2='8' stroke='%23444' stroke-width='1'/%3E%3C/svg%3E" alt="Transferencia" />
                </div>
                <h3>Transferencia Bancaria</h3>
                <p>Pago por transferencia bancaria</p>
              </button>
            </div>

            <button type="button" className="checkout-back-btn" onClick={() => setStep('confirm-order')}>
              Volver
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (step === 'billing-data') {
    return (
      <>
        <Header />
        <div className="checkout-modal">
          <div className="checkout-card">
            <div className="checkout-header">
              <h1>Paso 1: Datos de Facturación</h1>
              <p>Completa tus datos personales y de envío</p>
            </div>

            <form onSubmit={handleSubmit} className="billing-form">
              <div className="form-section">
                <h3>Sus datos personales</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">
                      Nombre <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Nombre"
                      className={errors.nombre ? 'input-error' : ''}
                    />
                    {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="apellidos">
                      Apellidos <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      placeholder="Apellidos"
                      className={errors.apellidos ? 'input-error' : ''}
                    />
                    {errors.apellidos && <span className="error-message">{errors.apellidos}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="correo">
                      Correo electrónico <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                      placeholder="Correo electrónico"
                      className={errors.correo ? 'input-error' : ''}
                    />
                    {errors.correo && <span className="error-message">{errors.correo}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefono">
                      Teléfono <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="Teléfono"
                      className={errors.telefono ? 'input-error' : ''}
                    />
                    {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Su dirección</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="empresa">Empresa</label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      placeholder="Empresa"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="direccion1">
                      Dirección 1 <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="direccion1"
                      name="direccion1"
                      value={formData.direccion1}
                      onChange={handleInputChange}
                      placeholder="Dirección 1"
                      className={errors.direccion1 ? 'input-error' : ''}
                    />
                    {errors.direccion1 && <span className="error-message">{errors.direccion1}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="direccion2">Dirección 2</label>
                    <input
                      type="text"
                      id="direccion2"
                      name="direccion2"
                      value={formData.direccion2}
                      onChange={handleInputChange}
                      placeholder="Dirección 2"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ciudad">
                      Ciudad <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="ciudad"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      placeholder="Ciudad"
                      className={errors.ciudad ? 'input-error' : ''}
                    />
                    {errors.ciudad && <span className="error-message">{errors.ciudad}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="codigoPostal">
                      Código postal <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="codigoPostal"
                      name="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={handleInputChange}
                      placeholder="Código postal"
                      className={errors.codigoPostal ? 'input-error' : ''}
                    />
                    {errors.codigoPostal && <span className="error-message">{errors.codigoPostal}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="pais">
                      País <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="pais"
                      name="pais"
                      value={formData.pais}
                      onChange={handleInputChange}
                      placeholder="País"
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="provincia">
                      Provincia / Región <span className="required">*</span>
                    </label>
                    <select
                      id="provincia"
                      name="provincia"
                      value={formData.provincia}
                      onChange={handleInputChange}
                      className={errors.provincia ? 'input-error' : ''}
                    >
                      <option value="">- Por Favor Seleccione -</option>
                      <option value="andalucia">Andalucía</option>
                      <option value="aragon">Aragón</option>
                      <option value="asturias">Asturias</option>
                      <option value="baleares">Baleares</option>
                      <option value="canarias">Canarias</option>
                      <option value="cantabria">Cantabria</option>
                      <option value="castilla-la-mancha">Castilla-La Mancha</option>
                      <option value="castilla-leon">Castilla y León</option>
                      <option value="cataluna">Cataluña</option>
                      <option value="ceuta">Ceuta</option>
                      <option value="comunidad-valenciana">Comunidad Valenciana</option>
                      <option value="extremadura">Extremadura</option>
                      <option value="galicia">Galicia</option>
                      <option value="la-rioja">La Rioja</option>
                      <option value="madrid">Madrid</option>
                      <option value="melilla">Melilla</option>
                      <option value="murcia">Murcia</option>
                      <option value="navarra">Navarra</option>
                      <option value="pais-vasco">País Vasco</option>
                    </select>
                    {errors.provincia && <span className="error-message">{errors.provincia}</span>}
                  </div>
                </div>
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="mismasDirecciones"
                  name="mismasDirecciones"
                  checked={formData.mismasDirecciones}
                  onChange={handleInputChange}
                />
                <label htmlFor="mismasDirecciones">
                  Las Direcciones De Envío Y Facturación Son Las Mismas
                </label>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="checkout-back-btn"
                  onClick={() => (window.location.href = '/carrito')}
                >
                  Volver al Carrito
                </button>
                <button type="submit" className="checkout-continue-btn">
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (step === 'confirm-order') {
    return (
      <>
        <Header />
        <div className="checkout-modal">
          <div className="checkout-card">
            <div className="checkout-header">
              <h1>Paso 2: Confirmar Pedido</h1>
              <p>Revisa tu información antes de confirmar</p>
            </div>

            <div className="confirm-section">
              <h3>Datos de Facturación</h3>
              <div className="confirm-grid">
                <div>
                  <strong>Nombre:</strong>
                  <p>{formData.nombre} {formData.apellidos}</p>
                </div>
                <div>
                  <strong>Correo:</strong>
                  <p>{formData.correo}</p>
                </div>
                <div>
                  <strong>Teléfono:</strong>
                  <p>{formData.telefono}</p>
                </div>
                <div>
                  <strong>Dirección:</strong>
                  <p>
                    {formData.direccion1}
                    {formData.direccion2 && `, ${formData.direccion2}`}
                  </p>
                </div>
                <div>
                  <strong>Ciudad:</strong>
                  <p>{formData.ciudad}, {formData.codigoPostal}</p>
                </div>
                <div>
                  <strong>Provincia:</strong>
                  <p>{formData.provincia}</p>
                </div>
              </div>
            </div>

            <div className="confirm-section">
              <h3>Artículos del Pedido</h3>
              <table className="confirm-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio unitario</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>
                        {/* El total de cada línea se obtiene del precio ya normalizado más la cantidad elegida. */}
                        {(parseFloat(item.price.replace(/EUR|€/g, '').trim()) * item.quantity).toFixed(2)}€
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="confirm-total">
              <div className="total-row">
                <span>Subtotal de productos:</span>
                <strong>{subtotal.toFixed(2)}€</strong>
              </div>
              <div className="total-row">
                <span>Envío:</span>
                <strong>{shipping > 0 ? `${shipping.toFixed(2)}€` : 'Gratis'}</strong>
              </div>
              <div className="total-row total-final">
                <span>Total:</span>
                <strong>{totalPrice.toFixed(2)}€</strong>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="checkout-back-btn"
                onClick={() => setStep('billing-data')}
              >
                Volver
              </button>
              <button
                type="button"
                className="checkout-confirm-btn"
                onClick={() => setStep('payment-method')}
              >
                Continuar al Pago
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default CheckoutModal
