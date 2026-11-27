import { z } from "zod";
import { idPositivo } from "../middlewares/validate.js";

const textoNombre = "El nombre es obligatorio";
const textoDescripcion = "La descripción no puede superar los 150 caracteres";

// Esquemas de validación de los endpoints de tipos de residuo.
export const esquemaId = z.object({ id: idPositivo("El id del tipo de residuo no es válido") });

export const esquemaTipo = z.object({
  nombre: z.string(textoNombre).trim().min(1, textoNombre).max(50, "El nombre no puede superar los 50 caracteres"),
  descripcion: z.string(textoDescripcion).trim().max(150, textoDescripcion).nullish(),
});