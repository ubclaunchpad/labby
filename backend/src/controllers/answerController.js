import { Answer } from "../models/answer.js";

export default class AnswerController {
  saveQuestion(req) {
    return new Promise((resolve, reject) => {
      const QuestionModel = new Question();

      const question = {
        question_id: req.body.question_id,
        question_title: req.body.question_title,
        question_type: req.body.question_type,
        question_index: req.body.question_index,
      };

      QuestionModel.insertQuestion(question, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadQuestion() {
    return new Promise((resolve, reject) => {
      const QuestionModel = new Question();

      QuestionModel.loadQuestion((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteQuestion(req) {
    return new Promise((resolve, reject) => {
      const QuestionModel = new Question();

      QuestionModel.deleteQuestion(req.body.question_id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}
