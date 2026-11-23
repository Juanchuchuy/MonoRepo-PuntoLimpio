import { pool } from "../config/db.js";

// Consultas SQL de horarios de recolección. Siempre parametrizadas (?), nunca se concatenan valores.
// La hora se devuelve como "HH:MM" para que el input type="time" del formulario la use tal cual.

const BASE = `
  SELECT h.id_horario, h.id_punto, p.nombre AS punto, c.nombre AS calle, h.dia_semana,
         TIME_FORMAT(h.hora_estimada, '%H:%i') AS hora_estimada, h.observaciones
  FROM horarios_recoleccion h
  JOIN puntos_recoleccion p ON p.id_punto = h.id_punto
  JOIN calles c ON c.id_calle = p.id_calle`;

export async function listar() {
  const [filas] = await pool.execute(
    `${BASE}
     ORDER BY p.nombre,
       FIELD(h.dia_semana, 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'),
       h.hora_estimada`
  );
  return filas;
}

export async function buscarPorId(id) {
  const [filas] = await pool.execute(`${BASE} WHERE h.id_horario = ?`, [id]);
  return filas[0] || null;
}

export async function puntoExiste(idPunto) {
  const [filas] = await pool.execute("SELECT id_punto FROM puntos_recoleccion WHERE id_punto = ?", [idPunto]);
  return filas.length > 0;
}

// Un punto no puede tener dos veces el mismo día y hora.
export async function buscarRepetido(idPunto, dia, hora) {
  const [filas] = await pool.execute(
    "SELECT id_horario FROM horarios_recoleccion WHERE id_punto = ? AND dia_semana = ? AND hora_estimada = ?",
    [idPunto, dia, hora]
  );
  return filas[0] || null;
}

export async function crear({ id_punto, dia_semana, hora_estimada, observaciones }) {
  const [resultado] = await pool.execute(
    "INSERT INTO horarios_recoleccion (id_punto, dia_semana, hora_estimada, observaciones) VALUES (?, ?, ?, ?)",
    [id_punto, dia_semana, hora_estimada, observaciones]
  );
  return resultado.insertId;
}

export async function actualizar(id, { id_punto, dia_semana, hora_estimada, observaciones }) {
  await pool.execute(
    "UPDATE horarios_recoleccion SET id_punto = ?, dia_semana = ?, hora_estimada = ?, observaciones = ? WHERE id_horario = ?",
    [id_punto, dia_semana, hora_estimada, observaciones, id]
  );
}

export async function eliminar(id) {
  await pool.execute("DELETE FROM horarios_recoleccion WHERE id_horario = ?", [id]);
}
