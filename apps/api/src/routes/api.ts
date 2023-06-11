import express, { Router } from "express";
import { RulesController } from "@controller/RulesController";
import { NotificationController } from "@controller/NotificationController";
import { NotificationBodyValidator } from "src/middleware/NotificationBody";
import {
  NotificationRepository,
  NotificationSheduler,
} from "notification/types";
import { PricesController } from "@controller/PricesController";
import { MetalPriceChangeBody } from "src/middleware/PriceBody";

export const buildApiRouter = (repos: {
  notificationRepo: NotificationRepository;
  notificationSheduler: NotificationSheduler;
}): Router => {
  const apiRouter = express.Router();

  const rulesHandler = new RulesController();
  const notificationsHandler = new NotificationController(
    repos.notificationRepo
  );

  const pricesHandler = new PricesController(
    repos.notificationRepo,
    repos.notificationSheduler
  );

  apiRouter.get("/send-rules", rulesHandler.getSendRules);
  apiRouter.get("/notifications", notificationsHandler.getAll);
  apiRouter.post(
    "/notifications/create",
    new NotificationBodyValidator().validate(),
    notificationsHandler.create
  );

  // prices
  apiRouter.post(
    "/price/new",
    new MetalPriceChangeBody().validate(),
    pricesHandler.newPrice
  );

  apiRouter.put(
    "/notifications/:id/update",
    new NotificationBodyValidator().validate(),
    notificationsHandler.update
  );
  apiRouter.delete("/notifications/:id/delete", notificationsHandler.delete);

  return apiRouter;
};
