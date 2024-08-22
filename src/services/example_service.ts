import { DatabaseClient } from "../database/Client";

export async function ServiceGet() {
  const result = await DatabaseClient.blog.findMany({});
  return result;
}
