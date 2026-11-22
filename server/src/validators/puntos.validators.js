import { body, param } from "express-validator";

// Reglas de validación de los endpoints de puntos de recolección.
export const reglasId = [param("id").isInt({ min: 1 }).withMessage("El id del punto no es válido")];

export const reglasPunto = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del punto es obligatorio")
    .bail()
    .isLength({ max: 100 })
    .withMessage("El nombre no puede superar los 100 caracteres"),
  body("referencia")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 200 })
    .withMessage("La referencia no puede superar los 200 caracteres"),
  body("id_calle").isInt({ min: 1 }).withMessage("Elegí una calle"),
  body("latitud").isFloat({ min: -90, max: 90 }).withMessage("La latitud debe estar entre -90 y 90"),
  body("longitud").isFloat({ min: -180, max: 180 }).withMessage("La longitud debe estar entre -180 y 180"),
  body("activo").optional().isBoolean().withMessage("El estado del punto no es válido"),
];
