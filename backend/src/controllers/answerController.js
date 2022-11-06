import { Answer } from "../models/answer.js";

export default class AnswerController {
  saveAnswer(req) {
    return new Promise((resolve, reject) => {
      const AnswerModel = new Answer();

      const question = {
        answer_id: req.body.answer_id,
        fk_question_id: req.body.fk_question_id,
        question_type: req.body.question_type,
        answer: req.body.answer,
      };

      AnswerModel.insertAnswer(question, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteAnswer(id) {
    return new Promise((resolve, reject) => {
      const AnswerModel = new Answer();

      AnswerModel.deleteAnswer(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}
