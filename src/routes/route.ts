import { Router } from "express";
import { AuthController } from "../controllers/auth_controller";
import { loginValidate, registerValidate } from "../validate/validate";
import { validate } from "../middleware/validators";

const r = Router();

// routing
r.post("/auth/register", registerValidate, validate, AuthController.Register);
r.post("/auth/login", loginValidate, validate, AuthController.Login);

export default r;
