import { Validator } from "@app-types/index";

class IsGraterOrEqual implements Validator<number> {
  validate(a: number, b: number) {
    return a >= b;
  }
}

export default IsGraterOrEqual;
