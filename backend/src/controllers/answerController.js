import { Answer } from "../models/answer.js";
import { Clinical } from "../models/clinical.js";

export default class AnswerController {
  saveAnswer(req) {
    return new Promise((resolve, reject) => {
      const AnswerModel = new Answer();

      const answer = {
        answer_id: req.body.answer_id,
        fk_question_id: req.body.fk_question_id,
        question_type: req.body.question_type,
        answer: req.body.answer,
      };

      AnswerModel.insertAnswer(answer, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  getAnswer(id) {
    return new Promise((resolve, reject) => {
      const AnswerModel = new Answer();
      const ClinicalModel = new Clinical();

      AnswerModel.readAnswer(id, (err, res) => {
        if (err) {
          reject({ error: err });
        }
        ClinicalModel.readClinical(id, (err, clinicalRes) => {
          if (err) {
            reject({ error: err });
          }
          const combinedResults = [];
          res[0].forEach((answer) => {
            var resJson = Object.assign({}, answer);
            var clinicalList = [];
            clinicalRes[0].forEach((clinical) => {
              var clinicalJson = Object.assign({}, clinical);
              if (clinicalJson.fk_questions_answer_id === resJson.answerid) {
                clinicalList.push(`${clinicalJson.sample_id} (${clinicalJson.authorized_by})`);
              }
            });
            resJson.clinicalList = clinicalList;
            combinedResults.push(resJson);
          });
          resolve(combinedResults);
        });
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
