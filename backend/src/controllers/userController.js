import { User } from "../models/user.js";

function genRandomString(number) {
  return crypto.randomBytes(Math.ceil(number/2))
      .toString('hex') /** convert to hexadecimal format */
      .slice(0,length); /** return required number of characters */
}
function encrypt(password, salt) {
  var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest('hex');
  return {
    salt:salt,
    passwordHash:value
  };
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
      UserModel.getOneUser(req.body.username, (err, res) => {
        if (res) {
          if(res.hashedPassword === encrypt(password, res.salt)) {
            resolve();
          }
          }
        })
        reject({err: "Login failed, incorrect credentials. Please try again."});
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