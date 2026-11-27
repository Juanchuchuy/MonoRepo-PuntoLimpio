import { z } from "zod";
import { idPositivo } from "../middlewares/validate.js";

// Esquemas de validación de los endpoints de punto_tipo_residuo (clave compuesta: punto + tipo).
export const esquemaClave = z.object({
  idPunto: idPositivo("El id del punto no es válido"),
  idTipo: idPositivo("El id del tipo no es válido"),
});

export const esquemaAsignacion = z.object({
  id_punto: idPositivo("Elegí un punto de recolección"),
  id_tipo: idPositivo("Elegí un tipo de residuo"),
});