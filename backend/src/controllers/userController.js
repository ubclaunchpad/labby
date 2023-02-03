import { User } from "../models/user.js";

export default class UserController {

  getUser() {
    return new Promise((resolve, reject) => {
      const UserModel = new User();

      UserModel.getUser((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  authenticateUser(req) {
    return new Promise((resolve, reject) => {
      let password = req.body.password;
      const UserModel = new User();
      UserModel.getOneUser(req.body.username, (err, res) => {
        if (res) {
          bcrypt.compare(password, res.hash, function (err, result) {
            if (result) {
              resolve(res);
              // password is valid - add token here
            }
          });
        }
        reject({err: "Login failed, incorrect credentials. Please try again."});
      });
    });
  }
  getEmployee() {
    return new Promise((resolve, reject) => {
      const UserModel = new User();

      UserModel.getEmployee((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      const UserModel = new User();

      UserModel.deleteUser(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveUser(req) {
    return new Promise((resolve, reject) => {
      const UserModel = new User();
      const hashPassword = "";

        bcrypt.hash(req.body.password, 10, function(err, hash) {
          if (err) {
            console.log({ error: err });
            reject(err);
          }
          hash = hash;
          });


      const user = {
        user_id: req.body.user_id,
        organization_id: req.body.organization_id,
        username: req.body.username,
        email: req.body.email,
        employee: req.body.employee,
        hash: hashPassword,
      };

      UserModel.insertUser(user, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}