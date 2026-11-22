
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mapaHome from "../../assets/mapa-home.png";
import reciclajeHome from "../../assets/reciclaje-home.png";
import "./css/Home.css";
import EcoBot from "./components/EcoBot";

function Home() {
  const [impacto, setImpacto] = useState({
    reportes: 0,
    solucionados: 0,
    porcentaje: 0
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/estadisticas")
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudieron cargar las estadísticas");
        }
        return res.json();
      })
      .then((data) => {
        setImpacto({
          reportes: data.reportes,
          solucionados: data.solucionados,
          porcentaje: data.porcentaje
        });
      })
      .catch((error) => {
        console.error("Error al cargar el impacto:", error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <div className="home">

      <EcoBot />

      <section className="hero">
        <div className="hero-content">
          <h1>Punto Limpio</h1>

          <p>
            Encontrá puntos de reciclaje, conocé nuestro impacto
            y aprendé cómo reciclar mejor.
          </p>

          
        </div>
      </section>

      <section className="home-features">

        <Link to="/Mapa" className="feature-card mapa-card">
        <img
          src={mapaHome}
          alt="Mapa de San Miguel de Tucumán"
        />

        <div className="mapa-card-content">
          <h2>Mapa</h2>

          <p>
            Encontrá puntos de reciclaje, y consultá recorridos
            y horarios de recolección.
          </p>

          <span>Explorar mapa →</span>
        </div>
      </Link>

        <div className="feature-card impact-card">
          <h2>Nuestro impacto</h2>

          {cargando ? (
            <p>Cargando impacto...</p>
          ) : (
            <>
              <div className="impact-number">
                {impacto.porcentaje}%
              </div>

              <p>
                Porcentaje de resolución de reportes
              </p>

              <div className="impact-bar">
                <div
                  className="impact-progress"
                  style={{ width: `${impacto.porcentaje}%` }}
                ></div>
              </div>

              <p className="impact-detail">
                {impacto.solucionados} de {impacto.reportes} reportes solucionados
              </p>
            </>
          )}
        </div>

        <Link to="/Reciclaje" className="feature-card reciclaje-card">
        <img
          src={reciclajeHome}
          alt="Contenedores de reciclaje"
        />

        <div className="reciclaje-card-content">
          <h2>Reciclaje</h2>

          <p>
            Aprendé cómo separar y reciclar distintos tipos
            de residuos.
          </p>

          <span>Conocer más →</span>
        </div>
      </Link>

      </section>

    </div>
  );
}

export default Home;
