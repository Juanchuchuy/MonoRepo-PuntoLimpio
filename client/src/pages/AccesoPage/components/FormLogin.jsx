import { useState } from "react";
import SocialIcons from "./SocialIcons";

export default function FormLogin({ onLogin }) {
  const [data, setData] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setCargando(true);
    try {
      if (onLogin) await onLogin(data);
    } catch (err) {
      setMsg(err.message || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="form-container sign-in">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesion</h1>
        <SocialIcons />
        <input
          type="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br />
        <button type="submit" disabled={cargando} style={{ opacity: cargando ? 0.7 : 1 }}>
          {cargando ? "Ingresando..." : "Iniciar Sesion"}
        </button>
        <br />
        <a href="#" style={{ textDecoration: "underline" }}>¿Olvidaste tu contraseña?</a>
        <p className="form-msg">{msg}</p>
      </form>
    </div>
  );
}
