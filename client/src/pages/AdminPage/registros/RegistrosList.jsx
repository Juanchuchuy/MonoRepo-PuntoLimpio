import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listarRegistros, eliminarRegistro } from "../../../services/registros.service";

// Listado del historial de recolecciones con acceso a crear, editar y eliminar.
export default function RegistrosList() {
  const location = useLocation();
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  // Mensaje de éxito que envía el formulario al volver al listado.
  const mensaje = location.state?.mensaje;

  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const datos = await listarRegistros();
        if (!cancelado) setRegistros(datos);
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

  const handleEliminar = async (registro) => {
    if (!window.confirm(`¿Eliminar el registro #${registro.id_registro} de "${registro.punto}"? Esta acción no se puede deshacer.`)) return;

    setError("");
    try {
      await eliminarRegistro(registro.id_registro);
      setRegistros((prev) => prev.filter((r) => r.id_registro !== registro.id_registro));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="admin-toolbar">
        <div className="glass-card-white">
          <h1 className="admin-title">
            <strong style={{ color: "white" }}>Registros de recolección</strong>
          </h1>
        </div>
        <Link to="/admin/registros/nuevo" className="admin-btn admin-btn-primary">
          Nuevo registro
        </Link>
      </div>

      {mensaje && <p className="admin-alert admin-alert-success">{mensaje}</p>}
      {error && <p className="admin-alert admin-alert-error">{error}</p>}

      {cargando ? (
        <p>Cargando registros...</p>
      ) : registros.length === 0 ? (
        <p>Todavía no hay registros de recolección.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Punto</th>
                <th>Fecha y hora</th>
                <th>Estado</th>
                <th>Registrado por</th>
                <th>Observaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro) => (
                <tr key={registro.id_registro}>
                  <td>{registro.id_registro}</td>
                  <td>{registro.punto}</td>
                  <td>{registro.fecha_hora.replace("T", " ")}</td>
                  <td>
                    <span className="admin-badge">{registro.estado}</span>
                  </td>
                  <td>{registro.usuario}</td>
                  <td>{registro.observaciones || "—"}</td>
                  <td className="admin-actions">
                    <Link to={`/admin/registros/${registro.id_registro}/editar`} className="admin-btn admin-btn-secondary">
                      Editar
                    </Link>
                    <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleEliminar(registro)}>
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
