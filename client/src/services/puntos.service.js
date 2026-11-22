import { api } from "./api";

// Llamadas a la API de puntos de recolección (solo para el administrador).
export const listarPuntos = () => api("/admin/puntos");
export const obtenerPunto = (id) => api(`/admin/puntos/${id}`);
export const opcionesPunto = () => api("/admin/puntos/opciones");
export const crearPunto = (datos) => api("/admin/puntos", { method: "POST", body: datos });
export const actualizarPunto = (id, datos) => api(`/admin/puntos/${id}`, { method: "PUT", body: datos });
export const eliminarPunto = (id) => api(`/admin/puntos/${id}`, { method: "DELETE" });
