import { Router } from "express";
import { listar, obtener, crear, actualizar, eliminar } from "../controllers/horarios.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import requireRole from "../middlewares/requireRole.js";
import { esquemaId, esquemaHorario } from "../validators/horarios.validators.js";

// Rutas bajo /api/admin/horarios. Todas exigen sesión y rol administrador.
const router = Router();

router.use(verifyToken, requireRole("administrador"));

router.get("/", listar);
router.get("/:id", validate({ params: esquemaId }), obtener);
router.post("/", validate({ body: esquemaHorario }), crear);
router.put("/:id", validate({ params: esquemaId, body: esquemaHorario }), actualizar);
router.delete("/:id", validate({ params: esquemaId }), eliminar);

export default router;