import { DBClient } from "../database/Client";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  private db: DBClient;
  private jwtSecret: any = process.env.SECRET_KEY;

  constructor() {
    this.db = new DBClient();
  }
  async Login(email: string, password: string) {
    const user = await this.db.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Password");
    }

    const token = this.generateToken(user.id);
    await this.db.token.create({
      data: {
        accessToken: token,
        user: { connect: { id: user.id } },
      },
    });
    return {
      token,
    };
  }
  async Register(name: string, email: string, password: string) {
    const existingUser = await this.db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { message: "User registered successfully", user: newUser };
  }
  private generateToken(userId: number): string {
    return jwt.sign({ userId }, this.jwtSecret);
  }
}
