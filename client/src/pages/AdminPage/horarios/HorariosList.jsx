import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listarHorarios, eliminarHorario } from "../../../services/horarios.service";

// Listado de horarios de recolección con acceso a crear, editar y eliminar.
export default function HorariosList() {
  const location = useLocation();
  const [horarios, setHorarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  // Mensaje de éxito que envía el formulario al volver al listado.
  const mensaje = location.state?.mensaje;

  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const datos = await listarHorarios();
        if (!cancelado) setHorarios(datos);
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

  const handleEliminar = async (horario) => {
    if (!window.confirm(`¿Eliminar el horario del ${horario.dia_semana} a las ${horario.hora_estimada} de "${horario.punto}"?`)) return;

    setError("");
    try {
      await eliminarHorario(horario.id_horario);
      setHorarios((prev) => prev.filter((h) => h.id_horario !== horario.id_horario));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="admin-toolbar">
        <div className="glass-card-white">
          <h1 className="admin-title">
            <strong style={{ color: "white" }}>Horarios de recolección</strong>
          </h1>
        </div>
        <Link to="/admin/horarios/nuevo" className="admin-btn admin-btn-primary">
          Nuevo horario
        </Link>
      </div>

      {mensaje && <p className="admin-alert admin-alert-success">{mensaje}</p>}
      {error && <p className="admin-alert admin-alert-error">{error}</p>}

      {cargando ? (
        <p>Cargando horarios...</p>
      ) : horarios.length === 0 ? (
        <p>Todavía no hay horarios cargados.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Punto</th>
                <th>Día</th>
                <th>Hora</th>
                <th>Observaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((horario) => (
                <tr key={horario.id_horario}>
                  <td>{horario.id_horario}</td>
                  <td>
                    {horario.punto} ({horario.calle})
                  </td>
                  <td>{horario.dia_semana}</td>
                  <td>{horario.hora_estimada}</td>
                  <td>{horario.observaciones || "—"}</td>
                  <td className="admin-actions">
                    <Link to={`/admin/horarios/${horario.id_horario}/editar`} className="admin-btn admin-btn-secondary">
                      Editar
                    </Link>
                    <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleEliminar(horario)}>
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
