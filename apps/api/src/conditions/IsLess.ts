import { Validator } from "@app-types/index";

class IsLess implements Validator<number> {
  validate(a: number, b: number) {
    return a < b;
  }
}

export default IsLess;
