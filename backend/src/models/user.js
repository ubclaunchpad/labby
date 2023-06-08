import con from "../config/Database.js";

export class User {

  approveUser(newUser, result) {
    con.query(
      "CALL approveUser(?)",
      [newUser],
      function (error, _) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Response Saved Successfully`,
          });
        }
      }
    );

  }

  getPendingUsers(result) {
    con.query(`CALL loadPendingUsers()`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }
  insertUser(newUser, result) {
    con.query(
      "CALL addUser(?, ?, ?, ?, ?, ?, ?)",
      [
        newUser.user_id,
        newUser.organization_id,
        newUser.username,
        newUser.email,
        newUser.employee,
        newUser.salt,
        newUser.hash,
      ],
      function (error, _) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Response ${newUser.user_id} Saved Successfully`,
          });
        }
      }
    );
  }

  updateUserPassword(newUser, result) {
    con.query(
      "CALL updateUserPassword(?, ?, ?)",
      [
        newUser.email,
        newUser.salt,
        newUser.hash,
      ],
      function (error, _) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Response ${newUser.email} Saved Successfully`,
          });
        }
      }
    );
  }

  updateUser(newUser, result) {
    con.query(
      "CALL updateUser(?, ?, ?, ?, ?)",
      [
        newUser.user_id,
        newUser.organization_id,
        newUser.username,
        newUser.email,
        newUser.employee
      ],
      function (error, res) {
        if (error || res.affectedRows !== 1) {
          console.log("error: ", error ?? "User Does Not Exist!");
          result(error ?? "User Does Not Exist!", null);
        } else {
          result(null, {
            result: `Response ${newUser.user_id} Saved Successfully`,
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

  getOneUser(email, result) {
    con.query("CALL loadSingleUser(?)", [email], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  getOneUserByID(userId, result) {
    con.query("CALL loadSingleUserByID(?)", [userId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }
}
