import { Validator } from "@app-types/index";

class IsEqual implements Validator<number> {
  validate(a: number, b: number) {
    return a === b;
  }
}

export default IsEqual;
