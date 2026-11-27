import { z } from "zod";
import { idPositivo } from "../middlewares/validate.js";

const textoNombre = "El nombre del punto es obligatorio";
const textoReferencia = "La referencia no puede superar los 200 caracteres";
const textoLatitud = "La latitud debe estar entre -90 y 90";
const textoLongitud = "La longitud debe estar entre -180 y 180";

// Esquemas de validación de los endpoints de puntos de recolección.
export const esquemaId = z.object({ id: idPositivo("El id del punto no es válido") });

export const esquemaPunto = z.object({
  nombre: z.string(textoNombre).trim().min(1, textoNombre).max(100, "El nombre no puede superar los 100 caracteres"),
  referencia: z.string(textoReferencia).trim().max(200, textoReferencia).nullish(),
  id_calle: idPositivo("Elegí una calle"),
  latitud: z.number(textoLatitud).min(-90, textoLatitud).max(90, textoLatitud),
  longitud: z.number(textoLongitud).min(-180, textoLongitud).max(180, textoLongitud),
  activo: z.boolean("El estado del punto no es válido").optional(),
});