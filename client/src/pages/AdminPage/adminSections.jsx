// Secciones del panel de administración: alimentan el menú lateral y las tarjetas del dashboard.
// Para sumar un CRUD nuevo alcanza con agregar una línea acá y sus rutas en main.jsx.
import { UserGroup, Users, Recycle} from "lucide-react";

export const SECCIONES_ADMIN = [
  { to: "/admin/roles", label: "Roles", Icono: UserGroup, descripcion: "Perfiles de acceso y permisos del sistema" },
  { to: "/admin/usuarios", label: "Usuarios", Icono: Users, descripcion: "Cuentas de ciudadanos, operarios y administradores" },
  { to: "/admin/tipos-residuo", label: "Tipos de residuo", Icono: Recycle, descripcion: "Categorías de residuos que se recolectan" },
];