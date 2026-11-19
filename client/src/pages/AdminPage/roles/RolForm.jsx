import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { actualizarRol, crearRol, obtenerRol } from "../../../services/roles.service";

// Formulario compartido: sin :id en la ruta crea un rol, con :id edita el existente.
export default function RolForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [protegido, setProtegido] = useState(false);
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  // Al editar, carga los datos actuales del rol.
  useEffect(() => {
    if (!id) return;
    let cancelado = false;

    (async () => {
      try {
        const rol = await obtenerRol(id);
        if (cancelado) return;
        setNombre(rol.nombre);
        setDescripcion(rol.descripcion ?? "");
        setProtegido(rol.protegido);
      } catch (e) {
        if (!cancelado) setError(e.message);
      } finally {
        if (!cancelado) setCargando(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setGuardando(true);

    try {
      const datos = { nombre, descripcion };
      if (editando) {
        await actualizarRol(id, datos);
      } else {
        await crearRol(datos);
      }
      navigate("/admin/roles", { state: { mensaje: editando ? "Rol actualizado correctamente" : "Rol creado correctamente" } });
    } catch (err) {
      setError(err.message);
      setGuardando(false);
    }
  };

  if (cargando) return <p>Cargando rol...</p>;

  return (
    <>
      <h1 className="admin-title">{editando ? "Editar rol" : "Nuevo rol"}</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        {error && <p className="admin-alert admin-alert-error">{error}</p>}

        <label className="admin-field">
          <span>Nombre</span>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            maxLength={30}
            required
            disabled={protegido}
          />
          {protegido && <small>Los roles del sistema no se pueden renombrar.</small>}
        </label>

        <label className="admin-field">
          <span>Descripción</span>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} maxLength={150} rows={3} />
        </label>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <Link to="/admin/roles" className="admin-btn admin-btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}