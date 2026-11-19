import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import { reglasRegister, reglasLogin } from "../validators/auth.validators.js";

// Rutas bajo /api/auth
const router = Router();

router.post("/register", reglasRegister, validate, register);
router.post("/login", reglasLogin, validate, login);
router.get("/me", verifyToken, me);

export default router;
