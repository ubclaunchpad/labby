import con from "../config/Database.js";

export class Form {
  insertForm(newForm, result) {
    con.query(
      "CALL save_form(?, ?)",
      [
        newForm.form_id,
        newForm.form_name
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Form ${newForm.form_name} Saved Successfully, Inserted ID: ${results.insertId}`,
          });
        }
      }
    );
  }

  loadForm(result) {
    con.query("CALL load_forms", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  deleteForm(id, result) {
    con.query(`CALL delete_form(?)`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  insertFormBuild(id, result) {
    console.log("id: ", id)
    con.query(`CALL publish_form(?)`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
}
