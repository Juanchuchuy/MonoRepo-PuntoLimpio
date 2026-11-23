import AppError from "../utils/AppError.js";
import * as MiPanel from "../models/miPanel.model.js";

// GET /api/mi-panel
// Devuelve el resumen y la lista de reportes DEL USUARIO LOGUEADO.
// El id sale de req.user (lo dejó verifyToken a partir del JWT), no de la URL ni del body:
// así un usuario no puede pedir el panel de otro cambiando un número.
export async function obtenerPanel(req, res) {
  const idUsuario = req.user.id;

  // Las dos consultas no dependen entre sí, así que corren en paralelo.
  const [resumen, reportes] = await Promise.all([
    MiPanel.resumenDeUsuario(idUsuario),
    MiPanel.reportesDeUsuario(idUsuario),
  ]);

  res.json({ resumen, reportes });
}

// DELETE /api/mi-panel/reportes/:id
// El usuario puede retirar un reporte suyo mientras siga "Pendiente".
// Se lanzan AppError y errorHandler los convierte en { error } con el código HTTP indicado.
export async function eliminarReporte(req, res) {
  const idReporte = Number(req.params.id);

  const reporte = await MiPanel.buscarReporte(idReporte);
  if (!reporte) throw new AppError("Reporte no encontrado", 404);

  // Control de propiedad: aunque el endpoint exige sesión, solo el dueño puede borrar.
  if (reporte.id_usuario !== req.user.id) {
    throw new AppError("Solo podés eliminar tus propios reportes", 403);
  }

  // Una vez que el administrador lo tomó (En revisión, Resuelto, Rechazado) queda como historial.
  if (reporte.estado !== "Pendiente") {
    throw new AppError("Solo se pueden eliminar reportes pendientes", 409);
  }

  await MiPanel.eliminarReporte(idReporte);
  res.json({ message: "Reporte eliminado correctamente" });
}
