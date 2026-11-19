// Cliente HTTP único del frontend: agrega el token y unifica el manejo de errores.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const TOKEN_KEY = "pl_token";

// El token vive en localStorage para que la sesión sobreviva a un F5.
export const tokenStorage = {
  get() {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* si el navegador bloquea el storage, la sesión dura hasta recargar */
    }
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* nada que limpiar */
    }
  },
};

// El store registra acá qué hacer cuando el servidor responde 401 con un token vencido.
let alVencerSesion = null;
export const setAlVencerSesion = (fn) => {
  alVencerSesion = fn;
};

export async function api(path, { method = "GET", body } = {}) {
  const token = tokenStorage.get();

  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor");
  }

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    // 401 en login/register significa "credenciales incorrectas", no "sesión vencida".
    const esAuth = path === "/auth/login" || path === "/auth/register";
    if (respuesta.status === 401 && token && !esAuth) alVencerSesion?.();

    const error = new Error(datos?.detalles?.[0]?.mensaje || datos?.error || "Error inesperado del servidor");
    error.status = respuesta.status;
    throw error;
  }

  return datos;
}
