import { api } from "./api";

// Llamadas a la API de horarios de recolección (solo para el administrador).
export const listarHorarios = () => api("/admin/horarios");
export const obtenerHorario = (id) => api(`/admin/horarios/${id}`);
export const crearHorario = (datos) => api("/admin/horarios", { method: "POST", body: datos });
export const actualizarHorario = (id, datos) => api(`/admin/horarios/${id}`, { method: "PUT", body: datos });
export const eliminarHorario = (id) => api(`/admin/horarios/${id}`, { method: "DELETE" });
