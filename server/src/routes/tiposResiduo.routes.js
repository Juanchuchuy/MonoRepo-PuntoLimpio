import { Router } from "express";
import { listar, obtener, crear, actualizar, eliminar } from "../controllers/tiposResiduo.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import requireRole from "../middlewares/requireRole.js";
import { reglasId, reglasTipo } from "../validators/tiposResiduo.validators.js";

// Rutas bajo /api/admin/tipos-residuo. Todas exigen sesión y rol administrador.
const router = Router();

router.use(verifyToken, requireRole("administrador"));

router.get("/", listar);
router.get("/:id", reglasId, validate, obtener);
router.post("/", reglasTipo, validate, crear);
router.put("/:id", reglasId, reglasTipo, validate, actualizar);
router.delete("/:id", reglasId, validate, eliminar);

export default router;
