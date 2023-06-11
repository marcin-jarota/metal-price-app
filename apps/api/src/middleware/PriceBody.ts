import { checkSchema } from "express-validator"
import { METALS } from "@constants/sendRules"

export class MetalPriceChangeBody {
  private static items = [METALS.GOLD, METALS.PLATINIUM, METALS.SILVER]
  validate() {
    return checkSchema({
      itemType: {
        isEmpty: false,
        isIn: {
          options: [MetalPriceChangeBody.items],
        },
        errorMessage: `Incorrect metal, must be in: [${MetalPriceChangeBody.items.join(', ')}]`,
      },
      price: {
        isEmpty: false,
        isString: true,
        custom: {
          options: (value) => {
            if (isNaN(Number(value))) {
              throw Error("Incorrect numeric value");
            }

            return true;
          },
        },
      },
    });
  }
}
