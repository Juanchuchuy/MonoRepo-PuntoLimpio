import "dotenv/config"; // debe ser el primer import: carga el .env antes que el resto
import app from "./app.js";
import { pool } from "./config/db.js";

if (!process.env.JWT_SECRET) {
  console.error("Falta JWT_SECRET en el archivo .env");
  process.exit(1);
}

try {
  await pool.query("SELECT 1");
  console.log("MySQL conectado");
} catch (error) {
  console.error("No se pudo conectar a MySQL:", error.message);
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
