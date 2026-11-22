import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  actualizarPuntoTipo,
  crearPuntoTipo,
  obtenerPuntoTipo,
  opcionesPuntoTipo,
} from "../../../services/puntoTipos.service";

// Formulario compartido: sin parámetros en la ruta crea una asignación; con :idPunto/:idTipo edita la existente.
export default function PuntoTipoForm() {
  const { idPunto, idTipo } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(idPunto && idTipo);

  const [form, setForm] = useState({ id_punto: "", id_tipo: "" });
  const [puntos, setPuntos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  // Carga las opciones de los selectores y, al editar, la asignación actual.
  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const [opciones, actual] = await Promise.all([
          opcionesPuntoTipo(),
          editando ? obtenerPuntoTipo(idPunto, idTipo) : null,
        ]);
        if (cancelado) return;

        setPuntos(opciones.puntos);
        setTipos(opciones.tipos);
        if (actual) setForm({ id_punto: String(actual.id_punto), id_tipo: String(actual.id_tipo) });
      } catch (e) {
        if (!cancelado) setError(e.message);
      } finally {
        if (!cancelado) setCargando(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [idPunto, idTipo, editando]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setGuardando(true);

    try {
      const datos = { id_punto: Number(form.id_punto), id_tipo: Number(form.id_tipo) };
      if (editando) {
        await actualizarPuntoTipo(idPunto, idTipo, datos);
      } else {
        await crearPuntoTipo(datos);
      }
      navigate("/admin/punto-tipos", {
        state: { mensaje: editando ? "Asignación actualizada correctamente" : "Asignación creada correctamente" },
      });
    } catch (err) {
      setError(err.message);
      setGuardando(false);
    }
  };

  if (cargando) return <p>Cargando...</p>;

  return (
    <>
      <h1 className="admin-title">{editando ? "Editar asignación" : "Nueva asignación"}</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        {error && <p className="admin-alert admin-alert-error">{error}</p>}

        <label className="admin-field">
          <span>Punto de recolección</span>
          <select value={form.id_punto} onChange={(e) => setForm({ ...form, id_punto: e.target.value })} required>
            <option value="">Elegí un punto</option>
            {puntos.map((p) => (
              <option key={p.id_punto} value={p.id_punto}>
                {p.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="admin-field">
          <span>Tipo de residuo</span>
          <select value={form.id_tipo} onChange={(e) => setForm({ ...form, id_tipo: e.target.value })} required>
            <option value="">Elegí un tipo</option>
            {tipos.map((t) => (
              <option key={t.id_tipo} value={t.id_tipo}>
                {t.nombre}
              </option>
            ))}
          </select>
        </label>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <Link to="/admin/punto-tipos" className="admin-btn admin-btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}
