import { z } from "zod";
import { idPositivo } from "../middlewares/validate.js";

// Mismos valores que el ENUM dia_semana de la base (sin tildes).
const DIAS = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

const textoHora = "La hora no es válida (formato HH:MM)";
const textoObs = "Las observaciones no pueden superar los 255 caracteres";

// Esquemas de validación de los endpoints de horarios de recolección.
export const esquemaId = z.object({ id: idPositivo("El id del horario no es válido") });

export const esquemaHorario = z.object({
  id_punto: idPositivo("Elegí un punto de recolección"),
  dia_semana: z.enum(DIAS, "El día de la semana no es válido"),
  hora_estimada: z.string(textoHora).regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, textoHora),
  observaciones: z.string(textoObs).trim().max(255, textoObs).nullish(),
});