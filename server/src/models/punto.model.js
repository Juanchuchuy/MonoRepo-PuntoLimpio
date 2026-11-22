import { pool } from "../config/db.js";

// Consultas SQL de puntos de recolección. Siempre parametrizadas (?), nunca se concatenan valores.
// Los tipos de residuo de cada punto se administran en su propio CRUD (punto_tipo_residuo);
// acá solo se leen para mostrarlos en el listado.

const BASE = `
  SELECT p.id_punto, p.nombre, p.referencia, p.latitud, p.longitud, p.activo, p.id_calle,
         c.nombre AS calle, z.nombre AS zona,
         GROUP_CONCAT(DISTINCT t.nombre ORDER BY t.nombre SEPARATOR ', ') AS tipos
  FROM puntos_recoleccion p
  JOIN calles c ON c.id_calle = p.id_calle
  JOIN zonas z ON z.id_zona = c.id_zona
  LEFT JOIN punto_tipo_residuo ptr ON ptr.id_punto = p.id_punto
  LEFT JOIN tipos_residuo t ON t.id_tipo = ptr.id_tipo`;
const AGRUPAR = "GROUP BY p.id_punto, c.nombre, z.nombre";

export async function listar() {
  const [filas] = await pool.execute(`${BASE} ${AGRUPAR} ORDER BY p.nombre`);
  return filas;
}

export async function buscarPorId(id) {
  const [filas] = await pool.execute(`${BASE} WHERE p.id_punto = ? ${AGRUPAR}`, [id]);
  return filas[0] || null;
}

// Calles disponibles (con su zona) para el selector del formulario.
export async function opciones() {
  const [calles] = await pool.execute(
    `SELECT c.id_calle, c.nombre, z.nombre AS zona
     FROM calles c JOIN zonas z ON z.id_zona = c.id_zona
     ORDER BY z.nombre, c.nombre`
  );
  return { calles };
}

export async function calleExiste(idCalle) {
  const [filas] = await pool.execute("SELECT id_calle FROM calles WHERE id_calle = ?", [idCalle]);
  return filas.length > 0;
}

export async function crear({ id_calle, nombre, referencia, latitud, longitud, activo }, idUsuario) {
  const [resultado] = await pool.execute(
    `INSERT INTO puntos_recoleccion (id_calle, nombre, referencia, latitud, longitud, activo, creado_por)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id_calle, nombre, referencia, latitud, longitud, activo, idUsuario]
  );
  return resultado.insertId;
}

export async function actualizar(id, { id_calle, nombre, referencia, latitud, longitud, activo }) {
  await pool.execute(
    `UPDATE puntos_recoleccion
     SET id_calle = ?, nombre = ?, referencia = ?, latitud = ?, longitud = ?, activo = ?
     WHERE id_punto = ?`,
    [id_calle, nombre, referencia, latitud, longitud, activo, id]
  );
}

// Cantidad de registros de recolección (historial) del punto.
export async function contarRegistros(id) {
  const [filas] = await pool.execute("SELECT COUNT(*) AS total FROM registros_recoleccion WHERE id_punto = ?", [id]);
  return filas[0].total;
}

// En el esquema las claves foráneas no tienen borrado en cascada: antes de borrar el punto hay que
// quitar sus tipos asignados y sus horarios. Todo en una transacción: o se borra todo o nada.
export async function eliminar(id) {
  const conexion = await pool.getConnection();
  try {
    await conexion.beginTransaction();
    await conexion.execute("DELETE FROM punto_tipo_residuo WHERE id_punto = ?", [id]);
    await conexion.execute("DELETE FROM horarios_recoleccion WHERE id_punto = ?", [id]);
    await conexion.execute("DELETE FROM puntos_recoleccion WHERE id_punto = ?", [id]);
    await conexion.commit();
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
}
