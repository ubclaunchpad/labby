import { Logic } from "../models/logic.js";

export default class LogicController {
 
  deleteLogic(req) {
    return new Promise((resolve, reject) => {
      const LogicModel = new Logic();

      LogicModel.deleteLogic(req.body.logic_id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}