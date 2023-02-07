import { User } from "../models/user.js";
import crypto from "crypto";

function genRandomString(number) {
  return crypto.randomBytes(Math.ceil(number/2))
      .toString('hex') /** convert to hexadecimal format */
      .slice(0,number); /** return required number of characters */
}
function encrypt(password, salt) {
  var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest('hex');
  return value
}

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
  };

  authenticateUser(req) {
    return new Promise((resolve, reject) => {
      let password = req.body.password;
      const UserModel = new User();
      UserModel.getOneUser(req.body.email, (_, res) => {
        if (res && res.length > 0 && res[0].email === req.body.email) {
          if(res[0].hashed_password === encrypt(password, res[0].salt)) {
            resolve(res[0]);
          }
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
      let salt = genRandomString(16); /** Gives us salt of length 16 */
      let hashedPassword = encrypt(req.body.password, salt);


      const user = {
        user_id: req.body.user_id,
        organization_id: req.body.organization_id,
        username: req.body.username,
        email: req.body.email,
        employee: req.body.employee,
        salt: salt,
        hash: hashedPassword,
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