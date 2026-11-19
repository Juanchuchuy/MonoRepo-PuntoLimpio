import { api } from "./api";

// Llamadas a la API de roles (solo para el administrador).
export const listarRoles = () => api("/admin/roles");
export const obtenerRol = (id) => api(`/admin/roles/${id}`);
export const crearRol = (datos) => api("/admin/roles", { method: "POST", body: datos });
export const actualizarRol = (id, datos) => api(`/admin/roles/${id}`, { method: "PUT", body: datos });
export const eliminarRol = (id) => api(`/admin/roles/${id}`, { method: "DELETE" });