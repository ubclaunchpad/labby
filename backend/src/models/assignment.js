import con from "../config/Database.js";

export class Assignment {
  insertAssignment(newAssignment, result) {
    con.query(
      "CALL save_assignment(?, ?, ?)",
      [
        newAssignment.assignment_id,
        newAssignment.user_id,
        newAssignment.task_id,
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Response ${results.assignment_id} Saved Successfully`,
          });
        }
      }
    );
  }

  deleteAssignment(id, result) {
    con.query(`CALL delete_assignment(?)`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
}
