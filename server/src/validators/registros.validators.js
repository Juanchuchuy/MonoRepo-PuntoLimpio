import { z } from "zod";
import { idPositivo } from "../middlewares/validate.js";

// Mismos valores que el ENUM estado de la base.
const ESTADOS = ["Realizada", "No realizada"];

const textoFecha = "La fecha y hora no son válidas";
const textoObs = "Las observaciones no pueden superar los 255 caracteres";

// Esquemas de validación de los endpoints de registros de recolección.
export const esquemaId = z.object({ id: idPositivo("El id del registro no es válido") });

export const esquemaRegistro = z.object({
  id_punto: idPositivo("Elegí un punto de recolección"),
  fecha_hora: z.string(textoFecha).regex(/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?$/, textoFecha),
  estado: z.enum(ESTADOS, "El estado debe ser Realizada o No realizada"),
  observaciones: z.string(textoObs).trim().max(255, textoObs).nullish(),
});