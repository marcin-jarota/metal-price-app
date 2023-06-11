import { Validator } from "@app-types/index";

class IsLessOrEqual implements Validator<number> {
  validate(a: number, b: number) {
    return a <= b;
  }
}

export default IsLessOrEqual;
