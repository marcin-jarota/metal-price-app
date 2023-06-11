import { Request, Response } from "express";
import {
  NotificationRepository,
  NotificationSheduler,
  RuleType,
} from "notification/types";
import {
  IsItemValidatorFactory,
  PriceValidatorFactory,
} from "src/conditions/ConditionValidator";
import { JSONController } from "./JSONController";

export class PricesController extends JSONController {
  constructor(
    private notificationRepository: NotificationRepository,
    private sheduler: NotificationSheduler
  ) {
    super();
    this._bindMethods();
  }

  _bindMethods() {
    this.newPrice = this.newPrice.bind(this);
  }

  private matchesConditions({
    price,
    itemIs,
  }: {
    price: number;
    itemIs: string;
  }) {
    return (rule: any) => {
      if (rule.type === RuleType.Price || rule.isPriceRule) {
        const validator = PriceValidatorFactory.getValidator(rule.key);

        return validator.validate(price, parseFloat(rule.value as string));
      }

      if (rule.type === RuleType.IS || !rule.isPriceRule) {
        const validator = IsItemValidatorFactory.getValidator(rule.key);

        return validator.validate(itemIs, rule.value as string);
      }

      return false;
    };
  }

  async newPrice(req: Request, res: Response) {
    const itemIs = req.body.itemType;
    const price = parseFloat(req.body.price);

    try {
      const notifications = await this.notificationRepository.findAll();

      const matchedNotifications = notifications.filter((notification) => {
        const matches = notification.sendRules.every(
          this.matchesConditions({ price, itemIs })
        );

        return matches;
      });

      for (let i = 0; i < matchedNotifications.length; i++) {
        await this.sheduler.pushNotification(matchedNotifications[i]);
        console.log("pushing to redis", matchedNotifications[i].content);
      }

      res.send({
        success: true,
        sheduledNotificationCount: matchedNotifications.length,
      });
    } catch (err) {
      return this.jsonError(res, 500, `Could not ${(err as any).message}`);
    }
  }
}
