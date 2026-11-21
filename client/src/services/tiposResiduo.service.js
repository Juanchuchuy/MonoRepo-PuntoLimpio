import { api } from "./api";

// Llamadas a la API de tipos de residuo (solo para el administrador).
export const listarTipos = () => api("/admin/tipos-residuo");
export const obtenerTipo = (id) => api(`/admin/tipos-residuo/${id}`);
export const crearTipo = (datos) => api("/admin/tipos-residuo", { method: "POST", body: datos });
export const actualizarTipo = (id, datos) => api(`/admin/tipos-residuo/${id}`, { method: "PUT", body: datos });
export const eliminarTipo = (id) => api(`/admin/tipos-residuo/${id}`, { method: "DELETE" });
