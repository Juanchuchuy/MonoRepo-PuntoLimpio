import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { actualizarTipo, crearTipo, obtenerTipo } from "../../../services/tiposResiduo.service";

// Formulario compartido: sin :id en la ruta crea un tipo de residuo, con :id edita el existente.
export default function TipoResiduoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  // Al editar, carga los datos actuales del tipo.
  useEffect(() => {
    if (!id) return;
    let cancelado = false;

    (async () => {
      try {
        const tipo = await obtenerTipo(id);
        if (cancelado) return;
        setNombre(tipo.nombre);
        setDescripcion(tipo.descripcion ?? "");
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
        await actualizarTipo(id, datos);
      } else {
        await crearTipo(datos);
      }
      navigate("/admin/tipos-residuo", {
        state: { mensaje: editando ? "Tipo de residuo actualizado correctamente" : "Tipo de residuo creado correctamente" },
      });
    } catch (err) {
      setError(err.message);
      setGuardando(false);
    }
  };

  if (cargando) return <p>Cargando tipo de residuo...</p>;

  return (
    <>
      <h1 className="admin-title">{editando ? "Editar tipo de residuo" : "Nuevo tipo de residuo"}</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        {error && <p className="admin-alert admin-alert-error">{error}</p>}

        <label className="admin-field">
          <span>Nombre</span>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} maxLength={50} required />
        </label>

        <label className="admin-field">
          <span>Descripción</span>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} maxLength={150} rows={3} />
        </label>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <Link to="/admin/tipos-residuo" className="admin-btn admin-btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}
