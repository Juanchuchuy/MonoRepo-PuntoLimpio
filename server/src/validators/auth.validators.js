import { z } from "zod";

const textoPassword = "La contraseña debe tener entre 8 y 72 caracteres";
const email = z.string("El email no es válido").trim().toLowerCase().pipe(z.email("El email no es válido"));

// Esquemas de validación de cada endpoint de autenticación.
export const esquemaRegister = z.object({
  nombre: z.string("El nombre es obligatorio").trim().min(1, "El nombre es obligatorio").max(50, "El nombre es demasiado largo"),
  apellido: z.string("El apellido es obligatorio").trim().min(1, "El apellido es obligatorio").max(50, "El apellido es demasiado largo"),
  email,
  // bcrypt solo procesa los primeros 72 bytes, por eso el máximo.
  password: z.string(textoPassword).min(8, textoPassword).max(72, textoPassword),
});

export const esquemaLogin = z.object({
  email,
  password: z.string("La contraseña es obligatoria").min(1, "La contraseña es obligatoria"),
});