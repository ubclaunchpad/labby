import con from "../config/Database.js";

export class Logic {

  deleteQuestion(id, result) {
    con.query(`DELETE FROM questions WHERE question_id="TODO"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
}
