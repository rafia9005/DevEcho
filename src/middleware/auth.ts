import { Request, Response, NextFunction } from "express";
import { DBClient } from "../database/Client";
import jwt from "jsonwebtoken";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["x-token"] as string;

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const db = new DBClient();

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as {
      userId: number;
    };

    const tokenRecord = await db.token.findFirst({
      where: { accessToken: token },
    });

    if (!tokenRecord) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}
