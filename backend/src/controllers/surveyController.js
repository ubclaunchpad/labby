import { Survey } from "../models/survey.js";

export default class SurveyController {

  saveSurvey(req) {
    return new Promise((resolve, reject) => {
      const SurveyModel = new Survey();

      const survey = {
        survey_id: req.body.survey_id,
        fk_user_id: req.body.fk_user_id,
        date_created: req.body.date_created,
      };

      SurveyModel.insertSurvey(survey, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadSurvey(uid) {
    return new Promise((resolve, reject) => {
      const SurveyModel = new Survey();

      SurveyModel.loadSurvey(uid, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveResponse(req) {
    return new Promise((resolve, reject) => {
      const SurveyModel = new Survey();

      const survey = {
        answer_id: req.body.answer_id,
        fk_survey_id: req.body.fk_survey_id,
        fk_question_id: req.body.fk_question_id,
        fk_questions_answer_id: req.body.fk_questions_answer_id,
        answer: req.body.answer,
      };

      SurveyModel.insertResponse(survey, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteSurvey(id) {
    return new Promise((resolve, reject) => {
      const SurveyModel = new Survey();

      SurveyModel.deleteSurvey(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }


}
