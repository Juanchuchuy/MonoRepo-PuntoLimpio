import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listarPuntoTipos, eliminarPuntoTipo } from "../../../services/puntoTipos.service";

// Listado de qué tipos de residuo recibe cada punto, con acceso a crear, editar y eliminar.
export default function PuntoTiposList() {
  const location = useLocation();
  const [asignaciones, setAsignaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("");
  // Mensaje de éxito que envía el formulario al volver al listado.
  const mensaje = location.state?.mensaje;

  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const datos = await listarPuntoTipos();
        if (!cancelado) setAsignaciones(datos);
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

  const handleEliminar = async (a) => {
    if (!window.confirm(`¿Quitar "${a.tipo}" de "${a.punto}"? El punto dejará de recibir ese tipo de residuo.`)) return;

    setError("");
    try {
      await eliminarPuntoTipo(a.id_punto, a.id_tipo);
      setAsignaciones((prev) => prev.filter((x) => !(x.id_punto === a.id_punto && x.id_tipo === a.id_tipo)));
    } catch (e) {
      setError(e.message);
    }
  };

  const texto = filtro.trim().toLowerCase();
  const visibles = asignaciones.filter((a) => `${a.punto} ${a.tipo}`.toLowerCase().includes(texto));

  return (
    <>
      <div className="admin-toolbar">
        <div className="glass-card-white">
          <h1 className="admin-title">
            <strong style={{ color: "white" }}>Tipos por punto</strong>
          </h1>
        </div>
        <Link to="/admin/punto-tipos/nuevo" className="admin-btn admin-btn-primary">
          Nueva asignación
        </Link>
      </div>

      {mensaje && <p className="admin-alert admin-alert-success">{mensaje}</p>}
      {error && <p className="admin-alert admin-alert-error">{error}</p>}

      {cargando ? (
        <p>Cargando asignaciones...</p>
      ) : asignaciones.length === 0 ? (
        <p>Todavía no hay tipos de residuo asignados a ningún punto.</p>
      ) : (
        <>
          <label className="admin-field">
            <span>Buscar por punto o tipo</span>
            <input type="search" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
          </label>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Punto de recolección</th>
                  <th>Tipo de residuo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((a) => (
                  <tr key={`${a.id_punto}-${a.id_tipo}`}>
                    <td>{a.punto}</td>
                    <td>{a.tipo}</td>
                    <td className="admin-actions">
                      <Link to={`/admin/punto-tipos/${a.id_punto}/${a.id_tipo}/editar`} className="admin-btn admin-btn-secondary">
                        Editar
                      </Link>
                      <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleEliminar(a)}>
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visibles.length === 0 && <p>No hay resultados para la búsqueda.</p>}
        </>
      )}
    </>
  );
}
