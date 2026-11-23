import { body, param } from "express-validator";

// Mismos valores que el ENUM estado de la base.
const ESTADOS = ["Realizada", "No realizada"];

// Reglas de validación de los endpoints de registros de recolección.
export const reglasId = [param("id").isInt({ min: 1 }).withMessage("El id del registro no es válido")];

export const reglasRegistro = [
  body("id_punto").isInt({ min: 1 }).withMessage("Elegí un punto de recolección"),
  body("fecha_hora")
    .matches(/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?$/)
    .withMessage("La fecha y hora no son válidas"),
  body("estado").isIn(ESTADOS).withMessage("El estado debe ser Realizada o No realizada"),
  body("observaciones").optional({ values: "falsy" }).trim().isLength({ max: 255 }).withMessage("Las observaciones no pueden superar los 255 caracteres"),
];
