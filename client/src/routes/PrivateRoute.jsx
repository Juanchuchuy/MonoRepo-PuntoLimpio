import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

// Protege un grupo de rutas. Sin sesión redirige al login; con `roles` también exige uno de esos roles.
export default function PrivateRoute({ roles }) {
  const user = useAuthStore((s) => s.user);
  const cargando = useAuthStore((s) => s.cargando);
  const location = useLocation();

  if (cargando) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/Acceso" replace state={{ from: location }} />;
  if (roles && !roles.includes(user.rol)) return <Navigate to="/" replace />;

  return <Outlet />;
}
