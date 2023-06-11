import { Validator } from "@app-types/index";

class ItemIs implements Validator<string> {
  validate(a?: string | undefined, b?: string | undefined): boolean {
    return a === b;
  }
}

export default ItemIs;
