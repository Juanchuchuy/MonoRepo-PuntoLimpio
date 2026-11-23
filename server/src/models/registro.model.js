import { pool } from "../config/db.js";

// Consultas SQL de registros de recolección (historial). Siempre parametrizadas (?).
// La fecha se devuelve como "YYYY-MM-DDTHH:MM" para que el input datetime-local del formulario la use tal cual.

const BASE = `
  SELECT r.id_registro, r.id_punto, p.nombre AS punto, r.id_usuario,
         CONCAT(u.nombre, ' ', u.apellido) AS usuario,
         DATE_FORMAT(r.fecha_hora, '%Y-%m-%dT%H:%i') AS fecha_hora, r.estado, r.observaciones
  FROM registros_recoleccion r
  JOIN puntos_recoleccion p ON p.id_punto = r.id_punto
  JOIN usuarios u ON u.id_usuario = r.id_usuario`;

export async function listar() {
  const [filas] = await pool.execute(`${BASE} ORDER BY r.fecha_hora DESC, r.id_registro DESC`);
  return filas;
}

export async function buscarPorId(id) {
  const [filas] = await pool.execute(`${BASE} WHERE r.id_registro = ?`, [id]);
  return filas[0] || null;
}

export async function puntoExiste(idPunto) {
  const [filas] = await pool.execute("SELECT id_punto FROM puntos_recoleccion WHERE id_punto = ?", [idPunto]);
  return filas.length > 0;
}

export async function crear({ id_punto, fecha_hora, estado, observaciones }, idUsuario) {
  const [resultado] = await pool.execute(
    "INSERT INTO registros_recoleccion (id_punto, id_usuario, fecha_hora, estado, observaciones) VALUES (?, ?, ?, ?, ?)",
    [id_punto, idUsuario, fecha_hora, estado, observaciones]
  );
  return resultado.insertId;
}

// Quien registró la recolección (id_usuario) no se modifica al editar.
export async function actualizar(id, { id_punto, fecha_hora, estado, observaciones }) {
  await pool.execute(
    "UPDATE registros_recoleccion SET id_punto = ?, fecha_hora = ?, estado = ?, observaciones = ? WHERE id_registro = ?",
    [id_punto, fecha_hora, estado, observaciones, id]
  );
}

export async function eliminar(id) {
  await pool.execute("DELETE FROM registros_recoleccion WHERE id_registro = ?", [id]);
}
