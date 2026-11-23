import { Router } from "express";
import { listar, obtener, crear, actualizar, eliminar } from "../controllers/horarios.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import requireRole from "../middlewares/requireRole.js";
import { reglasId, reglasHorario } from "../validators/horarios.validators.js";

// Rutas bajo /api/admin/horarios. Todas exigen sesión y rol administrador.
const router = Router();

router.use(verifyToken, requireRole("administrador"));

router.get("/", listar);
router.get("/:id", reglasId, validate, obtener);
router.post("/", reglasHorario, validate, crear);
router.put("/:id", reglasId, reglasHorario, validate, actualizar);
router.delete("/:id", reglasId, validate, eliminar);

export default router;
