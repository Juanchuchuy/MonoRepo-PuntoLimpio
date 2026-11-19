import "../css/Sidebar.css";
import { Link,useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

function Sidebar({ abierto, cerrarSidebar }) {

  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogin = () =>{

    navigate('/Acceso')

  }

  const handleLogout = () => {
    logout();
    cerrarSidebar();
    navigate('/');
  }

  //el aside es como un renderizado condicional para el .css
  //agrega una clase dependiendo del estado
  return (
    <>
      <div
        className="sidebar-overlay"
        onClick={cerrarSidebar}
      ></div>

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
          <Link to={'/'}>Inicio</Link>
          <Link to={'/Mapa'}>Mapa</Link>
          <Link href="#">Reciclaje</Link>
          <Link href="#">EcoBot</Link>
          <Link href="#">Información</Link>
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
