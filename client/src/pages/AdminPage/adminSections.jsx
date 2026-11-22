// Secciones del panel de administración: alimentan el menú lateral y las tarjetas del dashboard.
// Para sumar un CRUD nuevo (usuarios, zonas, etc.) alcanza con agregar una línea acá y sus rutas en main.jsx.
// seccionesAdmin.js  ✅
import { UserGroup,User,Recycle,Road,FileClock,MapPin } from "lucide-react";


export const SECCIONES_ADMIN = [
  { to: "/admin/roles", label: "Roles", Icono: UserGroup, descripcion: "Perfiles de acceso y permisos del sistema" },
  { to: "/admin/reportes", label: "Reportes Ciudadanos", Icono: MapPin, descripcion: "Gestión de basurales reportados por los vecinos" },
  "/admin/tipos-residuo", label: "Tipos de residuo", Icono: Recycle, descripcion: "Categorías de residuos que se recolectan" },
  { to: "/admin/zonas", label: "Zonas", Icono: MapPin, descripcion: "Gestión de zonas" },
  { to: "/admin/calles", label: "Calles", Icono: Road, descripcion: "Gestión de calles por zona" }
];

