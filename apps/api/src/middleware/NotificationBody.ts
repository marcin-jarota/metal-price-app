import { checkSchema } from "express-validator";
import { SendRule, Validator } from "@app-types/index";

export class NotificationBodyValidator {
  validate() {
    return checkSchema({
      title: {
        notEmpty: true,
        errorMessage: "Title can not be empty",
      },
      content: {
        notEmpty: true,
        errorMessage: "Content can not be empty",
      },
      stakeholdersEmails: {
        custom: {
          options: (value) => {
            this.assertIsArray(value);
            this.assertIsNotEmptyArray(value);

            const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
            if (value.some((email: string) => !emailRegex.test(email))) {
              throw new Error(
                "Each value of stakeholdersEmails has to be an email"
              );
            }

            return true;
          },
        },
      },
      sendRules: {
        custom: {
          options: (value) => {
            this.assertIsArray(value);
            this.assertIsNotEmptyArray(value);
            value.forEach((rule: SendRule) => {
              this.validateSendRule(rule);
            });

            return true;
          },
        },
      },
    });
  }

  private validateSendRule(rule: SendRule) {
    const keys = Object.keys(rule);

    if (!keys.includes("key") || !keys.includes("value")) {
      throw new Error(
        "SendRule must containt at least 2 parameters 'key' and 'value'"
      );
    }
  }

  private assertIsArray(array: unknown) {
    if (!Array.isArray(array)) {
      throw new Error("parameter can not be empty array");
    }
  }

  private assertIsNotEmptyArray(array: unknown[]) {
    if (array.length === 0) {
      throw new Error("stakeholdersEmails has to be an Array");
    }
  }
}
