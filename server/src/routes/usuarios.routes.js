import { Router } from "express";
import { listar, obtener, crear, actualizar, eliminar } from "../controllers/usuarios.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import requireRole from "../middlewares/requireRole.js";
import { reglasId, reglasCrear, reglasEditar } from "../validators/usuarios.validators.js";

// Rutas bajo /api/admin/usuarios. Todas exigen sesión y rol administrador.
const router = Router();

router.use(verifyToken, requireRole("administrador"));

router.get("/", listar);
router.get("/:id", reglasId, validate, obtener);
router.post("/", reglasCrear, validate, crear);
router.put("/:id", reglasId, reglasEditar, validate, actualizar);
router.delete("/:id", reglasId, validate, eliminar);

export default router;