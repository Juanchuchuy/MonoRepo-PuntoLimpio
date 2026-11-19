import { Router } from "express";
import authRoutes from "./auth.routes.js";

// Punto único donde se montan todas las rutas de la API (cada recurso nuevo se suma acá).
const router = Router();

router.use("/auth", authRoutes);

export default router;
