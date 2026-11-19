import { body, param } from "express-validator";

// Reglas de validación de los endpoints de roles.
export const reglasId = [param("id").isInt({ min: 1 }).withMessage("El id del rol no es válido")];

export const reglasRol = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del rol es obligatorio")
    .bail()
    .isLength({ max: 30 })
    .withMessage("El nombre no puede superar los 30 caracteres")
    .bail()
    .toLowerCase(),
  body("descripcion")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 150 })
    .withMessage("La descripción no puede superar los 150 caracteres"),
];