import { Router } from "express";
import authRoutes from "./auth.routes.js";
import rolesRoutes from "./roles.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import tiposResiduoRoutes from "./tiposResiduo.routes.js";
import mapaRoutes from "./mapaRoutes.js";
// Punto único donde se montan todas las rutas de la API (cada recurso nuevo se suma acá).
const router = Router();

router.use("/auth", authRoutes);
router.use("/admin/roles", rolesRoutes);
router.use("/admin/usuarios", usuariosRoutes);
router.use("/admin/tipos-residuo", tiposResiduoRoutes);
router.use("/", mapaRoutes)
export default router;