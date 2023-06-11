import { RuleType } from "notification/types";

export const METALS = {
  GOLD: "gold",
  SILVER: "silver",
  PLATINIUM: "platinium",
};

export const RULES_CONDITIONS = {
  IS_GRATER: "is_grater",
  IS_LESS: "is_less",
  IS_EQUAL: "is_equal",
  ITEM_IS: "item_is",
  ITEM_IS_NOT: "item_is_not",
  IS_GRATER_OR_EQUAL: "is_grater_or_equal",
  IS_LESS_OR_EQUAL: "is_less_or_equal",
};

export const SEND_RULES = {
  metals: [METALS.GOLD, METALS.PLATINIUM, METALS.SILVER],
  rules: [
    {
      key: RULES_CONDITIONS.ITEM_IS,
      description: "Item is",
      type: RuleType.IS,
    },
    {
      key: RULES_CONDITIONS.ITEM_IS_NOT,
      description: "Item is not:",
      type: RuleType.IS,
    },
    {
      key: RULES_CONDITIONS.IS_GRATER_OR_EQUAL,
      description: "Is grater or equal",
      type: RuleType.Price,
      isPriceRule: true,
    },
    {
      key: RULES_CONDITIONS.IS_GRATER,
      description: "Item is grather than",
      type: RuleType.Price,
      isPriceRule: true,
    },
    {
      key: RULES_CONDITIONS.IS_LESS,
      description: "Is less than",
      type: RuleType.Price,
      isPriceRule: true,
    },
    {
      key: RULES_CONDITIONS.IS_LESS_OR_EQUAL,
      description: "Is less or equal",
      type: RuleType.Price,
      isPriceRule: true,
    },
  ],
};
