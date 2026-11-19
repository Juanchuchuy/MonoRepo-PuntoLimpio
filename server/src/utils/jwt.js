import jwt from "jsonwebtoken";
import AppError from "./AppError.js";

// Firma un token con el id y el rol del usuario.
export function firmarToken(usuario) {
  return jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "8h",
  });
}

// Verifica firma y vencimiento. Si falla, responde 401.
export function verificarToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new AppError("Sesión inválida o vencida", 401);
  }
}
