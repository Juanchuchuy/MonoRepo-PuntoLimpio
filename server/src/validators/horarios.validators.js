import { body, param } from "express-validator";

// Mismos valores que el ENUM dia_semana de la base (sin tildes).
const DIAS = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

// Reglas de validación de los endpoints de horarios de recolección.
export const reglasId = [param("id").isInt({ min: 1 }).withMessage("El id del horario no es válido")];

export const reglasHorario = [
  body("id_punto").isInt({ min: 1 }).withMessage("Elegí un punto de recolección"),
  body("dia_semana").isIn(DIAS).withMessage("El día de la semana no es válido"),
  body("hora_estimada")
    .matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
    .withMessage("La hora no es válida (formato HH:MM)"),
  body("observaciones").optional({ values: "falsy" }).trim().isLength({ max: 255 }).withMessage("Las observaciones no pueden superar los 255 caracteres"),
];
