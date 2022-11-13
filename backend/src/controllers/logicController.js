import { Logic } from "../models/logic.js";

export default class LogicController {

  getLogic() {
    return new Promise((resolve, reject) => {
      const LogicModel = new Logic();

      LogicModel.getLogic((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteLogic(id) {
    return new Promise((resolve, reject) => {
      const LogicModel = new Logic();

      LogicModel.deleteLogic(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveLogic(req) {
    return new Promise((resolve, reject) => {
      const LogicModel = new Logic();

      const condition = {
        condition_id: req.body.condition_id,
        question_id: req.body.question_id,
        answer_id: req.body.answer_id,
        condition_type: req.body.condition_type,
        parameters: req.body.parameters,
        result: req.body.result,
      };

      LogicModel.insertLogic(condition, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}