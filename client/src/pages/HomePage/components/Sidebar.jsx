import "../css/Sidebar.css";
import { Link,useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

function Sidebar({ abierto, cerrarSidebar }) {

  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogin = () => {
  cerrarSidebar();
  navigate('/Acceso');
  };

  const handleLogout = () => {
    logout();
    cerrarSidebar();
    navigate('/');
  }

  //el aside es como un renderizado condicional para el .css
  //agrega una clase dependiendo del estado
  return (
    <>
       {/* Solo mostramos el overlay si el sidebar esta abierto */}
      {abierto && (
        <div
          className="sidebar-overlay"
          onClick={cerrarSidebar}
        ></div>
      )}

      <aside className={`sidebar ${abierto ? "sidebar-abierto" : ""}`}>

        <div className="sidebar-header">
          <h2>PuntoLimpio</h2>

          <button
            className="sidebar-close"
            onClick={cerrarSidebar}
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to={'/'} onClick={cerrarSidebar}>Inicio</Link>
          <Link to={'/Mapa'} onClick={cerrarSidebar}>Mapa</Link>
          <Link to={'/reciclaje'} onClick={cerrarSidebar}>Reciclaje</Link>
          {user?.rol === 'administrador' && (
            <>
              <Link to={'/estadisticas'} onClick={cerrarSidebar}>Estadísticas</Link>
              <Link to={'/admin'} onClick={cerrarSidebar}>Dashboard</Link>
            </>
          )}
          
        </nav>

        <div className="sidebar-account">
          {user ? (
            <button onClick={handleLogout}>Cerrar Sesion</button>
          ) : (
            <button onClick={() => handleLogin()}>Iniciar Sesion</button>
          )}
        </div>

      </aside>
    </>
  );
}

export default Sidebar;
