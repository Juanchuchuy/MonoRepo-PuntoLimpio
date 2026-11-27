import { Router } from "express";
import { listar, obtener, crear, actualizar, eliminar } from "../controllers/registros.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import requireRole from "../middlewares/requireRole.js";
import { esquemaId, esquemaRegistro } from "../validators/registros.validators.js";

// Rutas bajo /api/admin/registros. Todas exigen sesión y rol administrador.
const router = Router();

router.use(verifyToken, requireRole("administrador"));

router.get("/", listar);
router.get("/:id", validate({ params: esquemaId }), obtener);
router.post("/", validate({ body: esquemaRegistro }), crear);
router.put("/:id", validate({ params: esquemaId, body: esquemaRegistro }), actualizar);
router.delete("/:id", validate({ params: esquemaId }), eliminar);

export default router;