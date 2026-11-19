import { pool } from "../config/db.js";

// Consultas SQL de roles. Siempre parametrizadas (?), nunca se concatenan valores.

// Lista todos los roles e incluye cuántos usuarios tiene cada uno.
export async function listar() {
  const [filas] = await pool.execute(
    `SELECT r.id_rol, r.nombre, r.descripcion, COUNT(u.id_usuario) AS cantidad_usuarios
     FROM roles r
     LEFT JOIN usuarios u ON u.id_rol = r.id_rol
     GROUP BY r.id_rol, r.nombre, r.descripcion
     ORDER BY r.id_rol`
  );
  return filas;
}

export async function buscarPorId(id) {
  const [filas] = await pool.execute("SELECT id_rol, nombre, descripcion FROM roles WHERE id_rol = ?", [id]);
  return filas[0] || null;
}

export async function buscarPorNombre(nombre) {
  const [filas] = await pool.execute("SELECT id_rol, nombre, descripcion FROM roles WHERE nombre = ?", [nombre]);
  return filas[0] || null;
}

export async function crear({ nombre, descripcion }) {
  const [resultado] = await pool.execute("INSERT INTO roles (nombre, descripcion) VALUES (?, ?)", [nombre, descripcion]);
  return resultado.insertId;
}

export async function actualizar(id, { nombre, descripcion }) {
  await pool.execute("UPDATE roles SET nombre = ?, descripcion = ? WHERE id_rol = ?", [nombre, descripcion, id]);
}

export async function contarUsuarios(id) {
  const [filas] = await pool.execute("SELECT COUNT(*) AS total FROM usuarios WHERE id_rol = ?", [id]);
  return filas[0].total;
}

export async function eliminar(id) {
  await pool.execute("DELETE FROM roles WHERE id_rol = ?", [id]);
}