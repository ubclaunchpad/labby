import { Clinical } from "../models/clinical.js";

export default class ClinicalController {
  saveClinical(req) {
    return new Promise((resolve, reject) => {
      const ClinicalModel = new Clinical();

      const clinical = {
        clinical_id: req.body.clinical_id,
        fk_survey_id: req.body.fk_survey_id,
        fk_question_id: req.body.fk_question_id,
        fk_questions_answer_id: req.body.fk_questions_answer_id,
        sample_id: req.body.sample_id,
        authorized_by: req.body.authorized_by,
      };

      ClinicalModel.insertClinical(clinical, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}
