import { pool } from "../config/db.js";

// Consultas SQL de tipos de residuo. Siempre parametrizadas (?), nunca se concatenan valores.

// Lista los tipos e incluye en cuántos puntos de recolección se aceptan.
export async function listar() {
  const [filas] = await pool.execute(
    `SELECT t.id_tipo, t.nombre, t.descripcion, COUNT(ptr.id_punto) AS cantidad_puntos
     FROM tipos_residuo t
     LEFT JOIN punto_tipo_residuo ptr ON ptr.id_tipo = t.id_tipo
     GROUP BY t.id_tipo, t.nombre, t.descripcion
     ORDER BY t.nombre`
  );
  return filas;
}

export async function buscarPorId(id) {
  const [filas] = await pool.execute("SELECT id_tipo, nombre, descripcion FROM tipos_residuo WHERE id_tipo = ?", [id]);
  return filas[0] || null;
}

export async function buscarPorNombre(nombre) {
  const [filas] = await pool.execute("SELECT id_tipo, nombre, descripcion FROM tipos_residuo WHERE nombre = ?", [nombre]);
  return filas[0] || null;
}

export async function crear({ nombre, descripcion }) {
  const [resultado] = await pool.execute("INSERT INTO tipos_residuo (nombre, descripcion) VALUES (?, ?)", [nombre, descripcion]);
  return resultado.insertId;
}

export async function actualizar(id, { nombre, descripcion }) {
  await pool.execute("UPDATE tipos_residuo SET nombre = ?, descripcion = ? WHERE id_tipo = ?", [nombre, descripcion, id]);
}

// Puntos y reportes que usan el tipo.
export async function contarUso(id) {
  const [puntos] = await pool.execute("SELECT COUNT(*) AS total FROM punto_tipo_residuo WHERE id_tipo = ?", [id]);
  const [reportes] = await pool.execute("SELECT COUNT(*) AS total FROM reportes_ciudadanos WHERE id_tipo = ?", [id]);
  return { puntos: puntos[0].total, reportes: reportes[0].total };
}

export async function eliminar(id) {
  await pool.execute("DELETE FROM tipos_residuo WHERE id_tipo = ?", [id]);
}