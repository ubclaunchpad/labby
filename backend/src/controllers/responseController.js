import { Response } from "../models/answer.js";

export default class ResponseController {

  saveResponse(req) {
    return new Promise((resolve, reject) => {
      const ResponseModel = new Response();

      const response = {
        answer_id: req.body.answer_id,
        fk_survey_id: req.body.fk_survey_id,
        fk_question_id: req.body.fk_question_id,
        fk_questions_answer_id: req.body.fk_questions_answer_id,
        answer: req.body.answer,
      };

      ResponseModel.insertResponse(response, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveSurvey(req) {
    return new Promise((resolve, reject) => {
      const ResponseModel = new Response();

      const survey = {
        survey_id: req.body.survey,
        fk_user_id: req.body.fk_user_id,
        date_created: req.body.date_created,
      };

      ResponseModel.insertSurvey(survey, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}
