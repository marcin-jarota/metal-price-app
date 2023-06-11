import { RULES_CONDITIONS } from "@constants/sendRules";
import { Validator } from "@app-types/index";
import IsEqual from "./IsEqual";
import IsGrater from "./IsGrater";
import IsGraterOrEqual from "./isGraterOrEqual";
import IsLess from "./IsLess";
import IsLessOrEqual from "./IsLessOrEqual";
import IsNotEqual from "./IsNotEqual";
import ItemIs from "./ItemIs";

export class PriceValidatorFactory {
  static getValidator(condition: string): Validator<number> {
    switch (condition) {
      case RULES_CONDITIONS.IS_EQUAL:
        return new IsEqual();
      case RULES_CONDITIONS.IS_GRATER:
        return new IsGrater();
      case RULES_CONDITIONS.IS_GRATER_OR_EQUAL:
        return new IsGraterOrEqual();
      case RULES_CONDITIONS.IS_LESS_OR_EQUAL:
        return new IsLessOrEqual();
      case RULES_CONDITIONS.IS_LESS:
        return new IsLess();
      default:
        throw new Error("Unknown validation rule");
    }
  }
}

export class IsItemValidatorFactory {
  /**
   * @param {string} condition
   * @returns {Validator}
   */
  static getValidator(condition: string): Validator<string> {
    switch (condition) {
      case RULES_CONDITIONS.ITEM_IS:
        return new ItemIs();
      case RULES_CONDITIONS.ITEM_IS_NOT:
        return new IsNotEqual();
      default:
        throw new Error("Unknown validation rule");
    }
  }

  static getIsValidator(condition: string): Validator<string> {
    switch (condition) {
      case RULES_CONDITIONS.ITEM_IS:
        return new ItemIs();
      case RULES_CONDITIONS.ITEM_IS_NOT:
        return new IsNotEqual();
      default:
        throw new Error("Unknown validator is " + condition);
    }
  }
}
