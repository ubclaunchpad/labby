import con from "../config/Database.js";

export class TaskLabel {
  insertTaskLabel(newTaskLabel, result) {
    con.query(
      "CALL save_task_label(?, ?, ?)",
      [
        newTaskLabel.task_label_id,
        newTaskLabel.task_id,
        newTaskLabel.label_id,
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Response ${newTaskLabel.task_label_id} Saved Successfully`,
          });
        }
      }
    );
  }

  deleteTaskLabel(id, result) {
    con.query(`CALL delete_task_label(?)`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
}
