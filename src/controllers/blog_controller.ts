import { Response } from "express";
import { BlogService } from "../services/blog_service";

export class BlogController {
  private static blogService = new BlogService();

  static async get(res: Response) {
    const result = await BlogController.blogService.getExample();
    res.json(result);
  }
}
