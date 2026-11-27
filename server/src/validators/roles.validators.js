import { z } from "zod";
import { idPositivo } from "../middlewares/validate.js";

const textoNombre = "El nombre del rol es obligatorio";
const textoDescripcion = "La descripción no puede superar los 150 caracteres";

// Esquemas de validación de los endpoints de roles.
export const esquemaId = z.object({ id: idPositivo("El id del rol no es válido") });

export const esquemaRol = z.object({
  nombre: z.string(textoNombre).trim().min(1, textoNombre).max(30, "El nombre no puede superar los 30 caracteres").toLowerCase(),
  descripcion: z.string(textoDescripcion).trim().max(150, textoDescripcion).nullish(),
});