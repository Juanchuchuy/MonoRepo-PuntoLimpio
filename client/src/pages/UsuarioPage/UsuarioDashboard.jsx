import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Recycle, Clock, CheckCircle2, ListChecks } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { obtenerMiPanel, eliminarMiReporte } from "../../services/miPanel.service";
import "./css/UsuarioDashboard.css";

// Convierte "En revision" en "en-revision" para usarlo como clase CSS del badge de estado.
const claseEstado = (estado) => estado.toLowerCase().replace(/\s+/g, "-");

// Dashboard del vecino: sus cifras, sus reportes y accesos rápidos.
export default function UsuarioDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user); // usuario de la sesión (Zustand)

  // Estado local: datos del panel, carga y error.
  const [resumen, setResumen] = useState(null);
  const [reportes, setReportes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Pide el panel al backend. Se reutiliza al abrir la página y después de eliminar un reporte.
  const cargarPanel = async () => {
    try {
      const data = await obtenerMiPanel();
      setResumen(data.resumen);
      setReportes(data.reportes);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  // Carga inicial: el [] hace que se ejecute una sola vez al montar el componente.
  useEffect(() => {
    cargarPanel();
  }, []);

  const eliminarReporte = async (reporte) => {
    if (!window.confirm(`¿Eliminar tu reporte de "${reporte.tipo}"? Esta acción no se puede deshacer.`)) return;
    try {
      await eliminarMiReporte(reporte.id_reporte);
      await cargarPanel(); // se vuelve a pedir todo para que las cifras queden al día
    } catch (err) {
      setError(err.message);
    }
  };

  // Datos de las tarjetas de cifras; se arman acá para dibujarlas con un solo .map().
  const tarjetas = resumen && [
    { titulo: "Mis reportes", valor: resumen.total, Icono: ListChecks },
    { titulo: "Pendientes", valor: resumen.pendientes, Icono: Clock },
    { titulo: "En revisión", valor: resumen.en_revision, Icono: MapPin },
    { titulo: "Resueltos", valor: resumen.resueltos, Icono: CheckCircle2 },
  ];

  if (cargando) return <p className="panel-estado">Cargando tu panel...</p>;

  return (
    <section className="panel">
      {/* Bienvenida + acción principal */}
      <div className="panel-header">
        <div>
          <h1>Hola, {user?.nombre}</h1>
          <p>Seguí el estado de los basurales que reportaste y colaborá con tu barrio.</p>
        </div>
        <button className="panel-btn panel-btn-primary" onClick={() => navigate("/Mapa")}>
          + Reportar un basural
        </button>
      </div>

      {error && <div className="panel-alert">{error}</div>}

      {/* Cifras */}
      {tarjetas && (
        <div className="panel-indicadores">
          {tarjetas.map(({ titulo, valor, Icono }) => (
            <div key={titulo} className="panel-card">
              <Icono size={28} />
              <h3>{titulo}</h3>
              <span>{valor}</span>
            </div>
          ))}
        </div>
      )}

      {/* Listado de reportes propios */}
      <div className="panel-seccion">
        <h2>Mis reportes</h2>
        <p>Podés eliminar un reporte mientras esté pendiente.</p>

        {reportes.length === 0 ? (
          <p className="panel-vacio">Todavía no hiciste ningún reporte. Marcá un basural desde el mapa.</p>
        ) : (
          <div className="panel-tabla-wrapper">
            <table className="panel-tabla">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reportes.map((r) => (
                  <tr key={r.id_reporte}>
                    <td>{r.tipo}</td>
                    <td>{r.descripcion}</td>
                    <td>{new Date(r.fecha_reporte).toLocaleDateString("es-AR")}</td>
                    <td>
                      <span className={`panel-badge panel-badge-${claseEstado(r.estado)}`}>{r.estado}</span>
                    </td>
                    <td>
                      {/* Solo se puede eliminar lo pendiente (el backend también lo exige) */}
                      {r.estado === "Pendiente" && (
                        <button className="panel-btn panel-btn-danger" onClick={() => eliminarReporte(r)}>
                          Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Accesos rápidos */}
      <div className="panel-accesos">
        <button className="panel-acceso" onClick={() => navigate("/Mapa")}>
          <MapPin size={32} />
          <h3>Mapa</h3>
          <p>Puntos de recolección, horarios y reportes de la comunidad.</p>
        </button>
        <button className="panel-acceso" onClick={() => navigate("/reciclaje")}>
          <Recycle size={32} />
          <h3>Reciclaje</h3>
          <p>Aprendé a separar tus residuos correctamente.</p>
        </button>
      </div>
    </section>
  );
}
