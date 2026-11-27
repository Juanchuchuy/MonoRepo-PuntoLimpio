import { z } from "zod";
import { idPositivo } from "../middlewares/validate.js";

// bcrypt solo procesa los primeros 72 bytes, por eso el máximo.
const textoPassword = "La contraseña debe tener entre 8 y 72 caracteres";
const textoEmail = "El email no es válido";

// Esquemas de validación de los endpoints de usuarios del panel admin.
export const esquemaId = z.object({ id: idPositivo("El id del usuario no es válido") });

const esquemaDatos = z.object({
  nombre: z.string("El nombre es obligatorio").trim().min(1, "El nombre es obligatorio").max(50, "El nombre es demasiado largo"),
  apellido: z.string("El apellido es obligatorio").trim().min(1, "El apellido es obligatorio").max(50, "El apellido es demasiado largo"),
  email: z.string(textoEmail).trim().toLowerCase().pipe(z.email(textoEmail).max(100, "El email es demasiado largo")),
  id_rol: idPositivo("Elegí un rol"),
  activo: z.boolean("El estado de la cuenta no es válido"),
});

// Al crear, la contraseña es obligatoria.
export const esquemaCrear = esquemaDatos.extend({
  password: z.string(textoPassword).min(8, textoPassword).max(72, textoPassword),
});

// Al editar, la contraseña es opcional: si viene vacía, no se cambia.
export const esquemaEditar = esquemaDatos.extend({
  password: z.string(textoPassword).max(72, textoPassword).refine((p) => p === "" || p.length >= 8, textoPassword).nullish(),
});