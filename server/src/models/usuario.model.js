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
