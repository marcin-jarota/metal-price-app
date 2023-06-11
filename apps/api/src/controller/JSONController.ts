import { Response } from "express";

export class JSONController {
  jsonError(res: Response, status: number, msg: string, errors: any[] = []) {
    res.status(status).send({
      success: false,
      errors,
      msg,
    });
  }

  response(res: Response, status: number, body: any) {
    return res.status(status).send({
      success: true,
      data: body,
    });
  }
}
