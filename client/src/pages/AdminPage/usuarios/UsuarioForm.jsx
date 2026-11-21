import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { actualizarUsuario, crearUsuario, obtenerUsuario } from "../../../services/usuarios.service";
import { listarRoles } from "../../../services/roles.service";

// Formulario compartido: sin :id en la ruta crea un usuario, con :id edita el existente.
export default function UsuarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [datos, setDatos] = useState({ nombre: "", apellido: "", email: "", password: "", id_rol: "", activo: true });
  const [roles, setRoles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const cambiar = (campo) => (e) => setDatos((prev) => ({ ...prev, [campo]: e.target.value }));

  // Carga los roles para el select y, al editar, los datos actuales del usuario.
  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const [listaRoles, usuario] = await Promise.all([listarRoles(), id ? obtenerUsuario(id) : null]);
        if (cancelado) return;
        setRoles(listaRoles);
        if (usuario) {
          setDatos({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            password: "",
            id_rol: String(usuario.id_rol),
            activo: Boolean(usuario.activo),
          });
        }
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
      const cuerpo = { ...datos, id_rol: Number(datos.id_rol) };
      if (editando) {
        await actualizarUsuario(id, cuerpo);
      } else {
        await crearUsuario(cuerpo);
      }
      navigate("/admin/usuarios", {
        state: { mensaje: editando ? "Usuario actualizado correctamente" : "Usuario creado correctamente" },
      });
    } catch (err) {
      setError(err.message);
      setGuardando(false);
    }
  };

  if (cargando) return <p>Cargando usuario...</p>;

  return (
    <>
      <h1 className="admin-title">{editando ? "Editar usuario" : "Nuevo usuario"}</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        {error && <p className="admin-alert admin-alert-error">{error}</p>}

        <label className="admin-field">
          <span>Nombre</span>
          <input type="text" value={datos.nombre} onChange={cambiar("nombre")} maxLength={50} required />
        </label>

        <label className="admin-field">
          <span>Apellido</span>
          <input type="text" value={datos.apellido} onChange={cambiar("apellido")} maxLength={50} required />
        </label>

        <label className="admin-field">
          <span>Email</span>
          <input type="email" value={datos.email} onChange={cambiar("email")} maxLength={100} required />
        </label>

        <label className="admin-field">
          <span>Rol</span>
          <select value={datos.id_rol} onChange={cambiar("id_rol")} required>
            <option value="">Elegí un rol</option>
            {roles.map((rol) => (
              <option key={rol.id_rol} value={rol.id_rol}>
                {rol.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="admin-field">
          <span>Contraseña</span>
          <input
            type="password"
            value={datos.password}
            onChange={cambiar("password")}
            minLength={8}
            maxLength={72}
            autoComplete="new-password"
            required={!editando}
          />
          <small>{editando ? "Dejala vacía para no cambiarla." : "Entre 8 y 72 caracteres."}</small>
        </label>

        <label className="admin-field">
          <span>
            <input
              type="checkbox"
              checked={datos.activo}
              onChange={(e) => setDatos((prev) => ({ ...prev, activo: e.target.checked }))}
            />{" "}
            Cuenta activa
          </span>
          <small>Si la desactivás, el usuario ya no puede iniciar sesión.</small>
        </label>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <Link to="/admin/usuarios" className="admin-btn admin-btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}
