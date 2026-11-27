import { Router } from "express";
import { opciones, listar, obtener, crear, actualizar, eliminar } from "../controllers/puntoTipos.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import requireRole from "../middlewares/requireRole.js";
import { esquemaClave, esquemaAsignacion } from "../validators/puntoTipos.validators.js";

// Rutas bajo /api/admin/punto-tipos. Todas exigen sesión y rol administrador.
const router = Router();

router.use(verifyToken, requireRole("administrador"));

router.get("/opciones", opciones); // puntos y tipos para el formulario (antes de las rutas con parámetros)
router.get("/", listar);
router.get("/:idPunto/:idTipo", validate({ params: esquemaClave }), obtener);
router.post("/", validate({ body: esquemaAsignacion }), crear);
router.put("/:idPunto/:idTipo", validate({ params: esquemaClave, body: esquemaAsignacion }), actualizar);
router.delete("/:idPunto/:idTipo", validate({ params: esquemaClave }), eliminar);

export default router;