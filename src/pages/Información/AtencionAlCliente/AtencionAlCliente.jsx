import { useMemo, useState } from 'react'
import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import './AtencionAlCliente.css'

const DESTINATARIO_CORREO = 'santaanafriki@gmail.com'

function AtencionAlCliente() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  })

  const hayDatosMinimos = useMemo(() => {
    return formData.nombre.trim() !== '' && formData.email.trim() !== '' && formData.mensaje.trim() !== ''
  }, [formData])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const asunto = formData.asunto.trim() || 'Consulta de atención al cliente'
    const cuerpo = [
      `Nombre: ${formData.nombre.trim()}`,
      `Correo: ${formData.email.trim()}`,
      '',
      formData.mensaje.trim(),
    ].join('\n')

    const mailtoUrl = `mailto:${DESTINATARIO_CORREO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
    window.location.href = mailtoUrl
  }

  return (
    <>
      <Header />

      <main className="atencion-cliente-page">
        <section className="atencion-cliente-page__card" aria-label="Atención al cliente">
          <div className="atencion-cliente-page__intro">
            <h1>Atención al cliente</h1>
            <p>
              Escríbenos si necesitas ayuda con un pedido, una devolución, un producto o cualquier otra consulta.
              Te responderemos lo antes posible desde nuestro correo de contacto.
            </p>
          </div>

          <div className="atencion-cliente-page__layout">
            <form className="atencion-cliente-page__form" onSubmit={handleSubmit}>
              <label className="atencion-cliente-page__field">
                <span>Nombre</span>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </label>

              <label className="atencion-cliente-page__field">
                <span>Correo electrónico</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tuemail@dominio.com"
                  required
                />
              </label>

              <label className="atencion-cliente-page__field">
                <span>Asunto</span>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  placeholder="Consulta sobre un pedido"
                />
              </label>

              <label className="atencion-cliente-page__field">
                <span>Mensaje</span>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos en qué podemos ayudarte"
                  rows="8"
                  required
                />
              </label>

              <button type="submit" className="atencion-cliente-page__submit" disabled={!hayDatosMinimos}>
                Enviar correo
              </button>
            </form>

            <aside className="atencion-cliente-page__info" aria-label="Información de contacto">
              <h2>Contacto directo</h2>
              <p>
                También puedes escribirnos directamente a <a href={`mailto:${DESTINATARIO_CORREO}`}>{DESTINATARIO_CORREO}</a>
                {' '}o llamarnos al <a href="tel:+34618739795">+34 618 73 97 95</a>.
              </p>
              <p>
                Si prefieres respuesta por WhatsApp, utiliza el número de teléfono de la tienda.
              </p>

            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default AtencionAlCliente