import con from "../config/Database.js";

export class Question {
  insertQuestion(newQuestion, result) {
    con.query(
      "CALL save_question(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        newQuestion.question_id,
        newQuestion.form_id,
        newQuestion.question_title,
        newQuestion.question_type,
        newQuestion.question_index,
        newQuestion.mandatory,
        newQuestion.clinical,
        newQuestion.quantity,
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
    con.query("CALL load_questions", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  loadQuestionByForm(formId, result) {
    con.query("CALL load_questions_by_form(?)", [formId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  deleteQuestion(id, result) {
    con.query(`CALL delete_question(?)`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
}
