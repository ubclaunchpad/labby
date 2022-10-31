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

      QuestionModel.insertLogic(condition, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}