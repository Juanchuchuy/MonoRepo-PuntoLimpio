import { Router } from "express";
import { listar, obtener, crear, actualizar, eliminar } from "../controllers/roles.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import requireRole from "../middlewares/requireRole.js";
import { esquemaId, esquemaRol } from "../validators/roles.validators.js";

// Rutas bajo /api/admin/roles. Todas exigen sesión y rol administrador.
const router = Router();

router.use(verifyToken, requireRole("administrador"));

router.get("/", listar);
router.get("/:id", validate({ params: esquemaId }), obtener);
router.post("/", validate({ body: esquemaRol }), crear);
router.put("/:id", validate({ params: esquemaId, body: esquemaRol }), actualizar);
router.delete("/:id", validate({ params: esquemaId }), eliminar);

export default router;