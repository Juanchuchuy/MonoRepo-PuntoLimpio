import { z } from "zod";
import { idPositivo } from "../middlewares/validate.js";

// Esquemas de validación de los endpoints del panel del usuario.
export const esquemaId = z.object({ id: idPositivo("El id del reporte no es válido") });