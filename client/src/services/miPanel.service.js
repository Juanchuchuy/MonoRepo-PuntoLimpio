import { api } from "./api";

// Llamadas a la API del panel del usuario (requieren sesión; api() agrega el token solo).
export const obtenerMiPanel = () => api("/mi-panel");
export const eliminarMiReporte = (id) => api(`/mi-panel/reportes/${id}`, { method: "DELETE" });
