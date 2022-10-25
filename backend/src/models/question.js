import con from "../config/Database.js";

export class Question {
  insertQuestion(newQuestion, result) {
    con.query(
      "CALL save_question(?, ?, ?, ?)",
      [
        newQuestion.question_id,
        newQuestion.question_title,
        newQuestion.question_type,
        newQuestion.question_index,
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Question ${newQuestion.question_title} Saved Successfully, Inserted ID: ${results.insertId}`,
          });
        }
      }
    );
  }

  loadQuestion(result) {
    con.query("SELECT * FROM questions", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  deleteQuestion(id, result) {
    con.query(`DELETE FROM questions WHERE question_id="${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
}
