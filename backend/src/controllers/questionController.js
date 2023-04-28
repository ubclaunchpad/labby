import { Question } from "../models/question.js";

export default class QuestionController {
  saveQuestion(req) {
    return new Promise((resolve, reject) => {
      const QuestionModel = new Question();

      const question = {
        question_id: req.body.question_id,
        form_id: req.body.form_id,
        question_title: req.body.question_title,
        question_type: req.body.question_type,
        question_index: req.body.question_index,
        mandatory: req.body.mandatory,
        clinical: req.body.clinical,
        question_note: req.body.question_note,
        numerical_only: req.body.numerical_only,
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

  loadQuestionByForm(formId) {
    return new Promise((resolve, reject) => {
      const QuestionModel = new Question();

      QuestionModel.loadQuestionByForm(formId, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteQuestion(id) {
    return new Promise((resolve, reject) => {
      const QuestionModel = new Question();

      QuestionModel.deleteQuestion(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}
