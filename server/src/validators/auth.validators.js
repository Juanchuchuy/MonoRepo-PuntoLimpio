import { body } from "express-validator";

// Reglas de validación de cada endpoint de autenticación.
export const reglasRegister = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio").isLength({ max: 50 }).withMessage("El nombre es demasiado largo"),
  body("apellido").trim().notEmpty().withMessage("El apellido es obligatorio").isLength({ max: 50 }).withMessage("El apellido es demasiado largo"),
  body("email").trim().isEmail().withMessage("El email no es válido").bail().toLowerCase(),
  // bcrypt solo procesa los primeros 72 bytes, por eso el máximo.
  body("password").isLength({ min: 8, max: 72 }).withMessage("La contraseña debe tener entre 8 y 72 caracteres"),
];

export const reglasLogin = [
  body("email").trim().isEmail().withMessage("El email no es válido").bail().toLowerCase(),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];
