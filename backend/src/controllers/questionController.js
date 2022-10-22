import { Question } from "../models/question.js";

export default class QuestionController {
  saveQuestion(req) {
    return new Promise((resolve, reject) => {
      const QuestionModel = new Question();

      const question = {
        question_id: req.body.question_id,
        question_title: req.body.question_title,
      };

      QuestionModel.insertQuestion(question, (err, result) => {
        if (err) {
          reject({ error: err });
        } else {
        resolve({ response: res });
        }
      });
    });
  }
}
