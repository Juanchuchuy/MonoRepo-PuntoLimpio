import { Router } from "express";
import authRoutes from "./auth.routes.js";
import rolesRoutes from "./roles.routes.js";

// Punto único donde se montan todas las rutas de la API (cada recurso nuevo se suma acá).
const router = Router();

router.use("/auth", authRoutes);
router.use("/admin/roles", rolesRoutes);

export default router;