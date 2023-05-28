import con from "../config/Database.js";

export class Draft {
  insertDraft(newDraft, result) {
    con.query(
      "CALL addDraft(?, ?, ?, ?, ?)",
      [
        newDraft.draft_id,
        newDraft.fk_user_id,
        newDraft.fk_form_id,
        newDraft.fk_question_id,
        newDraft.answer,
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Draft ${newDraft.answer} Saved Successfully, Inserted ID: ${results.insertId}`,
          });
        }
      }
    );
  }

  deleteDraft(id, result) {
    con.query(`CALL deleteDraft(?)`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  getDraft(draft, result) {
    con.query(
      `CALL getDraft(?, ?)`,
      [draft.fk_user_id, draft.fk_form_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }

  getAllDraft(result) {
    con.query(
      `CALL loadAllDrafts()`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }
}
