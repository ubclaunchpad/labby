import con from "../config/Database.js";

export class User {
  insertUser(newUser, result) {
    con.query(
      "CALL addUser(?, ?, ?, ?, ?)",
      [
        newUser.user_id,
        newUser.organization_id,
        newUser.username,
        newUser.email,
        newUser.employee,
      ],
      function (error, results) {
        if(error) {
          console.log("error: ", error);
          result(error,null);
        } else {
          result(null, {
            result: `Response ${results.user_id} Saved Successfully`,
          });
        }
      }
    );
  }

  getUser(result) {
    con.query(`CALL loadUser()`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  deleteUser(id, result) {
    con.query(`CALL deleteUser(?)`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
}
