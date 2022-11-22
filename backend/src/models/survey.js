import con from "../config/Database.js";

export class Survey {
  
  insertSurvey(newSurvey, result) {
    con.query(
      "CALL addSurvey(?, ?, ?)",
      [
        newSurvey.survey_id,
        newSurvey.fk_user_id,
        newSurvey.date_created,
      ],
      function (error, results) {
        if(error) {
          console.log("error: ", error);
          result(error,null);
        } else {
          result(null, {
            result: `Response ${results.survey_id} Saved Successfully`,
          });
        }
      }
    );
  }
  
  insertResponse(newResponse, result) {
    con.query(
      "CALL addAnswer(?, ?, ?, ?, ?)",
      [
        newResponse.answer_id,
        newResponse.fk_survey_id,
        newResponse.fk_question_id,
        newResponse.fk_questions_answer_id,
        newResponse.answer,
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Response ${newResponse.answer} Saved Successfully, Inserted ID: ${results.answer_id}`,
          });
        }
      }
    );
  }

  deleteSurvey(id, result) {
    con.query(`CALL deleteSurvey(?)`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }


}
