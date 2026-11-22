import { Router } from "express";
import { opciones, listar, obtener, crear, actualizar, eliminar } from "../controllers/puntoTipos.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import requireRole from "../middlewares/requireRole.js";
import { reglasClave, reglasAsignacion } from "../validators/puntoTipos.validators.js";

// Rutas bajo /api/admin/punto-tipos. Todas exigen sesión y rol administrador.
const router = Router();

router.use(verifyToken, requireRole("administrador"));

router.get("/opciones", opciones); // puntos y tipos para el formulario (antes de las rutas con parámetros)
router.get("/", listar);
router.get("/:idPunto/:idTipo", reglasClave, validate, obtener);
router.post("/", reglasAsignacion, validate, crear);
router.put("/:idPunto/:idTipo", reglasClave, reglasAsignacion, validate, actualizar);
router.delete("/:idPunto/:idTipo", reglasClave, validate, eliminar);

export default router;
