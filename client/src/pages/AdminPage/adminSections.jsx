// Secciones del panel de administración: alimentan el menú lateral y las tarjetas del dashboard.
// Para sumar un CRUD nuevo (usuarios, zonas, etc.) alcanza con agregar una línea acá y sus rutas en main.jsx.
// seccionesAdmin.js  ✅
import { UserGroup } from "lucide-react";


export const SECCIONES_ADMIN = [
  { to: "/admin/roles", label: "Roles", Icono: UserGroup, descripcion: "Perfiles de acceso y permisos del sistema" },
];
