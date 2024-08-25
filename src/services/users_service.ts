import { DBClient } from "../database/Client";

export class UsersService {
  private db = new DBClient();

  async getUserProfile(userId: number) {
    try {
      const user = await this.db.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching user profile: ${error.message}`);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
