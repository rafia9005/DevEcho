import { PrismaClient } from "@prisma/client";

export class DBClient extends PrismaClient {
  constructor() {
    super();
    this.$connect();
  }
}
