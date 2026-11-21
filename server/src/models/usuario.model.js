import { pool } from "../config/db.js";

// Consultas SQL de usuarios. Siempre parametrizadas (?), nunca se concatenan valores.

const BASE = `
  SELECT u.id_usuario, u.nombre, u.apellido, u.email, u.password_hash, u.activo, r.nombre AS rol
  FROM usuarios u
  JOIN roles r ON r.id_rol = u.id_rol`;

export async function buscarPorEmail(email) {
  const [filas] = await pool.execute(`${BASE} WHERE u.email = ?`, [email]);
  return filas[0] || null;
}

export async function buscarPorId(id) {
  const [filas] = await pool.execute(`${BASE} WHERE u.id_usuario = ?`, [id]);
  return filas[0] || null;
}

export async function crear({ nombre, apellido, email, passwordHash, rol }) {
  const [roles] = await pool.execute("SELECT id_rol FROM roles WHERE nombre = ?", [rol]);
  if (roles.length === 0) throw new Error(`El rol "${rol}" no existe en la tabla roles`);

  const [resultado] = await pool.execute(
    `INSERT INTO usuarios (id_rol, nombre, apellido, email, password_hash, activo, fecha_registro)
     VALUES (?, ?, ?, ?, ?, 1, NOW())`,
    [roles[0].id_rol, nombre, apellido, email, passwordHash]
  );
  return resultado.insertId;
}

// ---- Consultas del panel de administración (CRUD de usuarios) ----

// Lista todos los usuarios con su rol y cuántos puntos de recolección crearon. Nunca incluye el hash.


export async function listar() {
  const [filas] = await pool.execute(
    `SELECT u.id_usuario, u.nombre, u.apellido, u.email, u.activo, u.fecha_registro,
            r.nombre AS rol, COUNT(p.id_punto) AS puntos_creados
     FROM usuarios u
     JOIN roles r ON r.id_rol = u.id_rol
     LEFT JOIN puntos_recoleccion p ON p.creado_por = u.id_usuario
     GROUP BY u.id_usuario, u.nombre, u.apellido, u.email, u.activo, u.fecha_registro, r.nombre
     ORDER BY u.id_usuario`
  );
  return filas;
}

export async function buscarParaAdmin(id) {
  const [filas] = await pool.execute(
    "SELECT id_usuario, id_rol, nombre, apellido, email, activo FROM usuarios WHERE id_usuario = ?",
    [id]
  );
  return filas[0] || null;
}

export async function crearConRol({ id_rol, nombre, apellido, email, passwordHash, activo }) {
  const [resultado] = await pool.execute(
    `INSERT INTO usuarios (id_rol, nombre, apellido, email, password_hash, activo)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id_rol, nombre, apellido, email, passwordHash, activo]
  );
  return resultado.insertId;
}

export async function actualizar(id, { id_rol, nombre, apellido, email, activo }) {
  await pool.execute(
    "UPDATE usuarios SET id_rol = ?, nombre = ?, apellido = ?, email = ?, activo = ? WHERE id_usuario = ?",
    [id_rol, nombre, apellido, email, activo, id]
  );
}

export async function cambiarPassword(id, passwordHash) {
  await pool.execute("UPDATE usuarios SET password_hash = ? WHERE id_usuario = ?", [passwordHash, id]);
}

// Registros y reportes que dependen del usuario (la base no deja borrarlo si tiene alguno).
export async function contarRegistrosYReportes(id) {
  const [filas] = await pool.execute(
    `SELECT (SELECT COUNT(*) FROM registros_recoleccion WHERE id_usuario = ?) +
            (SELECT COUNT(*) FROM reportes_ciudadanos WHERE id_usuario = ?) AS total`,
    [id, id]
  );
  return filas[0].total;
}

export async function eliminar(id) {
  await pool.execute("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
}