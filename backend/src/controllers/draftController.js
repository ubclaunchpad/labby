import { Draft } from "../models/draft.js";

export default class DraftController {
  saveDraft(req) {
    return new Promise((resolve, reject) => {
      const DraftModel = new Draft();

      const draft = {
        draft_id: req.body.draft_id,
        fk_user_id: req.body.fk_user_id,
        fk_form_id: req.body.fk_form_id,
        fk_question_id: req.body.fk_question_id,
        answer: req.body.answer,
      };

      DraftModel.insertDraft(draft, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  getDraft(userId, formId) {
    return new Promise((resolve, reject) => {
      const DraftModel = new Draft();

      const draft = {
        fk_user_id: userId,
        fk_form_id: formId,
      };

      DraftModel.getDraft(draft, (err, res) => {
        if (err) {
          reject({ error: err });
        }
        resolve(res);
      });
    });
  }

  deleteDraft(id) {
    return new Promise((resolve, reject) => {
      const DraftModel = new Draft();

      DraftModel.deleteDraft(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}
