import { api } from "./api";

// Llamadas a la API de punto_tipo_residuo (solo para el administrador). La clave es (punto, tipo).
export const listarPuntoTipos = () => api("/admin/punto-tipos");
export const obtenerPuntoTipo = (idPunto, idTipo) => api(`/admin/punto-tipos/${idPunto}/${idTipo}`);
export const opcionesPuntoTipo = () => api("/admin/punto-tipos/opciones");
export const crearPuntoTipo = (datos) => api("/admin/punto-tipos", { method: "POST", body: datos });
export const actualizarPuntoTipo = (idPunto, idTipo, datos) =>
  api(`/admin/punto-tipos/${idPunto}/${idTipo}`, { method: "PUT", body: datos });
export const eliminarPuntoTipo = (idPunto, idTipo) => api(`/admin/punto-tipos/${idPunto}/${idTipo}`, { method: "DELETE" });
