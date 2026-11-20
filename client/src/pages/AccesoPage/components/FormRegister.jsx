import { useState } from "react";


export default function FormRegistro({ onRegister }) {
  const [data, setData] = useState({ nombre: "", apellido: "", email: "", password: "", confirmar: "" });
  const [msg, setMsg] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (data.password !== data.confirmar) {
      setMsg("Las contraseñas no coinciden");
      return;
    }

    setCargando(true);
    try {
      if (onRegister) {
        const { nombre, apellido, email, password } = data;
        await onRegister({ nombre, apellido, email, password });
      }
    } catch (err) {
      setMsg(err.message || "Error al registrarse");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleSubmit}>
        <h1>Registrarse</h1>
        <br />
        <input
          type="text"
          placeholder="Nombre"
          required
          maxLength={50}
          value={data.nombre}
          onChange={(e) => setData({ ...data, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido"
          required
          maxLength={50}
          value={data.apellido}
          onChange={(e) => setData({ ...data, apellido: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña (mínimo 8 caracteres)"
          required
          minLength={8}
          maxLength={72}
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Repetir contraseña"
          required
          value={data.confirmar}
          onChange={(e) => setData({ ...data, confirmar: e.target.value })}
        />
        <button type="submit" disabled={cargando} style={{ opacity: cargando ? 0.7 : 1 }}>
          {cargando ? "Creando cuenta..." : "Registrarse"}
        </button>
        <p className="form-msg">{msg}</p>
      </form>
    </div>
  );
}
