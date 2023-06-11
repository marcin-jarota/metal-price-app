import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { buildApiRouter } from "@routes/api";
import { Database } from "src/db/connection";
import { buildNotificationRepository } from "notification/repository/sequelizeRepo";
import { buildNotificationSheduler } from "notification/service/notificationSheduler";

const app: Express = express();

app.use(bodyParser.json());

const args = yargs(hideBin(process.argv))
  .options({
    DB_USER: { type: "string", default: "root" },
    DB_PASS: { type: "string", default: "root" },
    DB_NAME: { type: "string", default: "notifications" },
    PORT: { type: "string", default: "3001" },
  })
  .parseSync();

const connection = new Database(
  {
    dbName: args.DB_NAME,
    dbPass: args.DB_PASS,
    dbUser: args.DB_USER,
  },
  { info: (msg) => console.log(`[DB_Log]: ${msg}`) }
);

const init = async () => {
  await connection.initConnection();

  const notificationRepo = await buildNotificationRepository(connection);

  const notificationSheduler = await buildNotificationSheduler();

  const apiRouter = buildApiRouter({
    notificationRepo,
    notificationSheduler,
  });

  app.use("/api", cors({ origin: "http://localhost:3000" }), apiRouter);

  app.listen(args.PORT);
};

init().catch(console.log);
