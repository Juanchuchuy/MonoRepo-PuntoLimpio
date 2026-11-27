import { z } from "zod";

// Id entero positivo. Acepta número o texto numérico (los params de la URL llegan como string).
export const idPositivo = (msg) => z.coerce.number(msg).int(msg).min(1, msg);

// Valida req.params y/o req.body con esquemas de zod. Si todo está bien, deja en la request
// los datos ya limpios (con trim, minúsculas, números, etc.); si no, corta con 400.
// Uso: validate({ params: esquemaId, body: esquemaPunto })
export default function validate({ params, body }) {
  return (req, res, next) => {
    const detalles = [];

    for (const [parte, esquema] of [["params", params], ["body", body]]) {
      if (!esquema) continue;
      const resultado = esquema.safeParse(req[parte] ?? {});
      if (resultado.success) {
        req[parte] = resultado.data;
      } else {
        detalles.push(...resultado.error.issues.map((i) => ({ campo: i.path.join("."), mensaje: i.message })));
      }
    }

    if (detalles.length) return res.status(400).json({ error: "Datos inválidos", detalles });
    next();
  };
}