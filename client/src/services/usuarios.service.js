import { api } from "./api";

// Llamadas a la API de usuarios (solo para el administrador).
export const listarUsuarios = () => api("/admin/usuarios");
export const obtenerUsuario = (id) => api(`/admin/usuarios/${id}`);
export const crearUsuario = (datos) => api("/admin/usuarios", { method: "POST", body: datos });
export const actualizarUsuario = (id, datos) => api(`/admin/usuarios/${id}`, { method: "PUT", body: datos });
export const eliminarUsuario = (id) => api(`/admin/usuarios/${id}`, { method: "DELETE" });