import { pool } from "../config/db.js";

// Consultas SQL de la tabla punto_tipo_residuo (qué tipos de residuo recibe cada punto).
// La clave primaria es compuesta (id_punto, id_tipo). Siempre parametrizadas (?).

const BASE = `
  SELECT ptr.id_punto, ptr.id_tipo, p.nombre AS punto, t.nombre AS tipo
  FROM punto_tipo_residuo ptr
  JOIN puntos_recoleccion p ON p.id_punto = ptr.id_punto
  JOIN tipos_residuo t ON t.id_tipo = ptr.id_tipo`;

export async function listar() {
  const [filas] = await pool.execute(`${BASE} ORDER BY p.nombre, t.nombre`);
  return filas;
}

export async function buscar(idPunto, idTipo) {
  const [filas] = await pool.execute(`${BASE} WHERE ptr.id_punto = ? AND ptr.id_tipo = ?`, [idPunto, idTipo]);
  return filas[0] || null;
}

// Puntos y tipos disponibles para los selectores del formulario.
export async function opciones() {
  const [puntos] = await pool.execute("SELECT id_punto, nombre FROM puntos_recoleccion ORDER BY nombre");
  const [tipos] = await pool.execute("SELECT id_tipo, nombre FROM tipos_residuo ORDER BY nombre");
  return { puntos, tipos };
}

export async function puntoExiste(idPunto) {
  const [filas] = await pool.execute("SELECT id_punto FROM puntos_recoleccion WHERE id_punto = ?", [idPunto]);
  return filas.length > 0;
}

export async function tipoExiste(idTipo) {
  const [filas] = await pool.execute("SELECT id_tipo FROM tipos_residuo WHERE id_tipo = ?", [idTipo]);
  return filas.length > 0;
}

export async function crear(idPunto, idTipo) {
  await pool.execute("INSERT INTO punto_tipo_residuo (id_punto, id_tipo) VALUES (?, ?)", [idPunto, idTipo]);
}

// Cambia la asignación (punto, tipo) actual por otra.
export async function actualizar(idPunto, idTipo, nuevoPunto, nuevoTipo) {
  await pool.execute(
    "UPDATE punto_tipo_residuo SET id_punto = ?, id_tipo = ? WHERE id_punto = ? AND id_tipo = ?",
    [nuevoPunto, nuevoTipo, idPunto, idTipo]
  );
}

export async function eliminar(idPunto, idTipo) {
  await pool.execute("DELETE FROM punto_tipo_residuo WHERE id_punto = ? AND id_tipo = ?", [idPunto, idTipo]);
}
