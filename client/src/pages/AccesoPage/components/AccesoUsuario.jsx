import { useState } from "react";
import FormLogin from "./FormLogin";
import FormRegistro from "./FormRegister";
import TogglePanel from "./TogglePanel";
import "../css/AccesoUsuario.css";

export default function AccesoUsuario({ onLogin, onRegister }) {
  const [active, setActive] = useState(false);

  return (
    <div className={`container-login${active ? " active" : ""}`} id="container-login">
      <FormRegistro onRegister={onRegister} />
      <FormLogin onLogin={onLogin} />

      <div className="toggle-container">
        <div className="toggle">
          <TogglePanel
            lado="left"
            titulo="Crea tu Cuenta!"
            texto="¿Ya eres usuario? Inicia sesion aqui"
            textoBoton="Iniciar Sesion"
            onClick={() => setActive(false)}
          />
          <TogglePanel
            lado="right"
            titulo="Bienvenido de nuevo"
            texto="¿No tienes cuenta? Créala aqui"
            textoBoton="Crear Cuenta"
            onClick={() => setActive(true)}
          />
        </div>
      </div>
    </div>
  );
}