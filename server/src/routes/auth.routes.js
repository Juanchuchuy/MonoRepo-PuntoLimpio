import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import { esquemaRegister, esquemaLogin } from "../validators/auth.validators.js";

// Rutas bajo /api/auth
const router = Router();

router.post("/register", validate({ body: esquemaRegister }), register);
router.post("/login", validate({ body: esquemaLogin }), login);
router.get("/me", verifyToken, me);

export default router;