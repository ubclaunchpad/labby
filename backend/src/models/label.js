import con from "../config/Database.js";

export class Label {

  loadLabel(result) {
    con.query(`CALL loadLabel()`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  insertLabel(newLabel, result) {
    con.query(
      "CALL saveLabel(?, ?)",
      [
        newLabel.label_name,
        newLabel.label_id,
      ],
      function (error, _) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Response ${newLabel.label_name} Saved Successfully`,
          });
        }
      }
    );
  }

  deleteLabel(id, result) {
    con.query(`CALL deleteLabel(?)`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
}
