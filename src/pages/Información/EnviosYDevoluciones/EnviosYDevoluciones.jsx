import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import './EnviosYDevoluciones.css'

function EnviosYDevoluciones() {
	return (
		<>
			<Header />

			<main className="envios-page">
				<section className="envios-page__card" aria-label="Envíos y devoluciones">
					<h1>Envíos y devoluciones</h1>
                    <br />
					<div className="envios-page__content">
						<section className="envios-page__section" aria-label="Costes del transporte">
							<h2>Costes del transporte</h2>
							<p>
								El coste del transporte a toda España (no están incluidas Ceuta, Melilla e Islas Canarias)
								es de 6,95€ si la compra no supera los 100€.
							</p>
						</section>

						<section className="envios-page__section" aria-label="Transporte gratuito">
							<h2>Transporte gratuito</h2>
							<p>
								El transporte será gratuito si la compra supera los 100€. Si desea realizar un pedido ajeno
								a Península o las Islas Baleares, por favor, póngase en contacto con nosotros vía email:
								 santaanafriki@gmail.com o por WhatsApp: 618 73 97 95.
							</p>
						</section>

						<section className="envios-page__section" aria-label="Qué hacer para devolver un pedido">
							<h2>¿Qué debo hacer si deseo devolver mi pedido?</h2>
							<p>
								Usted dispone de 7 días naturales en los cuales, y sin necesidad de justificación alguna,
								puede devolvernos los productos adquiridos siempre y cuando se encuentren tal y como usted
								los recibió y con su etiqueta correspondiente.
							</p>
							<p>
								En el caso de recibirse con algún desperfecto o tara apreciable deberá comunicarlo en las
								primeras 24 horas de la recepción del paquete.
							</p>
							<p>
								Para ello debe comunicárnoslo previamente, tal y como recomiendan las diferentes organizaciones
								de consumidores.
							</p>
							<p>
								No obstante, recuerde que deberá abonar los portes de vuelta, así como los gastos
								administrativos u otro tipo que se generen como consecuencia de su devolución.
							</p>
						</section>

						<section className="envios-page__section" aria-label="Cómo tramitar la devolución">
							<h2>¿Cómo he de tramitar la devolución?</h2>
							<p>
								En caso de recibir el paquete de material con signos de haber sido manipulado o golpeado,
								indíquelo en el albarán del transportista y revise la mercancía en presencia de este.
								No firme el albarán sin haber indicado estas incidencias, aunque el material parezca estar
								en perfectas condiciones.
							</p>
							<p>
								Si tras revisar el envío observase diferencias entre el material recibido y el albarán,
								háganoslo saber inmediatamente, indicando el número de albarán y detallando las diferencias.
								Por favor, indique también un teléfono de contacto para agilizar la gestión si fuera necesario.
							</p>
							<p className="envios-page__notice">
								Recuerde que solo aceptamos reclamaciones tras 7 días naturales desde la recepción por su parte del envío.
							</p>
						</section>

						<section className="envios-page__section" aria-label="Política de devolución y cambio de productos">
							<h2>Política de devolución y cambio de productos</h2>
							<h3>Devoluciones y cambios en ejercicio del derecho a desistir de la compra</h3>
							<p>
								Todos los productos comprados en nuestro sitio web podrán ser devueltos y reembolsados por
								el mismo medio que hizo el pago o haciendo un cambio por productos de valor similar a los
								devueltos, siempre que usted nos comunique su intención de devolver el/los producto/s
								adquirido/s dentro de un plazo máximo de 7 días naturales contados desde la fecha de entrega
								y que se cumplan el resto de las condiciones establecidas en este apartado.
							</p>
							<p>Solo aceptaremos devoluciones que cumplan los siguientes requisitos:</p>
							<ol>
								<li>
									El producto debe estar en el mismo estado en que se entregó y deberá conservar su
									embalaje y etiquetado original.
								</li>
								<li>
									El envío debe hacerse usando la misma caja protectora de cartón en que ha sido recibido
									para proteger el producto. Si no fuera posible, el CLIENTE deberá devolverlo en una caja
									protectora para que el producto llegue a nuestro almacén con las máximas garantías posibles.
								</li>
								<li>
									Debe incluirse una copia del albarán de entrega dentro del paquete, donde además se marquen
									los productos devueltos y el motivo de la devolución.
								</li>
							</ol>
							<p>
								Tras examinar el artículo le comunicaremos si tiene derecho a la devolución de las cantidades
								abonadas por el/los artículos comprado/s. Solo se devolverá el importe del/los artículo/s,
								nunca el de los gastos de envío o reembolso.
							</p>
							<p>
								La devolución se efectuará lo antes posible y, en cualquier caso, dentro del plazo de 30 días
								desde la fecha en que usted nos notificó su intención de desistir. La devolución se efectuará
								de la misma forma en que realizó el pago o por productos de valor similar a los devueltos.
							</p>
							<p>
								Usted asumirá el coste y riesgo de devolvernos los productos, tal y como se ha indicado
								anteriormente.
							</p>
							<p>
								No procederá el cambio o devolución de aquellos productos que no estén en las mismas
								condiciones en las que los recibió, o que hayan sido usados más allá de la mera apertura
								del producto, o de aquellos artículos personalizados.
							</p>
							<p>
								Esta disposición no afecta a los derechos reconocidos al consumidor por la legislación vigente.
							</p>
						</section>

						<section className="envios-page__section" aria-label="Devoluciones de productos defectuosos">
							<h3>Devoluciones de productos defectuosos</h3>
							<p>
								En los casos en que usted considere que en el momento de la entrega el producto no se ajusta
								a lo estipulado en el contrato, deberá ponerse en contacto con nosotros de forma inmediata,
								facilitando los datos del producto y los desperfectos que sufre. En algunos casos solicitaremos
								que nos envíen foto de los desperfectos.
							</p>
							<p>
								Una vez recibida la notificación, nos pondremos en contacto con usted para informarle sobre
								cómo debe proceder y por qué agencia de mensajería debe hacerlo.
							</p>
							<p>
								Por favor, devuelva el artículo usando su envoltorio original, además de las instrucciones,
								documentación y envoltorios que puedan acompañar al mismo.
							</p>
							<p>
								Una vez recibida la mercancía a devolver, procederemos a examinar detenidamente el producto y
								le comunicaremos por email, dentro de un plazo razonable, si procede la devolución o sustitución
								del mismo (en su caso).
							</p>
							<p>
								La devolución del dinero o sustitución del artículo se efectuará lo antes posible y, en cualquier
								caso, dentro de los 30 días siguientes a la fecha en la que le enviemos un correo electrónico
								confirmando que procede la devolución o sustitución del artículo no conforme.
							</p>
							<p>
								En caso de que no se pueda sustituir el/los productos, las cantidades pagadas por aquellos
								productos devueltos por tara o defecto, cuando realmente exista, le serán reembolsadas
								íntegramente, incluidos los gastos de envío y los costes en que usted hubiera incurrido para
								devolvérnoslo.
							</p>
							<p>
								Las devoluciones y anulaciones parciales darán lugar a reembolsos parciales de lo que costó todo
								el pedido o cambio por productos de similar valor. Los gastos de transporte y reembolso no serán
								devueltos en caso de que la devolución sea parcial.
							</p>
							<p>
								La devolución se efectuará en la misma tarjeta de crédito utilizada para la compra, mediante
								transferencia bancaria a una cuenta cuyo titular sea la persona que realizó el pedido.
							</p>
							<p>
								Si usted tiene alguna duda, puede ponerse en contacto con nosotros. Quedan a salvo los derechos
								reconocidos por la legislación vigente.
							</p>
						</section>
					</div>
				</section>
			</main>

			<Footer />
		</>
	)
}

export default EnviosYDevoluciones
