import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listarTipos, eliminarTipo } from "../../../services/tiposResiduo.service";

// Listado de tipos de residuo con acceso a crear, editar y eliminar.
export default function TiposResiduoList() {
  const location = useLocation();
  const [tipos, setTipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  // Mensaje de éxito que envían los formularios al volver al listado.
  const mensaje = location.state?.mensaje;

  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const datos = await listarTipos();
        if (!cancelado) setTipos(datos);
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

  const handleEliminar = async (tipo) => {
    if (!window.confirm(`¿Eliminar el tipo de residuo "${tipo.nombre}"? Esta acción no se puede deshacer.`)) return;

    setError("");
    try {
      await eliminarTipo(tipo.id_tipo);
      setTipos((prev) => prev.filter((t) => t.id_tipo !== tipo.id_tipo));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="admin-toolbar">
        <div className="glass-card-white">
          <h1 className="admin-title">
            <strong style={{ color: "white" }}>Tipos de residuo</strong>
          </h1>
        </div>
        <Link to="/admin/tipos-residuo/nuevo" className="admin-btn admin-btn-primary">
          Nuevo tipo
        </Link>
      </div>

      {mensaje && <p className="admin-alert admin-alert-success">{mensaje}</p>}
      {error && <p className="admin-alert admin-alert-error">{error}</p>}

      {cargando ? (
        <p>Cargando tipos de residuo...</p>
      ) : tipos.length === 0 ? (
        <p>Todavía no hay tipos de residuo cargados.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Puntos que lo aceptan</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tipos.map((tipo) => (
                <tr key={tipo.id_tipo}>
                  <td>{tipo.id_tipo}</td>
                  <td>{tipo.nombre}</td>
                  <td>{tipo.descripcion || "—"}</td>
                  <td>{tipo.cantidad_puntos}</td>
                  <td className="admin-actions">
                    <Link to={`/admin/tipos-residuo/${tipo.id_tipo}/editar`} className="admin-btn admin-btn-secondary">
                      Editar
                    </Link>
                    <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleEliminar(tipo)}>
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
