import { Validator } from "@app-types/index";

class IsNotEqual implements Validator<string> {
  validate(a: string, b: string) {
    return a !== b;
  }
}

export default IsNotEqual;
