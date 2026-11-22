import { body, param } from "express-validator";

// Reglas de validación de los endpoints de punto_tipo_residuo (clave compuesta: punto + tipo).
export const reglasClave = [
  param("idPunto").isInt({ min: 1 }).withMessage("El id del punto no es válido"),
  param("idTipo").isInt({ min: 1 }).withMessage("El id del tipo no es válido"),
];

export const reglasAsignacion = [
  body("id_punto").isInt({ min: 1 }).withMessage("Elegí un punto de recolección"),
  body("id_tipo").isInt({ min: 1 }).withMessage("Elegí un tipo de residuo"),
];
