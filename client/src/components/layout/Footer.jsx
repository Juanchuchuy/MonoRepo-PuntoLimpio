
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h2>🌱 PuntoLimpio</h2>
          <p>
            Una comunidad comprometida con el cuidado
            del ambiente y una ciudad más limpia.
          </p>
        </div>

        <div className="footer-colaborar">
          <h3>¿Cómo podés colaborar?</h3>
          <ul>
            <li>Reportando basurales.</li>
            <li>Separando correctamente tus residuos.</li>
            <li>Utilizando los puntos de reciclaje.</li>
            <li>Promoviendo el cuidado del ambiente.</li>
          </ul>
        </div>

        <div className="footer-info">
          <h3>Nuestro objetivo</h3>
          <p>
            Promover la participación ciudadana para
            reducir los residuos, fomentar el reciclaje
            y construir un entorno más saludable.
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} PuntoLimpio.
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
