import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { SECCIONES_ADMIN } from "./adminSections";
import { LayoutDashboard } from "lucide-react";
import "./css/Admin.css";

// Estructura común de todas las páginas del panel: menú lateral + barra superior + contenido (Outlet).
export default function AdminLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <h2 className="admin-brand">PuntoLimpio</h2>
        <nav className="admin-nav">
         <NavLink to="/admin" end>
                <span style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                Dashboard <LayoutDashboard size={20} />
                </span>
            </NavLink>
            {SECCIONES_ADMIN.map((s) => {
                const { Icono } = s;
                return (
                <NavLink
                    key={s.to}
                    to={s.to}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
                >
                    {s.label} <Icono size={20} />
                </NavLink>
                );
            })}
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <span>Panel de administración</span>
          <div className="admin-topbar-actions">
            <span>{user?.nombre}</span>
            <Link to="/" className="admin-btn admin-btn-secondary">
              Volver al sitio
            </Link>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}