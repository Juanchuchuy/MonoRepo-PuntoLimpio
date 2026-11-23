import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { actualizarRegistro, crearRegistro, obtenerRegistro } from "../../../services/registros.service";
import { listarPuntos } from "../../../services/puntos.service";

// Fecha y hora actuales en el formato del input datetime-local (YYYY-MM-DDTHH:MM, hora local).
function ahoraLocal() {
  const ahora = new Date();
  ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
  return ahora.toISOString().slice(0, 16);
}

// Formulario compartido: sin :id en la ruta crea un registro, con :id edita el existente.
// Quien registra la recolección lo completa el servidor con el usuario de la sesión.
export default function RegistroForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState({ id_punto: "", fecha_hora: ahoraLocal(), estado: "Realizada", observaciones: "" });
  const [puntos, setPuntos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  // Carga los puntos para el select y, al editar, los datos actuales del registro.
  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const [listaPuntos, registro] = await Promise.all([listarPuntos(), id ? obtenerRegistro(id) : null]);
        if (cancelado) return;

        setPuntos(listaPuntos);
        if (registro) {
          setForm({
            id_punto: String(registro.id_punto),
            fecha_hora: registro.fecha_hora,
            estado: registro.estado,
            observaciones: registro.observaciones ?? "",
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

  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setGuardando(true);

    try {
      const datos = { ...form, id_punto: Number(form.id_punto) };
      if (editando) {
        await actualizarRegistro(id, datos);
      } else {
        await crearRegistro(datos);
      }
      navigate("/admin/registros", { state: { mensaje: editando ? "Registro actualizado correctamente" : "Registro creado correctamente" } });
    } catch (err) {
      setError(err.message);
      setGuardando(false);
    }
  };

  if (cargando) return <p>Cargando...</p>;

  return (
    <>
      <h1 className="admin-title">{editando ? "Editar registro de recolección" : "Nuevo registro de recolección"}</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        {error && <p className="admin-alert admin-alert-error">{error}</p>}

        <label className="admin-field">
          <span>Punto de recolección</span>
          <select value={form.id_punto} onChange={cambiar("id_punto")} required>
            <option value="">Elegí un punto</option>
            {puntos.map((p) => (
              <option key={p.id_punto} value={p.id_punto}>
                {p.nombre} ({p.calle})
              </option>
            ))}
          </select>
        </label>

        <label className="admin-field">
          <span>Fecha y hora</span>
          <input type="datetime-local" value={form.fecha_hora} onChange={cambiar("fecha_hora")} required />
        </label>

        <label className="admin-field">
          <span>Estado</span>
          <select value={form.estado} onChange={cambiar("estado")} required>
            <option value="Realizada">Realizada</option>
            <option value="No realizada">No realizada</option>
          </select>
        </label>

        <label className="admin-field">
          <span>Observaciones</span>
          <textarea value={form.observaciones} onChange={cambiar("observaciones")} maxLength={255} rows={3} />
        </label>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <Link to="/admin/registros" className="admin-btn admin-btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}
