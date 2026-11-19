import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">
          <h2>PuntoLimpio</h2>
          <p>
            Reciclar hoy cambia el mañana.
          </p>
        </div>

        <div className="footer-links">
          <h3>Explorá</h3>

          <Link to={'/'}>Inicio</Link>
          <Link to={'/Mapa'}>Mapa</Link>
          <Link href="#">Reciclaje</Link>
          <Link href="#">EcoBot</Link>
          <Link href="#">Información</Link>
        </div>

        <div className="footer-info">
          <h3>PuntoLimpio</h3>
          <p>
            Una comunidad comprometida con un futuro más limpio.
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 PuntoLimpio. Todos los derechos reservados.</p>
      </div>

    </footer>
  );
}

export default Footer;