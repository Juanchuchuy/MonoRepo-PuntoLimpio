import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import Sidebar from "../../pages/HomePage/components/Sidebar";
import "./Header.css";

function Header() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  useEffect(() => {

    const controlarScroll = () => {

      if (window.scrollY > 100) {
        setMostrarMenu(true);
      } else {
        setMostrarMenu(false);
      }

    };

    window.addEventListener("scroll", controlarScroll);

    return () => {
      window.removeEventListener("scroll", controlarScroll);
    };

  }, []);

  const handleLogin = () =>{

      navigate('/Acceso')

  }

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  //abajo utilizo renderizado condicional para el sidebar dependiendo de su estado
  //el <> es para agrupar varios elementos
  return (
    <>

      
        <header className={`header ${mostrarMenu ? "header-oculto" : ""}`}>

          <div className="header-left">

            <button
              className="menu-button"
              onClick={() => setSidebarAbierto(!sidebarAbierto)}
            >
              ☰
            </button>

            <div className="header-logo">
              <img
                src="/LogoPuntoLimpio.jpg"
                alt="Logo de PuntoLimpio"
              />
            </div>

          </div>


          <div className="header-actions">
            {/* Con sesión: saludo + cerrar sesión. Sin sesión: botón de ingreso */}
            {user ? (
              <>
                <span style={{ fontWeight: 600 }}>Hola, {user.nombre}</span>
                {user.rol === "administrador" ? (
                  <button className="login-button" onClick={() => navigate("/admin")}>
                    Dashboard
                  </button>
                ) : (
                  <button className="login-button" onClick={() => navigate("/mi-panel")}>
                    Mi panel
                  </button>
                )}
                <button
                  className="login-button icon-button"
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <button
                className="login-button icon-button"
                onClick={() => handleLogin()}
                title="Iniciar sesión"
                aria-label="Iniciar sesión"
              >
                <LogIn size={20} />
              </button>
            )}
          </div>

        </header>
      

      {mostrarMenu && !sidebarAbierto && (
        <button
          className="floating-menu-button"
          onClick={() => setSidebarAbierto(!sidebarAbierto)}
        >
          ☰
        </button>
      )}

      {sidebarAbierto && (
        <Sidebar
          abierto={sidebarAbierto}
          cerrarSidebar={() => setSidebarAbierto(false)}
        />
      )}

    </>
  );
}

export default Header;
