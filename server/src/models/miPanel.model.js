import { pool } from "../config/db.js";

// Consultas SQL del panel del usuario. Siempre parametrizadas (?): el id del usuario
// viene del token (req.user.id) y se pasa como parámetro, nunca se concatena en el texto SQL.

// Cuenta los reportes del usuario agrupados por estado (una sola consulta para las 5 cifras).
export async function resumenDeUsuario(idUsuario) {
  const [filas] = await pool.execute(
    `SELECT COUNT(*) AS total,
            COALESCE(SUM(CASE WHEN estado = 'Pendiente'   THEN 1 ELSE 0 END), 0) AS pendientes,
            COALESCE(SUM(CASE WHEN estado = 'En revision' THEN 1 ELSE 0 END), 0) AS en_revision,
            COALESCE(SUM(CASE WHEN estado = 'Resuelto'    THEN 1 ELSE 0 END), 0) AS resueltos,
            COALESCE(SUM(CASE WHEN estado = 'Rechazado'   THEN 1 ELSE 0 END), 0) AS rechazados
     FROM reportes_ciudadanos
     WHERE id_usuario = ?`,
    [idUsuario]
  );
  // MySQL devuelve los SUM como texto ("3"), por eso se convierten a número.
  const f = filas[0];
  return {
    total: Number(f.total),
    pendientes: Number(f.pendientes),
    en_revision: Number(f.en_revision),
    resueltos: Number(f.resueltos),
    rechazados: Number(f.rechazados),
  };
}

// Lista los reportes del usuario, del más nuevo al más viejo, con el nombre del tipo de residuo.
export async function reportesDeUsuario(idUsuario) {
  const [filas] = await pool.execute(
    `SELECT rc.id_reporte, rc.descripcion, rc.estado, rc.fecha_reporte, rc.latitud, rc.longitud,
            tr.nombre AS tipo
     FROM reportes_ciudadanos rc
     JOIN tipos_residuo tr ON tr.id_tipo = rc.id_tipo
     WHERE rc.id_usuario = ?
     ORDER BY rc.fecha_reporte DESC`,
    [idUsuario]
  );
  return filas;
}

// Trae solo lo necesario para decidir si el usuario puede borrar un reporte (dueño y estado).
export async function buscarReporte(idReporte) {
  const [filas] = await pool.execute(
    "SELECT id_reporte, id_usuario, estado FROM reportes_ciudadanos WHERE id_reporte = ?",
    [idReporte]
  );
  return filas[0] || null;
}

export async function eliminarReporte(idReporte) {
  await pool.execute("DELETE FROM reportes_ciudadanos WHERE id_reporte = ?", [idReporte]);
}
