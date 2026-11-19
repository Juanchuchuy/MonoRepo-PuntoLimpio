import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listarRoles, eliminarRol } from "../../../services/roles.service";

// Listado de roles con acceso a crear, editar y eliminar.
export default function RolesList() {
  const location = useLocation();
  const [roles, setRoles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  // Mensaje de éxito que envían los formularios al volver al listado.
  const mensaje = location.state?.mensaje;

  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const datos = await listarRoles();
        if (!cancelado) setRoles(datos);
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

  const handleEliminar = async (rol) => {
    if (!window.confirm(`¿Eliminar el rol "${rol.nombre}"? Esta acción no se puede deshacer.`)) return;

    setError("");
    try {
      await eliminarRol(rol.id_rol);
      setRoles((prev) => prev.filter((r) => r.id_rol !== rol.id_rol));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="admin-toolbar">
        <h1 className="admin-title">Roles</h1>
        <Link to="/admin/roles/nuevo" className="admin-btn admin-btn-primary">
          Nuevo rol
        </Link>
      </div>

      {mensaje && <p className="admin-alert admin-alert-success">{mensaje}</p>}
      {error && <p className="admin-alert admin-alert-error">{error}</p>}

      {cargando ? (
        <p>Cargando roles...</p>
      ) : roles.length === 0 ? (
        <p>Todavía no hay roles cargados.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Usuarios</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((rol) => (
                <tr key={rol.id_rol}>
                  <td>{rol.id_rol}</td>
                  <td>
                    {rol.nombre} {rol.protegido && <span className="admin-badge">del sistema</span>}
                  </td>
                  <td>{rol.descripcion || "—"}</td>
                  <td>{rol.cantidad_usuarios}</td>
                  <td className="admin-actions">
                    <Link to={`/admin/roles/${rol.id_rol}/editar`} className="admin-btn admin-btn-secondary">
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      disabled={rol.protegido}
                      title={rol.protegido ? "Los roles del sistema no se pueden eliminar" : undefined}
                      onClick={() => handleEliminar(rol)}
                    >
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