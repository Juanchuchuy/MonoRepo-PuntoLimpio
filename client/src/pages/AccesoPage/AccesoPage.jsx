import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import AccesoUsuario from "./components/AccesoUsuario"
import "./css/AccesoPage.css";

export default function AccesoPage() {
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const location = useLocation();

  // Si venía de una ruta privada vuelve a ella; si no, va al inicio
  const destino = location.state?.from?.pathname || "/";

  // Con sesión iniciada (o recién creada) no tiene sentido ver el login
  if (user) return <Navigate to={destino} replace />;

  return (
    <main className="acceso-page">
      <AccesoUsuario onLogin={login} onRegister={register} />
    </main>
  );
}
