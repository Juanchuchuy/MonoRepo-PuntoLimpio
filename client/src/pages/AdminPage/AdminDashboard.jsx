import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { SECCIONES_ADMIN } from "./adminSections";

// Página de inicio del panel: saludo y acceso rápido a cada sección de gestión.
export default function AdminDashboard() {
  const user = useAuthStore((s) => s.user);

  return (
  <>
    <div className="glass-card-white">
      <h1 className="admin-title">
        <strong style={{ color: 'white' }}>Gestion de {user?.nombre}</strong>
      </h1>
    <p className="admin-subtitle" style={{ color: 'white' }}>Elegir sección para gestionar</p>
    </div>

    <div className="admin-card-grid">
      {SECCIONES_ADMIN.map((s) => {
        const { Icono } = s;
        return (
          <Link key={s.to} to={s.to} className="admin-card">
            <h3>{s.label} <Icono size={40} /></h3>
            <p>{s.descripcion}</p>
          </Link>
        );
      })}
    </div>
  </>
  );
}