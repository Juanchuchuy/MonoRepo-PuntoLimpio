import { param } from "express-validator";

// Reglas de validación de los endpoints del panel del usuario.
export const reglasId = [param("id").isInt({ min: 1 }).withMessage("El id del reporte no es válido")];
