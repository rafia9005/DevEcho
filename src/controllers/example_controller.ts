import { Response, Request } from "express";
import { ServiceGet } from "../services/example_service";

export async function ExampleGet(req: Request, res: Response) {
  const result = await ServiceGet();
  res.json(result);
}
