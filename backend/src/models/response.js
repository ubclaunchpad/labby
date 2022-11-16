import con from "../config/Database.js";

export class Response {
  insertResponse(newResponse, result) {
    con.query(
      "CALL addAnswer(?, ?, ?, ?, ?)",
      [
        newResponse.answer_id,
        newResponse.fk_survey_id,
        newResponse.fk_question_type,
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

  inserSurvey(newSurvey, result) {
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
            result: `Response ${results.answer_id} Saved Successfully`,
          });
        }
      }
    );
  }
}
