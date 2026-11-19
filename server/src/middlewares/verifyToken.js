import AppError from "../utils/AppError.js";
import { verificarToken } from "../utils/jwt.js";

// Exige un JWT válido en el header "Authorization: Bearer <token>" y deja el usuario en req.user.
export default function verifyToken(req, res, next) {
  const [tipo, token] = (req.headers.authorization || "").split(" ");
  if (tipo !== "Bearer" || !token) throw new AppError("Falta el token de autenticación", 401);

  const { id, rol } = verificarToken(token);
  req.user = { id, rol };
  next();
}
