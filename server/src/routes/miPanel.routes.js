import { Router } from "express";
import { obtenerPanel, eliminarReporte } from "../controllers/miPanel.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import { esquemaId } from "../validators/miPanel.validators.js";

// Rutas bajo /api/mi-panel. Exigen sesión pero NO un rol concreto:
// cualquier usuario autenticado ve solo lo suyo (el filtro se hace por req.user.id en el controlador).
const router = Router();

router.use(verifyToken);

router.get("/", obtenerPanel);
router.delete("/reportes/:id", validate({ params: esquemaId }), eliminarReporte);

export default router;