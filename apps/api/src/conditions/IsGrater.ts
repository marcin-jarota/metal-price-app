import { Validator } from "@app-types/index";

class IsGrater implements Validator<number> {
  validate(a: number, b: number) {
    return a > b;
  }
}

export default IsGrater;
