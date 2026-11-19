import AppError from "../utils/AppError.js";

// Se usa después de verifyToken: permite el paso solo a los roles indicados.
// Ejemplo: router.delete("/:id", verifyToken, requireRole("administrador"), controlador)
export default function requireRole(...rolesPermitidos) {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user?.rol)) {
      throw new AppError("No tenés permisos para realizar esta acción", 403);
    }
    next();
  };
}
