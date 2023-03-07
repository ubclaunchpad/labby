import con from "../config/Database.js";

export class Clinical {
  insertClinical(newClinical, result) {
    con.query(
      "CALL addClinical(?, ?, ?, ?, ?, ?)",
      [
        newClinical.clinical_id,
        newClinical.fk_survey_id,
        newClinical.fk_question_id,
        newClinical.fk_questions_answer_id,
        newClinical.sample_id,
        newClinical.authorized_by,
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Clinical ${newClinical.clinical_id} Saved Successfully, Inserted ID: ${results.insertId}`,
          });
        }
      }
    );
  }

  readClinical(surveyId, result) {
    con.query(`CALL load_clinical_by_survey(?)`, [surveyId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
}
