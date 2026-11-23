import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { actualizarHorario, crearHorario, obtenerHorario } from "../../../services/horarios.service";
import { listarPuntos } from "../../../services/puntos.service";

// El valor es el que guarda la base (sin tildes); la etiqueta es lo que ve el usuario.
const DIAS = [
  { valor: "Lunes", etiqueta: "Lunes" },
  { valor: "Martes", etiqueta: "Martes" },
  { valor: "Miercoles", etiqueta: "Miércoles" },
  { valor: "Jueves", etiqueta: "Jueves" },
  { valor: "Viernes", etiqueta: "Viernes" },
  { valor: "Sabado", etiqueta: "Sábado" },
  { valor: "Domingo", etiqueta: "Domingo" },
];

// Formulario compartido: sin :id en la ruta crea un horario, con :id edita el existente.
export default function HorarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState({ id_punto: "", dia_semana: "", hora_estimada: "", observaciones: "" });
  const [puntos, setPuntos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  // Carga los puntos para el select y, al editar, los datos actuales del horario.
  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const [listaPuntos, horario] = await Promise.all([listarPuntos(), id ? obtenerHorario(id) : null]);
        if (cancelado) return;

        setPuntos(listaPuntos);
        if (horario) {
          setForm({
            id_punto: String(horario.id_punto),
            dia_semana: horario.dia_semana,
            hora_estimada: horario.hora_estimada,
            observaciones: horario.observaciones ?? "",
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
        await actualizarHorario(id, datos);
      } else {
        await crearHorario(datos);
      }
      navigate("/admin/horarios", { state: { mensaje: editando ? "Horario actualizado correctamente" : "Horario creado correctamente" } });
    } catch (err) {
      setError(err.message);
      setGuardando(false);
    }
  };

  if (cargando) return <p>Cargando...</p>;

  return (
    <>
      <h1 className="admin-title">{editando ? "Editar horario" : "Nuevo horario"}</h1>

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
          <span>Día de la semana</span>
          <select value={form.dia_semana} onChange={cambiar("dia_semana")} required>
            <option value="">Elegí un día</option>
            {DIAS.map((d) => (
              <option key={d.valor} value={d.valor}>
                {d.etiqueta}
              </option>
            ))}
          </select>
        </label>

        <label className="admin-field">
          <span>Hora estimada</span>
          <input type="time" value={form.hora_estimada} onChange={cambiar("hora_estimada")} required />
        </label>

        <label className="admin-field">
          <span>Observaciones</span>
          <textarea value={form.observaciones} onChange={cambiar("observaciones")} maxLength={255} rows={3} />
        </label>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <Link to="/admin/horarios" className="admin-btn admin-btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}
