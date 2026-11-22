import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listarPuntos, eliminarPunto } from "../../../services/puntos.service";

// Listado de puntos de recolección con acceso a crear, editar y eliminar.
export default function PuntosList() {
  const location = useLocation();
  const [puntos, setPuntos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  // Mensaje de éxito que envía el formulario al volver al listado.
  const mensaje = location.state?.mensaje;

  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const datos = await listarPuntos();
        if (!cancelado) setPuntos(datos);
      } catch (e) {
        if (!cancelado) setError(e.message);
      } finally {
        if (!cancelado) setCargando(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, []);

  const handleEliminar = async (punto) => {
    if (!window.confirm(`¿Eliminar el punto "${punto.nombre}"? También se borran sus horarios y los tipos asignados. No se puede deshacer.`)) return;

    setError("");
    try {
      await eliminarPunto(punto.id_punto);
      setPuntos((prev) => prev.filter((p) => p.id_punto !== punto.id_punto));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="admin-toolbar">
        <div className="glass-card-white">
          <h1 className="admin-title">
            <strong style={{ color: "white" }}>Puntos de recolección</strong>
          </h1>
        </div>
        <Link to="/admin/puntos/nuevo" className="admin-btn admin-btn-primary">
          Nuevo punto
        </Link>
      </div>

      {mensaje && <p className="admin-alert admin-alert-success">{mensaje}</p>}
      {error && <p className="admin-alert admin-alert-error">{error}</p>}

      {cargando ? (
        <p>Cargando puntos...</p>
      ) : puntos.length === 0 ? (
        <p>Todavía no hay puntos de recolección cargados.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Ubicación</th>
                <th>Residuos que recibe</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {puntos.map((punto) => (
                <tr key={punto.id_punto}>
                  <td>{punto.id_punto}</td>
                  <td>{punto.nombre}</td>
                  <td>
                    {punto.calle} ({punto.zona})
                  </td>
                  <td>{punto.tipos || "—"}</td>
                  <td>
                    <span className="admin-badge">{punto.activo ? "activo" : "inactivo"}</span>
                  </td>
                  <td className="admin-actions">
                    <Link to={`/admin/puntos/${punto.id_punto}/editar`} className="admin-btn admin-btn-secondary">
                      Editar
                    </Link>
                    <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleEliminar(punto)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
