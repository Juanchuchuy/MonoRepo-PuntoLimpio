import "./css/Home.css";
import EcoBot from './components/EcoBot';


function Home() {

   const basuralesReportados = 50;
  const basuralesSolucionados = 36;

  const porcentaje = Math.round(
    (basuralesSolucionados / basuralesReportados) * 100
  );

  return (
    <div className="home">

      <EcoBot />

      <section className="hero">

        <div className="hero-content">

          <h1>
            Punto Limpio
          </h1>

          <p>
            Encontrá puntos de reciclaje, conocé nuestro impacto
            y aprendé cómo reciclar mejor.
          </p>

          <div className="hero-buttons">
            <button>Ver mapa</button>
            <button>Conocer EcoBot</button>
          </div>

        </div>

      </section>

      <section className="home-features">

        <div className="feature-card">
          <h2>Mapa</h2>
          <p>
            Encontrá puntos de reciclaje y consultá recorridos
            y horarios de recolección.
          </p>
        </div>

        <div className="feature-card impact-card">

        <h2>🌱 Nuestro impacto</h2>

        <div className="impact-number">
          {porcentaje}%
        </div>

        <p>
          Basurales solucionados
        </p>

        <div className="impact-bar">
          <div
            className="impact-progress"
            style={{ width: `${porcentaje}%` }}
          ></div>
        </div>

      </div>

        <div className="feature-card">
          <h2>Reciclaje</h2>
          <p>
            Aprendé cómo separar y reciclar distintos tipos
            de residuos.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;