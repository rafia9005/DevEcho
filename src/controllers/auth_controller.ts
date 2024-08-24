import { Request, Response } from "express";
import { AuthService } from "../services/auth_service";
import { validationResult } from "express-validator";

export class AuthController {
  private static authService = new AuthService();

  static async Login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const result = await AuthController.authService.Login(email, password);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.startsWith("No user found")) {
          res.status(404).json({ message: error.message });
        } else if (error.message.startsWith("Invalid Password")) {
          res.status(401).json({ message: error.message });
        } else {
          console.error("Error during login:", error);
          res.status(500).json({ message: "Login failed" });
        }
      } else {
        console.error("Unexpected error during login:", error);
        res.status(500).json({ message: "Login failed" });
      }
    }
  }

  static async Register(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const result = await AuthController.authService.Register(
        name,
        email,
        password,
      );
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.startsWith("User already exists")) {
          res.status(409).json({ message: error.message });
        } else {
          console.error("Error during registration:", error);
          res.status(500).json({ message: "Registration failed" });
        }
      } else {
        console.error("Unexpected error during registration:", error);
        res.status(500).json({ message: "Registration failed" });
      }
    }
  }
}
