import { Request, Response } from "express";
import { UsersService } from "../services/users_service";

export class UsersController {
  private static userService: UsersService = new UsersService();

  static async getProfile(req: Request, res: Response) {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    try {
      const user = await UsersController.userService.getUserProfile(userId);
      res.json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "User not found") {
          return res.status(404).json({ message: "User not found" });
        }

        console.error("Error fetching user profile:", error.message);
        return res.status(500).json({ message: "Internal server error" });
      } else {
        console.error("Unexpected error fetching user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
