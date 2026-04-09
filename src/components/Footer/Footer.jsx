import './Footer.css'
import infoTitle from '../../resources/images/footer/Información.png'
import scheduleTitle from '../../resources/images/footer/Horario.png'
import locationIcon from '../../resources/images/icons/location.svg'
import phoneIcon from '../../resources/images/icons/phone.svg'
import instagramIcon from '../../resources/images/footer/Social-media/instagram.png'
import tiktokIcon from '../../resources/images/footer/Social-media/tiktok.png'
import twitterIcon from '../../resources/images/footer/Social-media/twitter.jpg'
import whatsappIcon from '../../resources/images/footer/Social-media/whatsapp.png'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top-strip" />

      <div className="site-footer__main">
        <section className="site-footer__col site-footer__col--info" aria-label="Informacion legal">
          <img className="site-footer__title-img" src={infoTitle} alt="Informacion" />

          <ul className="site-footer__links">
            <li><a href="/informacion/quienes-somos">Quiénes somos</a></li>
            <li><a href="/informacion/envios-y-devoluciones">Envíos y devoluciones</a></li>
            <li><a href="/informacion/politica-de-privacidad-y-cookies">Política de privacidad y cookies</a></li>
            <li><a href="/informacion/terminos-y-condiciones">Términos y condiciones</a></li>
          </ul>
        </section>

        <section className="site-footer__col site-footer__col--schedule" aria-label="Horario tienda">

          <div className="site-footer__hours-card">
            <img className="site-footer__hours-title-img" src={scheduleTitle} alt="Horario" />
            <p><strong>Lunes:</strong> 10:00 - 13:00 / 17:00 - 20:30</p>
            <p><strong>Martes:</strong> 10:00 - 13:00 / 17:00 - 20:30</p>
            <p><strong>Miércoles:</strong> Cerrado</p>
            <p><strong>Jueves:</strong> 10:00 - 13:00 / 17:00 - 20:30</p>
            <p><strong>Viernes:</strong> 10:00 - 13:00 / 17:00 - 20:30</p>
            <p><strong>Sábado:</strong> 10:00 - 13:00 / 17:00 - 20:30</p>
            <p><strong>Domingo:</strong> 10:00 - 13:00</p>
          </div>
        </section>

        <section className="site-footer__col site-footer__col--contact" aria-label="Contacto y redes">
          <div className="site-footer__socials">
            <a href="https://www.instagram.com/santaanafriki/" aria-label="Instagram" className="site-footer__social">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="https://www.tiktok.com/@santaanafriki" aria-label="TikTok" className="site-footer__social">
              <img src={tiktokIcon} alt="TikTok" />
            </a>
            <a href="https://api.whatsapp.com/send?phone=34618739795" aria-label="WhatsApp" className="site-footer__social">
              <img src={whatsappIcon} alt="WhatsApp" />
            </a>
            <a href="https://x.com/LCdA3" aria-label="Twitter" className="site-footer__social">
              <img src={twitterIcon} alt="Twitter" />
            </a>
          </div>

          <div className="site-footer__map">
            <iframe
              title="Mapa de ubicacion"
              src="https://www.google.com/maps?q=Calle%20Alcalde%20Amancio%20Munoz%2050%2030203%20Cartagena&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="site-footer__address">
            <p className="site-footer__address-line">
              <img className="site-footer__address-icon" src={locationIcon} alt="Ubicacion" />
              <span>C/Alcalde Amancio Muñoz, 50 - 30203 Cartagena</span>
            </p>
            <p className="site-footer__address-line">
              <img className="site-footer__address-icon site-footer__phone-icon" src={phoneIcon} alt="Telefono" />
              <span>+34 618 73 97 95</span>
            </p>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer