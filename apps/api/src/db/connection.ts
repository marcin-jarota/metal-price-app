import { Sequelize } from "sequelize";
import { Logger, SequelizeDatabase } from "@app-types/index";

export class Database implements SequelizeDatabase {
  private connectionUri: string;
  model: Sequelize;
  private logger: Logger;

  constructor(
    {
      dbUser,
      dbPass,
      dbName,
    }: { dbUser: string; dbPass: string; dbName: string },
    logger: Logger
  ) {
    this.connectionUri = `postgres://${dbUser}:${dbPass}@127.0.0.1:5432/${dbName}`;
    this.model = new Sequelize(this.connectionUri);
    this.logger = logger;
  }

  async initConnection() {
    try {
      await this.model.authenticate();
      this.logger.info("Connection established succesfully");
    } catch (err) {
      this.logger.info(err as any);
      process.exit(1);
    }
  }
}
