import { Router } from "express";
import { listar, obtener, crear, actualizar, eliminar } from "../controllers/roles.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import requireRole from "../middlewares/requireRole.js";
import { reglasId, reglasRol } from "../validators/roles.validators.js";

// Rutas bajo /api/admin/roles. Todas exigen sesión y rol administrador.
const router = Router();

router.use(verifyToken, requireRole("administrador"));

router.get("/", listar);
router.get("/:id", reglasId, validate, obtener);
router.post("/", reglasRol, validate, crear);
router.put("/:id", reglasId, reglasRol, validate, actualizar);
router.delete("/:id", reglasId, validate, eliminar);

export default router;