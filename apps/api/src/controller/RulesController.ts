import { Request, Response } from "express";
import { SEND_RULES } from "@constants/sendRules";

export class RulesController {
  constructor() {
    this._bindMethods();
  }

  _bindMethods() {
    this.getSendRules = this.getSendRules.bind(this);
  }

  getSendRules(req: Request, res: Response) {
    res.send(SEND_RULES);
  }
}
