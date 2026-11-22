import { Router } from "express";
import { opciones, listar, obtener, crear, actualizar, eliminar } from "../controllers/puntos.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import requireRole from "../middlewares/requireRole.js";
import { reglasId, reglasPunto } from "../validators/puntos.validators.js";

// Rutas bajo /api/admin/puntos. Todas exigen sesión y rol administrador.
const router = Router();

router.use(verifyToken, requireRole("administrador"));

router.get("/opciones", opciones); // calles y tipos de residuo para el formulario (antes de "/:id")
router.get("/", listar);
router.get("/:id", reglasId, validate, obtener);
router.post("/", reglasPunto, validate, crear);
router.put("/:id", reglasId, reglasPunto, validate, actualizar);
router.delete("/:id", reglasId, validate, eliminar);

export default router;
