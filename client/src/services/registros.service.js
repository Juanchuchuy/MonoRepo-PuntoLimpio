import { api } from "./api";

// Llamadas a la API de registros de recolección (solo para el administrador).
export const listarRegistros = () => api("/admin/registros");
export const obtenerRegistro = (id) => api(`/admin/registros/${id}`);
export const crearRegistro = (datos) => api("/admin/registros", { method: "POST", body: datos });
export const actualizarRegistro = (id, datos) => api(`/admin/registros/${id}`, { method: "PUT", body: datos });
export const eliminarRegistro = (id) => api(`/admin/registros/${id}`, { method: "DELETE" });
