import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { actualizarPunto, crearPunto, obtenerPunto, opcionesPunto } from "../../../services/puntos.service";

// Formulario compartido: sin :id en la ruta crea un punto, con :id edita el existente.
export default function PuntoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState({ nombre: "", referencia: "", id_calle: "", latitud: "", longitud: "", activo: true });
  const [calles, setCalles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  // Carga las opciones de los selectores y, al editar, los datos actuales del punto.
  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const [opciones, punto] = await Promise.all([opcionesPunto(), id ? obtenerPunto(id) : null]);
        if (cancelado) return;

        setCalles(opciones.calles);
        if (punto) {
          setForm({
            nombre: punto.nombre,
            referencia: punto.referencia ?? "",
            id_calle: String(punto.id_calle),
            latitud: String(punto.latitud),
            longitud: String(punto.longitud),
            activo: Boolean(punto.activo),
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
      const datos = {
        nombre: form.nombre,
        referencia: form.referencia,
        id_calle: Number(form.id_calle),
        latitud: Number(form.latitud),
        longitud: Number(form.longitud),
        activo: form.activo,
      };
      if (editando) {
        await actualizarPunto(id, datos);
      } else {
        await crearPunto(datos);
      }
      navigate("/admin/puntos", { state: { mensaje: editando ? "Punto actualizado correctamente" : "Punto creado correctamente" } });
    } catch (err) {
      setError(err.message);
      setGuardando(false);
    }
  };

  if (cargando) return <p>Cargando...</p>;

  // Las calles se agrupan por zona para encontrarlas más fácil.
  const zonas = [...new Set(calles.map((c) => c.zona))];

  return (
    <>
      <h1 className="admin-title">{editando ? "Editar punto de recolección" : "Nuevo punto de recolección"}</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        {error && <p className="admin-alert admin-alert-error">{error}</p>}

        <label className="admin-field">
          <span>Nombre</span>
          <input type="text" value={form.nombre} onChange={cambiar("nombre")} maxLength={100} required />
        </label>

        <label className="admin-field">
          <span>Referencia</span>
          <input type="text" value={form.referencia} onChange={cambiar("referencia")} maxLength={200} />
        </label>

        <label className="admin-field">
          <span>Calle</span>
          <select value={form.id_calle} onChange={cambiar("id_calle")} required>
            <option value="">Elegí una calle</option>
            {zonas.map((zona) => (
              <optgroup key={zona} label={zona}>
                {calles
                  .filter((c) => c.zona === zona)
                  .map((c) => (
                    <option key={c.id_calle} value={c.id_calle}>
                      {c.nombre}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </label>

        <label className="admin-field">
          <span>Latitud</span>
          <input type="number" step="any" min="-90" max="90" value={form.latitud} onChange={cambiar("latitud")} required />
        </label>

        <label className="admin-field">
          <span>Longitud</span>
          <input type="number" step="any" min="-180" max="180" value={form.longitud} onChange={cambiar("longitud")} required />
        </label>

        <label className="admin-check">
          <input type="checkbox" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })} />
          Punto activo
        </label>

        {editando && (
          <small>Los tipos de residuo que recibe el punto se administran en la sección "Tipos por punto".</small>
        )}

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <Link to="/admin/puntos" className="admin-btn admin-btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}
