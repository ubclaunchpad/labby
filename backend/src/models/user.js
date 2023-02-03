import con from "../config/Database.js";

export class User {
  insertUser(newUser, result) {
    con.query(
      "CALL addUser(?, ?, ?, ?, ?)", // add extra ? for hash later
      [
        newUser.user_id,
        newUser.organization_id,
        newUser.username,
        newUser.email,
        newUser.employee,
        // newUser.hash,
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

  getEmployee(result) {
    con.query(`CALL loadEmployee()`, (err, res) => {
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
