import { Router } from "express";
import { listar, obtener, crear, actualizar, eliminar } from "../controllers/tiposResiduo.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import requireRole from "../middlewares/requireRole.js";
import { esquemaId, esquemaTipo } from "../validators/tiposResiduo.validators.js";

// Rutas bajo /api/admin/tipos-residuo. Todas exigen sesión y rol administrador.
const router = Router();

router.use(verifyToken, requireRole("administrador"));

router.get("/", listar);
router.get("/:id", validate({ params: esquemaId }), obtener);
router.post("/", validate({ body: esquemaTipo }), crear);
router.put("/:id", validate({ params: esquemaId, body: esquemaTipo }), actualizar);
router.delete("/:id", validate({ params: esquemaId }), eliminar);

export default router;