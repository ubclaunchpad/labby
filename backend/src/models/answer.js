import con from "../config/Database.js";

export class Answer {
  insertAnswer(newQuestion, result) {
    con.query(
      "CALL save_answer(?, ?, ?, ?)",
      [
        newQuestion.answer_id,
        newQuestion.answer,
        newQuestion.question_type,
        newQuestion.fk_question_id,
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Question ${newQuestion.answer} Saved Successfully, Inserted ID: ${results.insertId}`,
          });
        }
      }
    );
  }

  deleteAnswer(id, result) {
    con.query(`CALL delete_answer(?)`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
}
