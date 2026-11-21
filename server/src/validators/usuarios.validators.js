import { body, param } from "express-validator";

// Reglas de validación de los endpoints de usuarios del panel admin.
export const reglasId = [param("id").isInt({ min: 1 }).withMessage("El id del usuario no es válido")];

const reglasDatos = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio").isLength({ max: 50 }).withMessage("El nombre es demasiado largo"),
  body("apellido").trim().notEmpty().withMessage("El apellido es obligatorio").isLength({ max: 50 }).withMessage("El apellido es demasiado largo"),
  body("email").trim().isEmail().withMessage("El email no es válido").bail().isLength({ max: 100 }).withMessage("El email es demasiado largo").bail().toLowerCase(),
  body("id_rol").isInt({ min: 1 }).withMessage("Elegí un rol").toInt(),
  body("activo").isBoolean().withMessage("El estado de la cuenta no es válido").toBoolean(),
];

// bcrypt solo procesa los primeros 72 bytes, por eso el máximo.
const textoPassword = "La contraseña debe tener entre 8 y 72 caracteres";

// Al crear, la contraseña es obligatoria.
export const reglasCrear = [...reglasDatos, body("password").isLength({ min: 8, max: 72 }).withMessage(textoPassword)];

// Al editar, la contraseña es opcional: si viene vacía, no se cambia.
export const reglasEditar = [
  ...reglasDatos,
  body("password").optional({ values: "falsy" }).isLength({ min: 8, max: 72 }).withMessage(textoPassword),
];