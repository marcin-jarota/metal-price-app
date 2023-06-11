import { Request, Response } from "express";
import { JSONController } from "./JSONController";
import { NotificationRepository } from "notification/types";
import { validationResult } from "express-validator";

export class NotificationController extends JSONController {
  private notificationRepository: NotificationRepository;

  constructor(notificationRepository: NotificationRepository) {
    super();
    this.notificationRepository = notificationRepository;

    this._bindMethods();
  }

  _bindMethods() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(_: Request, res: Response) {
    try {
      const notifications = await this.notificationRepository.findAll();
      res.send(notifications);
    } catch (err) {
      this.jsonError(
        res,
        500,
        "We can not response succesfully, try again later"
      );
    }
  }

  async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return this.jsonError(res, 400, "Form is not valid", errors.array());
    }

    try {
      const newNotification = await this.notificationRepository.create({
        ...req.body,
      });

      res.send(newNotification);
    } catch (err) {
      return this.jsonError(
        res,
        500,
        "We were not able to create notification"
      );
    }
  }

  async update(req: Request, res: Response) {
    const errors = validationResult(req);
    const notificationId = req.params.id;

    if (!errors.isEmpty()) {
      return this.jsonError(res, 400, "Form is not valid", errors.array());
    }

    try {
      const notification = await this.notificationRepository.findOneByID(
        notificationId
      );

      if (!notification) {
        return this.jsonError(
          res,
          404,
          `We were unable to find notification with ID ${notificationId}`
        );
      }

      notification.title = req.body.title;
      notification.content = req.body.content;
      notification.stakeholdersEmails = req.body.stakeholdersEmails;
      notification.sendRules = req.body.sendRules;

      const { id, ...newParams } = notification;

      await this.notificationRepository.update(id, newParams);
      this.response(res, 200, notification);
    } catch (err) {
      return this.jsonError(res, 500, "We were not able to handle request");
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      return this.jsonError(res, 400, "Invalid payload, missing ID");
    }

    try {
      const deleteCount = await this.notificationRepository.delete(
        parseInt(id)
      );

      if (!deleteCount) {
        return this.jsonError(res, 404, "Notification not found");
      }

      this.response(res, 204, { deleted: deleteCount });
    } catch (err) {
      return this.jsonError(res, 500, (err as any).message);
    }
  }
}
