// Secciones del panel de administración: alimentan el menú lateral y las tarjetas del dashboard.
// Para sumar un CRUD nuevo (usuarios, zonas, etc.) alcanza con agregar una línea acá y sus rutas en main.jsx.
// seccionesAdmin.js  ✅
import { UserGroup,User,Recycle,Road,FileClock,MapPin,ListChecks } from "lucide-react";


export const SECCIONES_ADMIN = [
  { to: "/admin/roles", label: "Roles", Icono: UserGroup, descripcion: "Perfiles de acceso y permisos del sistema" },
  { to: "/admin/reportes", label: "Reportes Ciudadanos", Icono: MapPin, descripcion: "Gestión de basurales reportados por los vecinos" },
  { to:"/admin/tipos-residuo", label: "Tipos de residuo", Icono: Recycle, descripcion: "Categorías de residuos que se recolectan" },
  { to: "/admin/zonas", label: "Zonas", Icono: MapPin, descripcion: "Gestión de zonas" },
  { to: "/admin/calles", label: "Calles", Icono: Road, descripcion: "Gestión de calles por zona" },
  { to: "/admin/puntos", label: "Puntos", Icono: MapPin, descripcion: "Puntos de recolección: ubicación, calle y estado" },
  { to: "/admin/punto-tipos", label: "Tipos por punto", Icono: ListChecks, descripcion: "Qué tipos de residuo recibe cada punto" }
];

