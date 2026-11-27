import { Router } from "express";
import { opciones, listar, obtener, crear, actualizar, eliminar } from "../controllers/puntos.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import requireRole from "../middlewares/requireRole.js";
import { esquemaId, esquemaPunto } from "../validators/puntos.validators.js";

// Rutas bajo /api/admin/puntos. Todas exigen sesión y rol administrador.
const router = Router();

router.use(verifyToken, requireRole("administrador"));

router.get("/opciones", opciones); // calles y tipos de residuo para el formulario (antes de "/:id")
router.get("/", listar);
router.get("/:id", validate({ params: esquemaId }), obtener);
router.post("/", validate({ body: esquemaPunto }), crear);
router.put("/:id", validate({ params: esquemaId, body: esquemaPunto }), actualizar);
router.delete("/:id", validate({ params: esquemaId }), eliminar);

export default router;