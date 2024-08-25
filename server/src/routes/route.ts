import { Router } from "express";
import { AuthController } from "../controllers/auth_controller";
import { loginValidate, registerValidate } from "../validate/validate";
import { validate } from "../middleware/validators";
import { authenticate } from "../middleware/auth";
import { UsersController } from "../controllers/users_controller";

const r = Router();

// routing
r.post("/auth/register", registerValidate, validate, AuthController.Register);
r.post("/auth/login", loginValidate, validate, AuthController.Login);

r.get("/profile", authenticate, UsersController.getProfile);

export default r;
