import { body, param } from "express-validator";

// Reglas de validación de los endpoints de tipos de residuo.
export const reglasId = [param("id").isInt({ min: 1 }).withMessage("El id del tipo de residuo no es válido")];

export const reglasTipo = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio").bail().isLength({ max: 50 }).withMessage("El nombre no puede superar los 50 caracteres"),
  body("descripcion").optional({ values: "falsy" }).trim().isLength({ max: 150 }).withMessage("La descripción no puede superar los 150 caracteres"),
];
