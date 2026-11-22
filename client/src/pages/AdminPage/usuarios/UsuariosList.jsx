import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listarUsuarios, eliminarUsuario } from "../../../services/usuarios.service";


export default function UsuariosList() {
  const location = useLocation();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  
  const mensaje = location.state?.mensaje;

  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const datos = await listarUsuarios();
        if (!cancelado) setUsuarios(datos);
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

  const handleEliminar = async (usuario) => {
    if (!window.confirm(`¿Eliminar al usuario "${usuario.email}"? Esta acción no se puede deshacer.`)) return;

    setError("");
    try {
      await eliminarUsuario(usuario.id_usuario);
      setUsuarios((prev) => prev.filter((u) => u.id_usuario !== usuario.id_usuario));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="admin-toolbar">
        <div className="glass-card-white">
          <h1 className="admin-title">
            <strong style={{ color: "white" }}>Usuarios</strong>
          </h1>
        </div>
        <Link to="/admin/usuarios/nuevo" className="admin-btn admin-btn-primary">
          Nuevo usuario
        </Link>
      </div>

      {mensaje && <p className="admin-alert admin-alert-success">{mensaje}</p>}
      {error && <p className="admin-alert admin-alert-error">{error}</p>}

      {cargando ? (
        <p>Cargando usuarios...</p>
      ) : usuarios.length === 0 ? (
        <p>Todavía no hay usuarios cargados.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Puntos creados</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id_usuario}>
                  <td>{u.id_usuario}</td>
                  <td>
                    {u.nombre} {u.apellido}
                  </td>
                  <td>{u.email}</td>
                  <td>{u.rol}</td>
                  <td>
                    <span className="admin-badge">{u.activo ? "Activo" : "Inactivo"}</span>
                  </td>
                  <td>{u.puntos_creados}</td>
                  <td className="admin-actions">
                    <Link to={`/admin/usuarios/${u.id_usuario}/editar`} className="admin-btn admin-btn-secondary">
                      Editar
                    </Link>
                    <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleEliminar(u)}>
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
