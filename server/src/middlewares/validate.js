import { validationResult } from "express-validator";

// Corta la petición con 400 si alguna regla de validación falló.
export default function validate(req, res, next) {
  const errores = validationResult(req);
  if (errores.isEmpty()) return next();

  res.status(400).json({
    error: "Datos inválidos",
    detalles: errores.array().map((e) => ({ campo: e.path, mensaje: e.msg })),
  });
}
