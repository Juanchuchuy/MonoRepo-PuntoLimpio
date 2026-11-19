import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { SECCIONES_ADMIN } from "./adminSections";

// Página de inicio del panel: saludo y acceso rápido a cada sección de gestión.
export default function AdminDashboard() {
  const user = useAuthStore((s) => s.user);

  return (
    <>
      <h1 className="admin-title">Hola, {user?.nombre}</h1>
      <p className="admin-subtitle">Elegí qué querés gestionar.</p>

      <div className="admin-card-grid">
        {SECCIONES_ADMIN.map((s) => (
          <Link key={s.to} to={s.to} className="admin-card">
            <h3>{s.label}</h3>
            <p>{s.descripcion}</p>
          </Link>
        ))}
      </div>
    </>
  );
}